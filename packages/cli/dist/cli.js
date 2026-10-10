#!/usr/bin/env bun
// @bun

// src/cli.ts
import { spawn } from "child_process";

// ../server/dist/index.js
var listWorkspacesOperation = {
  authorization: "session-or-management-oauth",
  method: "GET",
  path: "/workspaces",
  retrySafety: "safe",
  status: "stable"
};
var createWorkspaceOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces",
  retrySafety: "unsafe",
  status: "stable"
};
var getWorkspaceOperation = {
  authorization: "session-or-management-oauth",
  method: "GET",
  path: "/workspaces/{workspaceId}",
  retrySafety: "safe",
  status: "stable"
};
var listAuditEventsOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/audit-events",
  retrySafety: "safe",
  status: "stable"
};
var createAppOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps",
  retrySafety: "unsafe",
  status: "stable"
};
var listAppsOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps",
  retrySafety: "safe",
  status: "stable"
};
var getAppEnvironmentOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}",
  retrySafety: "safe",
  status: "stable"
};
var listAppMembershipsOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships",
  retrySafety: "safe",
  status: "stable"
};
var inviteAppMembershipOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships",
  retrySafety: "safe",
  status: "stable"
};
var getAppMembershipOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}",
  retrySafety: "safe",
  status: "stable"
};
var changeAppMembershipStatusOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/lifecycle",
  retrySafety: "safe",
  status: "stable"
};
var getAppMembershipAccessOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/access",
  retrySafety: "safe",
  status: "stable"
};
var grantAppRoleOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/roles",
  retrySafety: "safe",
  status: "stable"
};
var grantAppEntitlementOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/entitlements",
  retrySafety: "safe",
  status: "stable"
};
var revokeAppEntitlementOperation = {
  authorization: "session-or-app-credential",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/entitlements/{grantId}",
  retrySafety: "safe",
  status: "stable"
};
var revokeAppRoleOperation = {
  authorization: "session-or-app-credential",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/roles/{grantId}",
  retrySafety: "safe",
  status: "stable"
};
var createBulkAccessPreviewOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews",
  retrySafety: "unsafe",
  status: "stable"
};
var getBulkAccessPreviewOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews/{previewId}",
  retrySafety: "safe",
  status: "stable"
};
var executeBulkAccessPreviewOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews/{previewId}/executions",
  retrySafety: "safe",
  status: "stable"
};
var getBulkAccessOperationOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}",
  retrySafety: "safe",
  status: "stable"
};
var cancelBulkAccessOperationOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}/cancellation",
  retrySafety: "safe",
  status: "stable"
};
var listBulkAccessResultsOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}/results",
  retrySafety: "safe",
  status: "stable"
};
function createAppClient(transport) {
  return {
    async create(input) {
      const path = createAppOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      const body = await transport.execute({
        body: JSON.stringify({
          description: input.description,
          name: input.name,
          ownerContactEmail: input.ownerContactEmail
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createAppOperation,
        path
      });
      return body.app;
    },
    async getEnvironment(input) {
      const path = getAppEnvironmentOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{environment}", encodeURIComponent(input.environment));
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: getAppEnvironmentOperation,
        path
      });
      return body.environment;
    },
    async list(input) {
      const query = new URLSearchParams;
      if (input.cursor !== undefined)
        query.set("cursor", input.cursor);
      if (input.limit !== undefined)
        query.set("limit", String(input.limit));
      const suffix = query.size === 0 ? "" : `?${query}`;
      const path = listAppsOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      return transport.execute({
        correlationId: input.correlationId,
        operation: listAppsOperation,
        path: `${path}${suffix}`
      });
    }
  };
}
function createAuditClient(transport) {
  return {
    async list(input) {
      const query = new URLSearchParams;
      if (input.action !== undefined)
        query.set("action", input.action);
      if (input.actorRef !== undefined)
        query.set("actor", input.actorRef);
      if (input.appId !== undefined)
        query.set("appId", input.appId);
      if (input.eventCorrelationId !== undefined)
        query.set("correlation", input.eventCorrelationId);
      if (input.cursor !== undefined)
        query.set("cursor", input.cursor);
      if (input.from !== undefined)
        query.set("from", input.from);
      if (input.limit !== undefined)
        query.set("limit", String(input.limit));
      if (input.outcome !== undefined)
        query.set("outcome", input.outcome);
      if (input.resourceRef !== undefined)
        query.set("resource", input.resourceRef);
      if (input.to !== undefined)
        query.set("to", input.to);
      const suffix = query.size === 0 ? "" : `?${query}`;
      const path = listAuditEventsOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      return transport.execute({
        correlationId: input.correlationId,
        operation: listAuditEventsOperation,
        path: `${path}${suffix}`
      });
    }
  };
}
var correlationIdPattern = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/;
var errorCodePattern = /^[A-Za-z][A-Za-z0-9._:-]{1,127}$/;
function isValidCorrelationId(value) {
  return typeof value === "string" && correlationIdPattern.test(value);
}
function normalizeCorrelationId(value) {
  return isValidCorrelationId(value) ? value : crypto.randomUUID();
}
function isSafeApiErrorCode(value) {
  return typeof value === "string" && errorCodePattern.test(value);
}
function readApiErrorCode(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return;
  const body = value;
  if (isSafeApiErrorCode(body.error))
    return body.error;
  if (isSafeApiErrorCode(body.code))
    return body.code;
  return;
}
function retryAtFromHeader(value, now) {
  const safeNow = Number.isFinite(now) ? now : Date.now();
  const seconds = value === undefined || value === null ? Number.NaN : Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return safeNow + Math.min(seconds, 86400) * 1000;
  }
  const date = value ? Date.parse(value) : Number.NaN;
  if (Number.isFinite(date) && date >= safeNow)
    return Math.min(date, safeNow + 86400000);
  return safeNow + 60000;
}
function hasCode(code, ...values) {
  return values.includes(code);
}
function classifyApiFailure(input) {
  const code = typeof input.code === "string" && input.code.length > 0 ? input.code : "request_failed";
  const status = input.status;
  if (hasCode(code, "fresh_authentication_required", "recent_authentication_required"))
    return { action: "reauthenticate", code, kind: "fresh-auth", status };
  if (hasCode(code, "unauthorized", "session_required") || status === 401)
    return { action: "sign-in", code, kind: "session", status };
  if (hasCode(code, "resource_not_found", "not_found") || code.endsWith("_not_found") || status === 404)
    return { action: "return", code, kind: "missing", status };
  if (hasCode(code, "permission_denied", "forbidden", "insufficient_permission", "action_not_permitted") || status === 403)
    return { action: "switch-context", code, kind: "permission", status };
  if (status === 429) {
    const now = input.now ?? Date.now();
    return {
      action: "retry",
      code,
      kind: "rate-limit",
      retryAt: retryAtFromHeader(input.retryAfter, now),
      status
    };
  }
  if (status === 409 || status === 412 || status === 428)
    return {
      action: "retry",
      code,
      kind: "conflict",
      preserveEdits: true,
      status
    };
  if (hasCode(code, "provider_failure", "provider_error", "provider_unavailable"))
    return {
      action: "contact-support",
      code,
      kind: "provider",
      outcome: "unknown",
      status
    };
  if (hasCode(code, "temporarily_unavailable", "temporary_unavailable"))
    return {
      action: "inspect-status",
      code,
      kind: "unavailable",
      outcome: "unknown",
      status
    };
  if (status === 408 || status === 0)
    return {
      action: "inspect-status",
      code,
      kind: "network",
      outcome: "unknown",
      status
    };
  if (status === 400 || status === 422)
    return { action: "return", code, kind: "validation", status };
  if (status >= 500 && status <= 599)
    return {
      action: "inspect-status",
      code,
      kind: "unavailable",
      outcome: "unknown",
      status
    };
  return {
    action: "contact-support",
    code,
    kind: "provider",
    outcome: "unknown",
    status
  };
}
var knownErrorCodes = new Set([
  "app_environment_not_found",
  "app_membership_not_found",
  "app_access_grant_not_found",
  "audit_resource_not_found",
  "bulk_access_operation_not_found",
  "bulk_access_preview_not_found",
  "confirmation_required",
  "customer_reference_conflict",
  "definition_unavailable",
  "idempotency_conflict",
  "idempotency_required",
  "idempotency_key_required",
  "invalid_app",
  "invalid_audit_filter",
  "invalid_page",
  "invalid_request",
  "invalid_state",
  "invalid_transition",
  "membership_unavailable",
  "operation_busy",
  "operation_not_cancellable",
  "preview_expired",
  "fresh_authentication_required",
  "recent_authentication_required",
  "results_expired",
  "results_unavailable",
  "terms_required",
  "unauthorized",
  "version_conflict",
  "version_or_idempotency_required",
  "version_precondition_required",
  "workspace_not_found"
]);
var transientStatuses = new Set([408, 500, 502, 503, 504]);
function record(value) {
  return value !== null && typeof value === "object" ? value : null;
}
function safeErrorCode(value) {
  if (!value || value.length > 128 || !/^[a-z0-9][a-z0-9_.-]*$/u.test(value))
    return null;
  return value;
}
function appAccessActor(value) {
  const actor = record(value);
  if (!actor || actor.kind !== "person" && actor.kind !== "service" || typeof actor.reference !== "string")
    return null;
  return { kind: actor.kind, reference: actor.reference };
}
function appAccessGrant(value) {
  const grant = record(value);
  const definition = record(grant?.definition);
  const createdBy = appAccessActor(grant?.createdBy);
  const revokedBy = grant?.revokedBy === null ? null : appAccessActor(grant?.revokedBy);
  if (!grant || !createdBy || !definition || typeof definition.description !== "string" || typeof definition.key !== "string" || typeof grant.appId !== "string" || typeof grant.effectiveAt !== "string" || grant.expiresAt !== null && typeof grant.expiresAt !== "string" || typeof grant.id !== "string" || grant.kind !== "entitlement" && grant.kind !== "role" || typeof grant.membershipId !== "string" || grant.revokedAt !== null && typeof grant.revokedAt !== "string" || grant.revokedBy !== null && !revokedBy || typeof grant.source !== "string" || grant.state !== "active" && grant.state !== "expired" && grant.state !== "revoked" && grant.state !== "scheduled" || !Number.isSafeInteger(grant.version) || grant.version < 1 || typeof grant.workspaceId !== "string")
    return;
  return {
    appId: grant.appId,
    createdBy,
    definition: {
      description: definition.description,
      key: definition.key
    },
    effectiveAt: grant.effectiveAt,
    expiresAt: grant.expiresAt,
    id: grant.id,
    kind: grant.kind,
    membershipId: grant.membershipId,
    revokedAt: grant.revokedAt,
    revokedBy,
    source: grant.source,
    state: grant.state,
    version: grant.version,
    workspaceId: grant.workspaceId
  };
}

