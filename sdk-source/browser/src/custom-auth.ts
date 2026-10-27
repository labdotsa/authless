import { consumeAuthorizationResponse } from "./authorization";
import type { GuestBrowserBinding } from "./guest-continuity";
import {
  createGuestBrowserBinding,
  createGuestDpopProof,
  guestDpopJkt,
} from "./guest-continuity";

export type PublicCustomMethod = "guest" | "email_code";
export type PublicCustomRegistration = {
  authlessOrigin: string;
  apiOrigin?: string;
  authorizationEndpoint: string;
  clientId: string;
  appId: string;
  environmentId: string;
  workspaceId: string;
  origin: string;
  redirectUri: string;
  policyVersion: number;
  tokenEndpoint: string;
  userinfoEndpoint: string;
  jwksUri: string;
  revocationEndpoint?: string;
  endSessionEndpoint?: string;
  refreshEligible?: boolean;
  postLogoutRedirectUri?: string;
};
export type PublicCustomErrorCode =
  | "invalid_registration"
  | "unsupported_method"
  | "continuity_unavailable"
  | "proof_rejected"
  | "transaction_rejected"
  | "callback_rejected"
  | "token_rejected"
  | "authority_rejected"
  | "network_unknown";
export class PublicCustomAuthError extends Error {
  readonly code: PublicCustomErrorCode;
  constructor(code: PublicCustomErrorCode, message: string = code) {
    super(message);
    this.name = "PublicCustomAuthError";
    this.code = code;
  }
}
type Transport = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;
type Pending = {
  method: PublicCustomMethod;
  state: string;
  nonce: string;
  verifier: string;
  codeChallenge: string;
  dpopJkt?: string;
  redirectUri: string;
  binding: GuestBrowserBinding;
  transactionId: string;
  browserBinding: string;
  scopes: string[];
  guestContinuityMode: "isolated" | "network";
  prepared?: boolean;
};
export type PublicCustomTokens = {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
  expiresAt: number;
  tokenType: "DPoP";
  subject: string;
  claims: Record<string, unknown>;
};

const b64 = (bytes: Uint8Array) => {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
};
const random = () => b64(crypto.getRandomValues(new Uint8Array(32)));
const digest = async (value: string) =>
  b64(
    new Uint8Array(
      await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
    ),
  );
