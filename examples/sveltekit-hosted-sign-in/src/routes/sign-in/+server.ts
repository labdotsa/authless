import { createAuthorizationRequest } from "@authless/browser";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies, locals }) => {
  const request = await createAuthorizationRequest({
    authorizationEndpoint: "https://sign.authle.ss/authorize",
    clientId: "app_test_example",
    redirectUri: "https://app.example.test/auth/callback",
    scopes: ["profile"],
    resource: "https://api.example.test/",
    storage: locals.pendingAuthorization,
  });
  cookies.set("__Host-authless_transaction", request.state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  redirect(303, request.url);
};
