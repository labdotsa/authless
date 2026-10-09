import { consumeAuthorizationResponse } from "@authless/browser";
import { exchangeAuthorizationCode } from "@authless/sveltekit";
import { redirect, type RequestHandler } from "@sveltejs/kit";
import { fetchJwks } from "$lib/server/authless-demo";

export const GET: RequestHandler = async ({ request, cookies, locals }) => {
  const state = new URL(request.url).searchParams.get("state");
  const cookieState = cookies.get("__Host-authless_transaction");
  if (!state || state !== cookieState) {
    cookies.delete("__Host-authless_transaction", { path: "/" });
    redirect(303, "/?result=authorization_state_invalid");
  }
  let transaction: ReturnType<typeof locals.pendingTransactions.read>;
  let callback: ReturnType<typeof consumeAuthorizationResponse>;
  try {
    transaction = locals.pendingTransactions.read(state);
    callback = consumeAuthorizationResponse({
      callbackUrl: request.url,
      storage: locals.pendingAuthorization,
    });
  } catch {
    cookies.delete("__Host-authless_transaction", { path: "/" });
    redirect(303, "/?result=authorization_transaction_invalid");
  }
  cookies.delete("__Host-authless_transaction", { path: "/" });
  if ("error" in callback) redirect(303, "/?result=authorization_denied");
  const tokens = await exchangeAuthorizationCode({
    callbackUrl: request.url,
    clientId: "app_test_example",
    issuer: "https://sign.authle.ss",
    tokenEndpoint: "https://sign.authle.ss/oauth/token",
    jwks: await fetchJwks(),
    pending: { ...callback, expiresAt: transaction.expiresAt },
    dpopProof: locals.createDpopProof,
  });
  const sessionId = await locals.sessions.create({
    subject: tokens.subject,
    accessToken: tokens.accessToken,
  });
  cookies.set("__Host-app_session", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  redirect(303, "/account?result=SIGNED_IN");
};
