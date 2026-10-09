# Authless hosted sign-in for SvelteKit

This standalone SvelteKit app shows the complete server-owned path: a shared expiring transaction store, callback exchange, app session projection, protected account page, and logout. The vendored private-evaluation package snapshots make the example reproducible before public package publication; replace the `file:` versions with released versions when available.

```sh
bun install --frozen-lockfile
bun run check
bun run build
bun run verify
```

`bun run verify` runs the SDK contract harness without contacting Authless. Its exact output is `SIGNED_IN protected_data_ok logout_ok revoked_access_denied`. `bun run build` compiles the SvelteKit routes. Use `bun run check` with the repository's pinned TypeScript and Vite toolchain.

Use only test endpoints and placeholder values. Register `https://app.example.test/auth/callback` exactly. Never put a client secret, DPoP private key, access token, refresh token, or ID token in browser code or checked-in files.
