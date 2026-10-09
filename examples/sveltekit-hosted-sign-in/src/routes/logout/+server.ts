import { logoutResponse, revokeToken } from "@authless/sveltekit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
  if (!locals.authless) {
    return logoutResponse({ cookieName: "__Host-app_session" });
  }
  const session = await locals.sessions.require(locals.authless.sessionId);
  await revokeToken({
    clientId: "app_test_example",
    revocationEndpoint: "https://sign.authle.ss/oauth/revoke",
    token: session.accessToken,
    tokenTypeHint: "access_token",
  });
  await locals.sessions.destroy(session.id);
  return logoutResponse({
    cookieName: "__Host-app_session",
    endSessionEndpoint: "https://sign.authle.ss/logout",
    postLogoutRedirectUri: "https://app.example.test/",
  });
};
