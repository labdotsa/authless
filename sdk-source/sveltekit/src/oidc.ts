import { oidcCallbackMatchesRedirect } from "@authless/contracts";

export type Jwks = { keys: Array<Record<string, unknown>> };
export type Fetcher = (
  input: Request | string | URL,
  init?: RequestInit,
) => Promise<Response>;

const isAllowedHttpLoopback = (endpoint: URL) =>
  endpoint.protocol === "http:" &&
  (endpoint.hostname === "localhost" || endpoint.hostname === "127.0.0.1");

const requireSecureEndpoint = (endpoint: URL, label: string) => {
  if (endpoint.protocol !== "https:" && !isAllowedHttpLoopback(endpoint))
    throw new TypeError(`${label} must use HTTPS outside loopback`);
};

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
  const audiences =
    typeof claims.aud === "string" && claims.aud
      ? [claims.aud]
      : Array.isArray(claims.aud) &&
          claims.aud.length > 0 &&
          claims.aud.every(
            (audience) => typeof audience === "string" && audience,
          )
        ? claims.aud
        : null;
  if (claims.iss !== input.issuer)
    throw new Error("ID token issuer does not match");
  if (!Array.isArray(audiences) || !audiences.includes(input.audience))
    throw new Error("ID token audience does not match");
  if (
    (audiences.length > 1 || Object.hasOwn(claims, "azp")) &&
    (typeof claims.azp !== "string" || claims.azp !== input.audience)
  )
    throw new Error("ID token authorized party does not match");
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
  if (!oidcCallbackMatchesRedirect(callback, input.pending.redirectUri))
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
  requireSecureEndpoint(endpoint, "Token endpoint");
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

export type PrivateKeyJwt = (input: {
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
  requireSecureEndpoint(endpoint, "Token endpoint");
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
  requireSecureEndpoint(endpoint, "Revocation endpoint");
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
