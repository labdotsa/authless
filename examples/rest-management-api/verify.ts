import { AuthlessApiError, createAuthlessServerClient } from "@authless/server";

const credential = `authless_secret_${"x".repeat(43)}`;
const correlationId = "rest-guide-clean-room-001";
const membership = {
  appId: "app-clean-room",
  appName: "Clean room",
  appSubject: "subject_abcdefghijklmnopqrstuvwxyz123456",
  consent: null,
  customerReference: "rest-guide-clean-room",
  id: "membership-clean-room",
  permittedClaims: {},
  status: "active",
  updatedAt: "2026-08-14T08:00:00.000Z",
  version: 4,
  workspaceId: "workspace-clean-room",
};
let invitation = false;
let revoked = false;

const boundary = async (input: RequestInfo | URL, init?: RequestInit) => {
  const request = new Request(input, init);
  if (request.headers.get("authorization") !== `Bearer ${credential}`) {
    return Response.json(
      {
        error: "unauthorized",
        status: 401,
        title: "Unauthorized",
        type: "about:blank",
      },
      { status: 401, headers: { "x-correlation-id": correlationId } },
    );
  }
  const path = new URL(request.url).pathname;
  const headers = {
    "content-type": "application/json",
    "x-correlation-id": correlationId,
  };
  if (request.method === "POST" && path.endsWith("/memberships")) {
    invitation = true;
    return Response.json(
      { accepted: true, replayed: false },
      { status: 202, headers },
    );
  }
  if (request.method === "GET" && path.endsWith("/memberships")) {
    const cursor = new URL(request.url).searchParams.get("cursor");
    return Response.json(
      {
        memberships: cursor ? [] : [membership],
        nextCursor: cursor ? null : "opaque-page-2",
      },
      { headers },
    );
  }
  if (request.method === "GET" && path.endsWith(`/${membership.id}`)) {
    return Response.json(
      { membership },
      { headers: { ...headers, etag: '"4"' } },
    );
  }
  if (
    request.method === "POST" &&
    path.endsWith(`/${membership.id}/lifecycle`)
  ) {
    if (request.headers.get("if-match") !== '"4"')
      return Response.json(
        { error: "version_conflict" },
        { status: 412, headers },
      );
    revoked = true;
    return Response.json(
      {
        membership: { ...membership, status: "revoked", version: 5 },
        replayed: false,
      },
      { headers },
    );
  }
  return Response.json({ error: "invalid_request" }, { status: 400, headers });
};

const client = createAuthlessServerClient({
  appCredentialToken: credential,
  baseUrl: "https://isolated.example.test",
  fetch: boundary,
});
await client.appMemberships.invite({
  appId: membership.appId,
  confirmed: true,
  correlationId,
  customerReference: membership.customerReference,
  email: "rest-guide-user@example.test",
  idempotencyKey: "clean-room-invite",
  workspaceId: membership.workspaceId,
});
const first = await client.appMemberships.list({
  appId: membership.appId,
  correlationId,
  limit: 1,
  query: membership.customerReference,
  workspaceId: membership.workspaceId,
});
if (first.nextCursor)
  await client.appMemberships.list({
    appId: membership.appId,
    correlationId,
    cursor: first.nextCursor,
    limit: 1,
    workspaceId: membership.workspaceId,
  });
const created = first.memberships[0];
if (!created) throw new Error("clean_room_membership_missing");
const current = await client.appMemberships.get({
  appId: membership.appId,
  correlationId,
  membershipId: created.id,
  workspaceId: membership.workspaceId,
});
await client.appMemberships.changeStatus({
  action: "revoke",
  appId: membership.appId,
  confirmed: true,
  correlationId,
  expectedVersion: current.version,
  idempotencyKey: "clean-room-revoke",
  membershipId: current.id,
  reason: "access_ended",
  workspaceId: membership.workspaceId,
});
if (!invitation || !revoked) throw new Error("clean_room_cleanup_incomplete");

let failure: unknown;
try {
  await createAuthlessServerClient({
    appCredentialToken: `authless_secret_${"z".repeat(43)}`,
    baseUrl: "https://isolated.example.test",
    fetch: boundary,
  }).appMemberships.get({
    appId: membership.appId,
    correlationId,
    membershipId: membership.id,
    workspaceId: membership.workspaceId,
  });
} catch (error) {
  failure = error;
}
if (
  !(failure instanceof AuthlessApiError) ||
  failure.status !== 401 ||
  failure.correlationId !== correlationId
)
  throw new Error("clean_room_failure_diagnostic_missing");
if (JSON.stringify(failure).includes(credential))
  throw new Error("credential_leaked");
console.info("REST_GUIDE_COMPLETE cleanup_ok failure_diagnosed");
