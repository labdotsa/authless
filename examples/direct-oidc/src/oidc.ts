import {
  calculateJwkThumbprint,
  createLocalJWKSet,
  jwtVerify,
  type JSONWebKeySet,
  type JWTPayload,
} from "jose";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export interface Metadata {
  issuer: string;
  authorization_endpoint: string;
  token_endpoint: string;
  jwks_uri: string;
  userinfo_endpoint: string;
  revocation_endpoint: string;
  end_session_endpoint: string;
  grant_types_supported: string[];
  response_types_supported: string[];
  code_challenge_methods_supported: string[];
  token_endpoint_auth_methods_supported: string[];
  dpop_signing_alg_values_supported: string[];
  scopes_supported: string[];
  subject_types_supported: string[];
}

const exactHttps = (value: string, label: string) => {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.hash)
    throw new Error(`${label}_invalid`);
  return url.toString();
};

type Fetcher = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export async function discover(
  issuer: string,
  fetcher: Fetcher = fetch,
): Promise<Metadata> {
  const expected = exactHttps(issuer, "issuer").replace(/\/$/, "");
  const response = await fetcher(
    `${expected}/.well-known/openid-configuration`,
  );
  if (!response.ok) throw new Error("discovery_failed");
  const metadata = (await response.json()) as Metadata;
  if (metadata.issuer !== expected) throw new Error("invalid_issuer");
  const expectedEndpointPaths = {
    authorization_endpoint: "/authorize",
    token_endpoint: "/oauth/token",
    jwks_uri: "/.well-known/jwks.json",
    userinfo_endpoint: "/oauth/userinfo",
    revocation_endpoint: "/oauth/revoke",
    end_session_endpoint: "/logout",
  } as const;
  for (const field of [
    "authorization_endpoint",
    "token_endpoint",
    "jwks_uri",
    "userinfo_endpoint",
    "revocation_endpoint",
    "end_session_endpoint",
  ] as const) {
    const endpoint = new URL(exactHttps(metadata[field], field));
    if (endpoint.origin !== new URL(expected).origin)
      throw new Error("endpoint_origin_mismatch");
    if (endpoint.pathname !== expectedEndpointPaths[field] || endpoint.search)
      throw new Error("endpoint_path_mismatch");
  }
  if (
    JSON.stringify(metadata.grant_types_supported) !==
      JSON.stringify(["authorization_code", "refresh_token"]) ||
    JSON.stringify(metadata.response_types_supported) !==
      JSON.stringify(["code"]) ||
    JSON.stringify(metadata.code_challenge_methods_supported) !==
      JSON.stringify(["S256"]) ||
    JSON.stringify(metadata.dpop_signing_alg_values_supported) !==
      JSON.stringify(["ES256", "Ed25519", "EdDSA"]) ||
    JSON.stringify(metadata.token_endpoint_auth_methods_supported) !==
      JSON.stringify(["none", "private_key_jwt"]) ||
    JSON.stringify(metadata.scopes_supported) !==
      JSON.stringify([
        "openid",
        "email",
        "profile",
        "workspace_subject",
        "offline_access",
      ]) ||
    JSON.stringify(metadata.subject_types_supported) !==
      JSON.stringify(["pairwise"]) ||
    "tls_client_certificate_bound_access_tokens" in metadata ||
    "mtls_endpoint_aliases" in metadata
  )
    throw new Error("unsupported_flow");
  return metadata;
}

const encoded = (value: Uint8Array) => Buffer.from(value).toString("base64url");
const equal = (actual: string, expected: string, code: string) => {
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error(code);
};

export function beginAuthorization(
  metadata: Metadata,
  input: { clientId: string; redirectUri: string; scopes: string[] },
) {
  exactHttps(input.redirectUri, "redirect_uri");
  const state = encoded(randomBytes(32));
  const nonce = encoded(randomBytes(32));
  const verifier = encoded(randomBytes(64));
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const url = new URL(metadata.authorization_endpoint);
  for (const [key, value] of Object.entries({
    response_type: "code",
    client_id: input.clientId,
    redirect_uri: input.redirectUri,
    scope: [...new Set(["openid", ...input.scopes])].join(" "),
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }))
    url.searchParams.set(key, value);
  return {
    url: url.toString(),
    transaction: {
      state,
      nonce,
      verifier,
      redirectUri: input.redirectUri,
      consumed: false,
    },
  };
}

export function consumeCallback(
  callbackUrl: string,
  transaction: {
    state: string;
    nonce: string;
    verifier: string;
    redirectUri: string;
    consumed: boolean;
  },
) {
  if (transaction.consumed) throw new Error("code_replay");
  transaction.consumed = true;
  const callback = new URL(callbackUrl);
  if (`${callback.origin}${callback.pathname}` !== transaction.redirectUri)
    throw new Error("redirect_mismatch");
  if (callback.searchParams.has("error"))
    throw new Error(
      callback.searchParams.get("error") === "access_denied"
        ? "consent_denied"
        : "authorization_failed",
    );
  equal(
    callback.searchParams.get("state") ?? "",
    transaction.state,
    "state_mismatch",
  );
  const code = callback.searchParams.get("code");
  if (!code) throw new Error("missing_code");
  return {
    code,
    codeVerifier: transaction.verifier,
    expectedNonce: transaction.nonce,
  };
}

