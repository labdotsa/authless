type Jwks = { keys: Array<Record<string, unknown>> };
type Fetcher = (
  input: Request | string | URL,
  init?: RequestInit,
) => Promise<Response>;

function object(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} is invalid`);
  return value as Record<string, unknown>;
}

function decode(segment: string, label: string) {
  try {
    return object(
      JSON.parse(Buffer.from(segment, "base64url").toString()),
      label,
    );
  } catch {
    throw new Error(`${label} is invalid`);
  }
}

export async function validateIdToken(input: {
  audience: string;
  issuer: string;
  jwks: Jwks;
  nonce: string;
  now?: () => Date;
  token: string;
}): Promise<Record<string, unknown>> {
  const parts = input.token.split(".");
  if (parts.length !== 3) throw new Error("ID token is malformed");
  const [encodedHeader, encodedClaims, encodedSignature] = parts as [
    string,
    string,
    string,
  ];
  const header = decode(encodedHeader, "ID token header");
  if (header.alg !== "RS256" || typeof header.kid !== "string")
    throw new Error("ID token algorithm is unsupported");
  const key = input.jwks.keys.find(
    (candidate) => candidate.kid === header.kid && candidate.kty === "RSA",
  );
  if (!key) throw new Error("ID token signing key is unknown");
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    key,
    { hash: "SHA-256", name: "RSASSA-PKCS1-v1_5" },
    false,
    ["verify"],
  );
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    Buffer.from(encodedSignature, "base64url"),
    new TextEncoder().encode(`${encodedHeader}.${encodedClaims}`),
  );
  if (!valid) throw new Error("ID token signature is invalid");
  const claims = decode(encodedClaims, "ID token claims");
  const now = Math.floor((input.now?.() ?? new Date()).getTime() / 1_000);
  const audiences = typeof claims.aud === "string" ? [claims.aud] : claims.aud;
  if (claims.iss !== input.issuer)
    throw new Error("ID token issuer does not match");
  if (!Array.isArray(audiences) || !audiences.includes(input.audience))
    throw new Error("ID token audience does not match");
  if (claims.nonce !== input.nonce)
    throw new Error("ID token nonce does not match");
  if (typeof claims.exp !== "number" || claims.exp <= now)
    throw new Error("ID token is expired");
  if (typeof claims.iat !== "number" || claims.iat > now + 60)
    throw new Error("ID token issued-at time is invalid");
  if (typeof claims.sub !== "string" || !claims.sub)
    throw new Error("ID token subject is invalid");
  return claims;
}

export async function exchangeAuthorizationCode(input: {
  callbackUrl: string;
  clientAuthentication?: (input: {
    audience: string;
    clientId: string;
  }) => Promise<{
    client_assertion: string;
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
  }>;
  clientId: string;
  dpopProof?: (input: { htm: "POST"; htu: string }) => Promise<string>;
  fetch?: Fetcher;
  issuer: string;
  jwks: Jwks;
  now?: () => Date;
  pending: {
    expiresAt: number;
    nonce: string;
    redirectUri: string;
    state: string;
    verifier: string;
  };
  tokenEndpoint: string;
}): Promise<{
  accessToken: string;
  expiresIn: number;
  idToken: string;
  subject: string;
  tokenType: "DPoP";
}> {
  const callback = new URL(input.callbackUrl);
  if (`${callback.origin}${callback.pathname}` !== input.pending.redirectUri)
    throw new Error("Callback redirect does not match");
  if (callback.searchParams.get("state") !== input.pending.state)
    throw new Error("Callback state does not match");
  if (input.pending.expiresAt <= (input.now?.() ?? new Date()).getTime())
    throw new Error("Callback transaction is expired");
  const protocolError = callback.searchParams.get("error");
  if (protocolError)
    throw new Error(`Authorization was denied: ${protocolError}`);
  const code = callback.searchParams.get("code");
  if (!code) throw new Error("Authorization code is missing");
  const endpoint = new URL(input.tokenEndpoint);
  if (endpoint.protocol !== "https:")
    throw new Error("Token endpoint must use HTTPS");
  const dpop = input.dpopProof
    ? await input.dpopProof({ htm: "POST", htu: endpoint.toString() })
    : null;
  if (!dpop) throw new Error("DPoP proof is required");
  const authentication = input.clientAuthentication
    ? await input.clientAuthentication({
        audience: endpoint.toString(),
        clientId: input.clientId,
      })
    : {};
  const request = new Request(endpoint, {
    body: new URLSearchParams({
      client_id: input.clientId,
      code,
      code_verifier: input.pending.verifier,
      grant_type: "authorization_code",
      redirect_uri: input.pending.redirectUri,
      ...authentication,
    }),
    headers: { "content-type": "application/x-www-form-urlencoded", dpop },
    method: "POST",
  });
  const response = await (input.fetch ?? fetch)(request);
  const payload = object(await response.json(), "Token response");
  if (
    !response.ok ||
    typeof payload.access_token !== "string" ||
    typeof payload.id_token !== "string" ||
    payload.token_type !== "DPoP" ||
    typeof payload.expires_in !== "number"
  )
    throw new Error("Token exchange failed");
  const claims = await validateIdToken({
    audience: input.clientId,
    issuer: input.issuer,
    jwks: input.jwks,
    nonce: input.pending.nonce,
    now: input.now,
    token: payload.id_token,
  });
  return {
    accessToken: payload.access_token,
    expiresIn: payload.expires_in,
    idToken: payload.id_token,
    subject: claims.sub as string,
    tokenType: "DPoP",
  };
}

export async function verifyWebhook(input: {
  body: string;
  eventId: string;
  now?: Date;
  replay: { claim(eventId: string, expiresAt: Date): Promise<boolean> };
  secrets: readonly string[];
  signature: string;
  timestamp: string;
}): Promise<{ event: Record<string, unknown>; eventId: string }> {
  if (!/^\d+$/.test(input.timestamp))
    throw new Error("Webhook timestamp is invalid");
  const now = input.now ?? new Date();
  const seconds = Number(input.timestamp);
  if (
    !Number.isSafeInteger(seconds) ||
    Math.abs(Math.floor(now.getTime() / 1_000) - seconds) > 300
  )
    throw new Error("Webhook timestamp is outside the replay window");
  if (!/^[A-Za-z0-9._:-]{3,128}$/.test(input.eventId))
    throw new Error("Webhook event ID is invalid");
  const matches =
    /^v1=([A-Za-z0-9_-]{43})(?:,v1-previous=([A-Za-z0-9_-]{43}))?$/.exec(
      input.signature,
    );
  if (!matches) throw new Error("Webhook signature is malformed");
  const supplied = matches.slice(1).filter(Boolean) as string[];
  const message = new TextEncoder().encode(
    `${input.timestamp}.${input.eventId}.${input.body}`,
  );
  let valid = false;
  for (const secret of input.secrets) {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { hash: "SHA-256", name: "HMAC" },
      false,
      ["verify"],
    );
    for (const signature of supplied)
      valid =
        (await crypto.subtle.verify(
          "HMAC",
          key,
          Buffer.from(signature, "base64url"),
          message,
        )) || valid;
  }
  if (!valid) throw new Error("Webhook signature is invalid");
  if (
    !(await input.replay.claim(
      input.eventId,
      new Date((seconds + 300) * 1_000),
    ))
  )
    throw new Error("Webhook event was replayed");
  return {
    event: object(JSON.parse(input.body), "Webhook event"),
    eventId: input.eventId,
  };
}

export type AppSessionProjection = Readonly<{
  sessionId: string;
  subject: string;
  expiresAt?: string;
}> | null;

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

type PrivateKeyJwt = (input: {
  audience: string;
  clientId: string;
}) => Promise<{
  client_assertion: string;
  client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
}>;

export async function refreshAccessToken(input: {
  clientAuthentication?: PrivateKeyJwt;
  clientId: string;
  dpopProof(input: { htm: "POST"; htu: string }): Promise<string>;
  fetch?: Fetcher;
  refreshToken: string;
  tokenEndpoint: string;
}): Promise<{
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: "DPoP";
}> {
  const endpoint = new URL(input.tokenEndpoint);
  if (endpoint.protocol !== "https:")
    throw new TypeError("Token endpoint must use HTTPS");
  const authentication = input.clientAuthentication
    ? await input.clientAuthentication({
        audience: endpoint.toString(),
        clientId: input.clientId,
      })
    : {};
  const response = await (input.fetch ?? fetch)(
    new Request(endpoint, {
      body: new URLSearchParams({
        client_id: input.clientId,
        grant_type: "refresh_token",
        refresh_token: input.refreshToken,
        ...authentication,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        dpop: await input.dpopProof({ htm: "POST", htu: endpoint.toString() }),
      },
      method: "POST",
    }),
  );
  const payload = object(await response.json(), "Token response");
  if (
    !response.ok ||
    typeof payload.access_token !== "string" ||
    typeof payload.refresh_token !== "string" ||
    payload.refresh_token === input.refreshToken ||
    typeof payload.expires_in !== "number" ||
    payload.token_type !== "DPoP"
  )
    throw new Error("Refresh rotation failed");
  return {
    accessToken: payload.access_token,
    expiresIn: payload.expires_in,
    refreshToken: payload.refresh_token,
    tokenType: "DPoP",
  };
}

export async function revokeToken(input: {
  clientAuthentication?: PrivateKeyJwt;
  clientId: string;
  fetch?: Fetcher;
  revocationEndpoint: string;
  token: string;
  tokenTypeHint: "access_token" | "refresh_token";
}): Promise<void> {
  const endpoint = new URL(input.revocationEndpoint);
  if (endpoint.protocol !== "https:")
    throw new TypeError("Revocation endpoint must use HTTPS");
  const authentication = input.clientAuthentication
    ? await input.clientAuthentication({
        audience: endpoint.toString(),
        clientId: input.clientId,
      })
    : {};
  const response = await (input.fetch ?? fetch)(
    new Request(endpoint, {
      body: new URLSearchParams({
        client_id: input.clientId,
        token: input.token,
        token_type_hint: input.tokenTypeHint,
        ...authentication,
      }),
      headers: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
    }),
  );
  if (!response.ok) throw new Error("Token revocation failed");
}