const json = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new PublicCustomAuthError("transaction_rejected");
  return value as Record<string, unknown>;
};
const text = (value: unknown, code: PublicCustomErrorCode): string => {
  if (typeof value !== "string" || !value)
    throw new PublicCustomAuthError(code);
  return value;
};
function url(value: string, label: string): URL {
  let result: URL;
  try {
    result = new URL(value);
  } catch {
    throw new PublicCustomAuthError("invalid_registration");
  }
  const local = ["localhost", "127.0.0.1"].includes(result.hostname);
  const loopbackHttp = local && result.protocol === "http:";
  if (
    (result.protocol !== "https:" && !loopbackHttp) ||
    result.username ||
    result.password ||
    result.hash
  )
    throw new PublicCustomAuthError(
      "invalid_registration",
      `${label} must be an exact HTTPS URL`,
    );
  return result;
}
function validateRegistration(r: PublicCustomRegistration) {
  const origin = url(r.origin, "origin");
  const authlessOrigin = url(r.authlessOrigin, "authlessOrigin");
  const apiOrigin = url(r.apiOrigin ?? r.authlessOrigin, "apiOrigin");
  if (authlessOrigin.pathname !== "/" || authlessOrigin.search)
    throw new PublicCustomAuthError("invalid_registration");
  if (apiOrigin.pathname !== "/" || apiOrigin.search || apiOrigin.hash)
    throw new PublicCustomAuthError("invalid_registration");
  if (origin.pathname !== "/" || origin.search)
    throw new PublicCustomAuthError("invalid_registration");
  for (const key of [
    "authlessOrigin",
    "authorizationEndpoint",
    "tokenEndpoint",
    "userinfoEndpoint",
    "jwksUri",
  ] as const)
    if (url(r[key], key).origin !== authlessOrigin.origin)
      throw new PublicCustomAuthError(
        "invalid_registration",
        `${key} must use authlessOrigin`,
      );
  const redirect = url(r.redirectUri, "redirectUri");
  if (
    redirect.origin !== origin.origin ||
    !Number.isSafeInteger(r.policyVersion) ||
    r.policyVersion < 1
  )
    throw new PublicCustomAuthError("invalid_registration");
  for (const key of ["revocationEndpoint", "endSessionEndpoint"] as const)
    if (r[key] && url(r[key], key).origin !== authlessOrigin.origin)
      throw new PublicCustomAuthError(
        "invalid_registration",
        `${key} must use authlessOrigin`,
      );
  if (r.postLogoutRedirectUri) {
    const postLogout = url(r.postLogoutRedirectUri, "postLogoutRedirectUri");
    if (postLogout.origin !== origin.origin)
      throw new PublicCustomAuthError("invalid_registration");
  }
}
function parseJwt(token: string) {
  const parts = token.split(".");
  const [headerPart, payloadPart, signaturePart] = parts;
  if (!headerPart || !payloadPart || !signaturePart)
    throw new PublicCustomAuthError("token_rejected");
  const decode = (part: string) =>
    JSON.parse(
      atob(
        part.replaceAll("-", "+").replaceAll("_", "/") +
          "=".repeat((4 - (part.length % 4)) % 4),
      ),
    ) as Record<string, unknown>;
  return {
    header: decode(headerPart),
    payload: decode(payloadPart),
    signing: `${headerPart}.${payloadPart}`,
    signature: Uint8Array.from(
      atob(
        signaturePart.replaceAll("-", "+").replaceAll("_", "/") +
          "=".repeat((4 - (signaturePart.length % 4)) % 4),
      ),
      (c) => c.charCodeAt(0),
    ),
  };
}

