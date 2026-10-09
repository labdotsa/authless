# Authless public developer repository

Source repository: https://github.com/labdotsa/authless/tree/master

Build an Authless integration with the server-only API client, browser and SvelteKit source references, or one of five runnable examples. Read the [developer readiness report](docs/developer-readiness.md) for package availability and current agent-access limits.

## Public paths

- `packages/api-client`: server-only client distribution and usage reference.
- `sdk-source/browser` and `sdk-source/sveltekit`: reviewed source references used by the examples.
- `examples/*`: direct OIDC, management agent, REST management, signed webhook, and hosted SvelteKit sign-in journeys.
- `schemas/authless.openapi.json`: public OpenAPI contract.
- `docs/machine-readable` and `docs/markdown`: checked English and Arabic documentation projections.
- `docs-mcp/stdio.js`: standalone read-only Docs MCP entrypoint; run it with Node.js 24+ or Bun over stdio.

Install with `bun install --frozen-lockfile`, then follow each example README. The generated Docs MCP has no network listener and requires no private workspace path.

The examples use placeholder hosts, synthetic credentials, or in-memory test boundaries. Keep secrets server-side.

The exported package metadata retains Authless's existing `UNLICENSED` terms. This export grants no new license.
