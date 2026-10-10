# Developer readiness

Authless exposes these developer paths in this revision:

- `@authless/server` is the server-facing facade.
- `@authless/cli` is a source-distributed command-line client for scripts and agents.
- Direct OIDC, the browser helper, and the SvelteKit helper cover interactive application sign-in.

The server and CLI packages are available from the public developer repository. They are not published to the npm registry in this revision. Install them from a clean clone of [`labdotsa/authless`](https://github.com/labdotsa/authless). The application repository, `Alja7dali/authle.ss`, remains private.

## Install the server client

Use `@authless/server` from trusted Node.js 24 or newer server code.

```sh
git clone https://github.com/labdotsa/authless.git
cd authless
bun install --frozen-lockfile
```

The public repository includes the checked `dist` artifacts, so this path does
not run package build scripts. The private application workspace may build the
packages from source as part of its own development workflow.

```ts
import { createAuthlessServerClient } from "@authless/server";

const authless = createAuthlessServerClient({
  baseUrl: process.env.AUTHLESS_API_URL ?? "https://api.authle.ss",
  sessionToken: process.env.AUTHLESS_SESSION_TOKEN!,
});

const workspaces = await authless.workspaces.list({
  correlationId: crypto.randomUUID(),
  limit: 25,
});
```

The server client owns the REST transport and resource clients. It does not add interactive sign-in, session storage, tenant policy, or agent OAuth. Keep exactly one `sessionToken` or `appCredentialToken` in a server-side secret boundary.

The client sends the platform session as `__Host-authless_session` when you select `sessionToken`. The `__Host-` prefix is a browser security rule. Supporting browsers require `Secure`, `Path=/`, and no `Domain`, so a sibling subdomain cannot set the same cookie for a wider domain. Your application session is separate. Use a different name such as `__Host-app_session` after the OIDC callback.

An app credential is a different authority from a platform session and from a delegated OAuth token. Do not copy a browser cookie into an agent or CLI process.

## Use the CLI

`@authless/cli` is source-distributed. Native management Authorization Code
with S256 PKCE uses a loopback callback and Bun secure secret storage. The
stored grant is separate from environment credentials and is never printed or
written to a project configuration file.

```sh
git clone https://github.com/labdotsa/authless.git
cd authless
bun install --frozen-lockfile

AUTHLESS_API_URL=https://api.authle.ss \
AUTHLESS_SESSION_TOKEN="$AUTHLESS_SESSION_TOKEN" \
  packages/cli/dist/cli.js workspaces list
```

Native OAuth with the `workspace:read` grant supports only `workspaces list`
and `workspaces get`. `AUTHLESS_SESSION_TOKEN` supports the remaining
platform-session commands. `AUTHLESS_APP_CREDENTIAL` is limited to app
membership and access commands. Set exactly one environment credential for
token-based commands. Pass credentials through a secret manager, never through
command-line arguments. For an interactive operator flow, run `auth login`,
omit `--workspace` to use the browser workspace picker or pass one workspace
explicitly, then use `auth status`, `auth refresh`, and `auth logout` as needed.
`auth status` reports separate `managementOAuth` and `mcpOAuth` status strings
(`configured` or `native-pkce`) so an operator can see which audience is
configured without exposing access tokens.
The CLI never extracts browser cookies.

MCP uses a separate audience and secure-store entry. Sign in for that audience
explicitly, then initialize the read-only CLI MCP surface:

```sh
packages/cli/dist/cli.js auth login --resource https://api.authle.ss/mcp
packages/cli/dist/cli.js auth refresh --resource https://api.authle.ss/mcp
packages/cli/dist/cli.js mcp initialize
packages/cli/dist/cli.js mcp tools
packages/cli/dist/cli.js mcp resources
packages/cli/dist/cli.js mcp read --uri authless://management/catalog
packages/cli/dist/cli.js auth logout --resource https://api.authle.ss/mcp
```

The management API grant and MCP grant are never interchangeable. The CLI
allows only MCP tools marked by the server with the
`annotations.readOnlyHint` flag; mutations stay on the authenticated REST
command path and require their own credential and confirmation.

Supported commands cover workspace and app lifecycle, environment lookup, membership invitation and status changes, access lookup, and audit listing. Mutations require explicit `--yes`, use idempotency keys, and require expected versions where the contract does. `auth login`, `auth refresh`, and `auth logout` manage the native grant. Agent processes use the separate owner-created delegation flow.

## Version the API for long-lived clients

The default contract is unversioned. Use `/workspaces` and other operation paths directly; the server pins the request to the supported contract version and returns it in `authless-version`.

You can select the version with either the `Authless-Version` header or the `api-version` query parameter. Use one selector. If selectors disagree or are unsupported, the API returns an error before dispatch.

```sh
curl --request GET \
  -H "Authless-Version: 1" \
  -H "cookie: __Host-authless_session={platform_session}" \
  "https://api.authle.ss/workspaces"
```

Health, well-known, and MCP routes do not use API version negotiation. Contract changes are released through the selected version policy and appear in the changelog.

## Interactive sign-in and agents

Use Authorization Code with PKCE for a user signing in to an application. The browser and SvelteKit helpers never identify a visitor or create a session during module import. Your server exchanges the callback and creates the application-owned session.

Agents do not sign in as a human. An owner creates a bounded delegation for
one workspace and one resource, registers the public JWKS, and allows a machine
to use `private_key_jwt` with short-lived client credentials. The local
management-agent example documents that protocol. Its bearer targets the exact
`https://api.authle.ss/mcp` audience and is sent only to `/mcp`; it is separate
from the CLI's human management grant. Live management OAuth can return `503
temporarily_unavailable` while its deployment is unconfigured. The protected
management MCP deployment also needs its terminal GA attestation. The
read-only Docs MCP does not authenticate or access tenant data.

## Verification boundary

Run package and example checks with disposable or in-memory fixtures. Never use production credentials or a hosted production database for rehearsal. Regenerate machine exports through the repository scripts and fail on digest drift.

The current revision proves source behavior, contract projections, package checks, CLI tests, and local agent protocol tests. It does not claim npm publication, live management OAuth, or a management MCP GA deployment until those external services pass their own checks.

## Personal export limits and expiry

Personal exports are bounded before serialization. The service includes at most
1,000 activity events and 500 app connections in one export, and refuses an
export whose serialized UTF-8 content exceeds 1,000,000 bytes. The request
finishes in the terminal `export_too_large` state when a limit is exceeded.
The worker never silently drops rows or retries this terminal result.

Ready exports expire after 24 hours. Scheduled personal-data runs delete
expired ciphertext in bounded batches and clear the request's object metadata.
Cleanup is retry-safe and does not expose export content.
