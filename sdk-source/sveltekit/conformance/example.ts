import { exchangeAuthorizationCode } from "../src/oidc";
import { logoutResponse } from "../src/session";
import { verifyWebhook } from "../src/webhook";

/**
 * Non-deployed SvelteKit-shaped example. The relying app supplies transaction,
 * session, replay, credentials, and authorization policy stores; helpers own
 * only protocol verification.
 */
export function createConformanceExample(options: {
  callback: Omit<
    Parameters<typeof exchangeAuthorizationCode>[0],
    "callbackUrl"
  >;
  cookieName: `__Host-${string}`;
  saveAppSession(subject: string): Promise<string>;
  webhook: Omit<
    Parameters<typeof verifyWebhook>[0],
    "body" | "eventId" | "signature" | "timestamp"
  >;
}) {
  return {
    async callback(request: Request): Promise<Response> {
      const tokens = await exchangeAuthorizationCode({
        ...options.callback,
        callbackUrl: request.url,
      });
      const session = await options.saveAppSession(tokens.subject);
      return new Response(null, {
        status: 303,
        headers: {
          "cache-control": "no-store",
          location: "/",
          "set-cookie": `${options.cookieName}=${encodeURIComponent(session)}; Path=/; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    },
    logout(): Response {
      return logoutResponse({ cookieName: options.cookieName });
    },
    async webhook(request: Request): Promise<Response> {
      await verifyWebhook({
        ...options.webhook,
        body: await request.text(),
        eventId: request.headers.get("webhook-id") ?? "",
        signature: request.headers.get("webhook-signature") ?? "",
        timestamp: request.headers.get("webhook-timestamp") ?? "",
      });
      return new Response(null, { status: 204 });
    },
  };
}