export class PublicCustomAuthClient {
  private pending: Pending | null = null;
  private tokens: PublicCustomTokens | null = null;
  private dpopBinding: GuestBrowserBinding | null = null;
  private popup: Window | null = null;
  private popupTarget = "authless-sign-in";
  private readonly transport: Transport;
  constructor(
    readonly registration: PublicCustomRegistration,
    options: { fetch?: Transport } = {},
  ) {
    validateRegistration(registration);
    this.transport = options.fetch ?? globalThis.fetch.bind(globalThis);
  }
  get session(): PublicCustomTokens | null {
    return this.tokens;
  }
  async begin(
    method: PublicCustomMethod,
    input: {
      email?: string;
      scopes?: readonly string[];
      browserSessionBinding?: string;
      guestContinuityMode?: "isolated" | "network";
    } = {},
  ) {
    if (!["guest", "email_code"].includes(method))
      throw new PublicCustomAuthError("unsupported_method");
    if (
      method === "email_code" &&
      input.email !== undefined &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(input.email)
    )
      throw new PublicCustomAuthError("proof_rejected");
    if (
      method === "guest" &&
      input.scopes?.some((scope) => scope === "offline_access")
    )
      throw new PublicCustomAuthError(
        "unsupported_method",
        "guest_refresh_unavailable",
      );
    const binding = await createGuestBrowserBinding();
    const state = random(),
      nonce = random(),
      verifier = random();
    const browserBinding = input.browserSessionBinding ?? random();
    const challenge = await digest(verifier);
    const dpopJkt =
      method === "guest" ? await guestDpopJkt(binding) : undefined;
    const body = {
      appId: this.registration.appId,
      browserSessionBinding: browserBinding,
      clientId: this.registration.clientId,
      codeChallenge: challenge,
      environmentId: this.registration.environmentId,
      method,
      mode: "public",
      nonce,
      origin: this.registration.origin,
      policyVersion: this.registration.policyVersion,
      principalMode: method === "guest" ? "guest" : "person",
      redirectUri: this.registration.redirectUri,
      requestedScopes: [...new Set(["openid", ...(input.scopes ?? [])])],
      state,
      workspaceId: this.registration.workspaceId,
    };
    const started = await this.post(
      "/v1/custom-auth/transactions",
      body,
      this.registration.origin,
    );
    const transaction = json(json(await started.json()).transaction);
    const transactionId = text(transaction.id, "transaction_rejected");
    const scopes = body.requestedScopes;
    this.pending = {
      method,
      state,
      nonce,
      verifier,
      codeChallenge: challenge,
      dpopJkt,
      redirectUri: this.registration.redirectUri,
      binding,
      transactionId,
      browserBinding,
      scopes,
      guestContinuityMode: input.guestContinuityMode ?? "isolated",
    };
    this.dpopBinding = binding;
    if (method === "email_code") {
      const challengeResponse = await this.post(
        `/v1/custom-auth/transactions/${encodeURIComponent(transactionId)}/challenge`,
        { ...body, ...(input.email ? { email: input.email } : {}) },
        this.registration.origin,
      );
      if (!challengeResponse.ok)
        throw new PublicCustomAuthError("proof_rejected");
    }
    const authorization = new URL(
      this.authorizationUrl(body.requestedScopes, challenge, state, nonce),
    );
    if (dpopJkt) authorization.searchParams.set("dpop_jkt", dpopJkt);
    const navigation =
      method === "guest"
        ? (() => {
            const choice = new URL(
              "/guest/continuity",
              this.registration.authlessOrigin,
            );
            choice.searchParams.set("handoff", authorization.toString());
            return choice;
          })()
        : authorization;
    return {
      transactionId,
      method,
      state,
      nonce,
      browserSessionBinding: browserBinding,
      url: navigation.toString(),
    };
  }
  async verifyGuest() {
    return this.verify({});
  }
  async verifyEmailCode(code: string) {
    return this.verify({ code });
  }
  private async verify(input: { code?: string }) {
    const p = this.pending;
    if (!p) throw new PublicCustomAuthError("transaction_rejected");
    const body = {
      browserSessionBinding: p.browserBinding,
      clientId: this.registration.clientId,
      ...(input.code ? { code: input.code } : {}),
      method: p.method,
      mode: "public",
      nonce: p.nonce,
      origin: this.registration.origin,
      policyVersion: this.registration.policyVersion,
      principalMode: p.method === "guest" ? "guest" : "person",
      redirectUri: p.redirectUri,
      requestedScopes: p.scopes,
      state: p.state,
      appId: this.registration.appId,
      environmentId: this.registration.environmentId,
      workspaceId: this.registration.workspaceId,
      codeChallenge: await digest(p.verifier),
    };
    const response = await this.post(
      `/v1/custom-auth/transactions/${encodeURIComponent(p.transactionId)}/verify`,
      body,
      this.registration.origin,
    );
    if (!response.ok) throw new PublicCustomAuthError("proof_rejected");
    const completed = await this.post(
      `/v1/custom-auth/transactions/${encodeURIComponent(p.transactionId)}/complete`,
      body,
      this.registration.origin,
    );
    if (!completed.ok) throw new PublicCustomAuthError("proof_rejected");
    const proof = json(json(await completed.json()).proof);
    return text(proof.continuationToken, "proof_rejected");
  }
  authorizationUrl(
    scopes: readonly string[] = ["openid"],
    challenge?: string,
    state?: string,
    nonce?: string,
  ) {
    const p = this.pending;
    const query = new URL(this.registration.authorizationEndpoint);
    query.searchParams.set("client_id", this.registration.clientId);
    query.searchParams.set("redirect_uri", this.registration.redirectUri);
    query.searchParams.set("response_type", "code");
    query.searchParams.set("scope", [...new Set(scopes)].join(" "));
    query.searchParams.set("code_challenge", challenge ?? "");
    query.searchParams.set("code_challenge_method", "S256");
    query.searchParams.set("state", state ?? p?.state ?? "");
    query.searchParams.set("nonce", nonce ?? p?.nonce ?? "");
    if (p?.method === "guest") {
      const bindingJwk = btoa(JSON.stringify(p.binding.publicJwk))
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replace(/=+$/u, "");
      query.searchParams.set("authless_guest_continuity", "1");
      query.searchParams.set(
        "authless_guest_mode",
        p.guestContinuityMode ?? "isolated",
      );
      query.searchParams.set(
        "prompt",
        p.guestContinuityMode === "network" ? "consent login" : "login",
      );
      query.searchParams.set("authless_guest_binding", bindingJwk);
    }
    return query.toString();
  }
  interactionSubmission(interactionUrl: string, continuationToken: string) {
    const endpoint = url(interactionUrl, "interactionUrl");
    const p = this.pending;
    if (
      !p ||
      !continuationToken ||
      endpoint.origin !== new URL(this.registration.authlessOrigin).origin
    )
      throw new PublicCustomAuthError("callback_rejected");
    return new Request(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        origin: this.registration.origin,
      },
      body: new URLSearchParams({
        continuation_token: continuationToken,
        browser_session_binding: p.browserBinding,
      }),
    });
  }
  openAuthorizationPopup(
    urlValue: string,
    options: { target?: string; features?: string } = {},
  ) {
    if (typeof window === "undefined")
      throw new PublicCustomAuthError(
        "callback_rejected",
        "browser window is unavailable",
      );
    const popupTarget = new URL(urlValue);
    const pending = this.pending;
    if (popupTarget.toString() !== "about:blank" && !pending)
      throw new PublicCustomAuthError(
        "callback_rejected",
        "invalid_authorization_url",
      );
    if (popupTarget.toString() !== "about:blank" && pending) {
      const authorize =
        pending.method === "guest"
          ? (() => {
              if (
                popupTarget.origin !==
                  new URL(this.registration.authlessOrigin).origin ||
                popupTarget.pathname !== "/guest/continuity" ||
                [...popupTarget.searchParams.keys()].some(
                  (key) => key !== "handoff",
                )
              )
                return null;
              const handoff = popupTarget.searchParams.get("handoff");
              if (!handoff) return null;
              try {
                return new URL(handoff);
              } catch {
                return null;
              }
            })()
          : popupTarget;
      const expectedBinding = btoa(JSON.stringify(pending.binding.publicJwk))
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replace(/=+$/u, "");
      if (
        !authorize ||
        authorize.origin !==
          new URL(this.registration.authorizationEndpoint).origin ||
        authorize.pathname !==
          new URL(this.registration.authorizationEndpoint).pathname ||
        authorize.searchParams.get("client_id") !==
          this.registration.clientId ||
        authorize.searchParams.get("redirect_uri") !==
          this.registration.redirectUri ||
        authorize.searchParams.get("response_type") !== "code" ||
        authorize.searchParams.get("state") !== pending.state ||
        authorize.searchParams.get("nonce") !== pending.nonce ||
        authorize.searchParams.get("code_challenge_method") !== "S256" ||
        authorize.searchParams.get("code_challenge") !==
          pending.codeChallenge ||
        authorize.searchParams.get("scope") !== pending.scopes.join(" ") ||
        (pending.method === "guest" &&
          (authorize.searchParams.get("authless_guest_continuity") !== "1" ||
            authorize.searchParams.get("authless_guest_mode") !==
              pending.guestContinuityMode ||
            authorize.searchParams.get("authless_guest_binding") !==
              expectedBinding ||
            authorize.searchParams.get("dpop_jkt") !== pending.dpopJkt))
      )
        throw new PublicCustomAuthError(
          "callback_rejected",
          "invalid_authorization_url",
        );
    }
    const target = options.target ?? "authless-sign-in";
    const popup = window.open(
      urlValue,
      target,
      options.features ?? "popup,width=480,height=720",
    );
    if (!popup)
      throw new PublicCustomAuthError(
        "continuity_unavailable",
        "popup_blocked",
      );
    this.popup = popup;
    this.popupTarget = target;
    return popup;
  }
  private submitPopupForm(path: string, fields: Record<string, string>) {
    if (!this.popup || this.popup.closed)
      throw new PublicCustomAuthError("callback_rejected", "popup_closed");
    if (typeof document === "undefined" || !document.body)
      throw new PublicCustomAuthError(
        "continuity_unavailable",
        "document_unavailable",
      );
    const form = document.createElement("form");
    form.method = "post";
    form.action = new URL(path, this.registration.authlessOrigin).toString();
    form.target = this.popupTarget;
    form.hidden = true;
    for (const [name, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.append(input);
    }
    document.body.append(form);
    form.submit();
    form.remove();
  }
  async awaitGuestPreparation(timeoutMs = 300_000): Promise<void> {
    const p = this.pending;
    const popup = this.popup;
    if (p?.method !== "guest" || !popup)
      throw new PublicCustomAuthError(
        "continuity_unavailable",
        "popup_not_ready",
      );
    const expectedOrigin = new URL(this.registration.authlessOrigin).origin;
    await new Promise<void>((resolve, reject) => {
      const pending = p;
      const cleanup = (clearPopup = false) => {
        window.clearTimeout(timer);
        window.clearInterval(watcher);
        window.removeEventListener("message", onMessage);
        if (clearPopup && this.popup === popup) this.popup = null;
      };
      const onMessage = (event: MessageEvent) => {
        if (
          event.origin !== expectedOrigin ||
          event.source !== popup ||
          event.data?.type !== "authless:custom-ready" ||
          event.data.state !== pending.state ||
          event.data.transactionId !== pending.transactionId
        )
          return;
        cleanup();
        if (
          event.data.guestContinuityMode === "network" ||
          event.data.guestContinuityMode === "isolated"
        )
          p.guestContinuityMode = event.data.guestContinuityMode;
        p.prepared = true;
        resolve();
      };
      const timer = window.setTimeout(() => {
        cleanup();
        reject(
          new PublicCustomAuthError("callback_rejected", "prepare_timeout"),
        );
      }, timeoutMs);
      const watcher = window.setInterval(() => {
        if (popup.closed) {
          cleanup(true);
          reject(
            new PublicCustomAuthError("callback_rejected", "popup_closed"),
          );
        }
      }, 500);
      window.addEventListener("message", onMessage);
      try {
        this.submitPopupForm("/custom/prepare", {
          transaction_id: p.transactionId,
          browser_session_binding: p.browserBinding,
          client_id: this.registration.clientId,
          redirect_uri: p.redirectUri,
          scope: p.scopes.join(" "),
          state: p.state,
          nonce: p.nonce,
          code_challenge: p.codeChallenge,
          return_mode: "popup",
          guest_continuity_mode: p.guestContinuityMode,
          guest_binding: btoa(JSON.stringify(p.binding.publicJwk))
            .replaceAll("+", "-")
            .replaceAll("/", "_")
            .replace(/=+$/u, ""),
          dpop_jkt: p.dpopJkt ?? "",
        });
      } catch (error) {
        cleanup();
        reject(error);
      }
    });
  }
  waitForPopupCallback(
    continuationToken: string,
    timeoutMs = 300_000,
  ): Promise<PublicCustomTokens> {
    if (typeof window === "undefined")
      return Promise.reject(
        new PublicCustomAuthError(
          "callback_rejected",
          "browser window is unavailable",
        ),
      );
    return new Promise((resolve, reject) => {
      const expectedOrigin = new URL(this.registration.redirectUri).origin;
      const pending = this.pending;
      const prepared = pending?.prepared ?? pending?.method !== "guest";
      const cleanup = () => {
        window.clearTimeout(timer);
        window.clearInterval(watcher);
        window.removeEventListener("message", onMessage);
        this.popup = null;
      };
      const timer = window.setTimeout(() => {
        cleanup();
        reject(
          new PublicCustomAuthError("callback_rejected", "callback_timeout"),
        );
      }, timeoutMs);
      const watcher = window.setInterval(() => {
        if (this.popup?.closed) {
          cleanup();
          reject(
            new PublicCustomAuthError("callback_rejected", "popup_closed"),
          );
        }
      }, 500);
      const onMessage = (event: MessageEvent) => {
        if (
          event.origin !== expectedOrigin ||
          event.source !== this.popup ||
          !event.data ||
          event.data.type !== "authless:callback" ||
          typeof event.data.url !== "string"
        )
          return;
        cleanup();
        this.callback(event.data.url, continuationToken).then(resolve, reject);
      };
      window.addEventListener("message", onMessage);
      if (!pending || (pending.method === "guest" && !prepared)) {
        cleanup();
        reject(
          new PublicCustomAuthError(
            "continuity_unavailable",
            "guest_preparation_required",
          ),
        );
        return;
      }
      try {
        this.submitPopupForm("/custom/handoff", {
          continuation_token: continuationToken,
          transaction_id: pending.transactionId,
          browser_session_binding: pending.browserBinding,
          client_id: this.registration.clientId,
          redirect_uri: pending.redirectUri,
          scope: pending.scopes.join(" "),
          state: pending.state,
          nonce: pending.nonce,
          code_challenge: pending.codeChallenge,
          ...(pending.dpopJkt ? { dpop_jkt: pending.dpopJkt } : {}),
        });
      } catch (error) {
        cleanup();
        reject(error);
      }
    });
  }
  async callback(callbackUrl: string, _continuationToken: string) {
    const p = this.pending;
    if (!p) throw new PublicCustomAuthError("callback_rejected");
    let callback: URL;
    try {
      callback = new URL(callbackUrl);
    } catch {
      throw new PublicCustomAuthError(
        "callback_rejected",
        "malformed_callback",
      );
    }
    if (
      callback.origin !== new URL(this.registration.redirectUri).origin ||
      callback.pathname !== new URL(this.registration.redirectUri).pathname ||
      callback.searchParams.get("state") !== p.state
    )
      throw new PublicCustomAuthError("callback_rejected");
    const consumed = consumeAuthorizationResponse({
      callbackUrl,
      storage: {
        getItem: () =>
          JSON.stringify({
            expiresAt: Date.now() + 600_000,
            nonce: p.nonce,
            redirectUri: p.redirectUri,
            verifier: p.verifier,
          }),
        removeItem: () => undefined,
      },
    });
    if ("error" in consumed)
      throw new PublicCustomAuthError("callback_rejected");
    // Consume the verifier before network work. Callback messages are one-use.
    this.pending = null;
    const proof = await createGuestDpopProof({
      binding: p.binding,
      htu: this.registration.tokenEndpoint,
      htm: "POST",
      nonce: "",
    });
    const response = await this.transport(this.registration.tokenEndpoint, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        DPoP: proof,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: this.registration.clientId,
        code: consumed.code,
        redirect_uri: consumed.redirectUri,
        code_verifier: consumed.verifier,
      }),
    });
    if (!response.ok) throw new PublicCustomAuthError("token_rejected");
    const payload = json(await response.json());
    const accessToken = text(payload.access_token, "token_rejected");
    const idToken =
      typeof payload.id_token === "string" ? payload.id_token : undefined;
    const claims = idToken ? await this.validateIdToken(idToken, p.nonce) : {};
    const subject = text(claims.sub, "authority_rejected");
    this.tokens = {
      accessToken,
      ...(idToken ? { idToken } : {}),
      ...(typeof payload.refresh_token === "string" &&
      this.registration.refreshEligible &&
      p.method === "email_code"
        ? { refreshToken: payload.refresh_token }
        : {}),
      expiresAt:
        Date.now() +
        (typeof payload.expires_in === "number"
          ? payload.expires_in * 1000
          : 300_000),
      tokenType: "DPoP",
      subject,
      claims,
    };
    return this.tokens;
  }
  async userInfo() {
    if (!this.tokens || !this.dpopBinding)
      throw new PublicCustomAuthError("authority_rejected");
    const proof = await createGuestDpopProof({
      binding: this.dpopBinding,
      htu: this.registration.userinfoEndpoint,
      htm: "GET",
      nonce: "",
      accessToken: this.tokens.accessToken,
    });
    const response = await this.transport(this.registration.userinfoEndpoint, {
      headers: {
        Authorization: `DPoP ${this.tokens.accessToken}`,
        DPoP: proof,
      },
    });
    if (!response.ok) throw new PublicCustomAuthError("authority_rejected");
    return json(await response.json());
  }
  continuityUnavailable(reason = "blocked_storage") {
    return { kind: "continuity-unavailable" as const, reason };
  }
  cancel() {
    this.pending = null;
    this.dpopBinding = null;
    this.popup = null;
    return { completed: false as const, outcome: "unknown" as const };
  }
  async switchAccount(
    method: PublicCustomMethod,
    input: { email?: string; scopes?: readonly string[] } = {},
  ) {
    const loggedOut = await this.logout();
    if (!loggedOut.completed) return loggedOut;
    return this.begin(method, input);
  }
  async renew() {
    const current = this.tokens;
    if (
      !current?.refreshToken ||
      !this.registration.refreshEligible ||
      !this.dpopBinding
    )
      throw new PublicCustomAuthError(
        "unsupported_method",
        "refresh is unavailable for this public session",
      );
    const proof = await createGuestDpopProof({
      binding: this.dpopBinding,
      htu: this.registration.tokenEndpoint,
      htm: "POST",
      nonce: "",
    });
    const response = await this.transport(this.registration.tokenEndpoint, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        DPoP: proof,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: current.refreshToken,
        client_id: this.registration.clientId,
      }),
    });
    if (!response.ok) {
      this.tokens = null;
      throw new PublicCustomAuthError("token_rejected");
    }
    const payload = json(await response.json());
    const accessToken = text(payload.access_token, "token_rejected");
    const refreshToken = text(payload.refresh_token, "token_rejected");
    this.tokens = {
      ...current,
      accessToken,
      refreshToken,
      expiresAt:
        Date.now() +
        (typeof payload.expires_in === "number"
          ? payload.expires_in * 1000
          : 300_000),
    };
    return this.tokens;
  }
  async logout() {
    const token = this.tokens;
    this.tokens = null;
    this.pending = null;
    this.dpopBinding = null;
    if (!token) return { completed: true as const };
    let revoked = false;
    if (this.registration.revocationEndpoint) {
      try {
        const response = await this.transport(
          this.registration.revocationEndpoint,
          {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              token: token.accessToken,
              token_type_hint: "access_token",
              client_id: this.registration.clientId,
            }),
          },
        );
        if (!response.ok)
          return { completed: false as const, outcome: "unknown" as const };
        revoked = true;
      } catch {
        return { completed: false as const, outcome: "unknown" as const };
      }
    }
    if (
      !this.registration.revocationEndpoint &&
      !this.registration.endSessionEndpoint
    )
      return { completed: false as const, outcome: "unsupported" as const };
    if (!this.registration.endSessionEndpoint || !token.idToken)
      return revoked
        ? { completed: true as const }
        : { completed: false as const, outcome: "unsupported" as const };
    try {
      const endpoint = new URL(this.registration.endSessionEndpoint);
      endpoint.searchParams.set("id_token_hint", token.idToken);
      endpoint.searchParams.set("client_id", this.registration.clientId);
      if (this.registration.postLogoutRedirectUri)
        endpoint.searchParams.set(
          "post_logout_redirect_uri",
          this.registration.postLogoutRedirectUri,
        );
      const response = await this.transport(endpoint, { method: "GET" });
      return response.ok && revoked
        ? { completed: true as const }
        : response.ok
          ? { completed: false as const, outcome: "unsupported" as const }
          : { completed: false as const, outcome: "unknown" as const };
    } catch {
      return { completed: false as const, outcome: "unknown" as const };
    }
  }
  private async validateIdToken(token: string, nonce: string) {
    let parsed: ReturnType<typeof parseJwt>;
    try {
      parsed = parseJwt(token);
    } catch {
      throw new PublicCustomAuthError("token_rejected", "malformed_id_token");
    }
    if (
      parsed.header.alg !== "RS256" ||
      (parsed.header.kty !== undefined && parsed.header.kty !== "RSA") ||
      parsed.payload.iss !== new URL(this.registration.authlessOrigin).origin ||
      (typeof parsed.payload.aud !== "string" &&
        !(
          Array.isArray(parsed.payload.aud) &&
          parsed.payload.aud.every((value) => typeof value === "string") &&
          parsed.payload.aud.includes(this.registration.clientId) &&
          parsed.payload.aud.length > 1 &&
          parsed.payload.azp === this.registration.clientId
        )) ||
      (Array.isArray(parsed.payload.aud) &&
        parsed.payload.aud.length === 1 &&
        parsed.payload.aud[0] !== this.registration.clientId) ||
      (typeof parsed.payload.aud === "string" &&
        parsed.payload.aud !== this.registration.clientId) ||
      parsed.payload.nonce !== nonce ||
      typeof parsed.payload.iat !== "number" ||
      parsed.payload.iat * 1000 > Date.now() + 60_000 ||
      typeof parsed.payload.exp !== "number" ||
      parsed.payload.exp * 1000 <= Date.now()
    )
      throw new PublicCustomAuthError("authority_rejected");
    let keys: Record<string, unknown>;
    try {
      const response = await this.transport(this.registration.jwksUri, {
        headers: { accept: "application/json" },
      });
      if (!response.ok) throw new Error("jwks_unavailable");
      keys = json(await response.json());
    } catch {
      throw new PublicCustomAuthError("authority_rejected", "jwks_unavailable");
    }
    const jwk = (Array.isArray(keys.keys) ? keys.keys : []).find(
      (key) => json(key).kid === parsed.header.kid,
    ) as JsonWebKey | undefined;
    if (
      !jwk ||
      json(jwk).kty !== "RSA" ||
      (json(jwk).alg && json(jwk).alg !== "RS256")
    )
      throw new PublicCustomAuthError("authority_rejected");
    try {
      const publicKey = await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["verify"],
      );
      if (
        !(await crypto.subtle.verify(
          { name: "RSASSA-PKCS1-v1_5" },
          publicKey,
          parsed.signature,
          new TextEncoder().encode(parsed.signing),
        ))
      )
        throw new Error("invalid_signature");
    } catch {
      throw new PublicCustomAuthError("authority_rejected", "invalid_id_token");
    }
    return parsed.payload;
  }
  private async post(
    endpoint: string,
    body: unknown,
    origin?: string,
    extraHeaders: Record<string, string> = {},
  ) {
    const baseOrigin = endpoint.startsWith("/v1/custom-auth/")
      ? (this.registration.apiOrigin ?? this.registration.authlessOrigin)
      : this.registration.authlessOrigin;
    const requestUrl = new URL(endpoint, baseOrigin);
    if (origin)
      requestUrl.searchParams.set("client_id", this.registration.clientId);
    const response = await this.transport(requestUrl.toString(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(origin
          ? { origin, "x-authless-client-id": this.registration.clientId }
          : {}),
        ...extraHeaders,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok && endpoint.includes("transactions"))
      throw new PublicCustomAuthError("transaction_rejected");
    return response;
  }
}
