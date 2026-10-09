import { expect, test } from "bun:test";
import {
  MemoryWebhookState,
  reconcileMembershipGap,
  signFixture,
  verifyAndConsume,
} from "../src/consumer";

const now = new Date("2026-08-14T10:00:00.000Z");
const timestamp = String(Math.floor(now.getTime() / 1000));
const secret = "whsec_example-current-signing-secret-123456";
const envelope = (overrides: Record<string, unknown> = {}) => ({
  appId: "app_test_01",
  environment: "test",
  eventId: "event_01",
  eventType: "app_membership.activated",
  occurredAt: now.toISOString(),
  payload: { membershipId: "membership_01", status: "active" },
  resourceVersion: 1,
  version: "1.0",
  workspaceId: "workspace_test_01",
  ...overrides,
});
const request = (
  rawBody: string,
  state = new MemoryWebhookState(),
  options: { secret?: string; signature?: string; timestamp?: string } = {},
) => {
  const at = options.timestamp ?? timestamp;
  return verifyAndConsume({
    now,
    rawBody,
    secrets: [options.secret ?? secret],
    state,
    headers: {
      id: "event_01",
      timestamp: at,
      signature:
        options.signature ??
        `v1=${signFixture({ eventId: "event_01", rawBody, secret, timestamp: at })}`,
    },
  });
};

test("rejects changed bytes and expired delivery timestamps before side effects", async () => {
  const original = JSON.stringify(envelope());
  const state = new MemoryWebhookState();
  expect(
    (
      await request(`${original} `, state, {
        signature: `v1=${signFixture({ eventId: "event_01", rawBody: original, secret, timestamp })}`,
      })
    ).code,
  ).toBe("invalid_signature");
  expect(
    (
      await request(original, state, {
        timestamp: String(Number(timestamp) - 301),
      })
    ).code,
  ).toBe("invalid_signature");
  expect(state.eventIds()).toEqual([]);
});

test("accepts either rotation key, rejects duplicates, and ignores older resource versions", async () => {
  const previous = "whsec_example-previous-signing-secret-1234";
  const first = JSON.stringify(
    envelope({ eventId: "event_01", resourceVersion: 2 }),
  );
  const state = new MemoryWebhookState();
  const currentSignature = signFixture({
    eventId: "event_01",
    rawBody: first,
    secret,
    timestamp,
  });
  const previousSignature = signFixture({
    eventId: "event_01",
    rawBody: first,
    secret: previous,
    timestamp,
  });
  expect(
    (
      await verifyAndConsume({
        now,
        rawBody: first,
        secrets: [previous],
        state,
        headers: {
          id: "event_01",
          timestamp,
          signature: `v1=${currentSignature},v1-previous=${previousSignature}`,
        },
      })
    ).code,
  ).toBe("processed");
  expect((await request(first, state)).code).toBe("duplicate");
  const stale = JSON.stringify(
    envelope({
      eventId: "event_02",
      resourceVersion: 1,
      payload: { membershipId: "membership_01", status: "revoked" },
    }),
  );
  const staleSig = signFixture({
    eventId: "event_02",
    rawBody: stale,
    secret,
    timestamp,
  });
  expect(
    (
      await verifyAndConsume({
        now,
        rawBody: stale,
        secrets: [secret],
        state,
        headers: { id: "event_02", timestamp, signature: `v1=${staleSig}` },
      })
    ).code,
  ).toBe("stale");
  expect(state.membership("membership_01")?.status).toBe("active");
});

test("acknowledges an unknown schema without parsing it as a known side effect", async () => {
  const raw = JSON.stringify(envelope({ version: "2.0" }));
  const state = new MemoryWebhookState();
  expect(await request(raw, state)).toEqual({
    code: "unsupported_schema",
    status: 204,
  });
  expect(state.membership("membership_01")).toBeUndefined();
});

test("repairs a missed event from an authoritative resource listing", async () => {
  const state = new MemoryWebhookState();
  expect(
    await reconcileMembershipGap({
      state,
      listAuthoritativeMemberships: async () => [
        { id: "membership_01", resourceVersion: 4, status: "revoked" },
      ],
    }),
  ).toBe(1);
  expect(state.membership("membership_01")).toEqual({
    resourceVersion: 4,
    status: "revoked",
  });
  expect(
    await reconcileMembershipGap({
      state,
      listAuthoritativeMemberships: async () => [
        { id: "membership_01", resourceVersion: 4, status: "revoked" },
      ],
    }),
  ).toBe(0);
});
