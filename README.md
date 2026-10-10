# Authless public developer repository

Source repository: https://github.com/labdotsa/authless/tree/master

Build an Authless integration with the server-only `@authless/server` SDK, the source-distributed `@authless/cli`, browser and SvelteKit source references, or one of five runnable examples. Read the [developer readiness report](docs/developer-readiness.md) for package availability and current agent-access limits.

## Public paths

- `packages/server`: server-only facade for trusted Node.js applications.
- `packages/cli`: source-distributed CLI with interactive PKCE login and delegated agent credentials.
- `sdk-source/browser` and `sdk-source/sveltekit`: reviewed source references used by the examples.
- `examples/*`: direct OIDC, management agent, REST management, signed webhook, and hosted SvelteKit sign-in journeys.
- `schemas/authless.openapi.json`: public OpenAPI contract.
- `docs/machine-readable` and `docs/markdown`: checked English and Arabic documentation projections.
- `docs-mcp/stdio.js`: standalone read-only Docs MCP entrypoint; run it with Node.js 24+ or Bun over stdio.

Install with `bun install --frozen-lockfile`, then follow each example README. The generated Docs MCP has no network listener and requires no private workspace path.

The examples use placeholder hosts, synthetic credentials, or in-memory test boundaries. Keep secrets server-side.

This public developer export is licensed under the MIT License. Copyright (c) 2026 LabDotSA. The private application repository remains proprietary and is not included.
