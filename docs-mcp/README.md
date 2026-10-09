# Authless Docs MCP

Run `node docs-mcp/stdio.js` from the repository root. This is a read-only newline-delimited JSON-RPC server with a checked public corpus embedded in the bundled entrypoint. It has no network listener, authentication flow, tenant lookup, mutation tool, or live filesystem/network fetch.

`corpus.generated.json` is retained beside the bundle so reviewers can inspect the checked corpus and digest. The runtime serves the embedded copy, so a private workspace path is never required.
