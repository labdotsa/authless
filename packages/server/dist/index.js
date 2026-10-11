// src/generated.ts
var getAppCommerceViewOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce",
  retrySafety: "safe",
  status: "stable"
};
var createAppCommerceCatalogOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/catalog",
  retrySafety: "unsafe",
  status: "stable"
};
var simulateMockCommerceRenewalOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/simulate-renewal",
  retrySafety: "unsafe",
  status: "stable"
};
var getAppCommerceEnvironmentViewOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}",
  retrySafety: "safe",
  status: "stable"
};
var createAppCommerceFeatureOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/features",
  retrySafety: "unsafe",
  status: "stable"
};
var createAppCommerceAddonOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/addons",
  retrySafety: "unsafe",
  status: "stable"
};
var recordAppCommerceUsageOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/customers/{customerRef}/usage",
  retrySafety: "unsafe",
  status: "stable"
};
var requestAppCommerceRefundOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/invoices/{invoiceId}/refunds",
  retrySafety: "unsafe",
  status: "stable"
};
var publishAppCommercePlanOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/plans/{planId}/publish",
  retrySafety: "unsafe",
  status: "stable"
};
var getAppCommercePublisherAccountingOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/accounting",
  retrySafety: "safe",
  status: "stable"
};
var releaseAppCommercePublisherReservesOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/accounting/release-reserves",
  retrySafety: "unsafe",
  status: "stable"
};
var createAppCommerceSettlementOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/settlements",
  retrySafety: "unsafe",
  status: "stable"
};
var simulateAppCommercePayoutOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/settlements/{settlementId}/payouts",
  retrySafety: "unsafe",
  status: "stable"
};
var listAppCommercePlansOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/plans",
  retrySafety: "safe",
  status: "stable"
};
var createAppCommercePlanOperation = {
  authorization: "session-or-app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/plans",
  retrySafety: "unsafe",
  status: "stable"
};
var getAppCommerceEntitlementsOperation = {
  authorization: "session-or-app-credential",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/commerce/{environment}/customers/{customerRef}/entitlements",
  retrySafety: "safe",
  status: "stable"
};
var listPersonalCommerceSubscriptionsOperation = {
  authorization: "session",
  method: "GET",
  path: "/me/commerce/subscriptions",
  retrySafety: "safe",
  status: "stable"
};
var listPersonalCommerceCatalogOperation = {
  authorization: "session",
  method: "GET",
  path: "/me/commerce/apps/{appId}/catalog",
  retrySafety: "safe",
  status: "stable"
};
var createPersonalCommerceQuoteOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/quotes",
  retrySafety: "unsafe",
  status: "stable"
};
var acceptPersonalCommerceQuoteOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/quotes/{quoteId}/accept",
  retrySafety: "unsafe",
  status: "stable"
};
var createPersonalCommerceCheckoutOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/checkouts",
  retrySafety: "unsafe",
  status: "stable"
};
var completePersonalCommerceCheckoutOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/checkouts/{checkoutRef}/complete",
  retrySafety: "unsafe",
  status: "stable"
};
var changePersonalCommerceSubscriptionOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/subscriptions/{subscriptionRef}/changes",
  retrySafety: "unsafe",
  status: "stable"
};
var cancelPersonalCommerceSubscriptionOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/subscriptions/{subscriptionRef}/cancel",
  retrySafety: "unsafe",
  status: "stable"
};
var resumePersonalCommerceSubscriptionOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/subscriptions/{subscriptionRef}/resume",
  retrySafety: "unsafe",
  status: "stable"
};
var listPersonalCommerceInvoicesOperation = {
  authorization: "session",
  method: "GET",
  path: "/me/commerce/invoices",
  retrySafety: "safe",
  status: "stable"
};
var createPersonalCommercePortalSessionOperation = {
  authorization: "session",
  method: "POST",
  path: "/me/commerce/portal-sessions",
  retrySafety: "unsafe",
  status: "stable"
};
var inspectCommercialBillingOperation = {
  authorization: "session",
  method: "GET",
  path: "/workspaces/{workspaceId}/billing",
  retrySafety: "safe",
  status: "stable"
};
var reviewCommercialBillingChangeOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/billing/change-reviews",
  retrySafety: "unsafe",
  status: "stable"
};
var authorizeCommercialBillingChangeOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/billing/change-authorizations",
  retrySafety: "unsafe",
  status: "stable"
};
var reviewCommercialBillingCancellationOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/billing/cancellation-reviews",
  retrySafety: "unsafe",
  status: "stable"
};
var confirmCommercialBillingCancellationOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/billing/cancellations",
  retrySafety: "unsafe",
  status: "stable"
};
var requestCommercialBillingRefundOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/billing/refund-requests",
  retrySafety: "unsafe",
  status: "stable"
};
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

