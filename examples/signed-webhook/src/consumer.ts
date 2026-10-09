import { createHmac, timingSafeEqual } from "node:crypto";

export interface WebhookHeaders {
  id: string;
  signature: string;
  timestamp: string;
}
export interface WebhookEnvelope {
  appId: string;
  environment: "test" | "production";
  eventId: string;
  eventType: string;
  occurredAt: string;
  payload: Record<string, unknown>;
  resourceVersion: number;
  version: string;
  workspaceId: string;
}
export interface WebhookState {
  hasEvent(eventId: string): boolean;
  resourceVersion(resourceId: string): number | undefined;
  apply(event: WebhookEnvelope): void;
  recordEvent(eventId: string, deliveryTimestamp: string): void;
}

const input = (timestamp: string, eventId: string, rawBody: string) =>
  `${timestamp}.${eventId}.${rawBody}`;
export const signFixture = (value: {
  eventId: string;
  rawBody: string;
  secret: string;
  timestamp: string;
}) =>
  createHmac("sha256", value.secret)
    .update(input(value.timestamp, value.eventId, value.rawBody))
    .digest("base64url");

function validSignature(
  headers: WebhookHeaders,
  rawBody: string,
  secrets: readonly string[],
  now: Date,
): boolean {
  if (!/^\d+$/.test(headers.timestamp)) return false;
  const seconds = Number(headers.timestamp);
  if (
    !Number.isSafeInteger(seconds) ||
    Math.abs(Math.floor(now.getTime() / 1000) - seconds) > 300
  )
    return false;
  const match =
    /^v1=([A-Za-z0-9_-]{43})(?:,v1-previous=([A-Za-z0-9_-]{43}))?$/.exec(
      headers.signature,
    );
  if (!match || (match[2] && match[1] === match[2])) return false;
  const supplied = match
    .slice(1)
    .filter((part): part is string => Boolean(part))
    .map((part) => Buffer.from(part, "base64url"));
  if (supplied.some((part) => part.length !== 32)) return false;
  let valid = false;
  for (const secret of secrets) {
    const expected = Buffer.from(
      signFixture({
        eventId: headers.id,
        rawBody,
        secret,
        timestamp: headers.timestamp,
      }),
      "base64url",
    );
    for (const candidate of supplied)
      valid = timingSafeEqual(expected, candidate) || valid;
  }
  return valid;
}

export async function verifyAndConsume(value: {
  headers: WebhookHeaders;
  now: Date;
  rawBody: string;
  secrets: readonly string[];
  state: WebhookState;
}): Promise<{ code: string; status: number }> {
  // Do not move JSON.parse above this check: the exact received bytes are signed.
  if (!validSignature(value.headers, value.rawBody, value.secrets, value.now))
    return { code: "invalid_signature", status: 401 };
  let event: WebhookEnvelope;
  try {
    event = JSON.parse(value.rawBody) as WebhookEnvelope;
  } catch {
    return { code: "invalid_json", status: 400 };
  }
  if (event.eventId !== value.headers.id)
    return { code: "event_id_mismatch", status: 400 };
  if (value.state.hasEvent(event.eventId))
    return { code: "duplicate", status: 204 };
  if (event.version !== "1.0") {
    value.state.recordEvent(event.eventId, value.headers.timestamp);
    return { code: "unsupported_schema", status: 204 };
  }
  const resourceId =
    typeof event.payload.membershipId === "string"
      ? event.payload.membershipId
      : typeof event.payload.connectionId === "string"
        ? event.payload.connectionId
        : undefined;
  if (
    resourceId &&
    (value.state.resourceVersion(resourceId) ?? -1) >= event.resourceVersion
  ) {
    value.state.recordEvent(event.eventId, value.headers.timestamp);
    return { code: "stale", status: 204 };
  }
  value.state.apply(event);
  value.state.recordEvent(event.eventId, value.headers.timestamp);
  return { code: "processed", status: 204 };
}

export class MemoryWebhookState implements WebhookState {
  private events = new Map<string, string>();
  private memberships = new Map<
    string,
    { resourceVersion: number; status: string }
  >();
  hasEvent(id: string) {
    return this.events.has(id);
  }
  recordEvent(id: string, timestamp: string) {
    this.events.set(id, timestamp);
  }
  resourceVersion(id: string) {
    return this.memberships.get(id)?.resourceVersion;
  }
  apply(event: WebhookEnvelope) {
    const id = event.payload.membershipId;
    const status = event.payload.status;
    if (typeof id === "string" && typeof status === "string")
      this.memberships.set(id, {
        resourceVersion: event.resourceVersion,
        status,
      });
  }
  membership(id: string) {
    return this.memberships.get(id);
  }
  eventIds() {
    return [...this.events.keys()];
  }
  reconcileMembership(snapshot: {
    id: string;
    resourceVersion: number;
    status: string;
  }) {
    if ((this.resourceVersion(snapshot.id) ?? -1) < snapshot.resourceVersion)
      this.memberships.set(snapshot.id, {
        resourceVersion: snapshot.resourceVersion,
        status: snapshot.status,
      });
  }
}

export async function reconcileMembershipGap(input: {
  listAuthoritativeMemberships(): Promise<
    readonly { id: string; resourceVersion: number; status: string }[]
  >;
  state: MemoryWebhookState;
}): Promise<number> {
  let updated = 0;
  for (const snapshot of await input.listAuthoritativeMemberships()) {
    const before = input.state.resourceVersion(snapshot.id) ?? -1;
    input.state.reconcileMembership(snapshot);
    if (snapshot.resourceVersion > before) updated += 1;
  }
  return updated;
}
