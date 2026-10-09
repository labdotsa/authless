# Public export validation

The export is intended for a clean clone with Bun 1.3.10 or Node.js 24+. Validation performed before publication:

- `bun install --frozen-lockfile`
- direct OIDC: `bun run --cwd examples/direct-oidc check`, `bun run --cwd examples/direct-oidc verify`
- management agent: `bun run --cwd examples/management-agent check`, `bun run --cwd examples/management-agent test`
- REST management: `bun run --cwd examples/rest-management-api verify`
- signed webhook: `bun run --cwd examples/signed-webhook verify`
- hosted SvelteKit sign-in: `bun run --cwd examples/sveltekit-hosted-sign-in check`, `build`, `verify`

Checks use synthetic credentials and disposable in-memory boundaries. They do not contact hosted databases or publish credentials. The SvelteKit and signed-webhook example type checks use `skipLibCheck` for ambient dependency declarations; application code remains checked. Existing package metadata retains `UNLICENSED`; this export grants no new license.
