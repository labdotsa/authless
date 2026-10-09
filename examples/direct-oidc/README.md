# Direct OIDC with Authless

This clean-room example uses `jose`, Web Crypto, and direct HTTP. It does not import an Authless SDK or framework helper.

```sh
bun install --frozen-lockfile
bun run check
bun run verify
```

The verifier exercises discovery, Authorization Code with S256 PKCE, ID-token validation, application-session creation, and all eleven documented negative cases. Success prints `OIDC_DIRECT_OK negatives=11 discovery=verified`.

Use `none` for a public client or `private_key_jwt` for a confidential backend. Both require PKCE and DPoP. mTLS is unavailable pending issue 0077 and must not be advertised or configured.