async function formRequest(
  endpoint: string,
  fields: Record<string, string>,
  dpop: string,
  fetcher: Fetcher,
) {
  const response = await fetcher(exactHttps(endpoint, "endpoint"), {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", dpop },
    body: new URLSearchParams(fields),
  });
  const body = (await response.json()) as Record<string, unknown>;
  if (!response.ok)
    throw new Error(
      typeof body.error === "string" ? body.error : "protocol_request_failed",
    );
  return body;
}

export async function exchangeCode(
  metadata: Metadata,
  input: {
    clientId: string;
    code: string;
    codeVerifier: string;
    redirectUri: string;
    dpopProof: string;
    clientAssertion?: string;
  },
  fetcher: Fetcher = fetch,
) {
  return formRequest(
    metadata.token_endpoint,
    {
      grant_type: "authorization_code",
      client_id: input.clientId,
      code: input.code,
      code_verifier: input.codeVerifier,
      redirect_uri: exactHttps(input.redirectUri, "redirect_uri"),
      ...(input.clientAssertion
        ? {
            client_assertion_type:
              "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            client_assertion: input.clientAssertion,
          }
        : {}),
    },
    input.dpopProof,
    fetcher,
  );
}

export async function rotateRefreshToken(
  metadata: Metadata,
  input: {
    clientId: string;
    refreshToken: string;
    dpopProof: string;
    clientAssertion?: string;
  },
  fetcher: Fetcher = fetch,
) {
  return formRequest(
    metadata.token_endpoint,
    {
      grant_type: "refresh_token",
      client_id: input.clientId,
      refresh_token: input.refreshToken,
      ...(input.clientAssertion
        ? {
            client_assertion_type:
              "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            client_assertion: input.clientAssertion,
          }
        : {}),
    },
    input.dpopProof,
    fetcher,
  );
}

export async function fetchUserInfo(
  metadata: Metadata,
  accessToken: string,
  dpopProof: string,
  fetcher: Fetcher = fetch,
) {
  const response = await fetcher(metadata.userinfo_endpoint, {
    headers: { authorization: `DPoP ${accessToken}`, dpop: dpopProof },
  });
  if (!response.ok)
    throw new Error(
      response.status === 401 ? "revoked_token" : "userinfo_failed",
    );
  return response.json() as Promise<Record<string, unknown>>;
}

export async function revoke(
  metadata: Metadata,
  input: {
    clientId: string;
    token: string;
    hint: "access_token" | "refresh_token";
    dpopProof: string;
    clientAssertion?: string;
  },
  fetcher: Fetcher = fetch,
) {
  await formRequest(
    metadata.revocation_endpoint,
    {
      client_id: input.clientId,
      token: input.token,
      token_type_hint: input.hint,
      ...(input.clientAssertion
        ? {
            client_assertion_type:
              "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            client_assertion: input.clientAssertion,
          }
        : {}),
    },
    input.dpopProof,
    fetcher,
  );
}

export function logoutUrl(
  metadata: Metadata,
  input: { idTokenHint: string; postLogoutRedirectUri: string; state: string },
) {
  const url = new URL(metadata.end_session_endpoint);
  url.searchParams.set("id_token_hint", input.idTokenHint);
  url.searchParams.set(
    "post_logout_redirect_uri",
    exactHttps(input.postLogoutRedirectUri, "post_logout_redirect_uri"),
  );
  url.searchParams.set("state", input.state);
  return url.toString();
}

export class RotatingJwks {
  #keys?: JSONWebKeySet;
  constructor(private readonly load: () => Promise<JSONWebKeySet>) {}
  async verify(
    token: string,
    input: { issuer: string; audience: string; nonce: string; now?: Date },
  ): Promise<JWTPayload> {
    for (let attempt = 0; attempt < 2; attempt++) {
      this.#keys ??= await this.load();
      try {
        const result = await jwtVerify(token, createLocalJWKSet(this.#keys), {
          issuer: input.issuer,
          audience: input.audience,
          currentDate: input.now,
          clockTolerance: 30,
          algorithms: ["RS256"],
        });
        if (typeof result.payload.nonce !== "string")
          throw new Error("nonce_mismatch");
        equal(result.payload.nonce, input.nonce, "nonce_mismatch");
        if (typeof result.payload.sub !== "string" || !result.payload.sub)
          throw new Error("missing_subject");
        return result.payload;
      } catch (error) {
        if (
          attempt === 0 &&
          error instanceof Error &&
          "code" in error &&
          error.code === "ERR_JWKS_NO_MATCHING_KEY"
        ) {
          this.#keys = await this.load();
          continue;
        }
        throw error;
      }
    }
    throw new Error("stale_jwks");
  }
}

export function createApplicationSession(payload: JWTPayload) {
  if (typeof payload.iss !== "string" || typeof payload.sub !== "string")
    throw new Error("invalid_identity");
  return {
    id: encoded(randomBytes(32)),
    principal: `${payload.iss}|${payload.sub}`,
    roles: [] as string[],
    authority: "application" as const,
  };
}

export async function dpopThumbprint(publicJwk: JsonWebKey): Promise<string> {
  return calculateJwkThumbprint(publicJwk);
}
