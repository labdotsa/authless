# @authless/cli

`@authless/cli` is the source-distributed command-line client for Authless
management work. The public repository includes its checked `dist` entrypoint.

## Run from the public repository

```sh
git clone https://github.com/labdotsa/authless.git
cd authless
bun install --frozen-lockfile
AUTHLESS_API_URL=https://api.authle.ss \
AUTHLESS_SESSION_TOKEN="$AUTHLESS_SESSION_TOKEN" \
  packages/cli/dist/cli.js workspaces list
```

For an interactive operator session, use `auth login` followed by
`auth refresh` or `auth logout`. The login flow uses loopback PKCE and
Bun secure storage. The `workspace:read` grant supports only
`workspaces list` and `workspaces get`.

An authenticated Dashboard browser can continue to Sign without another email
OTP. OAuth still requires workspace selection and explicit consent; unsigned
browsers use email sign-in.

Use `AUTHLESS_SESSION_TOKEN` for the remaining platform-session commands or
`AUTHLESS_APP_CREDENTIAL` for app membership, access, and contract-authorized
app-commerce commands. Personal app subscriptions and invoices belong to the
signed-in profile. App catalogs, plans, features, add-ons, customers, and
environment commerce belong to the developer workspace. Authless billing is
the workspace owner's platform billing and is separate from app subscriptions.
The CLI MCP buyer surface is excluded. MCP `call` remains read-only; delegated
commerce and billing writes use explicit preview and confirmed apply commands.
Agents should use a delegated token or app credential from their secret manager.
The CLI never extracts browser cookies. Supported mutations require explicit
`--yes` and preserve idempotency and expected-version checks.
