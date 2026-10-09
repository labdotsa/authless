function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} is invalid`);
  return value as Record<string, unknown>;
}

export interface ReplayClaimStore {
  claim(eventId: string, expiresAt: Date): Promise<boolean>;
}

export interface WebhookVerificationInput {
  body: string;
  eventId: string;
  now?: Date;
  replay: ReplayClaimStore;
  secrets: readonly string[];
  signature: string;
  timestamp: string;
}

export interface VerifiedWebhookEvent {
  event: Record<string, unknown>;
  eventId: string;
}

export async function verifyWebhook(
  input: WebhookVerificationInput,
): Promise<VerifiedWebhookEvent> {
  if (!/^\d+$/.test(input.timestamp))
    throw new Error("Webhook timestamp is invalid");
  const now = input.now ?? new Date();
  const seconds = Number(input.timestamp);
  if (
    !Number.isSafeInteger(seconds) ||
    Math.abs(Math.floor(now.getTime() / 1_000) - seconds) > 300
  )
    throw new Error("Webhook timestamp is outside the replay window");
  if (!/^[A-Za-z0-9._:-]{3,128}$/.test(input.eventId))
    throw new Error("Webhook event ID is invalid");
  const matches =
    /^v1=([A-Za-z0-9_-]{43})(?:,v1-previous=([A-Za-z0-9_-]{43}))?$/.exec(
      input.signature,
    );
  if (!matches) throw new Error("Webhook signature is malformed");
  const supplied = matches.slice(1).filter(Boolean) as string[];
  const message = new TextEncoder().encode(
    `${input.timestamp}.${input.eventId}.${input.body}`,
  );
  let valid = false;
  for (const secret of input.secrets) {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { hash: "SHA-256", name: "HMAC" },
      false,
      ["verify"],
    );
    for (const signature of supplied)
      valid =
        (await crypto.subtle.verify(
          "HMAC",
          key,
          Buffer.from(signature, "base64url"),
          message,
        )) || valid;
  }
  if (!valid) throw new Error("Webhook signature is invalid");
  if (
    !(await input.replay.claim(
      input.eventId,
      new Date((seconds + 300) * 1_000),
    ))
  )
    throw new Error("Webhook event was replayed");
  return {
    event: object(JSON.parse(input.body), "Webhook event"),
    eventId: input.eventId,
  };
}
