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
