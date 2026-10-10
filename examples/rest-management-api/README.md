# Authless REST management guide

This clean-room verifier uses the server-only `@authless/server` client against an isolated in-memory test tenant. It invites, locates, pages, reads, and version-guards cleanup of one test membership, then diagnoses an intentional authority failure.

The credential is synthetic and process-local. In a real environment, inject a dedicated test-app credential from an approved server-side secret store, redact it everywhere, rotate it, and revoke it after cleanup.

The repository test copies this directory into a new temporary directory, installs only the packed public server artifact, and runs `bun run verify`.