class AuthlessApiError extends Error {
  action;
  code;
  correlationId;
  currentGrant;
  error;
  kind;
  outcome;
  preserveEdits;
  retryAt;
  retrySafety;
  status;
  constructor(input) {
    super(`Authless API request failed with status ${input.status}.`);
    this.name = "AuthlessApiError";
    this.action = input.action;
    this.code = input.code;
    this.correlationId = input.correlationId;
    this.currentGrant = input.currentGrant;
    this.error = input.error ?? input.code;
    this.kind = input.kind;
    this.outcome = input.outcome;
    this.preserveEdits = input.preserveEdits;
    this.retryAt = input.retryAt;
    this.retrySafety = input.retrySafety;
    this.status = input.status;
  }
}
function validateBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new TypeError("baseUrl must be an absolute origin URL.");
  }
  const loopback = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
  if (url.protocol !== "https:" && !loopback)
    throw new TypeError("baseUrl must use HTTPS outside loopback hosts.");
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/")
    throw new TypeError("baseUrl must be an origin without credentials, path, query, or fragment.");
  return url.toString().replace(/\/$/u, "");
}
function createAuthlessTransport(options) {
  const baseUrl = validateBaseUrl(options.baseUrl);
  const sessionToken = typeof options.sessionToken === "string" && options.sessionToken.length > 0 ? options.sessionToken : undefined;
  const appCredentialToken = typeof options.appCredentialToken === "string" && options.appCredentialToken.length > 0 ? options.appCredentialToken : undefined;
  const managementAccessToken = typeof options.managementAccessToken === "string" && options.managementAccessToken.length > 0 ? options.managementAccessToken : undefined;
  const credentials = [
    sessionToken,
    appCredentialToken,
    managementAccessToken
  ].filter((value) => value !== undefined);
  if (credentials.length !== 1)
    throw new TypeError("Exactly one server-side session, app credential, or management access token is required.");
  for (const [name, value] of [
    ["sessionToken", sessionToken],
    ["appCredentialToken", appCredentialToken],
    ["managementAccessToken", managementAccessToken]
  ])
    if (value && /[\r\n]/u.test(value))
      throw new TypeError(`${name} must not contain CR or LF characters.`);
  const request = options.fetch ?? globalThis.fetch;
  const baseDelayMilliseconds = options.retry?.baseDelayMilliseconds ?? 100;
  const maxAttempts = options.retry?.maxAttempts ?? 2;
  if (!Number.isSafeInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 3)
    throw new RangeError("retry.maxAttempts must be an integer from 1 through 3");
  if (!Number.isSafeInteger(baseDelayMilliseconds) || baseDelayMilliseconds < 0 || baseDelayMilliseconds > 30000)
    throw new RangeError("retry.baseDelayMilliseconds must be an integer from 0 through 30000");
  const waitForRetry = async (attempt) => {
    await new Promise((resolve) => setTimeout(resolve, baseDelayMilliseconds * 2 ** (attempt - 1)));
  };
  return {
    async execute(input) {
      const requestCorrelationId = normalizeCorrelationId(input.correlationId);
      if (appCredentialToken && input.operation.authorization !== "session-or-app-credential")
        throw new TypeError("This Authless API operation requires a platform session.");
      if (input.headers && Object.keys(input.headers).some((name) => /^(authorization|cookie|proxy-authorization|x-authless-client)$/iu.test(name)))
        throw new TypeError("Request headers cannot override server credentials or client identity.");
      const authorityHeaders = appCredentialToken || managementAccessToken ? {
        authorization: `Bearer ${appCredentialToken ?? managementAccessToken}`
      } : { cookie: `__Host-authless_session=${sessionToken}` };
      let attempt = 1;
      let response;
      while (true) {
        try {
          response = await request(`${baseUrl}${input.path}`, {
            body: input.body,
            headers: {
              accept: "application/json",
              ...authorityHeaders,
              ...input.body === undefined ? {} : { "content-type": "application/json" },
              ...input.headers,
              "x-authless-client": "server",
              "x-correlation-id": requestCorrelationId
            },
            method: input.operation.method,
            redirect: "error"
          });
        } catch {
          if (input.operation.retrySafety !== "safe" || attempt >= maxAttempts)
            throw new AuthlessApiError({
              action: "inspect-status",
              code: "request_failed",
              correlationId: requestCorrelationId,
              kind: "network",
              outcome: "unknown",
              retrySafety: input.operation.retrySafety,
              status: 0
            });
          await waitForRetry(attempt);
          attempt += 1;
          continue;
        }
        const retryable = input.operation.retrySafety === "safe" && transientStatuses.has(response.status) && attempt < maxAttempts;
        if (!retryable)
          break;
        await response.arrayBuffer().catch(() => {
          return;
        });
        await waitForRetry(attempt);
        attempt += 1;
      }
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const responseCode = readApiErrorCode(body);
        const safeResponseCode = safeErrorCode(responseCode);
        const code = safeResponseCode && knownErrorCodes.has(safeResponseCode) ? safeResponseCode : "request_failed";
        const classification = classifyApiFailure({
          code: safeResponseCode,
          retryAfter: response.headers.get("retry-after"),
          status: response.status
        });
        const returnedCorrelationId = response.headers.get("x-correlation-id");
        const correlationId = returnedCorrelationId && isValidCorrelationId(returnedCorrelationId) ? returnedCorrelationId : requestCorrelationId;
        throw new AuthlessApiError({
          action: classification.action,
          code,
          correlationId,
          currentGrant: code === "version_conflict" ? appAccessGrant(body?.grant) : undefined,
          error: safeResponseCode ?? "request_failed",
          kind: classification.kind,
          outcome: classification.outcome,
          preserveEdits: classification.preserveEdits,
          retryAt: classification.retryAt,
          retrySafety: input.operation.retrySafety,
          status: response.status
        });
      }
      return input.decode ? input.decode(response) : await response.json();
    }
  };
}
var operationPath = (template, input) => template.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{operationId}", encodeURIComponent(input.operationId));
function createBulkAccessClient(transport) {
  return {
    async cancelOperation(input) {
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedVersion}"`
        },
        operation: cancelBulkAccessOperationOperation,
        path: operationPath(cancelBulkAccessOperationOperation.path, input)
      });
    },
    async createPreview(input) {
      const path = createBulkAccessPreviewOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      const body = await transport.execute({
        body: JSON.stringify({
          action: input.action,
          ...input.entitlement ? { entitlement: input.entitlement } : {},
          filter: input.filter,
          reason: input.reason,
          ...input.role ? { role: input.role } : {}
        }),
        correlationId: input.correlationId,
        operation: createBulkAccessPreviewOperation,
        path
      });
      return body.preview;
    },
    async downloadResults(input) {
      const path = operationPath(listBulkAccessResultsOperation.path, input);
      return transport.execute({
        correlationId: input.correlationId,
        async decode(response) {
          const contentSha256 = response.headers.get("x-content-sha256");
          const rowCountHeader = response.headers.get("x-result-count");
          const rowCount = Number(rowCountHeader);
          if (!contentSha256 || !/^[a-f0-9]{64}$/.test(contentSha256) || rowCountHeader === null || !Number.isSafeInteger(rowCount) || rowCount < 0 || rowCount > 100)
            throw new AuthlessApiError({
              action: "contact-support",
              code: "invalid_response",
              correlationId: input.correlationId,
              kind: "provider",
              outcome: "unknown",
              retrySafety: listBulkAccessResultsOperation.retrySafety,
              status: response.status
            });
          return { content: await response.text(), contentSha256, rowCount };
        },
        headers: { accept: "application/x-ndjson" },
        operation: listBulkAccessResultsOperation,
        path: `${path}?download=1`
      });
    },
    async executePreview(input) {
      const path = executeBulkAccessPreviewOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{previewId}", encodeURIComponent(input.previewId));
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed,
          previewIntegrityDigest: input.previewIntegrityDigest,
          previewVersion: input.previewVersion
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: executeBulkAccessPreviewOperation,
        path
      });
    },
    async getPreview(input) {
      const path = getBulkAccessPreviewOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{previewId}", encodeURIComponent(input.previewId));
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: getBulkAccessPreviewOperation,
        path
      });
      return body.preview;
    },
    async getOperation(input) {
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: getBulkAccessOperationOperation,
        path: operationPath(getBulkAccessOperationOperation.path, input)
      });
      return body.operation;
    },
    async listResults(input) {
      const query = new URLSearchParams;
      if (input.cursor !== undefined)
        query.set("cursor", input.cursor);
      if (input.limit !== undefined)
        query.set("limit", String(input.limit));
      const suffix = query.size === 0 ? "" : `?${query}`;
      return transport.execute({
        correlationId: input.correlationId,
        operation: listBulkAccessResultsOperation,
        path: `${operationPath(listBulkAccessResultsOperation.path, input)}${suffix}`
      });
    }
  };
}
var membershipPath = (template, input) => template.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{membershipId}", encodeURIComponent(input.membershipId));
function createAppMembershipClient(transport) {
  return {
    async changeStatus(input) {
      return transport.execute({
        body: JSON.stringify({
          action: input.action,
          confirmed: input.confirmed,
          reason: input.reason
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedVersion}"`
        },
        operation: changeAppMembershipStatusOperation,
        path: membershipPath(changeAppMembershipStatusOperation.path, input)
      });
    },
    async get(input) {
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: getAppMembershipOperation,
        path: membershipPath(getAppMembershipOperation.path, input)
      });
      return body.membership;
    },
    async invite(input) {
      const path = inviteAppMembershipOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed,
          customerReference: input.customerReference,
          email: input.email
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: inviteAppMembershipOperation,
        path
      });
    },
    async list(input) {
      const query = new URLSearchParams;
      if (input.cursor !== undefined)
        query.set("cursor", input.cursor);
      if (input.limit !== undefined)
        query.set("limit", String(input.limit));
      if (input.query !== undefined)
        query.set("query", input.query);
      if (input.status !== undefined)
        query.set("status", input.status);
      const suffix = query.size === 0 ? "" : `?${query}`;
      const path = listAppMembershipsOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      return transport.execute({
        correlationId: input.correlationId,
        operation: listAppMembershipsOperation,
        path: `${path}${suffix}`
      });
    }
  };
}
function createAppAccessClient(transport) {
  return {
    async get(input) {
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: getAppMembershipAccessOperation,
        path: membershipPath(getAppMembershipAccessOperation.path, input)
      });
      return body.access;
    },
    async grantRole(input) {
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed,
          key: input.key,
          source: input.source
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedDefinitionVersion}"`
        },
        operation: grantAppRoleOperation,
        path: membershipPath(grantAppRoleOperation.path, input)
      });
    },
    async grantEntitlement(input) {
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed,
          expiresAt: input.expiresAt,
          key: input.key,
          source: input.source
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedDefinitionVersion}"`
        },
        operation: grantAppEntitlementOperation,
        path: membershipPath(grantAppEntitlementOperation.path, input)
      });
    },
    async revokeEntitlement(input) {
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedGrantVersion}"`
        },
        operation: revokeAppEntitlementOperation,
        path: membershipPath(revokeAppEntitlementOperation.path, input).replace("{grantId}", encodeURIComponent(input.grantId))
      });
    },
    async revokeRole(input) {
      return transport.execute({
        body: JSON.stringify({
          confirmed: input.confirmed
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedGrantVersion}"`
        },
        operation: revokeAppRoleOperation,
        path: membershipPath(revokeAppRoleOperation.path, input).replace("{grantId}", encodeURIComponent(input.grantId))
      });
    }
  };
}
function createWorkspaceClient(transport) {
  return {
    async create(input) {
      const body = await transport.execute({
        body: JSON.stringify({
          name: input.name,
          termsAccepted: input.termsAccepted
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createWorkspaceOperation,
        path: createWorkspaceOperation.path
      });
      return body.workspace;
    },
    async get(input) {
      const path = getWorkspaceOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: getWorkspaceOperation,
        path
      });
      return body.workspace;
    },
    async list(input) {
      const query = new URLSearchParams;
      if (input.cursor !== undefined)
        query.set("cursor", input.cursor);
      if (input.limit !== undefined)
        query.set("limit", String(input.limit));
      const suffix = query.size === 0 ? "" : `?${query}`;
      return transport.execute({
        correlationId: input.correlationId,
        operation: listWorkspacesOperation,
        path: `${listWorkspacesOperation.path}${suffix}`
      });
    }
  };
}
if (typeof window !== "undefined") {
  throw new Error("@authless/server is server-only. Move this import to server code. Use @authless/browser for browser authorization.");
}
function createAuthlessServerClient(options) {
  const transport = createAuthlessTransport(options);
  return {
    auditEvents: createAuditClient(transport),
    appAccess: createAppAccessClient(transport),
    appMemberships: createAppMembershipClient(transport),
    bulkAccess: createBulkAccessClient(transport),
    apps: createAppClient(transport),
    workspaces: createWorkspaceClient(transport)
  };
}

