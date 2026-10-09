# `@authless/api-client`

Thin, generated TypeScript client for the Authless management REST API. The
package targets Node.js 24 or newer and must only be used in trusted server
code. It is not a browser SDK.

## Source install

This package is prepared for publication but is not currently published to the
npm registry. Install the prebuilt distribution from the public repository:

```sh
git clone https://github.com/labdotsa/authless.git
cd authless
mkdir api-client-check
cd api-client-check
npm init -y
npm install ../packages/api-client
```

## Platform session

Create the client at a server boundary that already holds an Authless platform
session. Pass the session value in memory; do not expose it to browser code,
persist it in logs, or embed it in a client bundle.

The client identifies its trusted server-side transport with
`x-authless-client: api-client`. Keep this header on the server boundary; it is
not a browser CSRF proof and is not accepted with an `Origin` header.

```ts
import { createAuthlessApiClient } from "@authless/api-client";

export function authlessForSession(sessionToken: string) {
  return createAuthlessApiClient({
    baseUrl: process.env.AUTHLESS_API_URL!,
    sessionToken,
  });
}

export async function listWorkspaces(sessionToken: string) {
  const authless = authlessForSession(sessionToken);
  return authless.workspaces.list({
    correlationId: crypto.randomUUID(),
    limit: 25,
  });
}
```

A platform session can call the `workspaces`, `apps`, `appMemberships`,
`appAccess`, `bulkAccess`, and `auditEvents` operation groups.

Backends that only need workspace operations can compose the focused client
without depending on the aggregate facade:

```ts
import {
  createAuthlessTransport,
  createWorkspaceClient,
} from "@authless/api-client";

const transport = createAuthlessTransport({
  baseUrl: process.env.AUTHLESS_API_URL!,
  sessionToken,
});
const workspaces = createWorkspaceClient(transport);
```

The transport owns server authority, correlation, retry, response, and error
policy. Resource clients own paths, request mapping, and response projections.
The same focused composition is available through `createAppClient`,
`createAppMembershipClient`, `createAppAccessClient`,
`createBulkAccessClient`, and `createAuditClient`.
`createAuthlessApiClient` remains the compatibility facade and delegates to
these focused boundaries.

Bulk access is session-only. Create a read-only preview and inspect its exact
scope. Suspension, role-grant, and entitlement-grant previews can then be
explicitly confirmed with a stable idempotency key:

```ts
const preview = await authless.bulkAccess.createPreview({
  action: "suspend_memberships",
  appId,
  correlationId: crypto.randomUUID(),
  filter: { membershipIds },
  reason: "security_review",
  workspaceId,
});

const queued = await authless.bulkAccess.executePreview({
  appId,
  confirmed: true,
  correlationId: crypto.randomUUID(),
  idempotencyKey: crypto.randomUUID(),
  previewId: preview.id,
  previewIntegrityDigest: preview.integrityDigest,
  previewVersion: preview.version,
  workspaceId,
});
```

The preview integrity digest is the immutable confirmation binding. Send it
back with the preview version; a changed or stale snapshot is rejected before
an operation is queued.

Entitlement-grant previews accept an optional expiry. Execution preserves that
exact expiry while applying every item through the canonical entitlement grant
boundary.

The same group inspects or version-cancels the durable operation, pages safe
item results, and downloads immutable JSONL evidence with its SHA-256 digest
and row count.

## App service credential

Backend services can instead use one app credential. Keep the credential in a
server-side secret store and inject it at runtime.

```ts
import { createAuthlessApiClient } from "@authless/api-client";

const authless = createAuthlessApiClient({
  appCredentialToken: process.env.AUTHLESS_APP_CREDENTIAL!,
  baseUrl: process.env.AUTHLESS_API_URL!,
});

const membership = await authless.appMemberships.get({
  appId: "app_01...",
  correlationId: crypto.randomUUID(),
  membershipId: "membership_01...",
  workspaceId: "workspace_01...",
});
```

App credentials are deliberately limited to the `appMemberships` and
`appAccess` groups. Calling a platform-only operation with one fails before a
network request is made. Configure exactly one of `sessionToken` or
`appCredentialToken` for each client instance.

## Mutations, versions, and retries

Every mutation requires a caller-generated `idempotencyKey`; keep the same key
when repeating the same logical command. Versioned changes also require the
current `expectedVersion`, `expectedDefinitionVersion`, or
`expectedGrantVersion`. The client maps these values to the contract's
idempotency and `If-Match` headers, but it does not resolve conflicts or decide
whether an operation should be confirmed.

Safe contract operations retry network failures and HTTP 408, 500, 502, 503,
and 504 responses. The default is two total attempts with 100 ms exponential
backoff. Configure one through three attempts when needed:

```ts
const authless = createAuthlessApiClient({
  baseUrl: process.env.AUTHLESS_API_URL!,
  retry: { baseDelayMilliseconds: 200, maxAttempts: 3 },
  sessionToken,
});
```

Operations classified as unsafe are never retried automatically. HTTP 429 is
also returned immediately so the caller can apply its own rate-limit policy.

## Errors and correlation

Supply a unique `correlationId` on every call and carry it through application
logs. API and transport failures reject with `AuthlessApiError`, whose stable
fields are `code`, `status`, `correlationId`, and `retrySafety`. A version
conflict may also include `currentGrant`. Error messages intentionally do not
contain response bodies, session values, or app credentials.

```ts
import {
  AuthlessApiError,
  createAuthlessApiClient,
} from "@authless/api-client";

try {
  await authless.workspaces.get({
    correlationId: crypto.randomUUID(),
    workspaceId: "workspace_01...",
  });
} catch (error) {
  if (error instanceof AuthlessApiError) {
    console.error(error.code, error.status, error.correlationId);
  }
}
```

## Scope

This client transports typed REST requests and responses derived from the
versioned OpenAPI contract. It does not implement tenant authorization,
consent, confirmation, role or entitlement policy, workflow decisions,
interactive sign-in, token storage, or browser session handling. Those choices
remain with the integrating backend and the Authless API.
