# `@authless/server`

Server-only TypeScript client for Authless management REST APIs. The package
owns the typed transport, generated wire types, resource clients, retries, and
authority checks. It does not implement browser authorization, application
session storage, agent OAuth, tenant policy, or a CLI.

```ts
import { createAuthlessServerClient } from "@authless/server";

const authless = createAuthlessServerClient({
  baseUrl: process.env.AUTHLESS_API_URL!,
  sessionToken: process.env.AUTHLESS_SESSION_TOKEN!,
});

const workspaces = await authless.workspaces.list({
  correlationId: crypto.randomUUID(),
  limit: 25,
});
```

Use Node.js 24 or newer. Configure exactly one server-side `sessionToken`,
`appCredentialToken`, or `managementAccessToken`. The management access token
is the bearer credential issued by the management OAuth flow for unattended
agents and automation. Keep credentials out of browser bundles, browser
storage, logs, and client-visible responses.

The package declares `browser: false` and provides an explicit `browser`
export that throws during module evaluation. This prevents a browser build
from silently producing an empty or partially working module. Move this import
to server code. Use `@authless/browser` for browser authorization.

## Platform session cookie

When `sessionToken` is selected, the transport sends the production platform
session as `__Host-authless_session`. The `__Host-` prefix requires Secure,
Path=/, and no Domain attribute in supporting browsers. That stops a sibling
subdomain from setting a wider-domain cookie with the same name. Your app's
own session cookie should have a different name, such as `__Host-app_session`.

## Agent and OAuth boundary

Unattended agents use the separate management-agent flow. An owner registers a
public JWKS and exact resource and scope. The agent exchanges a short-lived
`private_key_jwt` at the management OAuth token endpoint. There is no device
grant, browser login, refresh-token flow, or automatic privilege grant.

There is no published Authless CLI in this package. Use the documented CLI
package separately for terminal workflows. The CLI keeps personal profile
subscriptions, developer app and environment commerce, and Authless workspace
billing in separate command authorities. Use the documented management-agent
example for delegated machine authority and the OIDC flow for interactive
application sign-in.

App credentials can access app-commerce operations only when the API contract
grants the requested app, workspace, and environment. They cannot access the
buyer's profile subscriptions or Authless workspace billing. Workspace-owner
authority remains required for Authless billing.

## Requests and errors

Mutations require caller-generated idempotency keys and version preconditions
where the contract marks them. Safe operations may retry within the configured
attempt limit. Unsafe operations and HTTP 429 responses return immediately.
Failures use `AuthlessApiError` with a stable code, status, correlation ID,
and retry safety. The client never includes credentials in error messages.
