import { createServer } from "node:http";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { jwtVerify, importJWK } from "jose";
import { afterEach, expect, test } from "bun:test";
import {
  callManagementMcp,
  createAgentKey,
  loadRegisteredAgentKey,
  writeAgentKeyFile,
  issueManagementToken,
  type FetchLike,
  type AgentConfig,
} from "../src/agent.js";

const servers: Array<ReturnType<typeof createServer>> = [];
const localFetch: FetchLike = (input, init) =>
  fetch(input.toString().replace("https://", "http://"), init);

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve) => {
          server.close(() => resolve());
        }),
    ),
  );
});

test("persists private key with owner-only mode and reloads the registered key", async () => {
  const directory = await mkdtemp(join(tmpdir(), "authless-agent-"));
  try {
    const key = await createAgentKey("persistent-agent");
    const path = join(directory, "agent-key.pem");
    await writeAgentKeyFile({ key, path });
    expect((await stat(path)).mode & 0o077).toBe(0);
    expect(await readFile(path, "utf8")).toContain("BEGIN PRIVATE KEY");
    const loaded = await loadRegisteredAgentKey({
      kid: key.kid,
      path,
      publicJwks: key.publicJwks,
    });
    expect(loaded.kid).toBe(key.kid);
    expect(loaded.publicJwks).toEqual(key.publicJwks);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("creates a bounded assertion, exchanges it, and calls MCP with the bearer", async () => {
  const key = await createAgentKey("fixture-agent");
  const config: AgentConfig = {
    clientId: "fixture-agent",
    managementIssuer: "https://127.0.0.1/management",
    mcpResource: "https://127.0.0.1/mcp",
    scope: "workspace:read",
  };
  let expectedAudience = "";
  const server = createServer(async (request, response) => {
    if (request.url !== "/management/oauth/token") {
      response.writeHead(404).end();
      return;
    }
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const form = new URLSearchParams(Buffer.concat(chunks).toString());
    expect(form.get("grant_type")).toBe("client_credentials");
    expect(form.get("client_id")).toBe(config.clientId);
    expect(form.get("resource")).toBe(localConfig.mcpResource);
    expect(form.get("scope")).toBe(config.scope);
    expect(form.get("client_assertion_type")).toBe(
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    );
    const assertion = form.get("client_assertion");
    expect(assertion).toBeString();
    const publicJwk = key.publicJwks.keys[0];
    if (!publicJwk) throw new Error("fixture public JWK missing");
    const verified = await jwtVerify(
      assertion as string,
      await importJWK(publicJwk, "RS256"),
      { audience: expectedAudience },
    );
    expect(verified.payload.iss).toBe(config.clientId);
    expect(verified.payload.sub).toBe(config.clientId);
    expect(verified.payload.jti).toBeString();
    response.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        access_token: "fixture-token",
        expires_in: 600,
        scope: config.scope,
        token_type: "Bearer",
      }),
    );
  });
  await new Promise<void>((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve()),
  );
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("fixture did not bind");
  const localConfig = {
    ...config,
    managementIssuer: `https://127.0.0.1:${address.port}/management`,
    mcpResource: `https://127.0.0.1:${address.port}/mcp`,
  };
  expectedAudience = `${localConfig.managementIssuer}/oauth/token`;
  const token = await issueManagementToken({
    config: localConfig,
    fetch: localFetch,
    key,
  });
  expect(token).toEqual({
    accessToken: "fixture-token",
    expiresIn: 600,
    scope: "workspace:read",
  });
});

test("sends a bearer token and JSON-RPC request to MCP", async () => {
  const server = createServer(async (request, response) => {
    expect(request.url).toBe("/mcp");
    expect(request.headers.authorization).toBe("Bearer fixture-token");
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const body = JSON.parse(Buffer.concat(chunks).toString()) as { id: string };
    response
      .writeHead(200, { "content-type": "application/json" })
      .end(
        JSON.stringify({ jsonrpc: "2.0", id: body.id, result: { ok: true } }),
      );
  });
  await new Promise<void>((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve()),
  );
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("fixture did not bind");
  const result = await callManagementMcp({
    accessToken: "fixture-token",
    method: "tools/list",
    resource: `https://127.0.0.1:${address.port}/mcp`,
    fetch: localFetch,
  });
  expect(result).toEqual({ ok: true });
});

test("rejects malformed and JSON-RPC error responses", async () => {
  const server = createServer(async (request, response) => {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    const body = JSON.parse(Buffer.concat(chunks).toString()) as { id: string };
    response.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        jsonrpc: "2.0",
        id: body.id,
        error: { code: -32000 },
      }),
    );
  });
  await new Promise<void>((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve()),
  );
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("fixture did not bind");
  await expect(
    callManagementMcp({
      accessToken: "fixture-token",
      method: "tools/list",
      resource: `https://127.0.0.1:${address.port}/mcp`,
      fetch: localFetch,
    }),
  ).rejects.toThrow("JSON-RPC error");
});

test("rejects a response with a mismatched JSON-RPC id", async () => {
  const server = createServer((_request, response) => {
    response.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        jsonrpc: "2.0",
        id: "wrong-id",
        result: { ok: true },
      }),
    );
  });
  await new Promise<void>((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve()),
  );
  servers.push(server);
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("fixture did not bind");
  await expect(
    callManagementMcp({
      accessToken: "fixture-token",
      method: "tools/list",
      resource: `https://127.0.0.1:${address.port}/mcp`,
      fetch: localFetch,
    }),
  ).rejects.toThrow("invalid JSON-RPC envelope");
});
