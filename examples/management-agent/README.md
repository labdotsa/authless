# Authless management agent

Run this example only against a local fixture or an explicitly configured
Authless deployment. It does not create a delegation automatically and does
not print private keys or access tokens.

```sh
bun install --frozen-lockfile
bun run check
bun run test
```

Generate the agent key once. The command writes a mode-0600 PKCS#8 private key
file and prints only the public JWKS. Give that JWKS to the human owner for
delegation registration. Do not generate a new key on each agent run.

```sh
AUTHLESS_AGENT_KEY_FILE=./agent-key.pem \
AUTHLESS_AGENT_KID=agent-prod-reader \
bun run ./src/agent.ts keygen > agent-public-jwks.json
```

## Contract

An owner first creates a delegation through the authenticated REST route
`POST /v1/workspaces/{workspaceId}/agent-delegations`. The owner must use a
recent platform session, send `confirmed: true`, register the agent public
JWKS, choose exactly one enabled scope, and bind one exact HTTPS resource:

```ts
const key = await loadRegisteredAgentKey({
  kid: "agent-prod-reader",
  path: "./agent-key.pem",
  publicJwks: await readPublicJwksFile("./agent-public-jwks.json"),
});
await createDelegation({
  agentClientId: "agent-prod-reader",
  apiBaseUrl: process.env.AUTHLESS_API_URL!,
  confirmed: true, // Human owner explicitly confirmed this delegation.
  publicJwks: key.publicJwks,
  resource: process.env.AUTHLESS_MANAGEMENT_MCP_RESOURCE!,
  scope: "workspace:read",
  sessionToken: process.env.AUTHLESS_SESSION_TOKEN!,
  workspaceId: process.env.AUTHLESS_WORKSPACE_ID!,
});
```

Store `key.privateKey` in a server secret manager. This example keeps it in
memory. Never put it in browser storage, logs, source control, or an MCP
request.

The agent sends `POST /management/oauth/token` with
`grant_type=client_credentials`, the standard JWT bearer assertion type,
`client_id`, the exact `/mcp` resource, and its one delegated scope. The
assertion uses `iss` and `sub` equal to the client ID, `aud` equal to the exact
token endpoint, a unique `jti`, `iat`, and an expiry no more than five minutes
away. The returned bearer token lasts at most ten minutes or until delegation
expiry. The example then sends JSON-RPC to `POST /mcp` with
`Authorization: Bearer ...`.

```sh
AUTHLESS_AGENT_CLIENT_ID=agent-prod-reader \
AUTHLESS_MANAGEMENT_OAUTH_ISSUER=https://sign.authle.ss/management \
AUTHLESS_MANAGEMENT_MCP_RESOURCE=https://api.authle.ss/mcp \
AUTHLESS_MANAGEMENT_SCOPE=workspace:read \
AUTHLESS_AGENT_KEY_FILE=./agent-key.pem \
AUTHLESS_AGENT_PUBLIC_JWKS_FILE=./agent-public-jwks.json \
AUTHLESS_AGENT_KID=agent-prod-reader \
bun run run
```

The deployment must set `MANAGEMENT_OAUTH_ISSUER` and
`MANAGEMENT_MCP_RESOURCE`. The management MCP server also requires its
terminal GA attestation callback to authorize. A missing or failed attestation
returns `401` with a resource metadata challenge. This is a deployment gate,
not an agent setting, and the example cannot bypass it.

This is delegated machine authority, not human sign-in. There is no device
grant, CLI browser login, refresh-token flow, or automatic privilege grant in
this example. Rotate or revoke the delegation through the owner REST workflow.
