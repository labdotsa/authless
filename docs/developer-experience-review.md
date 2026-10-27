# Developer experience review

This review describes the developer paths that the current source can support. It does not turn a local package, a machine export, or a healthy page into a claim that an external service is configured.

## Integration paths

| Path                          | Use it for                              | Current boundary                                                                                                                   |
| ----------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `@authless/server`            | Trusted Node.js 24 or newer server code | Source-distributed server client. Not published to npm.                                                                            |
| `@authless/cli`               | Scripts and agents                      | Source-distributed CLI. Mutations require explicit confirmation; native PKCE auth uses a loopback callback and Bun secure storage. |
| Direct OIDC                   | Interactive application sign-in         | The integrating application owns the callback session.                                                                             |
| Browser and SvelteKit helpers | PKCE and callback handling              | Source-only workspace packages with clean-room examples.                                                                           |
| Docs MCP                      | Local documentation search              | Read-only JSON-RPC over stdio. No tenant authority or network listener.                                                            |

All public clone and example links point to [`labdotsa/authless`](https://github.com/labdotsa/authless). The application source remains private and is not required for these public packages.

## Credentials and cookies

The platform session cookie is named `__Host-authless_session`. The `__Host-` prefix requires `Secure`, `Path=/`, and no `Domain` attribute in supporting browsers. That keeps the cookie host-only. An integrating application must issue its own session cookie, such as `__Host-app_session`, after the callback.

The API client accepts either a platform `sessionToken` or an app-scoped `appCredentialToken`. A delegated management agent uses a different short-lived OAuth bearer token. These credentials do not substitute for one another. The CLI and agent examples never scrape a browser cookie.

## API version policy

Operation paths are unversioned by default. The server pins each request to the supported contract version and returns the effective version in `authless-version`. Clients can select a version with `Authless-Version` or `api-version`. A conflicting or unsupported selector returns an error before route dispatch.

The API returns the effective version in `authless-version` and varies the response on that header. Contract changes follow the selected version policy and are recorded in the changelog.

## CLI and agent behavior

The CLI supports workspace and app lifecycle, environment lookup, membership invitation and status changes, access lookup, and audit listing. Mutations require explicit `--yes`, idempotency keys, and expected versions where required. It prints JSON on success and a redacted error record on failure. Native `auth login`, `auth refresh`, and `auth logout` use the owner-approved management OAuth flow and Bun secure storage. Omitting `--workspace` opens the workspace picker; passing a workspace binds the grant to that choice. `auth status` reports separate `managementOAuth` and `mcpOAuth` status strings (`configured` or `native-pkce`) without returning access tokens.

MCP is an explicit second audience. Use `auth login --resource https://api.authle.ss/mcp` before `mcp initialize`; use the same `--resource` with `auth refresh` and `auth logout`. The CLI stores that grant separately from the management grant and exposes only tools marked with the server's `annotations.readOnlyHint` flag. A management bearer must never be sent to `/mcp`.

The hosted user journey has separate browser continuity: an authenticated
Dashboard browser can continue to Sign without another email OTP. OAuth still
requires workspace selection and explicit consent. An unsigned browser uses
email sign-in. This is separate from CLI management OAuth, MCP OAuth, and
delegated agent authority.

Agents can run the CLI with a server-held credential. An agent that needs delegated authority follows the owner-created `private_key_jwt` flow in the management-agent example, with one workspace, one resource, and one enabled scope. Live management OAuth can remain unavailable with `503 temporarily_unavailable`; protected management MCP also requires its terminal GA attestation. The local Docs MCP is read-only and does not authenticate.

## Verification limits

The repository checks cover contract generation, typed client behavior, CLI parsing and redaction, local agent protocol behavior, machine export parity, and example fixtures. They do not prove npm publication, live management OAuth, or management MCP GA readiness. Those claims require external deployment evidence.

The documentation generator must produce the human pages, `llms.txt`, `llms-full.txt`, `machine-docs.json`, and REST projections from these sources. Do not hand-edit generated exports.
