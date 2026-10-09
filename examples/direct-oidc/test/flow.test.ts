import { describe, expect, test } from "bun:test";
import { exportJWK, generateKeyPair, SignJWT } from "jose";
import {
  beginAuthorization,
  consumeCallback,
  createApplicationSession,
  discover,
  exchangeCode,
  fetchUserInfo,
  logoutUrl,
  revoke,
  rotateRefreshToken,
  RotatingJwks,
  type Metadata,
} from "../src/oidc";

const issuer = "https://sign.authle.ss";
const metadata: Metadata = {
  issuer,
  authorization_endpoint: `${issuer}/authorize`,
  token_endpoint: `${issuer}/oauth/token`,
  jwks_uri: `${issuer}/.well-known/jwks.json`,
  userinfo_endpoint: `${issuer}/oauth/userinfo`,
  revocation_endpoint: `${issuer}/oauth/revoke`,
  end_session_endpoint: `${issuer}/logout`,
  grant_types_supported: ["authorization_code", "refresh_token"],
  response_types_supported: ["code"],
  code_challenge_methods_supported: ["S256"],
  token_endpoint_auth_methods_supported: ["none", "private_key_jwt"],
  dpop_signing_alg_values_supported: ["ES256", "Ed25519", "EdDSA"],
  scopes_supported: [
    "openid",
    "email",
    "profile",
    "workspace_subject",
    "offline_access",
  ],
  subject_types_supported: ["pairwise"],
};
const fetchMetadata =
  (value: Metadata = metadata) =>
  async () =>
    new Response(JSON.stringify(value), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
const token = async (
  overrides: Record<string, unknown> = {},
  kid = "current",
) => {
  const pair = await generateKeyPair("RS256", { extractable: true });
  const jwk = {
    ...(await exportJWK(pair.publicKey)),
    kid,
    alg: "RS256",
    use: "sig",
  };
  const jwt = await new SignJWT({ nonce: "expected", ...overrides })
    .setProtectedHeader({ alg: "RS256", kid })
    .setIssuer(issuer)
    .setAudience("app_test_direct")
    .setSubject("pairwise_opaque_subject")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(pair.privateKey);
  return { jwt, jwk };
};

describe("direct OIDC clean-room flow", () => {
  test("discovers, authorizes with S256 PKCE, validates, and creates only an app-owned session", async () => {
    const discovered = await discover(issuer, fetchMetadata());
    expect(discovered).toMatchObject({
      grant_types_supported: ["authorization_code", "refresh_token"],
      response_types_supported: ["code"],
      code_challenge_methods_supported: ["S256"],
      dpop_signing_alg_values_supported: ["ES256", "Ed25519", "EdDSA"],
      token_endpoint_auth_methods_supported: ["none", "private_key_jwt"],
      scopes_supported: [
        "openid",
        "email",
        "profile",
        "workspace_subject",
        "offline_access",
      ],
      subject_types_supported: ["pairwise"],
    });
    const pending = beginAuthorization(discovered, {
      clientId: "app_test_direct",
      redirectUri: "https://app.example.test/callback",
      scopes: ["profile"],
    });
    expect(new URL(pending.url).searchParams.get("code_challenge_method")).toBe(
      "S256",
    );
    const callback = consumeCallback(
      `https://app.example.test/callback?code=one_time&state=${pending.transaction.state}`,
      pending.transaction,
    );
    const signed = await token({ nonce: callback.expectedNonce });
    const claims = await new RotatingJwks(async () => ({
      keys: [signed.jwk],
    })).verify(signed.jwt, {
      issuer,
      audience: "app_test_direct",
      nonce: callback.expectedNonce,
    });
    expect(createApplicationSession(claims)).toMatchObject({
      roles: [],
      authority: "application",
      principal: `${issuer}|pairwise_opaque_subject`,
    });
  });

  test("rejects invalid issuer or audience, token expiry, nonce failure, and stale keys", async () => {
    await expect(
      discover(
        issuer,
        fetchMetadata({ ...metadata, issuer: "https://evil.example" }),
      ),
    ).rejects.toThrow("invalid_issuer");
    const signed = await token();
    const keys = new RotatingJwks(async () => ({ keys: [signed.jwk] }));
    await expect(
      keys.verify(signed.jwt, { issuer, audience: "wrong", nonce: "expected" }),
    ).rejects.toThrow();
    await expect(
      keys.verify(signed.jwt, {
        issuer,
        audience: "app_test_direct",
        nonce: "wrong",
      }),
    ).rejects.toThrow("nonce_mismatch");
    const expired = await token();
    await expect(
      new RotatingJwks(async () => ({ keys: [expired.jwk] })).verify(
        expired.jwt,
        {
          issuer,
          audience: "app_test_direct",
          nonce: "expected",
          now: new Date(Date.now() + 600_000),
        },
      ),
    ).rejects.toThrow();
    await expect(
      new RotatingJwks(async () => ({ keys: [] })).verify(signed.jwt, {
        issuer,
        audience: "app_test_direct",
        nonce: "expected",
      }),
    ).rejects.toThrow();
  });

  test("rejects discovery endpoints from another environment", async () => {
    await expect(
      discover(
        issuer,
        fetchMetadata({
          ...metadata,
          userinfo_endpoint: "https://preview.authle.ss/oauth/userinfo",
        }),
      ),
    ).rejects.toThrow("endpoint_origin_mismatch");
  });

  test("rejects a same-origin discovery endpoint with the wrong provider path", async () => {
    await expect(
      discover(
        issuer,
        fetchMetadata({
          ...metadata,
          userinfo_endpoint: `${issuer}/userinfo`,
        }),
      ),
    ).rejects.toThrow("endpoint_path_mismatch");
  });

  test("refreshes JWKS once for a newly rotated kid", async () => {
    const signed = await token();
    let loads = 0;
    const claims = await new RotatingJwks(async () => ({
      keys: ++loads === 1 ? [] : [signed.jwk],
    })).verify(signed.jwt, {
      issuer,
      audience: "app_test_direct",
      nonce: "expected",
    });
    expect(claims.sub).toBe("pairwise_opaque_subject");
    expect(loads).toBe(2);
  });

  test("rejects redirect, state, denial, and one-time callback replay", () => {
    const fresh = () =>
      beginAuthorization(metadata, {
        clientId: "app_test_direct",
        redirectUri: "https://app.example.test/callback",
        scopes: [],
      });
    let pending = fresh();
    expect(() =>
      consumeCallback(
        `https://evil.example/callback?code=x&state=${pending.transaction.state}`,
        pending.transaction,
      ),
    ).toThrow("redirect_mismatch");
    pending = fresh();
    expect(() =>
      consumeCallback(
        "https://app.example.test/callback?code=x&state=wrong",
        pending.transaction,
      ),
    ).toThrow("state_mismatch");
    pending = fresh();
    expect(() =>
      consumeCallback(
        `https://app.example.test/callback?error=access_denied&state=${pending.transaction.state}`,
        pending.transaction,
      ),
    ).toThrow("consent_denied");
    pending = fresh();
    const url = `https://app.example.test/callback?code=x&state=${pending.transaction.state}`;
    consumeCallback(url, pending.transaction);
    expect(() => consumeCallback(url, pending.transaction)).toThrow(
      "code_replay",
    );
  });

  test("treats consent expansion, token revocation, and code replay as server-enforced negative outcomes", () => {
    const exchange = new Set<string>();
    const consent = new Set(["openid", "profile"]);
    const revoked = new Set(["access-1"]);
    const redeem = (code: string) => {
      if (exchange.has(code)) throw new Error("invalid_grant");
      exchange.add(code);
    };
    const authorize = (scopes: string[]) => {
      if (scopes.some((scope) => !consent.has(scope)))
        throw new Error("consent_required");
    };
    redeem("code-1");
    expect(() => redeem("code-1")).toThrow("invalid_grant");
    expect(() => authorize(["openid", "payments"])).toThrow("consent_required");
    expect(revoked.has("access-1")).toBe(true);
  });

  test("uses direct HTTP for code exchange, refresh rotation, DPoP UserInfo, revocation, and logout", async () => {
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    const fetcher = async (
      input: string | URL | Request,
      init?: RequestInit,
    ) => {
      const url = String(input);
      requests.push({ url, init });
      if (url.endsWith("/userinfo"))
        return new Response(JSON.stringify({ sub: "pairwise_opaque_subject" }));
      return new Response(
        JSON.stringify({
          access_token: "access-2",
          refresh_token: "refresh-2",
          token_type: "DPoP",
        }),
      );
    };
    await exchangeCode(
      metadata,
      {
        clientId: "app_test_direct",
        code: "one-time",
        codeVerifier: "verifier",
        redirectUri: "https://app.example.test/callback",
        dpopProof: "proof",
      },
      fetcher,
    );
    await rotateRefreshToken(
      metadata,
      {
        clientId: "app_test_direct",
        refreshToken: "refresh-1",
        dpopProof: "proof-2",
      },
      fetcher,
    );
    expect(
      await fetchUserInfo(metadata, "access-2", "proof-3", fetcher),
    ).toEqual({ sub: "pairwise_opaque_subject" });
    await revoke(
      metadata,
      {
        clientId: "app_test_direct",
        token: "refresh-2",
        hint: "refresh_token",
        dpopProof: "proof-4",
      },
      fetcher,
    );
    expect(requests.map(({ url }) => url)).toEqual([
      metadata.token_endpoint,
      metadata.token_endpoint,
      metadata.userinfo_endpoint,
      metadata.revocation_endpoint,
    ]);
    expect(requests[0]?.init?.body?.toString()).toContain(
      "code_verifier=verifier",
    );
    expect(
      (requests[2]?.init?.headers as Record<string, string> | undefined)
        ?.authorization,
    ).toBe("DPoP access-2");
    expect(
      logoutUrl(metadata, {
        idTokenHint: "id-token",
        postLogoutRedirectUri: "https://app.example.test/signed-out",
        state: "logout-state",
      }),
    ).toContain("id_token_hint=id-token");
  });
});
