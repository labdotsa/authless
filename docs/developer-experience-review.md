# Developer experience review

This review records the final developer-facing structure in the public documentation work. It describes the repository changes and their verification boundaries; it does not claim that a hosted deployment is generally available.

## Route families

| Family | User problem | Implemented remedy | Verification boundary |
| --- | --- | --- | --- |
| Entry and orientation: `/`, `/start`, `/understand` | A new developer had to infer where evaluation ended and implementation began. | The public route spine gives the docs home, starting path, and concepts separate indexable routes with stable labels and aliases. | Route resolution and content projection tests validate declared routes, aliases, localized metadata, and section order. |
| Build guides: `/build`, `/build/sveltekit`, `/build/oidc`, `/build/rest`, `/build/webhooks` | Framework and protocol choices were mixed together, with long inline explanations obscuring the next action. | Build is a family with task-specific guides. Each guide leads with prerequisites, a runnable path, expected outcomes, failure handling, and links to the exact reference. | Focused guide checks validate section order, code sources, copy states, failure states, and bilingual/RTL rendering. The examples remain local or fixture-bound unless a guide says otherwise. |
| Verification and operations: `/test`, `/secure`, `/operate`, `/trust` | Testing, security responsibilities, operational recovery, and evidence were presented as one undifferentiated body of prose. | Each concern has its own destination and vocabulary. The pages explain the owner, the action, the negative path, and the evidence needed before promotion. | Content-system and page projection checks validate typed sections and localized headings. They do not certify an external deployment. |
| Reference and REST API: `/reference`, `/reference/rest` | SDK symbols, technical reference material, and a large API surface could be mistaken for one navigation layer. | `/reference` is the technical SDK/reference destination with guide navigation. `/reference/rest` is the separate API operation directory for the 70 operations, with API-only navigation and search, grouped endpoints, request/response details, failure metadata, and copyable examples. Guides link into the exact operation instead of duplicating the contract. | REST reference tests check operation projection, API search/navigation, table containment, horizontal scrolling, copy behavior, `If-Match`, failure semantics, and 320px/RTL layouts. OpenAPI remains the contract source. |
| Agent access: `/agents` | Agent authority could be confused with human sign-in, a CLI login, or an npm SDK. | The page separates owner delegation, persistent key generation, `private_key_jwt` exchange, exact resource/scope binding, MCP use, and limits. It labels the current OAuth/MCP path preview-only. | The example’s check/test/keygen/run commands and local protocol tests are the evidence boundary. Live OAuth may return `503 temporarily_unavailable`; a separately configured MCP deployment may return its GA attestation challenge. |
| Changes and machine access: `/changes`, `/llms.txt`, `/llms-full.txt`, `/machine-docs.json`, `/openapi.json` | Human pages, agent indexes, and contract exports could drift or imply capabilities that were not shipped. | Human routes link to bounded machine exports. The public developer repository carries the bundled read-only Docs MCP entrypoint at `node docs-mcp/stdio.js`. | Generator parity, corpus checks, and OpenAPI/reference projections detect drift. These exports are read-only and grant no tenant authority. |

## Interaction model

Code is presented as a task step with an identifiable filename or command, rather than as an unexplained block embedded in a paragraph. Syntax is highlighted, and copy uses a compact icon-only control with an accessible label and visible success, failure, unavailable, and busy states. The copy action keeps focus while an attempt is pending, and code panels own their bounded horizontal scroll region and remain keyboard-focusable.

File tabs in the SvelteKit guide use installed shadcn primitives. Their labels describe the task—Sign-in, Callback, Session, Protected page, and Logout—while the active panel exposes the full file path. The tabs scroll from the leading edge in both English and Arabic. Code and file panels use LTR direction where source syntax requires it, while surrounding navigation and status remain localized.

The same interaction rules apply to the REST guide’s TypeScript and raw HTTP examples. Production operations use a flat, ordered promotion checklist followed by evidence, retry, troubleshooting, closure, and degradation exercises; the checklist does not hide its required actions behind an inline disclosure. Tables preserve a bounded horizontal region rather than widening the page on narrow screens.

## Package and agent boundaries

The browser and SvelteKit helpers are source-only workspace packages in this revision. The Node API client is a prepared, prebuilt distribution but is not currently published to npm; install it from the public repository’s local package directory. The public agent path has no device grant, CLI browser login, or refresh-token flow.

The management-agent example generates a key once, writes a mode-0600 private key, emits public JWKS for owner registration, and reuses the registered key for assertions. The owner controls confirmation, exact scope, exact HTTPS resource, lifetime, rotation, and revocation. The agent never sends its private key to MCP.

The Docs MCP server is read-only. The public export runs `node docs-mcp/stdio.js`; the source workspace runs its corpus check before rebuilding. It has no authentication, tenant discovery, mutation, or network listener.

All public code links in this review target `https://github.com/labdotsa/authless`. Private workspace references under `labdotsa/authle.ss` are not public installation instructions.

## Verification limits

The changes surface is changelog-first, with compatibility presented as a flat tested list and machine feeds linked separately. The repository checks prove source consistency, generated-artifact parity, example behavior, accessibility states, localization, and responsive containment. They do not prove that production OAuth is configured, that management MCP has passed GA attestation, that an external provider is healthy, or that a tenant has been authorized.

The supported developer sequence is therefore:

1. Choose a route family from the docs spine.
2. Follow the guide’s local or fixture-bound runnable path.
3. Use the reference route and OpenAPI export for exact contract details.
4. Check the negative cases before connecting a permitted deployment.
5. Treat live availability and attestation as deployment evidence that must be supplied separately.
