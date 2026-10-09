# Developer readiness

This repository publishes a checked REST contract and source distributions.
The API client is prepared for publication but is not currently available from
the npm registry. The remaining integration helpers and the documentation MCP
server are repository sources or examples.

## What can be installed

`@authless/api-client` is the prepared, unpublished Node.js 24 or newer
package. It is a server-only TypeScript client for the management REST API. Its wire contract is
the generated OpenAPI document in `packages/contracts/openapi/`, projected to
the public REST reference and client types by the repository checks.

```sh
git clone https://github.com/labdotsa/authless.git
cd authless
mkdir api-client-check
cd api-client-check
npm init -y
npm install ../packages/api-client
```

Keep either `sessionToken` or `appCredentialToken` in a trusted server secret
boundary. The client does not perform interactive sign-in, store browser
tokens, authorize product data, or decide confirmation and role policy.

## What is source-only

`@authless/browser` and `@authless/sveltekit` are private workspace packages.
The SvelteKit example uses local vendor snapshots and can be verified without
contacting Authless:

```sh
cd examples/sveltekit-hosted-sign-in
bun install --frozen-lockfile
bun run check
bun run build
bun run verify
```

Direct OIDC is the supported SDK-free path. The standalone example uses
`jose`, Web Crypto, discovery, S256 PKCE, ID-token validation, and DPoP. The
REST and signed-webhook examples are clean-room examples; their README files
state their verification commands and fixture boundaries.

## Agent and automation access

The public developer repository includes a bundled Docs MCP server. From its
repository root, run `node docs-mcp/stdio.js`. It exposes read-only
documentation search and lookup over newline-delimited JSON-RPC. It does not
authenticate, discover tenants, exchange credentials, mutate resources, or
listen on a network port. The source workspace additionally runs
`bun run docs:mcp:check` before rebuilding the bundle.

The machine-readable documentation exports are the stable read-only agent
alternative:

- `https://docs.authle.ss/llms.txt` for a short index.
- `https://docs.authle.ss/llms-full.txt` for the reviewed public corpus.
- `https://docs.authle.ss/machine-docs.json` for locale, URL, digest, stage, and update metadata.
- `https://docs.authle.ss/openapi.json` for the HTTP contract.

The management-agent example and management MCP integration are preview-only
in this revision. The live management OAuth discovery and token endpoints may
return `503 temporarily_unavailable` while that deployment is unconfigured.
If OAuth is available, the protected MCP deployment separately requires a
terminal GA attestation callback; when that callback is unavailable, MCP
returns its attestation challenge and grants no access. Use the checked local
fixture for protocol work.
Generate the agent key once, persist the mode-0600 private key in server
custody, register only the public JWKS with the owner delegation, and reuse the
same key file for token assertions. Do not generate a new key on every run.

No published Authless CLI or device-flow package exists in this revision. Use
the documented REST, OIDC, webhook, or local SvelteKit paths instead of
guessing a command or capability.

## Verification boundary

Run example checks with disposable or in-memory fixtures as their README files
specify. Never use production credentials or a hosted production database for
rehearsals. Treat machine exports and the MCP corpus as checked build artifacts:
regenerate them through repository scripts and fail on digest drift.
