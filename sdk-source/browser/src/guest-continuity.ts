import {
  type AuthorizationStorage,
  consumeAuthorizationResponse,
  createAuthorizationRequest,
} from "./authorization";

export type GuestContinuityMode = "isolated" | "network";
export type GuestContinuityResponse = {
  accessToken?: string;
  appGuestSubject: string;
  expiresAt: string;
  mode: GuestContinuityMode;
  returning: boolean;
  sessionExpiresAt: string;
};
export type GuestContinuityStatus = {
  cookieAccepted: boolean;
  known: boolean;
  canBootstrap: boolean;
};
export type GuestContinuityTransport = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;
export type GuestBrowserBinding = {
  publicJwk: JsonWebKey;
  privateKey: CryptoKey;
};

export type GuestHandoffRequest = {
  binding: GuestBrowserBinding;
  nonce: string;
  state: string;
  url: string;
};
export type GuestContinuityOptions = {
  authlessOrigin: string;
  appId: string;
  environment: string;
  idempotencyKey: string;
  mode?: GuestContinuityMode;
  /** Required for network continuity. The host must show this choice to the user. */
  networkConsent?: boolean;
  fetch?: GuestContinuityTransport;
  lockName?: string;
  lockTimeoutMs?: number;
  /** Test-only or Authless same-origin transport. Cross-origin apps must use beginHandoff. */
  allowDirectTransport?: boolean;
};

const pendingLocks = new Map<string, Promise<unknown>>();
async function withBrowserLock<T>(
  name: string,
  work: () => Promise<T>,
  timeoutMs = 10_000,
): Promise<T> {
  const locks = typeof navigator !== "undefined" ? navigator.locks : undefined;
  if (locks) return locks.request(name, { mode: "exclusive" }, work);
  const previous = pendingLocks.get(name) ?? Promise.resolve();
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  const queued = previous.then(() => gate);
  pendingLocks.set(name, queued);
  await Promise.race([
    previous,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error("guest_continuity_coordination_timeout")),
        timeoutMs,
      ),
    ),
  ]);
  try {
    return await work();
  } finally {
    release();
    if (pendingLocks.get(name) === queued) pendingLocks.delete(name);
  }
}

function exactOrigin(value: string): string {
  const url = new URL(value);
  if (
    url.protocol !== "https:" &&
    !["localhost", "127.0.0.1"].includes(url.hostname)
  )
    throw new TypeError("authlessOrigin must be HTTPS");
  if (
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  )
    throw new TypeError("authlessOrigin must be an origin");
  return url.origin;
}

function exactHttps(value: string, label: string): URL {
  const url = new URL(value);
  const local = ["localhost", "127.0.0.1"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !(local && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.hash
  )
    throw new TypeError(`${label} must be an exact HTTPS URL`);
  return url;
}

/** Creates a per-browser handoff key; the private key never leaves this origin. */
export async function createGuestBrowserBinding(): Promise<GuestBrowserBinding> {
  const pair = await crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign", "verify"],
  );
  if (!("privateKey" in pair)) throw new Error("guest_binding_unavailable");
  return {
    privateKey: pair.privateKey,
    publicJwk: await crypto.subtle.exportKey("jwk", pair.publicKey),
  };
}

export async function createGuestDpopProof(input: {
  binding: GuestBrowserBinding;
  htu: string;
  htm: string;
  nonce: string;
  accessToken?: string;
}): Promise<string> {
  const encode = (value: unknown) =>
    btoa(JSON.stringify(value))
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replace(/=+$/, "");
  const header = {
    typ: "dpop+jwt",
    alg: "ES256",
    jwk: input.binding.publicJwk,
  };
  const payload: Record<string, unknown> = {
    htu: exactHttps(input.htu, "htu").toString(),
    htm: input.htm.toUpperCase(),
    iat: Math.floor(Date.now() / 1000),
    jti: crypto.randomUUID(),
    nonce: input.nonce,
  };
  if (input.accessToken !== undefined) {
    const digest = new Uint8Array(
      await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(input.accessToken),
      ),
    );
    payload.ath = btoa(String.fromCharCode(...digest))
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replace(/=+$/, "");
  }
  const signing = `${encode(header)}.${encode(payload)}`;
  const signature = new Uint8Array(
    await crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      input.binding.privateKey,
      new TextEncoder().encode(signing),
    ),
  );
  return `${signing}.${btoa(String.fromCharCode(...signature))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "")}`;
}

