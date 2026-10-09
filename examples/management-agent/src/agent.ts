import {
  exportJWK,
  exportPKCS8,
  generateKeyPair,
  importPKCS8,
  SignJWT,
  type JWK,
} from "jose";
import { chmod, readFile, stat, writeFile } from "node:fs/promises";

export type PublicJwkSet = { keys: JWK[] };

export type AgentConfig = {
  clientId: string;
  managementIssuer: string;
  mcpResource: string;
  scope: string;
  tokenEndpoint?: string;
};

export type AgentKey = {
  kid: string;
  privateKey: Awaited<ReturnType<typeof generateKeyPair>>["privateKey"];
  publicJwks: PublicJwkSet;
};

export type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function isPublicJwk(value: unknown): value is JWK {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return (
    item.kty === "RSA" &&
    typeof item.n === "string" &&
    typeof item.e === "string" &&
    typeof item.kid === "string" &&
    item.alg === "RS256" &&
    item.use === "sig"
  );
}

const ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";

function exactHttps(value: string, label: string): URL {
  const parsed = new URL(value);
  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash
  )
    throw new TypeError(`${label} must be an exact HTTPS URL`);
  return parsed;
}

function exactMcpResource(value: string): URL {
  const parsed = exactHttps(value, "mcpResource");
  if (parsed.pathname !== "/mcp")
    throw new TypeError("mcpResource must end at /mcp");
  return parsed;
}

function randomId(): string {
  return crypto.randomUUID();
}

export async function createAgentKey(
  kid = `agent-${randomId()}`,
): Promise<AgentKey> {
  const { privateKey, publicKey } = await generateKeyPair("RS256", {
    extractable: true,
  });
  const jwk = await exportJWK(publicKey);
  return {
    kid,
    privateKey,
    publicJwks: {
      keys: [{ ...jwk, alg: "RS256", kid, use: "sig" }],
    },
  };
}

export async function writeAgentKeyFile(input: {
  key: AgentKey;
  path: string;
}): Promise<void> {
  const pem = await exportPKCS8(input.key.privateKey);
  await writeFile(input.path, `${pem}\n`, { encoding: "utf8", mode: 0o600 });
  await chmod(input.path, 0o600);
}

export async function loadRegisteredAgentKey(input: {
  kid: string;
  path: string;
  publicJwks: PublicJwkSet;
}): Promise<AgentKey> {
  const metadata = await stat(input.path);
  if ((metadata.mode & 0o077) !== 0)
    throw new Error(`Private key file ${input.path} must be mode 0600`);
  const pem = await readFile(input.path, "utf8");
  const privateKey = await importPKCS8(pem, "RS256");
  if (!input.publicJwks.keys.some((candidate) => candidate.kid === input.kid))
    throw new Error(`Registered public JWKS has no key with kid ${input.kid}`);
  return { kid: input.kid, privateKey, publicJwks: input.publicJwks };
}

export async function readPublicJwksFile(path: string): Promise<PublicJwkSet> {
  const value: unknown = JSON.parse(await readFile(path, "utf8"));
  const parsed = record(value, "public JWKS");
  if (!Array.isArray(parsed.keys) || parsed.keys.length === 0)
    throw new Error("public JWKS must contain at least one key");
  const keys = parsed.keys.filter(isPublicJwk);
  if (keys.length !== parsed.keys.length)
    throw new Error("public JWKS contains an invalid or non-RS256 key");
  return { keys };
}

export function managementEndpoints(config: AgentConfig): {
  mcpResource: URL;
  tokenEndpoint: URL;
} {
  const issuer = exactHttps(config.managementIssuer, "managementIssuer");
  if (issuer.pathname !== "/management")
    throw new TypeError("managementIssuer must end at /management");
  const mcpResource = exactMcpResource(config.mcpResource);
  const tokenEndpoint = config.tokenEndpoint
    ? exactHttps(config.tokenEndpoint, "tokenEndpoint")
    : new URL("oauth/token", `${issuer.toString().replace(/\/$/u, "")}/`);
  if (tokenEndpoint.pathname !== "/management/oauth/token")
    throw new TypeError("tokenEndpoint must be /management/oauth/token");
  return { mcpResource, tokenEndpoint };
}

export async function createDelegation(input: {
  apiBaseUrl: string;
  sessionToken: string;
  workspaceId: string;
  agentClientId: string;
  resource: string;
  scope: string;
  publicJwks: PublicJwkSet;
  confirmed: boolean;
  lifetimeSeconds?: number;
  fetch?: FetchLike;
}): Promise<unknown> {
  const base = exactHttps(input.apiBaseUrl, "apiBaseUrl");
  const request = input.fetch ?? fetch;
  const response = await request(
    new URL(
      `/v1/workspaces/${encodeURIComponent(input.workspaceId)}/agent-delegations`,
      base,
    ),
    {
      body: JSON.stringify({
        agentClientId: input.agentClientId,
        confirmed: input.confirmed,
        lifetimeSeconds: input.lifetimeSeconds ?? 3_600,
        publicJwks: input.publicJwks,
        resource: input.resource,
        scopes: [input.scope],
      }),
      headers: {
        "content-type": "application/json",
        cookie: `__Host-authless_session=${input.sessionToken}`,
      },
      method: "POST",
    },
  );
  if (!response.ok)
    throw new Error(`delegation creation failed: ${response.status}`);
  return response.json();
}

