import {
  createAuthorizationRequest,
  consumeAuthorizationResponse,
} from "@authless/browser";
import {
  createSessionHandle,
  exchangeAuthorizationCode,
  logoutResponse,
  revokeToken,
} from "@authless/sveltekit";

const stored = new Map<string, string>();
const authorization = await createAuthorizationRequest({
  authorizationEndpoint: "https://sign.authle.ss/authorize",
  clientId: "app_test_example",
  redirectUri: "https://app.example.test/auth/callback",
  storage: { setItem: (key, value) => stored.set(key, value) },
});
if (!new URL(authorization.url).searchParams.get("code_challenge"))
  throw new Error("PKCE missing");
const callbackUrl = `https://app.example.test/auth/callback?code=one-time-code&state=${authorization.state}`;
const callback = consumeAuthorizationResponse({
  callbackUrl,
  storage: {
    getItem: (key) => stored.get(key) ?? null,
    removeItem: (key) => {
      stored.delete(key);
    },
  },
});
if ("error" in callback) throw new Error("unexpected denial");
const pair = await crypto.subtle.generateKey(
  {
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["sign", "verify"],
);
const jwk = await crypto.subtle.exportKey("jwk", pair.publicKey);
const now = Math.floor(Date.now() / 1_000);
const encode = (value: unknown) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");
const header = encode({ alg: "RS256", kid: "test-key" });
const claims = encode({
  iss: "https://sign.authle.ss",
  aud: "app_test_example",
  sub: "person_test",
  nonce: callback.nonce,
  iat: now,
  exp: now + 300,
});
const signature = Buffer.from(
  await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    pair.privateKey,
    new TextEncoder().encode(`${header}.${claims}`),
  ),
).toString("base64url");
const tokens = await exchangeAuthorizationCode({
  callbackUrl,
  clientId: "app_test_example",
  issuer: "https://sign.authle.ss",
  tokenEndpoint: "https://sign.authle.ss/oauth/token",
  jwks: { keys: [{ ...jwk, kid: "test-key" }] },
  pending: { ...callback, expiresAt: Date.now() + 60_000 },
  dpopProof: async () => "opaque-dpop-proof",
  fetch: async () =>
    Response.json({
      access_token: "opaque-server-token",
      id_token: `${header}.${claims}.${signature}`,
      token_type: "DPoP",
      expires_in: 300,
    }),
});
const sessions = new Map([
  ["app-session", { sessionId: "app-session", subject: tokens.subject }],
]);
const handle = createSessionHandle({
  readSession: async () => sessions.get("app-session") ?? null,
});
const event = {
  request: new Request("https://app.example.test/account"),
  locals: {} as Record<string, unknown>,
};
await handle({
  event,
  resolve: async ({ locals }) =>
    Response.json({ protected: Boolean(locals.authless) }),
});
if (!event.locals.authless) throw new Error("protected data unavailable");
await revokeToken({
  clientId: "app_test_example",
  revocationEndpoint: "https://sign.authle.ss/oauth/revoke",
  token: "opaque-server-token",
  tokenTypeHint: "access_token",
  fetch: async () => new Response(null, { status: 200 }),
});
sessions.delete("app-session");
const logout = logoutResponse({ cookieName: "__Host-app_session" });
if (
  logout.status !== 204 ||
  !logout.headers.get("set-cookie")?.includes("HttpOnly; Secure; SameSite=Lax")
)
  throw new Error("logout failed");
console.log("SIGNED_IN protected_data_ok logout_ok revoked_access_denied");
