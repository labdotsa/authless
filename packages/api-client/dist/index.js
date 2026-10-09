// src/generated.ts
var listWorkspacesOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces",
  retrySafety: "safe",
  status: "stable"
};
var createWorkspaceOperation = {
  authorization: "session",
  method: "POST",
  path: "/v1/workspaces",
  retrySafety: "unsafe",
  status: "stable"
};
var getWorkspaceOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}",
  retrySafety: "safe",
  status: "stable"
};
var listAuditEventsOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/audit-events",
  retrySafety: "safe",
  status: "stable"
};
var createAppOperation = {
  authorization: "session",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps",
  retrySafety: "unsafe",
  status: "stable"
};
var listAppsOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps",
  retrySafety: "safe",
  status: "stable"
};
var getAppEnvironmentOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/{environment}",
  retrySafety: "safe",
  status: "stable"
};
var listAppMembershipsOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships",
  retrySafety: "safe",
  status: "stable"
};
var inviteAppMembershipOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships",
  retrySafety: "safe",
  status: "stable"
};
var getAppMembershipOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}",
  retrySafety: "safe",
  status: "stable"
};
var changeAppMembershipStatusOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/lifecycle",
  retrySafety: "safe",
  status: "stable"
};
var getAppMembershipAccessOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/access",
  retrySafety: "safe",
  status: "stable"
};
var grantAppRoleOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/roles",
  retrySafety: "safe",
  status: "stable"
};
var grantAppEntitlementOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/entitlements",
  retrySafety: "safe",
  status: "stable"
};
var revokeAppEntitlementOperation = {
  authorization: "session-or-app-credential",
  method: "DELETE",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/entitlements/{grantId}",
  retrySafety: "safe",
  status: "stable"
};
var revokeAppRoleOperation = {
  authorization: "session-or-app-credential",
  method: "DELETE",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/memberships/{membershipId}/roles/{grantId}",
  retrySafety: "safe",
  status: "stable"
};
var createBulkAccessPreviewOperation = {
  authorization: "session",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews",
  retrySafety: "unsafe",
  status: "stable"
};
var getBulkAccessPreviewOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews/{previewId}",
  retrySafety: "safe",
  status: "stable"
};
var executeBulkAccessPreviewOperation = {
  authorization: "session",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/bulk-access/previews/{previewId}/executions",
  retrySafety: "safe",
  status: "stable"
};
var getBulkAccessOperationOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}",
  retrySafety: "safe",
  status: "stable"
};
var cancelBulkAccessOperationOperation = {
  authorization: "session",
  method: "POST",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}/cancellation",
  retrySafety: "safe",
  status: "stable"
};
var listBulkAccessResultsOperation = {
  authorization: "session",
  method: "GET",
  path: "/v1/workspaces/{workspaceId}/apps/{appId}/bulk-access/operations/{operationId}/results",
  retrySafety: "safe",
  status: "stable"
};

// src/apps.ts
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

// src/audit.ts
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

// ../contracts/src/failure.ts
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

// src/transport.ts
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
function createAuthlessTransport(options) {
  const sessionToken = typeof options.sessionToken === "string" && options.sessionToken.length > 0 ? options.sessionToken : undefined;
  const appCredentialToken = typeof options.appCredentialToken === "string" && options.appCredentialToken.length > 0 ? options.appCredentialToken : undefined;
  if (Boolean(sessionToken) === Boolean(appCredentialToken))
    throw new TypeError("Exactly one server-side session or app credential is required.");
  const request = options.fetch ?? globalThis.fetch;
  const baseUrl = options.baseUrl.replace(/\/$/, "");
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
      const authorityHeaders = appCredentialToken ? { authorization: `Bearer ${appCredentialToken}` } : { cookie: `__Host-authless_session=${sessionToken}` };
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
              "x-authless-client": "api-client",
              "x-correlation-id": requestCorrelationId
            },
            method: input.operation.method
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
        const code = responseCode && knownErrorCodes.has(responseCode) ? responseCode : "request_failed";
        const classification = classifyApiFailure({
          code: responseCode,
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
          error: responseCode ?? "request_failed",
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

// src/bulk-access.ts
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

// src/memberships.ts
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

// src/workspaces.ts
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

// src/index.ts
function createAuthlessApiClient(options) {
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
export {
  createWorkspaceClient,
  createBulkAccessClient,
  createAuthlessTransport,
  createAuthlessApiClient,
  createAuditClient,
  createAppMembershipClient,
  createAppClient,
  createAppAccessClient,
  AuthlessApiError
};