export async function issueManagementToken(input: {
  config: AgentConfig;
  key: AgentKey;
  now?: number;
  fetch?: FetchLike;
}): Promise<{ accessToken: string; expiresIn: number; scope: string }> {
  const endpoints = managementEndpoints(input.config);
  const now = input.now ?? Math.floor(Date.now() / 1_000);
  const assertion = await new SignJWT({})
    .setProtectedHeader({ alg: "RS256", kid: input.key.kid, typ: "JWT" })
    .setIssuer(input.config.clientId)
    .setSubject(input.config.clientId)
    .setAudience(endpoints.tokenEndpoint.toString())
    .setJti(randomId())
    .setIssuedAt(now)
    .setExpirationTime(now + 300)
    .sign(input.key.privateKey);
  const body = new URLSearchParams({
    client_assertion: assertion,
    client_assertion_type: ASSERTION_TYPE,
    client_id: input.config.clientId,
    grant_type: "client_credentials",
    resource: endpoints.mcpResource.toString(),
    scope: input.config.scope,
  });
  const response = await (input.fetch ?? fetch)(endpoints.tokenEndpoint, {
    body,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    method: "POST",
  });
  const payload: unknown = await response.json();
  if (!response.ok || !payload || typeof payload !== "object")
    throw new Error(`management token exchange failed: ${response.status}`);
  const token = record(payload, "management token response");
  if (
    typeof token.access_token !== "string" ||
    typeof token.expires_in !== "number" ||
    !Number.isSafeInteger(token.expires_in) ||
    token.expires_in < 1 ||
    token.expires_in > 600 ||
    token.token_type !== "Bearer" ||
    token.scope !== input.config.scope
  )
    throw new Error(
      "management token response violated the published contract",
    );
  const accessToken = token.access_token;
  const expiresIn = token.expires_in;
  const scope = token.scope;
  if (
    typeof accessToken !== "string" ||
    typeof expiresIn !== "number" ||
    typeof scope !== "string"
  )
    throw new Error(
      "management token response violated the published contract",
    );
  return {
    accessToken,
    expiresIn,
    scope,
  };
}

export async function callManagementMcp(input: {
  resource: string;
  accessToken: string;
  method: string;
  params?: unknown;
  fetch?: FetchLike;
}): Promise<unknown> {
  const resource = exactMcpResource(input.resource);
  const requestId = randomId();
  const request = await (input.fetch ?? fetch)(resource, {
    body: JSON.stringify({
      id: requestId,
      jsonrpc: "2.0",
      method: input.method,
      ...(input.params === undefined ? {} : { params: input.params }),
    }),
    headers: {
      accept: "application/json",
      authorization: `Bearer ${input.accessToken}`,
      "content-type": "application/json",
    },
    method: "POST",
  });
  const payload: unknown = await request.json();
  if (!request.ok)
    throw new Error(`management MCP request failed: ${request.status}`);
  const response = record(payload, "management MCP response");
  if (
    response.jsonrpc !== "2.0" ||
    typeof response.id !== "string" ||
    response.id !== requestId
  )
    throw new Error("management MCP response has invalid JSON-RPC envelope");
  if ("error" in response)
    throw new Error("management MCP returned a JSON-RPC error");
  if (!("result" in response))
    throw new Error("management MCP response has no result");
  return response.result;
}

if (import.meta.main) {
  const command = process.argv[2] ?? "run";
  if (command === "keygen") {
    const keyPath =
      process.env.AUTHLESS_AGENT_KEY_FILE ?? "./authless-agent-key.pem";
    const key = await createAgentKey(process.env.AUTHLESS_AGENT_KID);
    await writeAgentKeyFile({ key, path: keyPath });
    process.stdout.write(`${JSON.stringify(key.publicJwks)}\n`);
    process.exit(0);
  }
  const config: AgentConfig = {
    clientId: process.env.AUTHLESS_AGENT_CLIENT_ID ?? "",
    managementIssuer: process.env.AUTHLESS_MANAGEMENT_OAUTH_ISSUER ?? "",
    mcpResource: process.env.AUTHLESS_MANAGEMENT_MCP_RESOURCE ?? "",
    scope: process.env.AUTHLESS_MANAGEMENT_SCOPE ?? "workspace:read",
  };
  if (!config.clientId || !config.managementIssuer || !config.mcpResource)
    throw new Error(
      "Set AUTHLESS_AGENT_CLIENT_ID, AUTHLESS_MANAGEMENT_OAUTH_ISSUER, and AUTHLESS_MANAGEMENT_MCP_RESOURCE",
    );
  const keyPath = process.env.AUTHLESS_AGENT_KEY_FILE;
  const publicJwksPath = process.env.AUTHLESS_AGENT_PUBLIC_JWKS_FILE;
  const kid = process.env.AUTHLESS_AGENT_KID;
  if (!keyPath || !publicJwksPath || !kid)
    throw new Error(
      "Set AUTHLESS_AGENT_KEY_FILE, AUTHLESS_AGENT_PUBLIC_JWKS_FILE, and AUTHLESS_AGENT_KID to use a registered key",
    );
  const key = await loadRegisteredAgentKey({
    kid,
    path: keyPath,
    publicJwks: await readPublicJwksFile(publicJwksPath),
  });
  const token = await issueManagementToken({ config, key });
  await callManagementMcp({
    accessToken: token.accessToken,
    method: "initialize",
    params: { capabilities: {}, protocolVersion: "2025-06-18" },
    resource: config.mcpResource,
  });
  const result = await callManagementMcp({
    accessToken: token.accessToken,
    method: "tools/list",
    resource: config.mcpResource,
  });
  console.log(
    JSON.stringify({ scope: token.scope, expiresIn: token.expiresIn, result }),
  );
}
