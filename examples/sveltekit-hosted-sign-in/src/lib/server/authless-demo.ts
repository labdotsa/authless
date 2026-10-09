import { randomUUID } from "node:crypto";

type PendingTransaction = {
  expiresAt: number;
  nonce: string;
  redirectUri: string;
  verifier: string;
};

type AppSession = {
  accessToken: string;
  id: string;
  subject: string;
  expiresAt: number;
};

const pending = new Map<string, string>();
const appSessions = new Map<string, AppSession>();

/** Server-only adapter used by @authless/browser. Replace with a durable store in production. */
export const pendingAuthorization: Pick<
  Storage,
  "getItem" | "removeItem" | "setItem"
> = {
  getItem: (key) => pending.get(key) ?? null,
  removeItem: (key) => {
    pending.delete(key);
  },
  setItem: (key, value) => {
    pending.set(key, value);
  },
};

export const pendingTransactions = {
  read(state: string): PendingTransaction {
    const raw = pending.get(`authless:authorization:${state}`);
    if (!raw) throw new Error("Authorization transaction is missing");
    let value: unknown;
    try {
      value = JSON.parse(raw);
    } catch {
      pending.delete(`authless:authorization:${state}`);
      throw new Error("Authorization transaction is invalid");
    }
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error("Authorization transaction is invalid");
    const transaction = value as Partial<PendingTransaction>;
    if (
      typeof transaction.expiresAt !== "number" ||
      typeof transaction.nonce !== "string" ||
      typeof transaction.redirectUri !== "string" ||
      typeof transaction.verifier !== "string"
    )
      throw new Error("Authorization transaction is invalid");
    if (
      !Number.isFinite(transaction.expiresAt) ||
      transaction.expiresAt <= Date.now()
    ) {
      pending.delete(`authless:authorization:${state}`);
      throw new Error("Authorization transaction is expired");
    }
    return transaction as PendingTransaction;
  },
  prune(): void {
    for (const [key, raw] of pending) {
      try {
        const value: unknown = JSON.parse(raw);
        const transaction =
          value && typeof value === "object" && !Array.isArray(value)
            ? (value as Partial<PendingTransaction>)
            : null;
        if (
          !transaction ||
          typeof transaction.expiresAt !== "number" ||
          transaction.expiresAt <= Date.now()
        )
          pending.delete(key);
      } catch {
        pending.delete(key);
      }
    }
  },
};

export const sessions = {
  async create(
    input: Pick<AppSession, "accessToken" | "subject">,
  ): Promise<string> {
    pendingTransactions.prune();
    const id = randomUUID();
    appSessions.set(id, { ...input, id, expiresAt: Date.now() + 600_000 });
    return id;
  },
  async read(
    request: Request,
  ): Promise<{ sessionId: string; subject: string; expiresAt: string } | null> {
    const cookie = request.headers
      .get("cookie")
      ?.match(/(?:^|;\s*)__Host-app_session=([^;]+)/)?.[1];
    const session = cookie ? appSessions.get(cookie) : undefined;
    if (!session || session.expiresAt <= Date.now()) {
      if (cookie) appSessions.delete(cookie);
      return null;
    }
    return {
      sessionId: session.id,
      subject: session.subject,
      expiresAt: new Date(session.expiresAt).toISOString(),
    };
  },
  async require(id: string | undefined): Promise<AppSession> {
    const session = id ? appSessions.get(id) : undefined;
    if (!session || session.expiresAt <= Date.now())
      throw new Error("Application session is missing or expired");
    return session;
  },
  async destroy(id: string): Promise<void> {
    appSessions.delete(id);
  },
};

const dpopKey = crypto.subtle.generateKey(
  {
    name: "RSASSA-PKCS1-v1_5",
    hash: "SHA-256",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
  },
  true,
  ["sign", "verify"],
);

function base64url(value: ArrayBuffer | string): string {
  const bytes =
    typeof value === "string" ? Buffer.from(value) : Buffer.from(value);
  return bytes.toString("base64url");
}

export async function createDpopProof(input: {
  htm: "POST";
  htu: string;
}): Promise<string> {
  const keyPair = await dpopKey;
  const jwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
  const header = base64url(
    JSON.stringify({ alg: "RS256", jwk, typ: "dpop+jwt" }),
  );
  const payload = base64url(
    JSON.stringify({
      htm: input.htm,
      htu: input.htu,
      iat: Math.floor(Date.now() / 1_000),
      jti: randomUUID(),
    }),
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    keyPair.privateKey,
    new TextEncoder().encode(`${header}.${payload}`),
  );
  return `${header}.${payload}.${base64url(signature)}`;
}

export async function fetchJwks(): Promise<{
  keys: Array<Record<string, unknown>>;
}> {
  const response = await fetch("https://sign.authle.ss/.well-known/jwks.json", {
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new Error(`JWKS request failed: ${response.status}`);
  const value: unknown = await response.json();
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    !("keys" in value) ||
    !Array.isArray(value.keys) ||
    value.keys.some(
      (key) => !key || typeof key !== "object" || Array.isArray(key),
    )
  )
    throw new Error("JWKS response is invalid");
  return { keys: value.keys as Array<Record<string, unknown>> };
}