// src/commerce.ts
function replacePath(path, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replace(`{${key}}`, encodeURIComponent(value)), path);
}
function pageQuery(input) {
  const query = new URLSearchParams;
  if (input.appId !== undefined)
    query.set("appId", input.appId);
  if (input.cursor !== undefined)
    query.set("cursor", input.cursor);
  if (input.limit !== undefined)
    query.set("limit", String(input.limit));
  return query.size === 0 ? "" : `?${query.toString()}`;
}
function createCommerceClient(transport) {
  return {
    async createCatalog(input) {
      const path = replacePath(createAppCommerceCatalogOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        body: JSON.stringify({
          defaultCurrency: input.defaultCurrency,
          name: input.name
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createAppCommerceCatalogOperation,
        path
      });
    },
    async getAppView(input) {
      const path = replacePath(getAppCommerceViewOperation.path, input);
      return transport.execute({
        correlationId: input.correlationId,
        operation: getAppCommerceViewOperation,
        path
      });
    },
    async getAppEnvironmentView(input) {
      const path = replacePath(getAppCommerceEnvironmentViewOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        operation: getAppCommerceEnvironmentViewOperation,
        path
      });
    },
    async simulateMockRenewal(input) {
      const path = replacePath(simulateMockCommerceRenewalOperation.path, input);
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: simulateMockCommerceRenewalOperation,
        path
      });
    },
    async listPlans(input) {
      const path = replacePath(listAppCommercePlansOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        operation: listAppCommercePlansOperation,
        path
      });
    },
    async createPlan(input) {
      const path = replacePath(createAppCommercePlanOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      const body = await transport.execute({
        body: JSON.stringify({
          addOns: input.addOns,
          amountMicros: input.amountMicros,
          currency: input.currency,
          description: input.description,
          features: input.features,
          includedMeters: input.includedMeters,
          interval: input.interval,
          key: input.key,
          name: input.name,
          trialDays: input.trialDays
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createAppCommercePlanOperation,
        path
      });
      return body.data;
    },
    async createFeature(input) {
      const path = replacePath(createAppCommerceFeatureOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        body: JSON.stringify({
          description: input.description,
          key: input.key,
          metered: input.metered,
          name: input.name
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createAppCommerceFeatureOperation,
        path
      });
    },
    async createAddon(input) {
      const path = replacePath(createAppCommerceAddonOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        body: JSON.stringify({
          amountMicros: input.amountMicros,
          currency: input.currency,
          description: input.description,
          entitlementDuration: input.entitlementDuration,
          features: input.features,
          interval: input.interval,
          key: input.key,
          name: input.name
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createAppCommerceAddonOperation,
        path
      });
    },
    async publishPlan(input) {
      const path = replacePath(publishAppCommercePlanOperation.path, {
        appId: input.appId,
        environment: input.environment,
        planId: input.planId,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: publishAppCommercePlanOperation,
        path
      });
    },
    async getPublisherAccounting(input) {
      const path = replacePath(getAppCommercePublisherAccountingOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        operation: getAppCommercePublisherAccountingOperation,
        path
      });
    },
    async releasePublisherReserves(input) {
      const path = replacePath(releaseAppCommercePublisherReservesOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: releaseAppCommercePublisherReservesOperation,
        path
      });
    },
    async createSettlement(input) {
      const path = replacePath(createAppCommerceSettlementOperation.path, {
        appId: input.appId,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createAppCommerceSettlementOperation,
        path
      });
    },
    async simulatePayout(input) {
      const path = replacePath(simulateAppCommercePayoutOperation.path, {
        appId: input.appId,
        environment: input.environment,
        settlementId: input.settlementId,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: simulateAppCommercePayoutOperation,
        path
      });
    },
    async recordUsage(input) {
      const path = replacePath(recordAppCommerceUsageOperation.path, {
        appId: input.appId,
        customerRef: input.customerRef,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        body: JSON.stringify({
          meterKey: input.meterKey,
          quantity: input.quantity
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: recordAppCommerceUsageOperation,
        path
      });
    },
    async requestRefund(input) {
      const path = replacePath(requestAppCommerceRefundOperation.path, {
        appId: input.appId,
        environment: input.environment,
        invoiceId: input.invoiceId,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        body: JSON.stringify({
          amountMinor: input.amountMinor,
          currency: input.currency,
          paymentId: input.paymentId
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: requestAppCommerceRefundOperation,
        path
      });
    },
    async listCatalog(input) {
      const path = replacePath(listPersonalCommerceCatalogOperation.path, {
        appId: input.appId
      });
      const query = input.environment ? `?environment=${encodeURIComponent(input.environment)}` : "";
      return transport.execute({
        correlationId: input.correlationId,
        operation: listPersonalCommerceCatalogOperation,
        path: `${path}${query}`
      });
    },
    async getEntitlements(input) {
      const path = replacePath(getAppCommerceEntitlementsOperation.path, {
        appId: input.appId,
        customerRef: input.customerRef,
        environment: input.environment,
        workspaceId: input.workspaceId
      });
      return transport.execute({
        correlationId: input.correlationId,
        operation: getAppCommerceEntitlementsOperation,
        path
      });
    },
    async listSubscriptions(input) {
      return transport.execute({
        correlationId: input.correlationId,
        operation: listPersonalCommerceSubscriptionsOperation,
        path: `${listPersonalCommerceSubscriptionsOperation.path}${pageQuery(input)}`
      });
    },
    async createCheckout(input) {
      return transport.execute({
        body: JSON.stringify({
          acceptedTermsDigest: input.acceptedTermsDigest,
          addOns: input.addOns,
          appId: input.appId,
          environment: input.environment,
          planKey: input.planKey,
          quantity: input.quantity,
          returnUrl: input.returnUrl
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createPersonalCommerceCheckoutOperation,
        path: createPersonalCommerceCheckoutOperation.path
      });
    },
    async createQuote(input) {
      return transport.execute({
        body: JSON.stringify({
          appId: input.appId,
          addOns: input.addOns,
          discountCode: input.discountCode,
          environment: input.environment,
          planKey: input.planKey,
          quantity: input.quantity
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: createPersonalCommerceQuoteOperation,
        path: createPersonalCommerceQuoteOperation.path
      });
    },
    async acceptQuote(input) {
      const path = replacePath(acceptPersonalCommerceQuoteOperation.path, {
        quoteId: input.quoteId
      });
      return transport.execute({
        body: JSON.stringify({
          termsDigest: input.termsDigest
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: acceptPersonalCommerceQuoteOperation,
        path
      });
    },
    async completeCheckout(input) {
      const path = replacePath(completePersonalCommerceCheckoutOperation.path, input);
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: completePersonalCommerceCheckoutOperation,
        path
      });
    },
    async changeSubscription(input) {
      const path = replacePath(changePersonalCommerceSubscriptionOperation.path, {
        subscriptionRef: input.subscriptionRef
      });
      return transport.execute({
        body: JSON.stringify({
          addOns: input.addOns,
          effectiveAt: input.effectiveAt,
          planKey: input.planKey,
          quantity: input.quantity
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: changePersonalCommerceSubscriptionOperation,
        path
      });
    },
    async cancelSubscription(input) {
      const path = replacePath(cancelPersonalCommerceSubscriptionOperation.path, input);
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: cancelPersonalCommerceSubscriptionOperation,
        path
      });
    },
    async resumeSubscription(input) {
      const path = replacePath(resumePersonalCommerceSubscriptionOperation.path, input);
      return transport.execute({
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: resumePersonalCommerceSubscriptionOperation,
        path
      });
    },
    async listInvoices(input) {
      return transport.execute({
        correlationId: input.correlationId,
        operation: listPersonalCommerceInvoicesOperation,
        path: `${listPersonalCommerceInvoicesOperation.path}${pageQuery(input)}`
      });
    },
    async createPortalSession(input) {
      return transport.execute({
        body: JSON.stringify({
          appId: input.appId,
          returnUrl: input.returnUrl
        }),
        correlationId: input.correlationId,
        operation: createPersonalCommercePortalSessionOperation,
        path: createPersonalCommercePortalSessionOperation.path
      });
    }
  };
}

// src/billing.ts
function workspacePath(operation, workspaceId) {
  return operation.path.replace("{workspaceId}", encodeURIComponent(workspaceId));
}
function createBillingClient(transport) {
  return {
    async inspect(input) {
      return transport.execute({
        correlationId: input.correlationId,
        operation: inspectCommercialBillingOperation,
        path: workspacePath(inspectCommercialBillingOperation, input.workspaceId)
      });
    },
    async reviewChange(input) {
      return transport.execute({
        body: JSON.stringify({
          idempotencyKey: input.idempotencyKey,
          period: input.period,
          planId: input.planId,
          quantity: input.quantity
        }),
        correlationId: input.correlationId,
        operation: reviewCommercialBillingChangeOperation,
        path: workspacePath(reviewCommercialBillingChangeOperation, input.workspaceId)
      });
    },
    async authorizeChange(input) {
      return transport.execute({
        body: JSON.stringify({
          changeId: input.changeId
        }),
        correlationId: input.correlationId,
        operation: authorizeCommercialBillingChangeOperation,
        path: workspacePath(authorizeCommercialBillingChangeOperation, input.workspaceId)
      });
    },
    async reviewCancellation(input) {
      return transport.execute({
        body: JSON.stringify({
          idempotencyKey: input.idempotencyKey,
          mode: input.mode
        }),
        correlationId: input.correlationId,
        operation: reviewCommercialBillingCancellationOperation,
        path: workspacePath(reviewCommercialBillingCancellationOperation, input.workspaceId)
      });
    },
    async confirmCancellation(input) {
      return transport.execute({
        body: JSON.stringify({
          confirmationToken: input.confirmationToken,
          idempotencyKey: input.idempotencyKey
        }),
        correlationId: input.correlationId,
        operation: confirmCommercialBillingCancellationOperation,
        path: workspacePath(confirmCommercialBillingCancellationOperation, input.workspaceId)
      });
    },
    async requestRefund(input) {
      return transport.execute({
        body: JSON.stringify({
          amountMicros: input.amountMicros,
          category: input.category,
          consumedOverageMicros: input.consumedOverageMicros,
          idempotencyKey: input.idempotencyKey,
          invoiceRef: input.invoiceRef,
          verifiedCorrection: input.verifiedCorrection
        }),
        correlationId: input.correlationId,
        operation: requestCommercialBillingRefundOperation,
        path: workspacePath(requestCommercialBillingRefundOperation, input.workspaceId)
      });
    }
  };
}

// src/index.ts
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
    billing: createBillingClient(transport),
    commerce: createCommerceClient(transport),
    workspaces: createWorkspaceClient(transport)
  };
}
export {
  createWorkspaceClient,
  createCommerceClient,
  createBulkAccessClient,
  createBillingClient,
  createAuthlessTransport,
  createAuthlessServerClient,
  createAuditClient,
  createAppMembershipClient,
  createAppClient,
  createAppAccessClient,
  AuthlessApiError
};
