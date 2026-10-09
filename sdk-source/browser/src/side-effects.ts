/**
 * One root adapter for optional browser storage and cancellable side effects.
 *
 * Optional storage is a cache and never an authority. Every key and value shape
 * is allowlisted, every payload is bounded by size and age, and every storage
 * failure is a cache miss. Mutations, downloads, and polls never read storage,
 * so a blocked, corrupt, or full store cannot stop authoritative API work.
 *
 * Callers own product state, the canonical resource scope, and
 * resource-specific policy. This module owns safe access, cancellation,
 * late-result rejection, cleanup, and busy-state release.
 */

export interface OptionalBrowserStorage {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

/** Every allowlisted cache key lives under this namespace. */
export const CACHE_KEY_PREFIX = "authless:cache:";
export const DEFAULT_CACHE_MAX_AGE_MS = 900_000;
export const DEFAULT_CACHE_MAX_BYTES = 2_048;

export type SafeStorageMissReason =
  | "absent"
  | "blocked"
  | "corrupt"
  | "oversized"
  | "quota"
  | "rejected"
  | "scope-mismatch"
  | "stale"
  | "unavailable";

export type SafeStorageResult<Value> =
  | { kind: "hit"; value: Value }
  | { kind: "miss"; reason: SafeStorageMissReason }
  | { kind: "stored" };

/**
 * Normalized name fragments that browser storage may never contain. The list is
 * a deny rule, so an unexpected name is refused rather than persisted; a
 * refusal is a cache miss, never a failure of the surrounding page.
 */
const PROHIBITED_NAME_FRAGMENTS = [
  "authorization",
  "bearer",
  "challenge",
  "code",
  "cookie",
  "credential",
  "nonce",
  "onetimecode",
  "otp",
  "passcode",
  "passphrase",
  "password",
  "privatekey",
  "recovery",
  "refresh",
  "secret",
  "session",
  "signature",
  "token",
  "verifier",
] as const;

/** Deeper payloads are refused rather than scanned, because a cache that cannot be proven safe is not cached. */
const MAX_VALUE_DEPTH = 8;

function normalizedName(name: string): string {
  return name.toLowerCase().replaceAll(/[^a-z0-9]/gu, "");
}

function namesProhibitedFragment(name: string): boolean {
  const normalized = normalizedName(name);
  return PROHIBITED_NAME_FRAGMENTS.some((fragment) =>
    normalized.includes(fragment),
  );
}

function namesProhibitedValue(value: unknown, depth = 0): boolean {
  if (depth > MAX_VALUE_DEPTH) return true;
  if (Array.isArray(value))
    return value.some((item) => namesProhibitedValue(item, depth + 1));
  if (typeof value !== "object" || value === null) return false;
  return Object.entries(value).some(
    ([name, nested]) =>
      namesProhibitedFragment(name) || namesProhibitedValue(nested, depth + 1),
  );
}

function cacheKeyName(name: string): string {
  if (
    !/^[a-z0-9][a-z0-9:._-]{0,95}$/iu.test(name) ||
    namesProhibitedFragment(name)
  ) {
    throw new TypeError(
      `Safe cache names are bounded and may not name a credential: ${name}`,
    );
  }
  return `${CACHE_KEY_PREFIX}${name}`;
}

function thrownName(cause: unknown): string {
  if (typeof cause !== "object" || cause === null) return "";
  const name = (cause as { name?: unknown }).name;
  return typeof name === "string" ? name : "";
}

function storageMissReason(cause: unknown): SafeStorageMissReason {
  const name = thrownName(cause);
  if (name === "QuotaExceededError" || name === "NS_ERROR_DOM_QUOTA_REACHED")
    return "quota";
  if (name === "RangeError") return "quota";
  return name ? "blocked" : "unavailable";
}

export type SafeStorageEntryDefinition<Value> = {
  maxAgeMs?: number;
  maxBytes?: number;
  name: string;
  /**
   * `local` entries belong to the current scope key, so changing the scope
   * drops them. `global` is a deliberate caller decision for continuity that is
   * intentionally shared across contexts, and it is still age bounded.
   */
  scope?: "global" | "local";
  validate: (value: unknown) => Value | null;
};

export interface SafeStorageEntry<Value> {
  readonly key: string;
  clear(): boolean;
  read(): SafeStorageResult<Value>;
  write(value: Value): SafeStorageResult<never>;
}

type CacheEnvelope = { recordedAt: number; scopeKey: string; value: unknown };

export type SideEffectFailureReason =
  | "invalid-response"
  | "rejected"
  | "response-unreadable"
  | "unavailable";

export type SideEffectStatus =
  | { announcement: "side-effect.idle"; kind: "idle"; scopeKey: string }
  | {
      announcement: "side-effect.busy";
      kind: "busy";
      operation: string;
      scopeKey: string;
      startedAt: number;
    }
  | {
      announcement: "side-effect.settled";
      kind: "settled";
      operation: string;
      scopeKey: string;
      endedAt: number;
    }
  | {
      announcement: "side-effect.failed";
      endedAt: number;
      focus: "operation";
      kind: "failed";
      operation: string;
      reason: SideEffectFailureReason;
      scopeKey: string;
    }
  | {
      announcement: "side-effect.recoverable";
      endedAt: number;
      focus: "operation";
      kind: "recoverable";
      operation: string;
      scopeKey: string;
    }
  | {
      announcement: "side-effect.cancelled";
      endedAt: number;
      kind: "cancelled";
      operation: string;
      scopeKey: string;
    };

export interface SideEffectState {
  busy: boolean;
  inFlight: readonly string[];
  scopeKey: string;
  status: SideEffectStatus;
}

/**
 * The value an effect reports. `unreadable` is the recoverable case where the
 * server already applied the side effect but its response body could not be
 * read; the adapter never repeats such an effect by itself. `failed` is a known
 * refusal, which is not applied and may be corrected by the person.
 */
export type SideEffectAttempt<Value> =
  | { kind: "settled"; value: Value }
  | {
      kind: "failed";
      outcome: "not-applied" | "unknown";
      reason: SideEffectFailureReason;
    }
  | { kind: "unreadable"; applied: boolean };

export type SideEffectResult<Value> =
  | { kind: "success"; value: Value }
  | { kind: "recoverable"; recovery: "refetch"; reason: "response-unreadable" }
  | {
      kind: "failure";
      outcome: "not-applied" | "unknown";
      reason: SideEffectFailureReason;
    }
  | {
      kind: "cancelled";
      reason: "aborted" | "disposed" | "scope-changed";
    }
  | { kind: "superseded" };

export type SideEffectEffect<Value> = (
  signal: AbortSignal,
) => Promise<SideEffectAttempt<Value>>;

export type DownloadResult =
  | { filename: string; kind: "saved"; size: number }
  | Exclude<SideEffectResult<never>, { kind: "success" }>;

export type SideEffectFetcher = (
  url: string,
  init?: RequestInit,
) => Promise<Response>;

export interface SideEffectScheduler {
  clear(id: unknown): void;
  schedule(run: () => void, delayMs: number): unknown;
}

/** Owns the temporary URL a download needs, including releasing it. */
export interface ObjectUrlStore {
  create(blob: Blob): string;
  release(url: string): void;
  save(url: string, filename: string): void;
}

const browserScheduler: SideEffectScheduler = {
  clear: (id) => clearTimeout(id as ReturnType<typeof setTimeout>),
  schedule: (run, delayMs) => setTimeout(run, delayMs),
};

export interface SideEffectAdapter {
  cache<Value>(
    definition: SafeStorageEntryDefinition<Value>,
  ): SafeStorageEntry<Value>;
  cancel(name: string): boolean;
  dispose(): void;
  download(
    name: string,
    request: { filename: string; request: SideEffectRequest },
  ): Promise<DownloadResult>;
  poll<Value>(
    name: string,
    input: {
      delay: (attempt: number) => number;
      effect: (
        signal: AbortSignal,
        attempt: number,
      ) => Promise<SideEffectAttempt<{ continue: boolean; value: Value }>>;
      onValue?: (value: Value, attempt: number) => void;
    },
  ): void;
  readonly state: SideEffectState;
  resetCache(): number;
  run<Value>(
    name: string,
    effect: SideEffectEffect<Value>,
  ): Promise<SideEffectResult<Value>>;
  setScopeKey(scopeKey: string): void;
  subscribe(listener: (state: SideEffectState) => void): () => void;
}

export type SideEffectRequest = {
  init?: RequestInit;
  url: string;
};

function browserObjectUrlStore(): ObjectUrlStore | undefined {
  if (typeof URL === "undefined" || typeof URL.createObjectURL !== "function")
    return undefined;
  if (typeof document === "undefined") return undefined;
  return {
    create: (blob) => URL.createObjectURL(blob),
    release: (url) => URL.revokeObjectURL(url),
    save: (url, filename) => {
      const anchor = document.createElement("a");
      anchor.download = filename;
      anchor.href = url;
      anchor.rel = "noopener";
      document.body.append(anchor);
      try {
        anchor.click();
      } finally {
        anchor.remove();
      }
    },
  };
}

async function consumeFailureBody(response: Response): Promise<void> {
  try {
    if (response.body) await response.body.cancel();
    else await response.arrayBuffer();
  } catch {
    /* A body that cannot be released is not a second failure to report. */
  }
}

class AbortError extends Error {
  constructor() {
    super("The side effect was cancelled before it completed");
    this.name = "AbortError";
  }
}

export function createBrowserSideEffectAdapter(input: {
  fetcher?: SideEffectFetcher;
  now?: () => number;
  objectUrls?: ObjectUrlStore;
  scheduler?: SideEffectScheduler;
  scopeKey: string;
  storage?: OptionalBrowserStorage;
}): SideEffectAdapter {
  if (typeof input.scopeKey !== "string" || input.scopeKey.length === 0)
    throw new TypeError("A stable scope key is required");
  const fetcher = input.fetcher;
  const now = input.now ?? (() => Date.now());
  const objectUrls = input.objectUrls;
  const scheduler = input.scheduler ?? browserScheduler;
  const storage = input.storage;
  const entries = new Set<string>();
  const listeners = new Set<(state: SideEffectState) => void>();
  const inFlight = new Set<TrackedOperation>();
  const pollers = new Map<string, { attempt: number; timer: unknown }>();
  let scopeKey = input.scopeKey;
  let status: SideEffectStatus = {
    announcement: "side-effect.idle",
    kind: "idle",
    scopeKey,
  };
  let disposed = false;

  function publish(
    announcement: Exclude<SideEffectStatus["announcement"], "side-effect.idle">,
    operation: string,
    operationScopeKey: string,
    at: number,
    reason?: SideEffectFailureReason,
  ): void {
    const shared = {
      ...(reason ? { reason } : {}),
      operation,
      scopeKey: operationScopeKey,
    };
    status =
      announcement === "side-effect.busy"
        ? { ...shared, announcement, kind: "busy", startedAt: at }
        : announcement === "side-effect.settled"
          ? { ...shared, announcement, endedAt: at, kind: "settled" }
          : announcement === "side-effect.cancelled"
            ? { ...shared, announcement, endedAt: at, kind: "cancelled" }
            : announcement === "side-effect.recoverable"
              ? {
                  ...shared,
                  announcement,
                  endedAt: at,
                  focus: "operation",
                  kind: "recoverable",
                }
              : {
                  ...shared,
                  announcement,
                  endedAt: at,
                  focus: "operation",
                  kind: "failed",
                  reason: reason ?? "invalid-response",
                };
    for (const listener of [...listeners]) listener(currentState());
  }

  function publishIdle(next: string): void {
    status = { announcement: "side-effect.idle", kind: "idle", scopeKey: next };
    for (const listener of [...listeners]) listener(currentState());
  }

  function currentState(): SideEffectState {
    return {
      busy: [...inFlight].some((operation) => operation.foreground),
      inFlight: [...inFlight].map((operation) => operation.name),
      scopeKey,
      status,
    };
  }

  function readRaw(key: string): SafeStorageResult<string> {
    if (!storage) return { kind: "miss", reason: "unavailable" };
    try {
      const raw = storage.getItem(key);
      return raw === null
        ? { kind: "miss", reason: "absent" }
        : { kind: "hit", value: raw };
    } catch (cause) {
      return { kind: "miss", reason: storageMissReason(cause) };
    }
  }

  function removeRaw(key: string): boolean {
    if (!storage) return false;
    try {
      storage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  function cache<Value>(
    definition: SafeStorageEntryDefinition<Value>,
  ): SafeStorageEntry<Value> {
    const key = cacheKeyName(definition.name);
    const entryScope = definition.scope ?? "local";
    const maxAgeMs = definition.maxAgeMs ?? DEFAULT_CACHE_MAX_AGE_MS;
    const maxBytes = definition.maxBytes ?? DEFAULT_CACHE_MAX_BYTES;
    if (!Number.isFinite(maxAgeMs) || maxAgeMs <= 0)
      throw new TypeError("Cache maxAgeMs must be a positive number");
    if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0)
      throw new TypeError("Cache maxBytes must be a positive integer");
    if (entries.has(key))
      throw new TypeError(`Cache key is already registered: ${key}`);
    entries.add(key);

    return {
      key,
      clear: () => removeRaw(key),
      read() {
        const raw = readRaw(key);
        if (raw.kind !== "hit") return raw;
        if (raw.value.length > maxBytes)
          return { kind: "miss", reason: "oversized" };
        let envelope: CacheEnvelope;
        try {
          const parsed: unknown = JSON.parse(raw.value);
          if (
            typeof parsed !== "object" ||
            parsed === null ||
            Object.keys(parsed).sort().join(",") !==
              "recordedAt,scopeKey,value" ||
            !Number.isSafeInteger((parsed as CacheEnvelope).recordedAt) ||
            typeof (parsed as CacheEnvelope).scopeKey !== "string"
          )
            return { kind: "miss", reason: "corrupt" };
          envelope = parsed as CacheEnvelope;
        } catch {
          return { kind: "miss", reason: "corrupt" };
        }
        const age = now() - envelope.recordedAt;
        if (age < 0) return { kind: "miss", reason: "corrupt" };
        if (age > maxAgeMs) {
          removeRaw(key);
          return { kind: "miss", reason: "stale" };
        }
        if (entryScope === "local" && envelope.scopeKey !== scopeKey) {
          removeRaw(key);
          return { kind: "miss", reason: "scope-mismatch" };
        }
        if (namesProhibitedValue(envelope.value))
          return { kind: "miss", reason: "rejected" };
        const value = definition.validate(envelope.value);
        return value === null
          ? { kind: "miss", reason: "rejected" }
          : { kind: "hit", value };
      },
      write(value) {
        if (namesProhibitedValue(value))
          return { kind: "miss", reason: "rejected" };
        if (definition.validate(value) === null)
          return { kind: "miss", reason: "rejected" };
        const recordedAt = now();
        let raw: string;
        try {
          raw = JSON.stringify({ recordedAt, scopeKey, value });
        } catch {
          return { kind: "miss", reason: "rejected" };
        }
        if (raw.length > maxBytes) return { kind: "miss", reason: "oversized" };
        if (!storage) return { kind: "miss", reason: "unavailable" };
        try {
          storage.setItem(key, raw);
          return { kind: "stored" };
        } catch (cause) {
          return { kind: "miss", reason: storageMissReason(cause) };
        }
      },
    };
  }

  function stopPolling(name: string): void {
    const pending = pollers.get(name);
    if (!pending) return;
    pollers.delete(name);
    if (pending.timer !== undefined) scheduler.clear(pending.timer);
  }

  function stopAllPolling(): void {
    for (const name of [...pollers.keys()]) stopPolling(name);
  }

  function begin(name: string, background: boolean): TrackedOperation {
    const previous = [...inFlight].find((operation) => operation.name === name);
    if (previous) retire(previous, "superseded");
    const tracked: TrackedOperation = {
      abortController: new AbortController(),
      foreground: !background,
      name,
      retired: false,
      scopeKey,
      startedAt: now(),
    };
    inFlight.add(tracked);
    return tracked;
  }

  function retire(
    operation: TrackedOperation,
    outcome: "aborted" | "disposed" | "scope-changed" | "superseded",
  ): SideEffectResult<never> {
    if (operation.retired) {
      const retiredAs = operation.retiredAs ?? outcome;
      return retiredAs === "superseded"
        ? { kind: "superseded" }
        : { kind: "cancelled", reason: retiredAs };
    }
    operation.retired = true;
    operation.retiredAs = outcome;
    inFlight.delete(operation);
    if (operation.abortController.signal.aborted === false)
      operation.abortController.abort();
    publish("side-effect.cancelled", operation.name, operation.scopeKey, now());
    return outcome === "superseded"
      ? { kind: "superseded" }
      : { kind: "cancelled", reason: outcome };
  }

  function cancelAll(outcome: "disposed" | "scope-changed"): void {
    for (const operation of [...inFlight]) retire(operation, outcome);
  }

  async function execute<Value>(
    name: string,
    effect: SideEffectEffect<Value>,
    options: { background: boolean },
  ): Promise<SideEffectResult<Value>> {
    if (disposed) return { kind: "cancelled", reason: "disposed" };
    const tracked = begin(name, options.background);
    if (!options.background)
      publish("side-effect.busy", name, tracked.scopeKey, tracked.startedAt);
    try {
      const attempt = await effect(tracked.abortController.signal);
      if (tracked.retired) return retire(tracked, "aborted");
      inFlight.delete(tracked);
      if (attempt.kind === "unreadable") {
        if (attempt.applied) {
          if (!options.background)
            publish("side-effect.recoverable", name, tracked.scopeKey, now());
          return {
            kind: "recoverable",
            recovery: "refetch",
            reason: "response-unreadable",
          };
        }
        if (!options.background)
          publish(
            "side-effect.failed",
            name,
            tracked.scopeKey,
            now(),
            "response-unreadable",
          );
        return {
          kind: "failure",
          outcome: "not-applied",
          reason: "response-unreadable",
        };
      }
      if (attempt.kind === "failed") {
        publish(
          "side-effect.failed",
          name,
          tracked.scopeKey,
          now(),
          attempt.reason,
        );
        return {
          kind: "failure",
          outcome: attempt.outcome,
          reason: attempt.reason,
        };
      }
      if (!options.background)
        publish("side-effect.settled", name, tracked.scopeKey, now());
      return { kind: "success", value: attempt.value };
    } catch {
      if (tracked.retired) return retire(tracked, "aborted");
      inFlight.delete(tracked);
      if (tracked.abortController.signal.aborted) {
        publish("side-effect.cancelled", name, tracked.scopeKey, now());
        return { kind: "cancelled", reason: "aborted" };
      }
      publish(
        "side-effect.failed",
        name,
        tracked.scopeKey,
        now(),
        "unavailable",
      );
      return { kind: "failure", outcome: "unknown", reason: "unavailable" };
    } finally {
      if (inFlight.has(tracked)) {
        inFlight.delete(tracked);
        if (!tracked.retired)
          publish(
            "side-effect.cancelled",
            tracked.name,
            tracked.scopeKey,
            now(),
          );
      }
    }
  }

  return {
    cache,
    cancel(name) {
      const operation = [...inFlight].find((entry) => entry.name === name);
      if (!operation) return false;
      retire(operation, "aborted");
      return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      stopAllPolling();
      cancelAll("disposed");
      listeners.clear();
    },
    async download(name, request) {
      const store = objectUrls ?? browserObjectUrlStore();
      if (!store || !fetcher) {
        publish("side-effect.failed", name, scopeKey, now(), "unavailable");
        return {
          kind: "failure",
          outcome: "not-applied",
          reason: "unavailable",
        } as const;
      }
      const result = await execute<{ filename: string; size: number }>(
        name,
        async (signal) => {
          const response = await fetcher(request.request.url, {
            ...request.request.init,
            signal,
          });
          if (signal.aborted) throw new AbortError();
          if (!response.ok) {
            await consumeFailureBody(response);
            return response.status >= 500 || response.status === 429
              ? ({
                  kind: "failed",
                  outcome: "unknown",
                  reason: "unavailable",
                } as const)
              : ({
                  kind: "failed",
                  outcome: "not-applied",
                  reason: "rejected",
                } as const);
          }
          let content: Blob;
          try {
            content = await response.blob();
          } catch {
            return { kind: "unreadable", applied: false } as const;
          }
          if (signal.aborted) throw new AbortError();
          let url: string | undefined;
          try {
            url = store.create(content);
            store.save(url, request.filename);
          } catch {
            return {
              kind: "failed",
              outcome: "not-applied",
              reason: "unavailable",
            } as const;
          } finally {
            if (url !== undefined) store.release(url);
          }
          return {
            kind: "settled",
            value: { filename: request.filename, size: content.size },
          } as const;
        },
        { background: false },
      );
      if (result.kind !== "success") return result;
      return {
        filename: result.value.filename,
        kind: "saved",
        size: result.value.size,
      };
    },
    poll(name, poller) {
      stopPolling(name);
      if (disposed) return;
      const pending = { attempt: 0, timer: undefined as unknown };
      pollers.set(name, pending);

      const tick = async () => {
        const result = await execute(
          name,
          (signal) => poller.effect(signal, pending.attempt),
          { background: true },
        );
        if (result.kind !== "success") return;
        if (result.value.continue) {
          poller.onValue?.(result.value.value, pending.attempt);
          pending.attempt += 1;
          schedule();
        } else {
          poller.onValue?.(result.value.value, pending.attempt);
          stopPolling(name);
        }
      };

      const schedule = () => {
        pending.timer = scheduler.schedule(
          () => void tick(),
          poller.delay(pending.attempt),
        );
      };
      schedule();
    },
    get state() {
      return currentState();
    },
    resetCache() {
      let cleared = 0;
      for (const key of entries) if (removeRaw(key)) cleared += 1;
      return cleared;
    },
    async run(name, effect) {
      return execute(name, effect, { background: false });
    },
    setScopeKey(next) {
      if (next === scopeKey) return;
      stopAllPolling();
      cancelAll("scope-changed");
      scopeKey = next;
      publishIdle(scopeKey);
    },
    subscribe(listener) {
      if (disposed) return () => undefined;
      listeners.add(listener);
      listener(currentState());
      return () => listeners.delete(listener);
    },
  };
}

type TrackedOperation = {
  abortController: AbortController;
  foreground: boolean;
  name: string;
  retired: boolean;
  retiredAs?: "aborted" | "disposed" | "scope-changed" | "superseded";
  scopeKey: string;
  startedAt: number;
};
