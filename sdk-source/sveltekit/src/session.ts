export type AppSessionProjection = Readonly<{
  sessionId: string;
  subject: string;
  expiresAt?: string;
}> | null;

export type OnlineSessionDecision =
  | { status: "compliant"; sessionId: string; policyVersion: number }
  | {
      status: "interaction_required";
      sessionId: string;
      policyVersion: number;
      reason: "consent" | "proof";
    }
  | {
      status: "denied" | "expired";
      sessionId: string | null;
      policyVersion: number | null;
      reason: string;
    };
type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

/**
 * Performs an authoritative policy and security check for every protected request.
 * Strict mode deliberately has no cache. Callers must stop serving the request
 * for every result except `compliant`.
 */
export function createOnlineSessionValidator(options: {
  endpoint: string | URL;
  appCredentialToken: string;
  fetch?: Fetcher;
}) {
  if (typeof window !== "undefined")
    throw new Error("Online session validation is server-only.");
  const template = new URL(options.endpoint);
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(
    template.hostname,
  );
  if (
    template.protocol !== "https:" &&
    !(loopback && template.protocol === "http:")
  )
    throw new TypeError(
      "Online session endpoint must use HTTPS outside loopback.",
    );
  if (
    template.username ||
    template.password ||
    template.search ||
    template.hash
  )
    throw new TypeError(
      "Online session endpoint must not contain credentials, query, or fragment.",
    );
  if (!options.appCredentialToken || /[\r\n]/u.test(options.appCredentialToken))
    throw new TypeError(
      "appCredentialToken must be non-empty and contain no CR or LF.",
    );
  return async (input: {
    workspaceId: string;
    appId: string;
    environment: "test" | "production";
    sessionReference: string;
    signal?: AbortSignal;
  }): Promise<OnlineSessionDecision> => {
    if (!input.workspaceId || !input.appId || !input.sessionReference)
      throw new TypeError(
        "workspaceId, appId, and sessionReference are required.",
      );
    if (input.environment !== "test" && input.environment !== "production")
      throw new TypeError("environment must be test or production.");
    const endpoint = new URL(template.toString());
    endpoint.pathname = `${endpoint.pathname.replace(/\/$/u, "")}/workspaces/${encodeURIComponent(input.workspaceId)}/apps/${encodeURIComponent(input.appId)}/${input.environment}/sessions/validate`;
    let response: Response;
    try {
      response = await (options.fetch ?? fetch)(endpoint, {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${options.appCredentialToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ sessionReference: input.sessionReference }),
        cache: "no-store",
        redirect: "error",
        signal: input.signal,
      });
    } catch {
      return {
        status: "denied",
        sessionId: null,
        policyVersion: null,
        reason: "authority_unavailable",
      };
    }
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      return response.status === 410
        ? {
            status: "expired",
            sessionId: null,
            policyVersion: null,
            reason: "authority_unavailable",
          }
        : {
            status: "denied",
            sessionId: null,
            policyVersion: null,
            reason: "authority_unavailable",
          };
    }
    if (!payload || typeof payload !== "object")
      throw new Error("Online session response was invalid.");
    const record = payload as Record<string, unknown>;
    if (
      record.status !== "compliant" &&
      record.status !== "interaction_required" &&
      record.status !== "denied" &&
      record.status !== "expired"
    )
      throw new Error("Online session response was invalid.");
    const sessionId = record.sessionId;
    const policyVersion = record.policyVersion;
    if (
      record.status === "compliant" ||
      record.status === "interaction_required"
    ) {
      if (
        typeof sessionId !== "string" ||
        typeof policyVersion !== "number" ||
        !Number.isSafeInteger(policyVersion) ||
        policyVersion < 1
      )
        throw new Error("Online session response was invalid.");
      if (record.status === "compliant")
        return { status: record.status, sessionId, policyVersion };
      if (record.reason !== "consent" && record.reason !== "proof")
        throw new Error("Online session response was invalid.");
      return {
        status: record.status,
        sessionId,
        policyVersion,
        reason: record.reason,
      };
    }
    if (
      (sessionId !== null && typeof sessionId !== "string") ||
      policyVersion !== null
    )
      throw new Error("Online session response was invalid.");
    const validSessionId: string | null =
      typeof sessionId === "string" ? sessionId : null;
    if (typeof record.reason !== "string" || record.reason.length === 0)
      throw new Error("Online session response was invalid.");
    return {
      status: record.status,
      sessionId: validSessionId,
      policyVersion: null,
      reason: record.reason,
    };
  };
}

/** Projects an application-owned session; it never creates sessions or makes authorization decisions. */
export function createSessionHandle(options: {
  readSession(request: Request): Promise<AppSessionProjection>;
}) {
  return async <
    Event extends { locals: Record<string, unknown>; request: Request },
  >(input: {
    event: Event;
    resolve(event: Event): Promise<Response>;
  }): Promise<Response> => {
    const session = await options.readSession(input.event.request);
    input.event.locals.authless = session
      ? Object.freeze({ ...session })
      : null;
    return input.resolve(input.event);
  };
}

export function logoutResponse(input: {
  cookieName: string;
  endSessionEndpoint?: string;
  idTokenHint?: string;
  postLogoutRedirectUri?: string;
}): Response {
  if (!/^__Host-[A-Za-z0-9_-]+$/.test(input.cookieName))
    throw new TypeError("Session cookie must use the __Host- prefix");
  let location: string | undefined;
  if (input.endSessionEndpoint) {
    const endpoint = new URL(input.endSessionEndpoint);
    if (endpoint.protocol !== "https:")
      throw new TypeError("Logout endpoint must use HTTPS");
    if (input.idTokenHint)
      endpoint.searchParams.set("id_token_hint", input.idTokenHint);
    if (input.postLogoutRedirectUri)
      endpoint.searchParams.set(
        "post_logout_redirect_uri",
        input.postLogoutRedirectUri,
      );
    location = endpoint.toString();
  }
  return new Response(null, {
    status: location ? 303 : 204,
    headers: {
      "cache-control": "no-store",
      "set-cookie": `${input.cookieName}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
      ...(location ? { location } : {}),
    },
  });
}