// src/oauth-client.ts
import { createServer } from "http";

// src/secure-store.ts
var service = "authless-cli";
function secrets() {
  const runtime = globalThis.Bun;
  if (!runtime?.secrets)
    throw new Error("Secure credential storage requires the Bun runtime (Bun.secrets); refusing a plaintext fallback.");
  return runtime.secrets;
}
async function readSecret(name) {
  return secrets().get({ name, service });
}
async function writeSecret(name, value) {
  if (!value)
    throw new Error("Refusing to store an empty credential");
  await secrets().set({ name, service, value });
}
async function removeSecret(name) {
  await secrets().delete({ name, service });
}

// src/oauth-client.ts
var storeName = "oauth-session";
var defaultClientId = "authless-cli";
var defaultResource = "https://api.authle.ss/management";
var defaultIssuer = "https://sign.authle.ss/management";
var defaultScope = "workspace:read";
var nativeStore = {
  read: () => readSecret(storeName),
  write: (value) => writeSecret(storeName, value),
  remove: () => removeSecret(storeName)
};
function randomUrlSafe(bytes = 32) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return Buffer.from(data).toString("base64url");
}
function safeJson(value) {
  if (!value || typeof value !== "object")
    throw new Error("OAuth response was not an object");
  return value;
}
async function requestToken(endpoint, body, fetcher) {
  const response = await fetcher(endpoint, {
    method: "POST",
    body,
    redirect: "error",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded"
    }
  });
  const payload = safeJson(await response.json().catch(() => null));
  if (!response.ok)
    throw new Error(`OAuth token request failed (${response.status})`);
  const accessToken = payload.access_token;
  if (typeof accessToken !== "string" || !accessToken)
    throw new Error("OAuth response did not contain an access token");
  const expires = typeof payload.expires_in === "number" ? payload.expires_in : 300;
  return {
    accessToken,
    refreshToken: typeof payload.refresh_token === "string" ? payload.refresh_token : undefined,
    expiresAt: Date.now() + Math.max(1, expires - 30) * 1000,
    issuer: endpoint.replace(/\/oauth\/token$/u, ""),
    resource: String(body.get("resource") ?? defaultResource),
    scope: String(body.get("scope") ?? defaultScope),
    clientId: String(body.get("client_id") ?? defaultClientId),
    workspaceId: typeof payload.workspace_id === "string" && /^[A-Za-z0-9_-]{4,128}$/u.test(payload.workspace_id) ? payload.workspace_id : undefined
  };
}
async function loginOAuth(input) {
  const issuer = input.issuer ?? defaultIssuer;
  const clientId = input.clientId ?? defaultClientId;
  const resource = input.resource ?? defaultResource;
  const scope = input.scope ?? defaultScope;
  const workspaceId = input.workspaceId;
  const verifier = randomUrlSafe();
  const state = randomUrlSafe(24);
  const nonce = randomUrlSafe(24);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const challenge = Buffer.from(digest).toString("base64url");
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Could not bind OAuth callback");
  const redirectUri = `http://127.0.0.1:${address.port}/callback`;
  const authorization = new URL(`${issuer}/oauth/authorize`);
  const authorizationParams = new URLSearchParams({
    client_id: clientId,
    code_challenge: challenge,
    code_challenge_method: "S256",
    redirect_uri: redirectUri,
    resource,
    response_type: "code",
    scope,
    state,
    nonce
  });
  if (workspaceId)
    authorizationParams.set("workspace_id", workspaceId);
  authorization.search = authorizationParams.toString();
  const callback = new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => reject(new Error("OAuth callback timed out")), input.timeoutMs ?? 120000);
    server.on("request", (request, response) => {
      if (settled) {
        response.writeHead(409).end();
        return;
      }
      const url = new URL(request.url ?? "/", redirectUri);
      if (url.hostname !== "127.0.0.1" || url.port !== String(address.port)) {
        response.writeHead(400).end();
        return;
      }
      if (url.pathname !== "/callback") {
        response.writeHead(404).end();
        return;
      }
      if (url.searchParams.get("state") !== state) {
        settled = true;
        clearTimeout(timer);
        response.writeHead(400).end("Invalid OAuth state");
        reject(new Error("OAuth state mismatch"));
        return;
      }
      const error = url.searchParams.get("error");
      if (error) {
        settled = true;
        clearTimeout(timer);
        response.writeHead(400).end("OAuth authorization failed");
        reject(new Error("OAuth authorization was denied"));
        return;
      }
      const code2 = url.searchParams.get("code");
      if (!code2) {
        settled = true;
        clearTimeout(timer);
        response.writeHead(400).end("Missing authorization code");
        reject(new Error("OAuth callback did not contain a code"));
        return;
      }
      clearTimeout(timer);
      settled = true;
      response.writeHead(200, { "content-type": "text/plain" }).end("Authentication complete. You can close this window.");
      resolve(code2);
    });
  });
  await (input.openBrowser ? input.openBrowser(authorization.toString()) : Promise.resolve());
  const code = await callback.finally(() => server.close());
  const token = await requestToken(`${issuer}/oauth/token`, new URLSearchParams({
    client_id: clientId,
    code,
    code_verifier: verifier,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    resource,
    scope
  }), input.fetcher ?? fetch);
  token.clientId = clientId;
  token.workspaceId ??= workspaceId;
  await (input.store ?? nativeStore).write(JSON.stringify(token));
  return token;
}
async function readOAuth(store = nativeStore) {
  const raw = await store.read();
  if (!raw)
    return null;
  try {
    const value = JSON.parse(raw);
    if (typeof value.accessToken !== "string" || typeof value.issuer !== "string" || typeof value.resource !== "string" || typeof value.scope !== "string" || typeof value.expiresAt !== "number" || typeof value.clientId !== "string")
      throw new Error;
    return value;
  } catch {
    throw new Error("Stored OAuth credential is invalid; run auth login again");
  }
}
async function refreshOAuth(input, fetcher = fetch, store = nativeStore) {
  if (!input.refreshToken)
    throw new Error("No refresh token is stored");
  const next = await requestToken(`${input.issuer}/oauth/token`, new URLSearchParams({
    client_id: input.clientId,
    grant_type: "refresh_token",
    refresh_token: input.refreshToken,
    resource: input.resource,
    scope: input.scope
  }), fetcher);
  next.issuer = input.issuer;
  next.workspaceId = input.workspaceId;
  next.clientId = input.clientId;
  await store.write(JSON.stringify(next));
  return next;
}
async function logoutOAuth(input, fetcher = fetch, store = nativeStore) {
  if (input.refreshToken)
    await fetcher(`${input.issuer}/oauth/revoke`, {
      method: "POST",
      body: new URLSearchParams({
        token: input.refreshToken,
        token_type_hint: "refresh_token"
      }),
      redirect: "error",
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
  await store.remove();
}

// src/cli.ts
var help = `Authless CLI

Management API commands for humans, automation, and agents. Credentials stay in
the environment or an external secret manager; the CLI never stores or prints them.

Usage:
  authless [--base-url URL] <command> [options]

Commands:
  workspaces list                         List workspaces for the current session
  workspaces get --workspace ID           Read one workspace
  apps list --workspace ID                List apps in a workspace
  apps environment --workspace ID --app ID --environment test|production
                                           Read an app environment
  memberships list --workspace ID --app ID
                                           List app memberships
  audit list --workspace ID                List audit events
  memberships get --workspace ID --app ID --membership ID
  memberships invite --workspace ID --app ID --email EMAIL --yes
  memberships status --workspace ID --app ID --membership ID --action ACTION
  apps create --workspace ID --name NAME --owner-email EMAIL --yes
  workspaces create --name NAME --yes
  access get|grant-role|grant-entitlement|revoke-role|revoke-entitlement
  auth status                              Show configured credential kind (safe)
  auth login                               Start PKCE login with a loopback callback
  auth refresh                             Rotate the stored refresh token
  auth logout                              Revoke and remove the stored grant

Authentication:
  Set AUTHLESS_SESSION_TOKEN for platform-session commands.
  Set AUTHLESS_APP_CREDENTIAL for app-scoped membership commands.
  Set AUTHLESS_API_URL to override https://api.authle.ss.
  Pass credentials through the environment or a secret manager. Do not pass them on argv.

Options:
  --base-url URL     API origin. Defaults to AUTHLESS_API_URL or https://api.authle.ss
  --limit N          Page size, from 1 to 100
  --cursor VALUE     Opaque page cursor returned by the API
  --query VALUE      Membership query
  --status VALUE     Membership status filter
  --all               Follow opaque cursors (bounded to 20 pages)
  --format FORMAT    json (default) or human
  --yes               Confirm a mutating operation
  --help             Show this help
`;
function parseArgs(argv) {
  const command = [];
  const options = new Map;
  for (let index = 0;index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg)
      continue;
    if (arg === "--help" || arg === "-h") {
      options.set("help", "true");
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (options.has(key))
        throw new Error(`Duplicate option --${key}`);
      if (key === "yes" || key === "json" || key === "human" || key === "all") {
        options.set(key, "true");
        continue;
      }
      const value = argv[index + 1];
      if (!value || value.startsWith("--"))
        throw new Error(`Missing value for --${key}`);
      options.set(key, value);
      index += 1;
      continue;
    }
    command.push(arg);
  }
  return { command, options };
}
function requiredOption(options, name) {
  const value = options.get(name);
  if (!value)
    throw new Error(`Missing required option --${name}`);
  return value;
}
function pageOption(options) {
  const raw = options.get("limit");
  if (raw === undefined)
    return;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1 || value > 100)
    throw new Error("--limit must be an integer from 1 through 100");
  return value;
}
function integerOption(options, name) {
  const value = Number(requiredOption(options, name));
  if (!Number.isSafeInteger(value) || value < 0)
    throw new Error(`--${name} must be a non-negative integer`);
  return value;
}
function idempotencyKey(options) {
  return options.get("idempotency-key") ?? crypto.randomUUID();
}
function requireConfirmation(options) {
  if (options.get("yes") !== "true")
    throw new Error("This operation changes data. Re-run with --yes to confirm.");
}
function formatOption(options) {
  const value = options.get("format") ?? (options.has("human") ? "human" : "json");
  if (value !== "json" && value !== "human")
    throw new Error("--format must be json or human");
  return value;
}
async function allPages(firstCursor, limit, fetchPage) {
  let page = await fetchPage(firstCursor, limit);
  const items = { ...page };
  const key = Object.keys(items).find((name) => Array.isArray(items[name]));
  if (!key)
    return page;
  const combined = [...items[key]];
  for (let count = 1;page.nextCursor && count < 20; count += 1) {
    page = await fetchPage(page.nextCursor, limit);
    combined.push(...page[key]);
  }
  if (page.nextCursor)
    throw new Error("Pagination stopped after 20 pages; use --cursor to continue safely.");
  return { ...page, [key]: combined };
}
function humanResult(value) {
  if (value === null || typeof value !== "object")
    return String(value);
  if (Array.isArray(value))
    return value.map((item) => JSON.stringify(item)).join(`
`);
  return Object.entries(value).map(([key, item]) => `${key}: ${typeof item === "string" ? item : JSON.stringify(item)}`).join(`
`);
}
function baseUrl(options, env) {
  const value = options.get("base-url") ?? env.AUTHLESS_API_URL ?? "https://api.authle.ss";
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("--base-url must be a valid API origin");
  }
  if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1" && url.hostname !== "[::1]")
    throw new Error("--base-url must use HTTPS outside localhost");
  if (url.username || url.password || url.search || url.hash)
    throw new Error("--base-url must be an origin without credentials, query, or fragment");
  if (url.pathname !== "/")
    throw new Error("--base-url must not include a path");
  return url.toString().replace(/\/$/u, "");
}
function client(options, env) {
  const sessionToken = env.AUTHLESS_SESSION_TOKEN?.trim() || undefined;
  const appCredentialToken = env.AUTHLESS_APP_CREDENTIAL?.trim() || undefined;
  if (Boolean(sessionToken) === Boolean(appCredentialToken))
    throw new Error("Set exactly one of AUTHLESS_SESSION_TOKEN or AUTHLESS_APP_CREDENTIAL");
  const common = { baseUrl: baseUrl(options, env) };
  return sessionToken ? createAuthlessServerClient({ ...common, sessionToken }) : createAuthlessServerClient({
    ...common,
    appCredentialToken: appCredentialToken ?? ""
  });
}
function correlationId() {
  return crypto.randomUUID();
}
function sessionOnly() {
  throw new Error("This command requires AUTHLESS_SESSION_TOKEN. App credentials are limited to membership and access commands.");
}
function membershipStatus(value) {
  if (value === undefined)
    return;
  if (value !== "active" && value !== "deleted" && value !== "invited" && value !== "pending_approval" && value !== "pending_consent" && value !== "suspended" && value !== "revoked")
    throw new Error("--status is not a supported membership status");
  return value;
}
function validateCommand(parsed) {
  if (parsed.command.length !== 2)
    throw new Error("Use --help to see a command and action");
  const key = parsed.command.join(" ");
  const allowed = new Map([
    ["workspaces list", ["all", "base-url", "cursor", "limit"]],
    ["workspaces get", ["base-url", "workspace"]],
    ["workspaces create", ["base-url", "name", "yes", "idempotency-key"]],
    ["apps list", ["all", "base-url", "cursor", "limit", "workspace"]],
    [
      "apps create",
      [
        "base-url",
        "workspace",
        "name",
        "description",
        "owner-email",
        "yes",
        "idempotency-key"
      ]
    ],
    ["apps environment", ["app", "base-url", "environment", "workspace"]],
    [
      "memberships list",
      [
        "all",
        "app",
        "base-url",
        "cursor",
        "limit",
        "query",
        "status",
        "workspace"
      ]
    ],
    ["memberships get", ["app", "base-url", "membership", "workspace"]],
    [
      "memberships invite",
      [
        "app",
        "base-url",
        "customer-reference",
        "email",
        "idempotency-key",
        "yes",
        "workspace"
      ]
    ],
    [
      "memberships status",
      [
        "action",
        "app",
        "base-url",
        "expected-version",
        "idempotency-key",
        "membership",
        "reason",
        "yes",
        "workspace"
      ]
    ],
    ["access get", ["app", "base-url", "membership", "workspace"]],
    [
      "access grant-role",
      [
        "app",
        "base-url",
        "expected-definition-version",
        "idempotency-key",
        "key",
        "membership",
        "source",
        "yes",
        "workspace"
      ]
    ],
    [
      "access grant-entitlement",
      [
        "app",
        "base-url",
        "expires-at",
        "expected-definition-version",
        "idempotency-key",
        "key",
        "membership",
        "source",
        "yes",
        "workspace"
      ]
    ],
    [
      "access revoke-role",
      [
        "app",
        "base-url",
        "expected-grant-version",
        "grant-id",
        "idempotency-key",
        "membership",
        "yes",
        "workspace"
      ]
    ],
    [
      "access revoke-entitlement",
      [
        "app",
        "base-url",
        "expected-grant-version",
        "grant-id",
        "idempotency-key",
        "membership",
        "yes",
        "workspace"
      ]
    ],
    ["audit list", ["all", "base-url", "cursor", "limit", "workspace"]],
    ["auth status", ["base-url", "format", "human", "json"]],
    [
      "auth login",
      ["format", "human", "json", "issuer", "resource", "scope", "workspace"]
    ],
    ["auth refresh", ["format", "human", "json"]],
    ["auth logout", ["format", "human", "json"]]
  ]);
  const names = allowed.get(key);
  if (!names)
    throw new Error(`Unknown command: ${key}`);
  for (const option of parsed.options.keys()) {
    if (option !== "help" && !names.includes(option) && option !== "format" && option !== "human" && option !== "json")
      throw new Error(`Option --${option} is not valid for ${key}`);
  }
}
async function openBrowser(url) {
  const command = process.platform === "darwin" ? "open" : process.platform === "win32" ? "cmd" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "ignore", windowsHide: true });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error("Could not open the browser")));
  });
}
async function optionalOAuth() {
  try {
    return await readOAuth();
  } catch (error) {
    if (error instanceof Error && error.message.includes("Bun.secrets"))
      return null;
    throw error;
  }
}
async function executeCli(argv, env = process.env, write = (value) => process.stdout.write(`${value}
`)) {
  const parsed = parseArgs(argv);
  if (parsed.options.has("help") || parsed.command.length === 0) {
    write(help);
    return 0;
  }
  validateCommand(parsed);
  const [resource, action] = parsed.command;
  const outputFormat = formatOption(parsed.options);
  if (resource === "auth") {
    const session = Boolean(env.AUTHLESS_SESSION_TOKEN?.trim());
    const app = Boolean(env.AUTHLESS_APP_CREDENTIAL?.trim());
    if (action === "status") {
      if (session && app)
        throw new Error("Set exactly one of AUTHLESS_SESSION_TOKEN or AUTHLESS_APP_CREDENTIAL");
      const value = {
        apiUrl: baseUrl(parsed.options, env),
        credential: session ? "session" : app ? "app-credential" : "not-configured",
        managementOAuth: await optionalOAuth() ? "configured" : "native-pkce"
      };
      write(outputFormat === "human" ? humanResult(value) : JSON.stringify(value, null, 2));
      return 0;
    }
    if (action === "login") {
      const token = await loginOAuth({
        issuer: parsed.options.get("issuer"),
        resource: parsed.options.get("resource"),
        scope: parsed.options.get("scope"),
        workspaceId: parsed.options.get("workspace"),
        openBrowser
      });
      write(outputFormat === "human" ? `Authenticated with ${token.scope}` : JSON.stringify({ authenticated: true, scope: token.scope }, null, 2));
      return 0;
    }
    const stored = await readOAuth();
    if (!stored)
      throw new Error("No stored OAuth grant. Run auth login first.");
    if (action === "refresh") {
      await refreshOAuth(stored);
      write(outputFormat === "human" ? "OAuth grant refreshed" : JSON.stringify({ refreshed: true }, null, 2));
      return 0;
    }
    await logoutOAuth(stored);
    write(outputFormat === "human" ? "OAuth grant revoked" : JSON.stringify({ loggedOut: true }, null, 2));
    return 0;
  }
  const storedOAuth = await optionalOAuth();
  if (storedOAuth?.workspaceId) {
    const selected = parsed.options.get("workspace");
    if (selected && selected !== storedOAuth.workspaceId)
      throw new Error(`Stored OAuth grant is bound to workspace ${storedOAuth.workspaceId}; sign in again for another workspace.`);
    if (!selected)
      parsed.options.set("workspace", storedOAuth.workspaceId);
  }
  const api = storedOAuth && !env.AUTHLESS_SESSION_TOKEN?.trim() && !env.AUTHLESS_APP_CREDENTIAL?.trim() ? createAuthlessServerClient({
    baseUrl: baseUrl(parsed.options, env),
    managementAccessToken: storedOAuth.accessToken
  }) : client(parsed.options, env);
  const cursor = parsed.options.get("cursor");
  const limit = pageOption(parsed.options);
  const collect = parsed.options.has("all");
  const requestId = correlationId();
  let result;
  if (resource === "workspaces" && action === "list") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.workspaces.list({
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit
    })) : await api.workspaces.list({ correlationId: requestId, cursor, limit });
  } else if (resource === "workspaces" && action === "get") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    result = await api.workspaces.get({
      correlationId: requestId,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "workspaces" && action === "create") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    requireConfirmation(parsed.options);
    result = await api.workspaces.create({
      correlationId: requestId,
      idempotencyKey: idempotencyKey(parsed.options),
      name: requiredOption(parsed.options, "name"),
      termsAccepted: true
    });
  } else if (resource === "apps" && action === "list") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    const workspaceId = requiredOption(parsed.options, "workspace");
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.apps.list({
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit,
      workspaceId
    })) : await api.apps.list({
      correlationId: requestId,
      cursor,
      limit,
      workspaceId
    });
  } else if (resource === "apps" && action === "create") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    requireConfirmation(parsed.options);
    result = await api.apps.create({
      correlationId: requestId,
      description: parsed.options.get("description") ?? "",
      idempotencyKey: idempotencyKey(parsed.options),
      name: requiredOption(parsed.options, "name"),
      ownerContactEmail: requiredOption(parsed.options, "owner-email"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "apps" && action === "environment") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.apps.getEnvironment({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "memberships" && action === "list") {
    const appId = requiredOption(parsed.options, "app");
    const workspaceId = requiredOption(parsed.options, "workspace");
    const query = parsed.options.get("query");
    const status = membershipStatus(parsed.options.get("status"));
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.appMemberships.list({
      appId,
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit,
      query,
      status,
      workspaceId
    })) : await api.appMemberships.list({
      appId,
      correlationId: requestId,
      cursor,
      limit,
      query,
      status,
      workspaceId
    });
  } else if (resource === "memberships" && action === "get") {
    result = await api.appMemberships.get({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      membershipId: requiredOption(parsed.options, "membership"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "memberships" && action === "invite") {
    requireConfirmation(parsed.options);
    result = await api.appMemberships.invite({
      appId: requiredOption(parsed.options, "app"),
      confirmed: true,
      correlationId: requestId,
      customerReference: parsed.options.get("customer-reference"),
      email: requiredOption(parsed.options, "email"),
      idempotencyKey: idempotencyKey(parsed.options),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "memberships" && action === "status") {
    requireConfirmation(parsed.options);
    const actionValue = requiredOption(parsed.options, "action");
    if (!["activate", "delete", "revoke", "suspend"].includes(actionValue))
      throw new Error("--action must be activate, delete, revoke, or suspend");
    const reason = requiredOption(parsed.options, "reason");
    if (![
      "access_ended",
      "administrator_action",
      "approval_granted",
      "data_retention_complete",
      "policy_violation",
      "security_review"
    ].includes(reason))
      throw new Error("--reason is not supported");
    result = await api.appMemberships.changeStatus({
      action: actionValue,
      appId: requiredOption(parsed.options, "app"),
      confirmed: true,
      correlationId: requestId,
      expectedVersion: integerOption(parsed.options, "expected-version"),
      idempotencyKey: idempotencyKey(parsed.options),
      membershipId: requiredOption(parsed.options, "membership"),
      reason,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "access" && action === "get") {
    result = await api.appAccess.get({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      membershipId: requiredOption(parsed.options, "membership"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "access" && (action === "grant-role" || action === "grant-entitlement")) {
    requireConfirmation(parsed.options);
    const common = {
      appId: requiredOption(parsed.options, "app"),
      confirmed: true,
      correlationId: requestId,
      expectedDefinitionVersion: integerOption(parsed.options, "expected-definition-version"),
      idempotencyKey: idempotencyKey(parsed.options),
      key: requiredOption(parsed.options, "key"),
      membershipId: requiredOption(parsed.options, "membership"),
      source: requiredOption(parsed.options, "source"),
      workspaceId: requiredOption(parsed.options, "workspace")
    };
    result = action === "grant-role" ? await api.appAccess.grantRole(common) : await api.appAccess.grantEntitlement({
      ...common,
      expiresAt: parsed.options.get("expires-at")
    });
  } else if (resource === "access" && (action === "revoke-role" || action === "revoke-entitlement")) {
    requireConfirmation(parsed.options);
    const common = {
      appId: requiredOption(parsed.options, "app"),
      confirmed: true,
      correlationId: requestId,
      expectedGrantVersion: integerOption(parsed.options, "expected-grant-version"),
      grantId: requiredOption(parsed.options, "grant-id"),
      idempotencyKey: idempotencyKey(parsed.options),
      membershipId: requiredOption(parsed.options, "membership"),
      workspaceId: requiredOption(parsed.options, "workspace")
    };
    result = action === "revoke-role" ? await api.appAccess.revokeRole(common) : await api.appAccess.revokeEntitlement(common);
  } else if (resource === "audit" && action === "list") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly();
    const workspaceId = requiredOption(parsed.options, "workspace");
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.auditEvents.list({
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit,
      workspaceId
    })) : await api.auditEvents.list({
      correlationId: requestId,
      cursor,
      limit,
      workspaceId
    });
  } else {
    throw new Error(`Unknown command: ${parsed.command.join(" ")}`);
  }
  write(outputFormat === "human" ? humanResult(result) : JSON.stringify(result, null, 2));
  return 0;
}
function formatCliError(error) {
  if (error instanceof AuthlessApiError)
    return JSON.stringify({
      error: error.code,
      status: error.status,
      correlationId: error.correlationId,
      retrySafety: error.retrySafety
    });
  const message = error instanceof Error ? error.message : "Unknown CLI error";
  return message.replace(/((?:AUTHLESS_(?:SESSION_TOKEN|APP_CREDENTIAL)|access_token|client_secret|token)=)[^\s&]+/giu, "$1[redacted]");
}
if (import.meta.main) {
  try {
    process.exitCode = await executeCli(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`${formatCliError(error)}
`);
    process.exitCode = 1;
  }
}
export {
  formatCliError,
  executeCli
};
