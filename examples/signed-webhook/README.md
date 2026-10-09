# Authless signed webhook consumer

This standalone example verifies the untouched request body with the current or
overlapping signing secret before parsing, atomically claims an event ID,
ignores duplicate or stale resource versions, and reconciles a missed event
from an authoritative management API listing.

```sh
bun install --frozen-lockfile
bun run verify
```

The tests exercise invalid signatures, expired timestamps, duplicates,
out-of-order delivery, timeouts, schema evolution, secret rotation, and a
delivery gap. `MemoryWebhookState` makes the example deterministic; replace it
with one database transaction that claims `eventId` and writes the product
projection before returning 2xx. Keep the signing secrets in server-side secret
custody and never log the body, signature, or secrets.