export async function guestDpopJkt(
  binding: GuestBrowserBinding,
): Promise<string> {
  const jwk = binding.publicJwk;
  const canonical = JSON.stringify({
    crv: jwk.crv,
    kty: jwk.kty,
    x: jwk.x,
    y: jwk.y,
  });
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical)),
  );
  return btoa(String.fromCharCode(...digest))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

/**
 * Starts a top-level, registered-origin guest handoff. The caller must navigate
 * the current window to `url`; no iframe or cross-origin credential fetch is
 * used for this protocol.
 */
export async function beginGuestHandoff(input: {
  authlessOrigin: string;
  authorizationEndpoint: string;
  clientId: string;
  redirectUri: string;
  storage: AuthorizationStorage;
  mode?: GuestContinuityMode;
  now?: () => number;
}): Promise<GuestHandoffRequest> {
  const origin = exactOrigin(input.authlessOrigin);
  const endpoint = new URL(input.authorizationEndpoint);
  if (endpoint.origin !== origin || endpoint.pathname !== "/authorize")
    throw new TypeError("authorizationEndpoint must be Authless /authorize");
  const binding = await createGuestBrowserBinding();
  const bindingJwk = btoa(JSON.stringify(binding.publicJwk))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
  const request = await createAuthorizationRequest({
    authorizationEndpoint: endpoint.toString(),
    clientId: input.clientId,
    redirectUri: input.redirectUri,
    storage: input.storage,
    now: input.now,
    prompt: input.mode === "network" ? "consent login" : "login",
    scopes: ["openid"],
    extraParams: {
      authless_guest_continuity: "1",
      authless_guest_mode: input.mode ?? "isolated",
      authless_guest_binding: bindingJwk,
      dpop_jkt: await guestDpopJkt(binding),
    },
  });
  return { ...request, binding };
}

/** Reads Authless-owned browser state while holding the canonical-origin lock. */
export async function readGuestContinuityStatus(input: {
  authlessOrigin: string;
  fetch?: GuestContinuityTransport;
  lockTimeoutMs?: number;
}): Promise<GuestContinuityStatus> {
  const origin = exactOrigin(input.authlessOrigin);
  const transport = input.fetch ?? fetch;
  if (typeof navigator === "undefined" || !navigator.locks)
    throw new Error("guest_continuity_coordination_unavailable");
  return withBrowserLock(
    `authless:guest:${origin}`,
    async () => {
      const response = await transport(`${origin}/guest/continuity/status`, {
        credentials: "include",
        headers: { accept: "application/json" },
      });
      if (!response.ok) throw new Error("guest_continuity_status_unavailable");
      const status = (await response.json()) as Partial<GuestContinuityStatus>;
      if (
        typeof status.cookieAccepted !== "boolean" ||
        typeof status.known !== "boolean" ||
        typeof status.canBootstrap !== "boolean"
      )
        throw new Error("guest_continuity_invalid_status");
      return status as GuestContinuityStatus;
    },
    input.lockTimeoutMs,
  );
}

/** Redeems a completed top-level handoff once and binds the token to its browser key. */
export async function redeemGuestHandoff(input: {
  callbackUrl: string;
  storage: Pick<Storage, "getItem" | "removeItem">;
  binding: GuestBrowserBinding;
  tokenEndpoint: string;
  clientId: string;
  fetch?: GuestContinuityTransport;
}): Promise<Response> {
  const endpoint = new URL(input.tokenEndpoint);
  const callback = new URL(input.callbackUrl);
  if (
    endpoint.protocol !== "https:" ||
    endpoint.username ||
    endpoint.password ||
    endpoint.hash
  )
    throw new TypeError("tokenEndpoint must be HTTPS");
  if (!/^https:$/.test(callback.protocol))
    throw new TypeError("callbackUrl must be HTTPS");
  const consumed = consumeAuthorizationResponse({
    callbackUrl: input.callbackUrl,
    storage: input.storage,
  });
  if ("error" in consumed) throw new Error(`guest_handoff_${consumed.error}`);
  const proof = await createGuestDpopProof({
    binding: input.binding,
    htu: endpoint.toString(),
    htm: "POST",
    nonce: "",
  });
  const transport = input.fetch ?? fetch;
  return transport(endpoint, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      dpop: proof,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: consumed.code,
      client_id: input.clientId,
      redirect_uri: consumed.redirectUri,
      code_verifier: consumed.verifier,
    }),
  });
}

