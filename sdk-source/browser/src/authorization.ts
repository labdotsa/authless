import { oidcCallbackMatchesRedirect } from "@authless/contracts";

export type AuthorizationStorage = Pick<Storage, "setItem">;

export type AuthorizationRequestOptions = {
  authorizationEndpoint: string;
  clientId: string;
  redirectUri: string;
  storage: AuthorizationStorage;
  scopes?: readonly string[];
  prompt?: "consent" | "login" | "consent login" | "none";
  resource?: string;
  expiresInSeconds?: number;
  now?: () => number;
  extraParams?: Readonly<Record<string, string>>;
};

export type PendingAuthorization = {
  expiresAt: number;
  nonce: string;
  redirectUri: string;
  verifier: string;
};

const prefix = "authless:authorization:";

function randomValue(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

async function challenge(verifier: string): Promise<string> {
  const bytes = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)),
  );
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
}

function exactHttps(value: string, label: string): URL {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.hash)
    throw new TypeError(`${label} must be an exact HTTPS URL`);
  return url;
}

/** Creates a request only when called. Importing this module performs no I/O. */
export async function createAuthorizationRequest(
  options: AuthorizationRequestOptions,
): Promise<{ nonce: string; state: string; url: string }> {
  const endpoint = exactHttps(
    options.authorizationEndpoint,
    "authorizationEndpoint",
  );
  const redirect = exactHttps(options.redirectUri, "redirectUri");
  if (!oidcCallbackMatchesRedirect(redirect, options.redirectUri))
    throw new TypeError(
      "redirectUri contains reserved authorization response parameters",
    );
  if (!/^[A-Za-z0-9._~-]{3,128}$/.test(options.clientId))
    throw new TypeError("clientId is invalid");
  const state = randomValue();
  const nonce = randomValue();
  const verifier = randomValue();
  const pending: PendingAuthorization = {
    expiresAt:
      (options.now?.() ?? Date.now()) +
      (options.expiresInSeconds ?? 600) * 1_000,
    nonce,
    redirectUri: options.redirectUri,
    verifier,
  };
  options.storage.setItem(`${prefix}${state}`, JSON.stringify(pending));
  const params: Record<string, string> = {
    client_id: options.clientId,
    code_challenge: await challenge(verifier),
    code_challenge_method: "S256",
    nonce,
    redirect_uri: options.redirectUri,
    response_type: "code",
    scope: [...new Set(["openid", ...(options.scopes ?? [])])].join(" "),
    state,
  };
  if (options.resource)
    params.resource = exactHttps(options.resource, "resource").toString();
  if (options.prompt) params.prompt = options.prompt;
  for (const [name, value] of Object.entries(params))
    endpoint.searchParams.set(name, value);
  for (const [name, value] of Object.entries(options.extraParams ?? {})) {
    if (!/^[A-Za-z][A-Za-z0-9._~-]{0,63}$/.test(name))
      throw new TypeError("authorization parameter name is invalid");
    endpoint.searchParams.set(name, value);
  }
  return { nonce, state, url: endpoint.toString() };
}

export async function startAuthorization(
  options: AuthorizationRequestOptions & { navigate?: (url: string) => void },
): Promise<never> {
  const request = await createAuthorizationRequest(options);
  (options.navigate ?? ((url) => window.location.assign(url)))(request.url);
  throw new Error("Authorization navigation returned unexpectedly");
}

export function consumeAuthorizationResponse(options: {
  callbackUrl: string;
  storage: Pick<Storage, "getItem" | "removeItem">;
  now?: () => number;
}):
  | {
      code: string;
      nonce: string;
      redirectUri: string;
      state: string;
      verifier: string;
    }
  | { error: string; state: string } {
  const url = new URL(options.callbackUrl);
  const state = url.searchParams.get("state");
  if (!state) throw new Error("Authorization state is missing");
  const key = `${prefix}${state}`;
  const serialized = options.storage.getItem(key);
  options.storage.removeItem(key);
  if (!serialized)
    throw new Error("Authorization state is invalid or already consumed");
  let pending: PendingAuthorization;
  try {
    pending = JSON.parse(serialized) as PendingAuthorization;
  } catch {
    throw new Error("Authorization state is invalid or already consumed");
  }
  if (
    !Number.isFinite(pending.expiresAt) ||
    pending.expiresAt <= (options.now?.() ?? Date.now()) ||
    !oidcCallbackMatchesRedirect(url, pending.redirectUri) ||
    !pending.nonce ||
    !pending.verifier
  )
    throw new Error("Authorization state is invalid or already consumed");
  const error = url.searchParams.get("error");
  if (error) return { error, state };
  const code = url.searchParams.get("code");
  if (!code) throw new Error("Authorization code is missing");
  return {
    code,
    nonce: pending.nonce,
    redirectUri: pending.redirectUri,
    state,
    verifier: pending.verifier,
  };
}
