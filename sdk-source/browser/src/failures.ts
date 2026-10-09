import {
  type ApiFailureAction,
  type ApiFailureClassification,
  type ApiFailureKind,
  classifyApiFailure,
  correlationIdPattern,
  readApiErrorCode,
} from "@authless/contracts";

export type FailureKind = ApiFailureKind;
export type PrimaryFailureAction = ApiFailureAction;

type FailureBase = {
  kind: FailureKind;
  action: PrimaryFailureAction;
  /** A bounded opaque reference that is safe to give support. */
  supportReference?: string;
};

export type BrowserFailure =
  | (FailureBase & { kind: "session"; action: "sign-in" })
  | (FailureBase & { kind: "permission"; action: "switch-context" | "return" })
  | (FailureBase & { kind: "fresh-auth"; action: "reauthenticate" })
  | (FailureBase & { kind: "missing"; action: "return" })
  | (FailureBase & { kind: "conflict"; action: "retry"; preserveEdits: true })
  | (FailureBase & {
      kind: "validation";
      action: "return";
      fieldErrors?: Readonly<Record<string, string>>;
    })
  | (FailureBase & {
      kind: "rate-limit";
      action: "retry";
      retryAt: number;
    })
  | (FailureBase & {
      kind: "network";
      action: "inspect-status";
      outcome: "unknown";
    })
  | (FailureBase & {
      kind: "provider";
      action: "contact-support" | "inspect-status";
      outcome: "unknown" | "not-applied";
    })
  | (FailureBase & {
      kind: "unavailable";
      action: "inspect-status";
      outcome: "unknown";
    });

export type BrowserResult<Value> =
  | { ok: true; value: Value }
  | { ok: false; failure: BrowserFailure };

/** Converts transport exceptions without copying exception messages into UI-safe state. */
export function browserFailureFromThrown(_cause: unknown): BrowserFailure {
  return { kind: "network", action: "inspect-status", outcome: "unknown" };
}

function supportReference(response: Response): string | undefined {
  const value = response.headers.get("x-correlation-id");
  return value && correlationIdPattern.test(value) ? value : undefined;
}

function browserFailureFromClassification(
  classification: ApiFailureClassification,
  reference: string | undefined,
): BrowserFailure {
  const { code: _code, status: _status, ...failure } = classification;
  return { ...failure, supportReference: reference } as BrowserFailure;
}

export async function browserFailureFromResponse(
  response: Response,
  options: { now?: () => number } = {},
): Promise<BrowserFailure> {
  let body: Record<string, unknown> = {};
  if (response.headers.get("content-type")?.includes("application/json")) {
    try {
      body = (await response.clone().json()) as { code?: unknown };
    } catch {
      // Failure classification never depends on an untrusted response body.
    }
  }
  const classification = classifyApiFailure({
    code: readApiErrorCode(body),
    now: options.now?.(),
    retryAfter: response.headers.get("retry-after"),
    status: response.status,
  });
  return browserFailureFromClassification(
    classification,
    supportReference(response),
  );
}