export function createGuestContinuityCoordinator(
  options: GuestContinuityOptions,
) {
  const origin = exactOrigin(options.authlessOrigin);
  const transport = options.fetch ?? fetch;
  const mode = options.mode ?? "isolated";
  if (!/^[A-Za-z0-9_-]{3,128}$/.test(options.appId))
    throw new TypeError("appId is invalid");
  if (!/^[A-Za-z0-9_-]{1,32}$/.test(options.environment))
    throw new TypeError("environment is invalid");
  if (!/^[A-Za-z0-9._~-]{1,256}$/.test(options.idempotencyKey))
    throw new TypeError("idempotencyKey is invalid");
  if (mode === "network" && options.networkConsent !== true)
    throw new TypeError("network continuity requires explicit consent");
  const lockName = options.lockName ?? `authless:guest:${origin}`;
  return {
    async ensure(): Promise<GuestContinuityResponse> {
      if (options.allowDirectTransport !== true)
        throw new Error("guest_continuity_handoff_required");
      return withBrowserLock(
        lockName,
        async () => {
          const response = await transport(`${origin}/guest/continuity`, {
            credentials: "include",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              "idempotency-key": options.idempotencyKey,
            },
            method: "POST",
            body: JSON.stringify({
              appId: options.appId,
              environment: options.environment,
              mode,
              networkConsent: options.networkConsent === true,
            }),
          });
          if (!response.ok) throw new Error("guest_continuity_unavailable");
          const body = (await response.json()) as GuestContinuityResponse;
          if (!body.appGuestSubject || !body.expiresAt || body.mode !== mode)
            throw new Error("guest_continuity_invalid_response");
          return body;
        },
        options.lockTimeoutMs,
      );
    },
    async beginHandoff(input: {
      authorizationEndpoint: string;
      clientId: string;
      redirectUri: string;
      storage: AuthorizationStorage;
      navigate?: (url: string) => void;
    }) {
      const request = await beginGuestHandoff({
        ...input,
        authlessOrigin: origin,
        mode,
      });
      const choice = new URL(`${origin}/guest/continuity`);
      choice.searchParams.set("handoff", request.url);
      (input.navigate ?? ((url: string) => window.location.assign(url)))(
        choice.toString(),
      );
      return request;
    },
    async endAppSession(sessionId: string): Promise<void> {
      await transport(`${origin}/guest/continuity/session`, {
        method: "DELETE",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          appId: options.appId,
          environment: options.environment,
          sessionId,
        }),
      });
    },
    async forgetBrowser(): Promise<void> {
      await transport(`${origin}/guest/continuity/browser`, {
        method: "DELETE",
        credentials: "include",
      });
    },
    async deleteAppGuest(): Promise<void> {
      await transport(`${origin}/guest/continuity/app`, {
        method: "DELETE",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          appId: options.appId,
          environment: options.environment,
        }),
      });
    },
    async rotateVisitorSecret(): Promise<void> {
      await transport(`${origin}/guest/continuity/browser/rotate`, {
        method: "POST",
        credentials: "include",
      });
    },
    async startAuthorization(input: {
      authorizationEndpoint: string;
      clientId: string;
      redirectUri: string;
      storage: AuthorizationStorage;
    }) {
      return beginGuestHandoff({
        ...input,
        authlessOrigin: origin,
        mode,
      });
    },
    consumeAuthorizationResponse,
  };
}
