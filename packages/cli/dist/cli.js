#!/usr/bin/env bun
// @bun

// src/cli.ts
import { spawn } from "child_process";

// ../server/dist/index.js
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
  authorization: "session-or-workspace-service",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps",
  retrySafety: "unsafe",
  status: "stable"
};
var listAppsOperation = {
  authorization: "session-or-workspace-service",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps",
  retrySafety: "safe",
  status: "stable"
};
var getAppEnvironmentOperation = {
  authorization: "session-or-workspace-service",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}",
  retrySafety: "safe",
  status: "stable"
};
var changeAppEnvironmentStatusOperation = {
  authorization: "session-or-workspace-service",
  method: "PATCH",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}",
  retrySafety: "unsafe",
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
var inspectWorkspaceCapabilitiesOperation = {
  authorization: "workspace-service",
  method: "GET",
  path: "/workspaces/{workspaceId}/capabilities",
  retrySafety: "safe",
  status: "stable"
};
var replaceAppEnvironmentEndpointsOperation = {
  authorization: "session-or-workspace-service",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/endpoints",
  retrySafety: "unsafe",
  status: "stable"
};
var replaceAppEnvironmentOidcProfileOperation = {
  authorization: "session-or-workspace-service",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/oidc-profile",
  retrySafety: "unsafe",
  status: "stable"
};
var updateAppMetadataOperation = {
  authorization: "session-or-workspace-service",
  method: "PATCH",
  path: "/workspaces/{workspaceId}/apps/{appId}",
  retrySafety: "unsafe",
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
    },
    async updateMetadata(input) {
      const path = updateAppMetadataOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      const body = await transport.execute({
        body: JSON.stringify({
          description: input.description,
          expectedVersion: input.expectedVersion,
          name: input.name,
          ownerContactEmail: input.ownerContactEmail
        }),
        correlationId: input.correlationId,
        headers: { "if-match": `"${input.expectedVersion}"` },
        operation: updateAppMetadataOperation,
        path
      });
      return body.app;
    },
    async replaceEndpoints(input) {
      const path = replaceAppEnvironmentEndpointsOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{environment}", encodeURIComponent(input.environment));
      const body = await transport.execute({
        body: JSON.stringify({
          ...input.endpoints,
          confirmed: true,
          expectedVersion: input.expectedVersion
        }),
        correlationId: input.correlationId,
        headers: { "if-match": `"${input.expectedVersion}"` },
        operation: replaceAppEnvironmentEndpointsOperation,
        path
      });
      return body.environment;
    },
    async replaceOidcProfile(input) {
      const path = replaceAppEnvironmentOidcProfileOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{environment}", encodeURIComponent(input.environment));
      const body = await transport.execute({
        body: JSON.stringify({
          ...input.profile,
          confirmed: true,
          expectedVersion: input.expectedVersion
        }),
        correlationId: input.correlationId,
        headers: { "if-match": `"${input.expectedVersion}"` },
        operation: replaceAppEnvironmentOidcProfileOperation,
        path
      });
      return body.environment;
    },
    async activateEnvironment(input) {
      const path = changeAppEnvironmentStatusOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{environment}", "production");
      const body = await transport.execute({
        body: JSON.stringify({
          action: "activate",
          confirmed: true,
          expectedVersion: input.expectedVersion
        }),
        correlationId: input.correlationId,
        headers: { "if-match": `"${input.expectedVersion}"` },
        operation: changeAppEnvironmentStatusOperation,
        path
      });
      return body.environment;
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
  "action_not_permitted",
  "app_environment_not_found",
  "app_membership_not_found",
  "app_access_grant_not_found",
  "audit_resource_not_found",
  "body_too_large",
  "bulk_access_operation_not_found",
  "bulk_access_preview_not_found",
  "confirmation_required",
  "commercial_dunning_suspended",
  "production_app_allowance_exhausted",
  "customer_reference_conflict",
  "definition_unavailable",
  "forbidden",
  "insufficient_scope",
  "invalid_lifecycle_transition",
  "invalid_oidc_profile",
  "insufficient_permission",
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
  "provider_error",
  "provider_failure",
  "provider_unavailable",
  "rate_limited",
  "resource_not_found",
  "results_expired",
  "results_unavailable",
  "session_required",
  "temporary_unavailable",
  "temporarily_unavailable",
  "unauthorized",
  "version_required",
  "version_conflict",
  "version_or_idempotency_required",
  "version_precondition_required",
  "not_found",
  "policy_required",
  "invalid_endpoints",
  "environment_retired",
  "workspace_not_found"
]);
var transientStatuses = new Set([408, 500, 502, 503, 504]);
var workspaceServiceScopes = new Set([
  "app:read",
  "app:create",
  "app:write",
  "app:activate",
  "policy:read",
  "policy:write",
  "policy:activate",
  "endpoint:write",
  "oidc-profile:write",
  "credential:write"
]);
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
  requiredScope;
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
    this.requiredScope = input.requiredScope;
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
  const workspaceServiceCredentialToken = typeof options.workspaceServiceCredentialToken === "string" && options.workspaceServiceCredentialToken.length > 0 ? options.workspaceServiceCredentialToken : undefined;
  const credentials = [
    sessionToken,
    appCredentialToken,
    managementAccessToken,
    workspaceServiceCredentialToken
  ].filter((value) => value !== undefined);
  if (credentials.length !== 1)
    throw new TypeError("Exactly one server-side session, app credential, or management access token is required.");
  for (const [name, value] of [
    ["sessionToken", sessionToken],
    ["appCredentialToken", appCredentialToken],
    ["managementAccessToken", managementAccessToken],
    ["workspaceServiceCredentialToken", workspaceServiceCredentialToken]
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
      const bearerAuthorization = input.operation.authorization === "app-credential" ? appCredentialToken : input.operation.authorization === "session-or-app-credential" ? appCredentialToken || managementAccessToken : input.operation.authorization === "session-or-workspace-service" ? workspaceServiceCredentialToken || managementAccessToken : input.operation.authorization === "workspace-service" ? workspaceServiceCredentialToken : undefined;
      if ((appCredentialToken || workspaceServiceCredentialToken) && !bearerAuthorization)
        throw new TypeError(input.operation.authorization === "session" || input.operation.authorization === "session-or-management-oauth" ? "This Authless API operation requires a platform session." : "This Authless API operation does not accept the configured credential.");
      if (input.headers && Object.keys(input.headers).some((name) => /^(authorization|cookie|proxy-authorization|x-authless-client)$/iu.test(name)))
        throw new TypeError("Request headers cannot override server credentials or client identity.");
      const authorityHeaders = appCredentialToken || managementAccessToken || workspaceServiceCredentialToken ? {
        authorization: `Bearer ${appCredentialToken ?? managementAccessToken ?? workspaceServiceCredentialToken}`
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
          status: response.status,
          ...code === "insufficient_scope" && typeof body?.requiredScope === "string" && workspaceServiceScopes.has(body.requiredScope) ? { requiredScope: body.requiredScope } : {}
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
          confirmed: input.confirmed,
          expectedVersion: input.expectedVersion
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
          expectedVersion: input.expectedVersion,
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
          expectedDefinitionVersion: input.expectedDefinitionVersion,
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
          expectedDefinitionVersion: input.expectedDefinitionVersion,
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
          confirmed: input.confirmed,
          expectedGrantVersion: input.expectedGrantVersion
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
          confirmed: input.confirmed,
          expectedGrantVersion: input.expectedGrantVersion
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
var operation = {
  authorization: "app-credential",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/sessions/validate",
  retrySafety: "safe"
};
function createOnlineSessionClient(transport) {
  return {
    validate: async (input) => {
      if (!input.sessionReference)
        throw new TypeError("sessionReference is required.");
      const path = operation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{environment}", encodeURIComponent(input.environment));
      const result = await transport.execute({
        body: JSON.stringify({ sessionReference: input.sessionReference }),
        correlationId: input.correlationId,
        operation,
        path
      });
      if (!result || typeof result !== "object" || Array.isArray(result))
        throw new Error("Online session response was invalid.");
      const record2 = result;
      const status = record2.status;
      if (status === "compliant") {
        if (typeof record2.sessionId !== "string" || typeof record2.policyVersion !== "number" || !Number.isSafeInteger(record2.policyVersion))
          throw new Error("Online session response was invalid.");
        return {
          status,
          sessionId: record2.sessionId,
          policyVersion: record2.policyVersion
        };
      }
      if (status === "interaction_required") {
        if (typeof record2.sessionId !== "string" || typeof record2.policyVersion !== "number" || !Number.isSafeInteger(record2.policyVersion) || record2.reason !== "consent" && record2.reason !== "proof")
          throw new Error("Online session response was invalid.");
        return {
          status,
          sessionId: record2.sessionId,
          policyVersion: record2.policyVersion,
          reason: record2.reason
        };
      }
      if (status === "denied" || status === "expired") {
        if (record2.sessionId !== null && typeof record2.sessionId !== "string" || record2.policyVersion !== null || typeof record2.reason !== "string" || record2.reason.length === 0)
          throw new Error("Online session response was invalid.");
        const sessionId = typeof record2.sessionId === "string" ? record2.sessionId : null;
        return {
          status,
          sessionId,
          policyVersion: null,
          reason: record2.reason
        };
      }
      throw new Error("Online session response was invalid.");
    }
  };
}
var operation2 = (method, path, retrySafety) => ({
  authorization: "session-or-workspace-service",
  method,
  path,
  retrySafety
});
var paths = {
  base: "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy",
  history: "/workspaces/{workspaceId}/apps/{appId}/{environment}/policy/history"
};
var replace = (path, input) => path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{environment}", encodeURIComponent(input.environment));
function createPolicyClient(transport) {
  return {
    async get(input) {
      const response = await transport.execute({
        correlationId: input.correlationId,
        operation: operation2("GET", paths.base, "safe"),
        path: replace(paths.base, input)
      });
      return response.policy;
    },
    async history(input) {
      const query = new URLSearchParams;
      if (input.cursor !== undefined)
        query.set("cursor", input.cursor);
      if (input.limit !== undefined)
        query.set("limit", String(input.limit));
      const suffix = query.size ? `?${query}` : "";
      const response = await transport.execute({
        correlationId: input.correlationId,
        operation: operation2("GET", paths.history, "safe"),
        path: `${replace(paths.history, input)}${suffix}`
      });
      if ("history" in response && response.history)
        return response.history;
      if (!("items" in response) || !Array.isArray(response.items))
        throw new Error("Policy history response was invalid.");
      return response;
    },
    async revision(input) {
      const response = await transport.execute({
        correlationId: input.correlationId,
        operation: operation2("GET", `${paths.history}/{version}`, "safe"),
        path: `${replace(paths.history, input)}/${encodeURIComponent(String(input.version))}`
      });
      return "found" in response && response.found && response.version ? response.version : response;
    },
    async saveDraft(input) {
      const body = await transport.execute({
        body: JSON.stringify({
          definition: input.definition,
          expectedDraftVersion: input.expectedDraftVersion
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedDraftVersion}"`
        },
        operation: operation2("PUT", paths.base, "unsafe"),
        path: replace(paths.base, input)
      });
      return body.policy;
    },
    async activate(input) {
      const path = `${replace(paths.base, input)}/activate`;
      const body = await transport.execute({
        body: JSON.stringify({
          confirmed: true,
          expectedDraftVersion: input.expectedDraftVersion
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedDraftVersion}"`
        },
        operation: operation2("POST", path, "unsafe"),
        path
      });
      return body.policy;
    },
    async restore(input) {
      const path = `${replace(paths.history, input)}/${encodeURIComponent(String(input.version))}/restore`;
      const body = await transport.execute({
        body: JSON.stringify({
          expectedDraftVersion: input.expectedDraftVersion
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedDraftVersion}"`
        },
        operation: operation2("POST", path, "unsafe"),
        path
      });
      return body.policy;
    }
  };
}
var authOperation = (method, path, retrySafety) => ({
  authorization: "session-or-workspace-service",
  method,
  path,
  retrySafety
});
var root = (workspaceId) => `/workspaces/${encodeURIComponent(workspaceId)}`;
var principalPath = (workspaceId) => `${root(workspaceId)}/service-principals`;
var credentialsPath = (workspaceId, principalId) => `${principalPath(workspaceId)}/${encodeURIComponent(principalId)}/credentials`;
function createWorkspaceCredentialClient(transport) {
  return {
    async listPrincipals(input) {
      const path = principalPath(input.workspaceId);
      return transport.execute({
        correlationId: input.correlationId,
        operation: authOperation("GET", path, "safe"),
        path
      });
    },
    async getPrincipal(input) {
      const path = `${principalPath(input.workspaceId)}/${encodeURIComponent(input.principalId)}`;
      const response = await transport.execute({
        correlationId: input.correlationId,
        operation: authOperation("GET", path, "safe"),
        path
      });
      return "principal" in response ? response.principal : response;
    },
    async createPrincipal(input) {
      const path = principalPath(input.workspaceId);
      const response = await transport.execute({
        body: JSON.stringify({
          name: input.name,
          restrictions: input.restrictions,
          scopes: input.scopes
        }),
        correlationId: input.correlationId,
        operation: authOperation("POST", path, "unsafe"),
        path
      });
      return "principal" in response ? response.principal : response;
    },
    async changePrincipalStatus(input) {
      const path = `${principalPath(input.workspaceId)}/${encodeURIComponent(input.principalId)}/status`;
      const response = await transport.execute({
        body: JSON.stringify({
          expectedVersion: input.expectedVersion,
          status: input.status
        }),
        correlationId: input.correlationId,
        operation: authOperation("POST", path, "unsafe"),
        path
      });
      return "principal" in response ? response.principal : response;
    },
    async issue(input) {
      const path = credentialsPath(input.workspaceId, input.principalId);
      return transport.execute({
        body: JSON.stringify({
          expiresAt: input.expiresAt ?? null,
          name: input.name,
          restrictions: input.restrictions,
          scopes: input.scopes
        }),
        correlationId: input.correlationId,
        headers: { "idempotency-key": input.idempotencyKey },
        operation: authOperation("POST", path, "unsafe"),
        path
      });
    },
    async list(input) {
      const path = credentialsPath(input.workspaceId, input.principalId);
      return transport.execute({
        correlationId: input.correlationId,
        operation: authOperation("GET", path, "safe"),
        path
      });
    },
    async rotate(input) {
      const path = `${credentialsPath(input.workspaceId, input.principalId)}/${encodeURIComponent(input.credentialId)}/rotate`;
      return transport.execute({
        body: JSON.stringify({
          expiresAt: input.expiresAt ?? null,
          expectedVersion: input.expectedVersion,
          overlapSeconds: input.overlapSeconds
        }),
        correlationId: input.correlationId,
        headers: {
          "idempotency-key": input.idempotencyKey,
          "if-match": `"${input.expectedVersion}"`
        },
        operation: authOperation("POST", path, "unsafe"),
        path
      });
    },
    async revoke(input) {
      const path = `${credentialsPath(input.workspaceId, input.principalId)}/${encodeURIComponent(input.credentialId)}/revoke`;
      const response = await transport.execute({
        body: JSON.stringify({ expectedVersion: input.expectedVersion }),
        correlationId: input.correlationId,
        operation: authOperation("POST", path, "unsafe"),
        path
      });
      return "credential" in response ? response.credential : response;
    }
  };
}
function createWorkspaceClient(transport) {
  return {
    async create(input) {
      const body = await transport.execute({
        body: JSON.stringify({
          name: input.name,
          ...input.termsAccepted === true ? { termsAccepted: true } : {}
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
    async getCapabilities(input) {
      const path = inspectWorkspaceCapabilitiesOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      const body = await transport.execute({
        correlationId: input.correlationId,
        operation: inspectWorkspaceCapabilitiesOperation,
        path
      });
      return body.capabilities;
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
function workspacePath(operation3, workspaceId) {
  return operation3.path.replace("{workspaceId}", encodeURIComponent(workspaceId));
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
    workspaces: createWorkspaceClient(transport),
    policies: createPolicyClient(transport),
    workspaceCredentials: createWorkspaceCredentialClient(transport),
    onlineSessions: createOnlineSessionClient(transport)
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
var storeNames = {
  management: "oauth-management",
  mcp: "oauth-mcp"
};
var defaultClientId = "authless-cli";
var defaultResource = "https://api.authle.ss/management";
var defaultIssuer = "https://sign.authle.ss/management";
var defaultScope = "workspace:read";
var supportedScopes = [
  "workspace:read",
  "commerce:read",
  "commerce:write",
  "billing:read",
  "billing:write"
];
function oauthResourceForUrl(value) {
  const url = validateHttpsUrl(value, "OAuth resource");
  if (url.pathname !== "/management" && url.pathname !== "/mcp")
    throw new Error("OAuth resource must end at /management or /mcp");
  return url.pathname === "/mcp" ? "mcp" : "management";
}
function oauthStoreNameForResource(resource) {
  return storeNames[oauthResourceForUrl(resource)];
}
function oauthStoreForResource(resource) {
  const name = oauthStoreNameForResource(resource);
  return {
    read: () => readSecret(name),
    write: (value) => writeSecret(name, value),
    remove: () => removeSecret(name)
  };
}
function validateHttpsUrl(value, label) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} must be a valid URL`);
  }
  const loopback = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !loopback)
    throw new Error(`${label} must use HTTPS outside loopback`);
  if (url.username || url.password || url.search || url.hash)
    throw new Error(`${label} must not contain credentials, query, or fragment`);
  return url;
}
function validateOAuthEndpoints(issuer, resource) {
  const issuerUrl = validateHttpsUrl(issuer, "OAuth issuer");
  const resourceUrl = validateHttpsUrl(resource, "OAuth resource");
  if (issuerUrl.pathname !== "/management")
    throw new Error("OAuth issuer must end at /management");
  oauthResourceForUrl(resourceUrl.toString());
}
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
function normalizeScope(value) {
  const requested = value.split(/\s+/u).filter(Boolean);
  if (requested.length === 0 || new Set(requested).size !== requested.length)
    return null;
  if (!requested.every((scope) => supportedScopes.includes(scope)))
    return null;
  return supportedScopes.filter((scope) => requested.includes(scope)).join(" ");
}
async function requestToken(endpoint, body, fetcher) {
  const response = await fetcher(endpoint, {
    method: "POST",
    body,
    redirect: "error",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded"
    },
    signal: AbortSignal.timeout(30000)
  });
  const payload = safeJson(await response.json().catch(() => null));
  if (!response.ok)
    throw new Error(`OAuth token request failed (${response.status})`);
  const accessToken = payload.access_token;
  if (typeof accessToken !== "string" || !accessToken)
    throw new Error("OAuth response did not contain an access token");
  if (payload.token_type !== "Bearer")
    throw new Error("OAuth response did not contain a Bearer token");
  const expires = payload.expires_in;
  if (typeof expires !== "number" || !Number.isFinite(expires) || expires <= 0)
    throw new Error("OAuth response did not contain a valid expiry");
  const requestedScope = String(body.get("scope") ?? defaultScope);
  if (payload.scope !== requestedScope)
    throw new Error("OAuth response scope did not match the requested scope");
  return {
    accessToken,
    refreshToken: typeof payload.refresh_token === "string" ? payload.refresh_token : undefined,
    expiresAt: Date.now() + Math.max(1, expires - 30) * 1000,
    issuer: endpoint.replace(/\/oauth\/token$/u, ""),
    resource: String(body.get("resource") ?? defaultResource),
    scope: requestedScope,
    clientId: String(body.get("client_id") ?? defaultClientId),
    workspaceId: typeof payload.workspace_id === "string" && /^[A-Za-z0-9_-]{4,128}$/u.test(payload.workspace_id) ? payload.workspace_id : undefined
  };
}
async function loginOAuth(input) {
  const issuer = input.issuer ?? defaultIssuer;
  const clientId = input.clientId ?? defaultClientId;
  const resource = input.resource ?? defaultResource;
  const scope = normalizeScope(input.scope ?? defaultScope);
  if (!scope)
    throw new Error(`OAuth scope must contain only: ${supportedScopes.join(", ")}`);
  validateOAuthEndpoints(issuer, resource);
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
  let timer;
  const callback = new Promise((resolve, reject) => {
    let settled = false;
    timer = setTimeout(() => reject(new Error("OAuth callback timed out")), input.timeoutMs ?? 600000);
    server.on("request", (request, response) => {
      if (settled) {
        response.writeHead(409).end();
        return;
      }
      if (request.method !== "GET") {
        response.writeHead(405, { allow: "GET" }).end("Method not allowed");
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
  const authorizationUrl = authorization.toString();
  let code;
  try {
    input.onAuthorizationUrl?.(authorizationUrl);
    await (input.openBrowser ? input.openBrowser(authorizationUrl) : Promise.resolve());
    code = await callback;
  } finally {
    if (timer)
      clearTimeout(timer);
    server.close();
  }
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
  await (input.store ?? oauthStoreForResource(resource)).write(JSON.stringify(token));
  return token;
}
async function readOAuth(store = oauthStoreForResource(defaultResource)) {
  const raw = await store.read();
  if (!raw)
    return null;
  try {
    const value = JSON.parse(raw);
    if (!value || typeof value !== "object")
      throw new Error;
    const record2 = value;
    if (typeof record2.accessToken !== "string" || !record2.accessToken || typeof record2.issuer !== "string" || typeof record2.resource !== "string" || typeof record2.scope !== "string" || !normalizeScope(record2.scope) || typeof record2.expiresAt !== "number" || !Number.isFinite(record2.expiresAt) || typeof record2.clientId !== "string" || record2.clientId !== defaultClientId)
      throw new Error;
    validateOAuthEndpoints(record2.issuer, record2.resource);
    if (record2.refreshToken !== undefined && typeof record2.refreshToken !== "string")
      throw new Error;
    return {
      accessToken: record2.accessToken,
      ...record2.refreshToken ? { refreshToken: record2.refreshToken } : {},
      expiresAt: record2.expiresAt,
      issuer: record2.issuer,
      resource: record2.resource,
      scope: record2.scope,
      clientId: record2.clientId,
      ...typeof record2.workspaceId === "string" ? { workspaceId: record2.workspaceId } : {}
    };
  } catch {
    throw new Error("Stored OAuth credential is invalid; run auth login again");
  }
}
async function refreshOAuth(input, fetcher = fetch, store) {
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
  next.refreshToken ??= input.refreshToken;
  await (store ?? oauthStoreForResource(input.resource)).write(JSON.stringify(next));
  return next;
}
async function logoutOAuth(input, fetcher = fetch, store) {
  const endpoint = `${input.issuer}/oauth/revoke`;
  const candidates = input.refreshToken ? [
    { token: input.refreshToken, hint: "refresh_token" },
    { token: input.accessToken, hint: "access_token" }
  ] : [{ token: input.accessToken, hint: "access_token" }];
  let revoked = false;
  for (const candidate of candidates) {
    try {
      const response = await fetcher(endpoint, {
        method: "POST",
        body: new URLSearchParams({
          token: candidate.token,
          token_type_hint: candidate.hint
        }),
        redirect: "error",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(30000)
      });
      if (response.ok) {
        revoked = true;
        break;
      }
    } catch {}
  }
  if (!revoked)
    throw new Error("OAuth revocation was not confirmed; credential was retained");
  await (store ?? oauthStoreForResource(input.resource)).remove();
}

// src/cli.ts
var help = `Authless CLI

Management API commands for humans, automation, and agents. Environment
credentials stay in the environment or an external secret manager; native OAuth
grants are stored in Bun's secure store and never printed.

Usage:
  authless [--base-url URL] <command> [options]

Commands:
  workspaces list                         List workspaces for the current session
  workspaces get --workspace ID           Read one workspace
  apps list --workspace ID                List apps in a workspace
  apps update --workspace ID --app ID --version N --yes
                                           Update app metadata with an If-Match version
  apps environment --workspace ID --app ID --environment test|production
                                           Read an app environment
  policy get|history|revision                    Inspect active and immutable policy revisions
  policy save|activate|restore                   Mutate policy with --yes and version preconditions
  credentials principal|issue|list|rotate|revoke  Manage scoped workspace keys
  principals list|get|status                      Manage workspace service principals
  memberships list --workspace ID --app ID
                                           List app memberships
  audit list --workspace ID                List audit events
  memberships get --workspace ID --app ID --membership ID
  memberships invite --workspace ID --app ID --email EMAIL --yes
  memberships status --workspace ID --app ID --membership ID --action ACTION
  apps create --workspace ID --name NAME --owner-email EMAIL --yes
  workspaces create --name NAME --yes
  commerce plans --workspace ID --app ID --environment test|production
  commerce view --workspace ID --app ID
  commerce environment --workspace ID --app ID --environment test|production
  commerce catalog --app ID [--environment test|production]
  commerce catalog-create --workspace ID --app ID --environment ENV --name NAME --currency CUR --yes
  commerce entitlements --workspace ID --app ID --environment ENV --customer-ref REF
  commerce plan-create --workspace ID --app ID --environment ENV --key KEY --name NAME --amount-micros N --currency CUR --interval month|year [--trial-days N] [--included-meters JSON] --yes
  commerce feature-create --workspace ID --app ID --environment ENV --key KEY --name NAME --yes
  commerce addon-create --workspace ID --app ID --environment ENV --key KEY --name NAME --amount-micros N --currency CUR --interval month|year|one_time --yes
  commerce publish --workspace ID --app ID --environment ENV --plan ID --yes
  commerce accounting|settle --workspace ID --app ID --environment ENV
  commerce reserves-release --workspace ID --app ID --environment ENV --yes
  commerce payout --workspace ID --app ID --environment ENV --settlement ID --yes (test mock only)
  commerce usage --workspace ID --app ID --environment ENV --customer-ref REF --meter-key KEY --quantity N --yes
  commerce refund --workspace ID --app ID --environment ENV --invoice ID --payment-id ID --currency CUR --amount-minor N --yes
  commerce subscriptions [--app ID]
  commerce invoices [--app ID]
  commerce checkout --app ID --plan KEY --return-url URL --terms-digest DIGEST --yes
  commerce quote --app ID --plan KEY [--quantity N]
  commerce quote-accept --quote ID --terms-digest DIGEST --yes
  commerce change --subscription ID --effective-at now|renewal --yes
  commerce cancel|resume --subscription ID --yes
  commerce portal --app ID --return-url URL
  commerce checkout-complete --checkout ID --yes (test mock only)
  commerce renewal --workspace ID --app ID --yes (test mock only)
  billing inspect --workspace ID
  billing change-review --workspace ID --plan launch|growth|scale --period monthly --yes
  billing change-authorize --workspace ID --change ID --yes
  billing cancellation-review --workspace ID --mode period_end|immediate --yes
  billing cancel --workspace ID --confirmation-token TOKEN --yes
  billing refund --workspace ID --invoice ID --amount-micros N --consumed-overage-micros N --category CATEGORY --yes
  access get|grant-role|grant-entitlement|revoke-role|revoke-entitlement
  auth status                              Show configured credential kind (safe)
  auth login                               Start PKCE login with a loopback callback
  auth refresh [--resource URL]            Rotate the stored refresh token
  auth logout [--resource URL]             Revoke and remove the stored grant
  mcp initialize                           Authenticate and initialize MCP
  mcp tools [--include-writes]            List MCP tools (read-only by default)
  mcp resources                           List MCP resources
  mcp read --uri URI                      Read one MCP resource
  mcp call --tool NAME --arguments JSON   Call one read-only MCP tool
  mcp preview --tool NAME --arguments JSON Preview approved commerce/billing change
  mcp apply --tool NAME --arguments JSON --yes Apply confirmed preview

Authentication:
  Set AUTHLESS_SESSION_TOKEN for personal profile commands and platform-session commands.
  Set AUTHLESS_APP_CREDENTIAL for delegated developer app commands.
  Set AUTHLESS_APP_CREDENTIAL for app-scoped membership commands.
  Set AUTHLESS_WORKSPACE_KEY for scoped workspace automation commands.
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
  --no-browser       Print the OAuth URL instead of opening a browser
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
      if (key === "yes" || key === "json" || key === "human" || key === "all" || key === "no-browser" || key === "include-writes") {
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
var workspaceScopes = [
  "app:read",
  "app:create",
  "app:write",
  "policy:read",
  "policy:write",
  "policy:activate",
  "endpoint:write",
  "oidc-profile:write",
  "credential:write"
];
function workspaceScopeOption(options) {
  const values = requiredOption(options, "scopes").split(",").map((value) => value.trim()).filter(Boolean);
  if (values.length === 0 || values.some((value) => !workspaceScopes.includes(value)))
    throw new Error("--scopes must contain supported comma-separated workspace scopes");
  return [...new Set(values)];
}
function workspaceRestrictions(options) {
  const environment = options.get("environment") ?? "test";
  if (environment !== "test" && environment !== "production")
    throw new Error("--environment must be test or production");
  return {
    appIds: options.get("app") ? [requiredOption(options, "app")] : [],
    environments: [environment]
  };
}
async function retainIssuedWorkspaceSecret(value) {
  if (!value || typeof value !== "object")
    return value;
  const record2 = value;
  if (typeof record2.secret !== "string" || !record2.secret)
    return value;
  const credential = record2.credential;
  const id = credential && typeof credential === "object" && typeof credential.id === "string" ? credential.id : undefined;
  if (!id)
    throw new Error("Credential response omitted its id; refusing to store secret.");
  await writeSecret(`workspace-key-${id}`, record2.secret);
  return { ...record2, secretStored: true };
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
function parseJsonObject(value) {
  let parsed;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("--arguments must be valid JSON");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
    throw new Error("--arguments must be a JSON object");
  return Object.fromEntries(Object.entries(parsed));
}
function parseFeatureValues(value) {
  const parsed = parseJsonObject(value);
  for (const [key, item] of Object.entries(parsed)) {
    if (typeof item !== "boolean" && typeof item !== "string" && !(typeof item === "number" && Number.isFinite(item)))
      throw new Error(`--features value for ${key} must be boolean, number, or string`);
  }
  return parsed;
}
function parseIncludedMeters(value) {
  const parsed = parseJsonObject(value);
  for (const [key, item] of Object.entries(parsed)) {
    if (item !== null && (typeof item !== "number" || !Number.isSafeInteger(item) || item < 0))
      throw new Error(`--included-meters value for ${key} must be a non-negative integer or null`);
  }
  return parsed;
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
  const workspaceServiceCredentialToken = env.AUTHLESS_WORKSPACE_KEY?.trim() || undefined;
  const configured = [
    sessionToken,
    appCredentialToken,
    workspaceServiceCredentialToken
  ].filter(Boolean);
  if (configured.length !== 1)
    throw new Error("Set exactly one of AUTHLESS_SESSION_TOKEN, AUTHLESS_APP_CREDENTIAL, or AUTHLESS_WORKSPACE_KEY");
  const common = { baseUrl: baseUrl(options, env) };
  return sessionToken ? createAuthlessServerClient({ ...common, sessionToken }) : appCredentialToken ? createAuthlessServerClient({
    ...common,
    appCredentialToken: appCredentialToken ?? ""
  }) : createAuthlessServerClient({
    ...common,
    workspaceServiceCredentialToken: workspaceServiceCredentialToken ?? ""
  });
}
function correlationId() {
  return crypto.randomUUID();
}
function sessionOnly(env) {
  if (env.AUTHLESS_SESSION_TOKEN?.trim() && !env.AUTHLESS_APP_CREDENTIAL?.trim())
    return;
  throw new Error("This command requires AUTHLESS_SESSION_TOKEN. App credentials cannot access personal profile commerce or Authless workspace billing.");
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
    ["commerce view", ["app", "base-url", "workspace"]],
    ["commerce environment", ["app", "base-url", "environment", "workspace"]],
    ["commerce catalog", ["app", "base-url", "environment"]],
    [
      "commerce catalog-create",
      [
        "app",
        "base-url",
        "currency",
        "environment",
        "idempotency-key",
        "name",
        "workspace",
        "yes"
      ]
    ],
    [
      "commerce entitlements",
      ["app", "base-url", "customer-ref", "environment", "workspace"]
    ],
    ["commerce plans", ["app", "base-url", "environment", "workspace"]],
    [
      "commerce plan-create",
      [
        "add-ons",
        "app",
        "base-url",
        "currency",
        "description",
        "environment",
        "features",
        "included-meters",
        "idempotency-key",
        "interval",
        "key",
        "name",
        "amount-micros",
        "trial-days",
        "workspace",
        "yes"
      ]
    ],
    [
      "commerce feature-create",
      [
        "app",
        "base-url",
        "description",
        "environment",
        "idempotency-key",
        "key",
        "name",
        "metered",
        "workspace",
        "yes"
      ]
    ],
    [
      "commerce addon-create",
      [
        "app",
        "base-url",
        "currency",
        "description",
        "entitlement-duration",
        "environment",
        "features",
        "idempotency-key",
        "interval",
        "key",
        "name",
        "amount-micros",
        "workspace",
        "yes"
      ]
    ],
    [
      "commerce publish",
      [
        "app",
        "base-url",
        "environment",
        "idempotency-key",
        "plan",
        "workspace",
        "yes"
      ]
    ],
    ["commerce accounting", ["app", "base-url", "environment", "workspace"]],
    [
      "commerce settle",
      ["app", "base-url", "environment", "idempotency-key", "workspace", "yes"]
    ],
    [
      "commerce reserves-release",
      ["app", "base-url", "environment", "idempotency-key", "workspace", "yes"]
    ],
    [
      "commerce payout",
      [
        "app",
        "base-url",
        "environment",
        "idempotency-key",
        "settlement",
        "workspace",
        "yes"
      ]
    ],
    [
      "commerce usage",
      [
        "app",
        "base-url",
        "customer-ref",
        "environment",
        "idempotency-key",
        "meter-key",
        "quantity",
        "workspace",
        "yes"
      ]
    ],
    [
      "commerce refund",
      [
        "amount-minor",
        "app",
        "base-url",
        "currency",
        "environment",
        "idempotency-key",
        "invoice",
        "payment-id",
        "workspace",
        "yes"
      ]
    ],
    ["commerce subscriptions", ["all", "app", "base-url", "cursor", "limit"]],
    ["commerce invoices", ["all", "app", "base-url", "cursor", "limit"]],
    [
      "commerce checkout",
      [
        "add-ons",
        "app",
        "base-url",
        "environment",
        "plan",
        "quantity",
        "return-url",
        "terms-digest",
        "idempotency-key",
        "yes"
      ]
    ],
    [
      "commerce quote",
      [
        "add-ons",
        "app",
        "base-url",
        "discount-code",
        "environment",
        "plan",
        "quantity",
        "idempotency-key"
      ]
    ],
    [
      "commerce quote-accept",
      ["base-url", "idempotency-key", "quote", "terms-digest", "yes"]
    ],
    [
      "commerce change",
      [
        "add-ons",
        "base-url",
        "effective-at",
        "idempotency-key",
        "plan",
        "quantity",
        "subscription",
        "yes"
      ]
    ],
    ["commerce cancel", ["base-url", "idempotency-key", "subscription", "yes"]],
    ["commerce resume", ["base-url", "idempotency-key", "subscription", "yes"]],
    ["commerce portal", ["app", "base-url", "return-url"]],
    [
      "commerce checkout-complete",
      ["base-url", "checkout", "idempotency-key", "yes"]
    ],
    [
      "commerce renewal",
      ["app", "base-url", "idempotency-key", "workspace", "yes"]
    ],
    ["billing inspect", ["base-url", "workspace"]],
    [
      "billing change-review",
      [
        "base-url",
        "idempotency-key",
        "period",
        "plan",
        "quantity",
        "workspace",
        "yes"
      ]
    ],
    ["billing change-authorize", ["base-url", "change", "workspace", "yes"]],
    [
      "billing cancellation-review",
      ["base-url", "idempotency-key", "mode", "workspace", "yes"]
    ],
    [
      "billing cancel",
      ["base-url", "confirmation-token", "idempotency-key", "workspace", "yes"]
    ],
    [
      "billing refund",
      [
        "amount-micros",
        "base-url",
        "category",
        "consumed-overage-micros",
        "idempotency-key",
        "invoice",
        "verified-correction",
        "workspace",
        "yes"
      ]
    ],
    [
      "apps update",
      [
        "app",
        "base-url",
        "description",
        "name",
        "owner-email",
        "version",
        "workspace",
        "yes"
      ]
    ],
    ["policy get", ["app", "base-url", "environment", "workspace"]],
    [
      "policy history",
      ["all", "app", "base-url", "cursor", "environment", "limit", "workspace"]
    ],
    [
      "policy revision",
      ["app", "base-url", "environment", "version", "workspace"]
    ],
    [
      "policy save",
      [
        "app",
        "base-url",
        "definition",
        "environment",
        "expected-draft-version",
        "idempotency-key",
        "workspace",
        "yes"
      ]
    ],
    [
      "policy activate",
      [
        "app",
        "base-url",
        "environment",
        "expected-draft-version",
        "idempotency-key",
        "workspace",
        "yes"
      ]
    ],
    [
      "policy restore",
      [
        "app",
        "base-url",
        "environment",
        "expected-draft-version",
        "idempotency-key",
        "version",
        "workspace",
        "yes"
      ]
    ],
    [
      "credentials principal",
      ["base-url", "name", "scopes", "workspace", "app", "environment", "yes"]
    ],
    [
      "credentials issue",
      [
        "base-url",
        "expires-at",
        "idempotency-key",
        "name",
        "principal",
        "scopes",
        "workspace",
        "app",
        "environment",
        "yes"
      ]
    ],
    ["credentials list", ["base-url", "principal", "workspace"]],
    [
      "credentials rotate",
      [
        "base-url",
        "credential",
        "expires-at",
        "expected-version",
        "idempotency-key",
        "overlap-seconds",
        "principal",
        "workspace",
        "yes"
      ]
    ],
    [
      "credentials revoke",
      [
        "base-url",
        "credential",
        "expected-version",
        "principal",
        "workspace",
        "yes"
      ]
    ],
    ["principals list", ["base-url", "workspace"]],
    ["principals get", ["base-url", "principal", "workspace"]],
    [
      "principals status",
      [
        "base-url",
        "expected-version",
        "principal",
        "status",
        "workspace",
        "yes"
      ]
    ],
    [
      "apps update",
      [
        "app",
        "base-url",
        "description",
        "name",
        "owner-email",
        "version",
        "workspace",
        "yes"
      ]
    ],
    ["policy get", ["app", "base-url", "environment", "workspace"]],
    [
      "policy history",
      ["all", "app", "base-url", "cursor", "environment", "limit", "workspace"]
    ],
    [
      "policy revision",
      ["app", "base-url", "environment", "version", "workspace"]
    ],
    [
      "policy save",
      [
        "app",
        "base-url",
        "definition",
        "environment",
        "expected-draft-version",
        "idempotency-key",
        "workspace",
        "yes"
      ]
    ],
    [
      "policy activate",
      [
        "app",
        "base-url",
        "environment",
        "expected-draft-version",
        "idempotency-key",
        "workspace",
        "yes"
      ]
    ],
    [
      "policy restore",
      [
        "app",
        "base-url",
        "environment",
        "expected-draft-version",
        "idempotency-key",
        "version",
        "workspace",
        "yes"
      ]
    ],
    [
      "credentials principal",
      ["base-url", "name", "scopes", "workspace", "app", "environment", "yes"]
    ],
    [
      "credentials issue",
      [
        "base-url",
        "expires-at",
        "idempotency-key",
        "name",
        "principal",
        "scopes",
        "workspace",
        "app",
        "environment",
        "yes"
      ]
    ],
    ["credentials list", ["base-url", "principal", "workspace"]],
    [
      "credentials rotate",
      [
        "base-url",
        "credential",
        "expires-at",
        "expected-version",
        "idempotency-key",
        "overlap-seconds",
        "principal",
        "workspace",
        "yes"
      ]
    ],
    [
      "credentials revoke",
      [
        "base-url",
        "credential",
        "expected-version",
        "principal",
        "workspace",
        "yes"
      ]
    ],
    ["principals list", ["base-url", "workspace"]],
    ["principals get", ["base-url", "principal", "workspace"]],
    [
      "principals status",
      [
        "base-url",
        "expected-version",
        "principal",
        "status",
        "workspace",
        "yes"
      ]
    ],
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
      [
        "format",
        "human",
        "json",
        "issuer",
        "no-browser",
        "resource",
        "scope",
        "workspace"
      ]
    ],
    ["auth refresh", ["format", "human", "json", "resource"]],
    ["auth logout", ["format", "human", "json", "resource"]],
    ["mcp initialize", ["base-url", "format", "human", "json", "resource"]],
    [
      "mcp tools",
      ["base-url", "format", "human", "include-writes", "json", "resource"]
    ],
    ["mcp resources", ["base-url", "format", "human", "json", "resource"]],
    ["mcp read", ["base-url", "format", "human", "json", "resource", "uri"]],
    [
      "mcp call",
      ["arguments", "base-url", "format", "human", "json", "resource", "tool"]
    ],
    [
      "mcp preview",
      ["arguments", "base-url", "format", "human", "json", "resource", "tool"]
    ],
    [
      "mcp apply",
      [
        "arguments",
        "base-url",
        "format",
        "human",
        "json",
        "resource",
        "tool",
        "yes"
      ]
    ]
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
function mcpOriginResource(origin, requested) {
  const originUrl = new URL(origin);
  const resourceUrl = new URL(requested ?? `${origin}/mcp`);
  if (resourceUrl.origin !== originUrl.origin || resourceUrl.pathname !== "/mcp")
    throw new Error("MCP resource must be the same origin at /mcp");
  if (resourceUrl.username || resourceUrl.password || resourceUrl.search || resourceUrl.hash)
    throw new Error("MCP resource must not contain credentials, query, or fragment");
  return resourceUrl.toString();
}
function mcpResult(body, id) {
  if (!body || typeof body !== "object")
    throw new Error("MCP response was not a JSON object");
  const record2 = body;
  if (record2.jsonrpc !== "2.0" || record2.id !== id)
    throw new Error("MCP response had an invalid JSON-RPC envelope");
  if (record2.error && typeof record2.error === "object") {
    const error = record2.error;
    throw new Error(`MCP error ${String(error.code ?? "unknown")}: ${String(error.message ?? "request failed")}`);
  }
  if (!("result" in record2))
    throw new Error("MCP response did not contain a result");
  const result = record2.result;
  if (result && typeof result === "object" && result.isError === true)
    throw new Error("MCP tool reported an error");
  return record2;
}
function readOnlyTool(tool) {
  if (!tool || typeof tool !== "object")
    return false;
  const record2 = tool;
  const annotations = record2.annotations;
  if (!annotations || typeof annotations !== "object")
    return false;
  return annotations.readOnlyHint === true;
}
var approvedMcpPreviewTools = new Set([
  "authless_app_commerce_mutation_preview",
  "authless_billing_change_preview"
]);
var approvedMcpApplyTools = new Set([
  "authless_app_commerce_mutation_apply",
  "authless_billing_change_apply"
]);
function readOnlyTools(body, includeWrites = false) {
  if (includeWrites)
    return body;
  const result = body.result;
  if (!result || typeof result !== "object")
    return body;
  const tools = result.tools;
  if (!Array.isArray(tools))
    return body;
  return {
    ...body,
    result: {
      ...result,
      tools: tools.filter(readOnlyTool)
    }
  };
}
async function requestMcp(options, env, method, params, dependencies = {}) {
  const origin = baseUrl(options, env);
  const resource = mcpOriginResource(origin, options.get("resource"));
  const store = dependencies.mcpStore ?? oauthStoreForResource(resource);
  let stored = await readOAuth(store);
  if (!stored)
    throw new Error("No stored MCP grant. Run auth login --resource https://api.authle.ss/mcp first.");
  if (stored.resource !== resource)
    throw new Error("Stored MCP grant targets a different resource; sign in again.");
  if (stored.expiresAt <= Date.now())
    stored = await refreshOAuth(stored, dependencies.fetcher ?? fetch, store);
  const request = {
    id: crypto.randomUUID(),
    jsonrpc: "2.0",
    method,
    ...params ? { params } : {}
  };
  const response = await (dependencies.fetcher ?? fetch)(`${origin}/mcp`, {
    method: "POST",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${stored.accessToken}`,
      "content-type": "application/json",
      "mcp-protocol-version": "2025-11-25"
    },
    body: JSON.stringify(request),
    redirect: "error",
    signal: AbortSignal.timeout(30000)
  });
  const body = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(`MCP request failed (${response.status})`);
  return mcpResult(body, request.id);
}
async function requestApprovedMcpMutation(action, options, env, dependencies) {
  const toolName = requiredOption(options, "tool");
  const allowed = action === "preview" ? approvedMcpPreviewTools : approvedMcpApplyTools;
  if (!allowed.has(toolName))
    throw new Error(`--tool must be one of the approved ${action} commerce or billing MCP tools`);
  if (action === "apply")
    requireConfirmation(options);
  const args = parseJsonObject(requiredOption(options, "arguments"));
  if (action === "apply" && (args.confirmed !== true || typeof args.previewId !== "string" || args.previewId.length < 8))
    throw new Error("--arguments for mcp apply must include confirmed: true and a previewId");
  return requestMcp(options, env, "tools/call", { arguments: args, name: toolName }, dependencies);
}
async function optionalOAuth(store) {
  try {
    return await readOAuth(store);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Bun.secrets"))
      return null;
    throw error;
  }
}
async function executeCli(argv, env = process.env, write = (value) => process.stdout.write(`${value}
`), dependencies = {}) {
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
        managementOAuth: await optionalOAuth(dependencies.managementStore) ? "configured" : "native-pkce",
        mcpOAuth: await optionalOAuth(dependencies.mcpStore ?? oauthStoreForResource("https://api.authle.ss/mcp")) ? "configured" : "native-pkce"
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
        openBrowser: parsed.options.has("no-browser") ? undefined : dependencies.openBrowser ?? openBrowser,
        fetcher: dependencies.fetcher,
        store: (() => {
          const resourceUrl2 = parsed.options.get("resource");
          if (!resourceUrl2)
            return dependencies.managementStore;
          return oauthResourceForUrl(resourceUrl2) === "mcp" ? dependencies.mcpStore ?? oauthStoreForResource(resourceUrl2) : dependencies.managementStore ?? oauthStoreForResource(resourceUrl2);
        })(),
        onAuthorizationUrl: parsed.options.has("no-browser") ? (url) => {
          write(`Open this URL in a browser:
${url}`);
          dependencies.authorizationUrlHandler?.(url);
        } : undefined
      });
      write(outputFormat === "human" ? `Authenticated with ${token.scope}` : JSON.stringify({ authenticated: true, scope: token.scope }, null, 2));
      return 0;
    }
    const resourceUrl = parsed.options.get("resource") ?? "https://api.authle.ss/management";
    const store = parsed.options.get("resource") ? oauthResourceForUrl(resourceUrl) === "mcp" ? dependencies.mcpStore ?? oauthStoreForResource(resourceUrl) : dependencies.managementStore ?? oauthStoreForResource(resourceUrl) : dependencies.managementStore;
    const stored = await readOAuth(store);
    if (!stored)
      throw new Error("No stored OAuth grant. Run auth login first.");
    if (parsed.options.has("resource") && stored.resource !== resourceUrl)
      throw new Error("Stored OAuth grant targets a different resource; sign in again.");
    if (action === "refresh") {
      await refreshOAuth(stored, dependencies.fetcher ?? fetch, store);
      write(outputFormat === "human" ? "OAuth grant refreshed" : JSON.stringify({ refreshed: true }, null, 2));
      return 0;
    }
    await logoutOAuth(stored, dependencies.fetcher ?? fetch, store);
    write(outputFormat === "human" ? "OAuth grant revoked" : JSON.stringify({ loggedOut: true }, null, 2));
    return 0;
  }
  if (resource === "mcp") {
    const result2 = action === "initialize" ? await requestMcp(parsed.options, env, "initialize", {
      protocolVersion: "2025-11-25",
      capabilities: {},
      clientInfo: { name: "authless-cli", version: "0.1.0" }
    }, dependencies) : action === "tools" ? readOnlyTools(await requestMcp(parsed.options, env, "tools/list", undefined, dependencies), parsed.options.has("include-writes")) : action === "resources" ? await requestMcp(parsed.options, env, "resources/list", undefined, dependencies) : action === "read" ? await requestMcp(parsed.options, env, "resources/read", {
      uri: requiredOption(parsed.options, "uri")
    }, dependencies) : action === "preview" ? await requestApprovedMcpMutation("preview", parsed.options, env, dependencies) : action === "apply" ? await requestApprovedMcpMutation("apply", parsed.options, env, dependencies) : await (async () => {
      const toolName = requiredOption(parsed.options, "tool");
      const catalog = await requestMcp(parsed.options, env, "tools/list", undefined, dependencies);
      const tools = catalog.result?.tools;
      const selected = Array.isArray(tools) ? tools.find((tool) => tool && typeof tool === "object" && tool.name === toolName) : undefined;
      if (!readOnlyTool(selected))
        throw new Error("--tool must be annotated read-only by the MCP server");
      return requestMcp(parsed.options, env, "tools/call", {
        name: toolName,
        arguments: parsed.options.has("arguments") ? parseJsonObject(requiredOption(parsed.options, "arguments")) : {}
      }, dependencies);
    })();
    write(outputFormat === "human" ? humanResult(result2) : JSON.stringify(result2, null, 2));
    return 0;
  }
  let storedOAuth = await optionalOAuth(dependencies.managementStore);
  const managementResource = `${baseUrl(parsed.options, env)}/management`;
  if (storedOAuth && storedOAuth.resource !== managementResource)
    throw new Error("Stored management grant targets a different resource; sign in again.");
  if (storedOAuth && storedOAuth.expiresAt <= Date.now() && !env.AUTHLESS_SESSION_TOKEN?.trim() && !env.AUTHLESS_APP_CREDENTIAL?.trim() && !env.AUTHLESS_WORKSPACE_KEY?.trim()) {
    storedOAuth = await refreshOAuth(storedOAuth, dependencies.fetcher ?? fetch, dependencies.managementStore);
  }
  if (storedOAuth?.workspaceId) {
    const selected = parsed.options.get("workspace");
    if (selected && selected !== storedOAuth.workspaceId)
      throw new Error(`Stored OAuth grant is bound to workspace ${storedOAuth.workspaceId}; sign in again for another workspace.`);
    if (!selected)
      parsed.options.set("workspace", storedOAuth.workspaceId);
  }
  const api = storedOAuth && !env.AUTHLESS_SESSION_TOKEN?.trim() && !env.AUTHLESS_APP_CREDENTIAL?.trim() && !env.AUTHLESS_WORKSPACE_KEY?.trim() ? createAuthlessServerClient({
    baseUrl: baseUrl(parsed.options, env),
    managementAccessToken: storedOAuth.accessToken
  }) : client(parsed.options, env);
  const cursor = parsed.options.get("cursor");
  const limit = pageOption(parsed.options);
  const collect = parsed.options.has("all");
  const requestId = correlationId();
  let result;
  if (resource === "billing") {
    sessionOnly(env);
    const workspaceId = requiredOption(parsed.options, "workspace");
    if (action === "inspect") {
      result = await api.billing.inspect({
        correlationId: requestId,
        workspaceId
      });
    } else if (action === "change-review") {
      requireConfirmation(parsed.options);
      const plan = requiredOption(parsed.options, "plan");
      if (plan !== "launch" && plan !== "growth" && plan !== "scale")
        throw new Error("--plan must be launch, growth, or scale");
      const period = requiredOption(parsed.options, "period");
      if (period !== "monthly")
        throw new Error("--period must be monthly");
      result = await api.billing.reviewChange({
        correlationId: requestId,
        idempotencyKey: idempotencyKey(parsed.options),
        period: "monthly",
        planId: plan === "launch" ? "launch" : plan === "growth" ? "growth" : "scale",
        quantity: parsed.options.has("quantity") ? integerOption(parsed.options, "quantity") : undefined,
        workspaceId
      });
    } else if (action === "change-authorize") {
      requireConfirmation(parsed.options);
      result = await api.billing.authorizeChange({
        changeId: requiredOption(parsed.options, "change"),
        correlationId: requestId,
        workspaceId
      });
    } else if (action === "cancellation-review") {
      requireConfirmation(parsed.options);
      const mode = requiredOption(parsed.options, "mode");
      if (mode !== "period_end" && mode !== "immediate")
        throw new Error("--mode must be period_end or immediate");
      result = await api.billing.reviewCancellation({
        correlationId: requestId,
        idempotencyKey: idempotencyKey(parsed.options),
        mode: mode === "period_end" ? "period_end" : "immediate",
        workspaceId
      });
    } else if (action === "cancel") {
      requireConfirmation(parsed.options);
      result = await api.billing.confirmCancellation({
        confirmationToken: requiredOption(parsed.options, "confirmation-token"),
        correlationId: requestId,
        idempotencyKey: idempotencyKey(parsed.options),
        workspaceId
      });
    } else if (action === "refund") {
      requireConfirmation(parsed.options);
      const category = requiredOption(parsed.options, "category");
      if (category !== "first_purchase_goodwill" && category !== "verified_correction")
        throw new Error("--category must be first_purchase_goodwill or verified_correction");
      result = await api.billing.requestRefund({
        amountMicros: integerOption(parsed.options, "amount-micros"),
        category: category === "first_purchase_goodwill" ? "first_purchase_goodwill" : "verified_correction",
        consumedOverageMicros: integerOption(parsed.options, "consumed-overage-micros"),
        correlationId: requestId,
        idempotencyKey: idempotencyKey(parsed.options),
        invoiceRef: requiredOption(parsed.options, "invoice"),
        verifiedCorrection: parsed.options.get("verified-correction") === "true",
        workspaceId
      });
    } else {
      throw new Error(`Unknown command: ${parsed.command.join(" ")}`);
    }
  } else if (resource === "commerce" && action === "view") {
    result = await api.commerce.getAppView({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "environment") {
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.getAppEnvironmentView({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment: environment === "test" ? "test" : "production",
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "catalog") {
    sessionOnly(env);
    const environment = parsed.options.get("environment");
    if (environment !== undefined && environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.listCatalog({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment
    });
  } else if (resource === "commerce" && action === "catalog-create") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.createCatalog({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      defaultCurrency: requiredOption(parsed.options, "currency"),
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      name: requiredOption(parsed.options, "name"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "entitlements") {
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.getEntitlements({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      customerRef: requiredOption(parsed.options, "customer-ref"),
      environment,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "plans") {
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.listPlans({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "plan-create") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    const addOns = parsed.options.get("add-ons")?.split(",").filter(Boolean);
    if (addOns?.length)
      throw new Error("--add-ons is unsupported for plan creation. Create add-ons separately and select them during checkout.");
    const features = parsed.options.has("features") ? parseFeatureValues(requiredOption(parsed.options, "features")) : undefined;
    const includedMeters = parsed.options.has("included-meters") ? parseIncludedMeters(requiredOption(parsed.options, "included-meters")) : undefined;
    const trialDays = parsed.options.has("trial-days") ? integerOption(parsed.options, "trial-days") : undefined;
    if (trialDays !== undefined && trialDays > 365)
      throw new Error("--trial-days must be from 0 through 365");
    result = await api.commerce.createPlan({
      amountMicros: integerOption(parsed.options, "amount-micros"),
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      currency: requiredOption(parsed.options, "currency"),
      description: parsed.options.get("description"),
      environment,
      features,
      includedMeters,
      idempotencyKey: idempotencyKey(parsed.options),
      interval: (() => {
        const value = requiredOption(parsed.options, "interval");
        if (value !== "month" && value !== "year")
          throw new Error("--interval must be month or year");
        return value;
      })(),
      key: requiredOption(parsed.options, "key"),
      name: requiredOption(parsed.options, "name"),
      trialDays,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "feature-create") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.createFeature({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      description: parsed.options.get("description"),
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      key: requiredOption(parsed.options, "key"),
      metered: parsed.options.get("metered") === "true",
      name: requiredOption(parsed.options, "name"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "addon-create") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    const interval = requiredOption(parsed.options, "interval");
    if (interval !== "month" && interval !== "year" && interval !== "one_time")
      throw new Error("--interval must be month, year, or one_time");
    const entitlementDuration = parsed.options.get("entitlement-duration");
    if (entitlementDuration !== undefined && entitlementDuration !== "period" && entitlementDuration !== "indefinite")
      throw new Error("--entitlement-duration must be period or indefinite");
    const features = parsed.options.has("features") ? parseJsonObject(requiredOption(parsed.options, "features")) : undefined;
    result = await api.commerce.createAddon({
      amountMicros: integerOption(parsed.options, "amount-micros"),
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      currency: requiredOption(parsed.options, "currency"),
      description: parsed.options.get("description"),
      entitlementDuration,
      environment,
      features,
      idempotencyKey: idempotencyKey(parsed.options),
      interval,
      key: requiredOption(parsed.options, "key"),
      name: requiredOption(parsed.options, "name"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "publish") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.publishPlan({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      planId: requiredOption(parsed.options, "plan"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "accounting") {
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.getPublisherAccounting({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "settle") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.createSettlement({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "reserves-release") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.releasePublisherReserves({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "payout") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.simulatePayout({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      settlementId: requiredOption(parsed.options, "settlement"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "usage") {
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.recordUsage({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      customerRef: requiredOption(parsed.options, "customer-ref"),
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      meterKey: requiredOption(parsed.options, "meter-key"),
      quantity: integerOption(parsed.options, "quantity"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "refund") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.commerce.requestRefund({
      amountMinor: integerOption(parsed.options, "amount-minor"),
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      currency: requiredOption(parsed.options, "currency"),
      environment: environment === "test" ? "test" : "production",
      idempotencyKey: idempotencyKey(parsed.options),
      invoiceId: requiredOption(parsed.options, "invoice"),
      paymentId: requiredOption(parsed.options, "payment-id"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "commerce" && action === "subscriptions") {
    sessionOnly(env);
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.commerce.listSubscriptions({
      appId: parsed.options.get("app"),
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit
    })) : await api.commerce.listSubscriptions({
      appId: parsed.options.get("app"),
      correlationId: requestId,
      cursor,
      limit
    });
  } else if (resource === "commerce" && action === "invoices") {
    sessionOnly(env);
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.commerce.listInvoices({
      appId: parsed.options.get("app"),
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit
    })) : await api.commerce.listInvoices({
      appId: parsed.options.get("app"),
      correlationId: requestId,
      cursor,
      limit
    });
  } else if (resource === "commerce" && action === "quote") {
    sessionOnly(env);
    const environmentValue = parsed.options.get("environment");
    if (environmentValue !== undefined && environmentValue !== "test" && environmentValue !== "production")
      throw new Error("--environment must be test or production");
    const environment = environmentValue === undefined ? undefined : environmentValue === "test" ? "test" : "production";
    result = await api.commerce.createQuote({
      addOns: parsed.options.get("add-ons")?.split(",").filter(Boolean),
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      discountCode: parsed.options.get("discount-code"),
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      planKey: requiredOption(parsed.options, "plan"),
      quantity: parsed.options.has("quantity") ? integerOption(parsed.options, "quantity") : undefined
    });
  } else if (resource === "commerce" && action === "quote-accept") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    result = await api.commerce.acceptQuote({
      correlationId: requestId,
      idempotencyKey: idempotencyKey(parsed.options),
      quoteId: requiredOption(parsed.options, "quote"),
      termsDigest: requiredOption(parsed.options, "terms-digest")
    });
  } else if (resource === "commerce" && action === "checkout") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    const environmentValue = parsed.options.get("environment");
    if (environmentValue !== undefined && environmentValue !== "test" && environmentValue !== "production")
      throw new Error("--environment must be test or production");
    const environment = environmentValue === undefined ? undefined : environmentValue === "test" ? "test" : "production";
    result = await api.commerce.createCheckout({
      acceptedTermsDigest: requiredOption(parsed.options, "terms-digest"),
      addOns: parsed.options.get("add-ons")?.split(",").filter(Boolean),
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      idempotencyKey: idempotencyKey(parsed.options),
      planKey: requiredOption(parsed.options, "plan"),
      quantity: parsed.options.has("quantity") ? integerOption(parsed.options, "quantity") : undefined,
      returnUrl: requiredOption(parsed.options, "return-url")
    });
  } else if (resource === "commerce" && action === "change") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    const effectiveAtValue = requiredOption(parsed.options, "effective-at");
    if (effectiveAtValue !== "now" && effectiveAtValue !== "renewal")
      throw new Error("--effective-at must be now or renewal");
    const effectiveAt = effectiveAtValue === "now" ? "now" : "renewal";
    result = await api.commerce.changeSubscription({
      addOns: parsed.options.get("add-ons")?.split(",").filter(Boolean),
      correlationId: requestId,
      effectiveAt,
      idempotencyKey: idempotencyKey(parsed.options),
      planKey: parsed.options.get("plan"),
      quantity: parsed.options.has("quantity") ? integerOption(parsed.options, "quantity") : undefined,
      subscriptionRef: requiredOption(parsed.options, "subscription")
    });
  } else if (resource === "commerce" && (action === "cancel" || action === "resume")) {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    const input = {
      correlationId: requestId,
      idempotencyKey: idempotencyKey(parsed.options),
      subscriptionRef: requiredOption(parsed.options, "subscription")
    };
    result = action === "cancel" ? await api.commerce.cancelSubscription(input) : await api.commerce.resumeSubscription(input);
  } else if (resource === "commerce" && action === "portal") {
    sessionOnly(env);
    result = await api.commerce.createPortalSession({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      returnUrl: requiredOption(parsed.options, "return-url")
    });
  } else if (resource === "commerce" && action === "checkout-complete") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    result = await api.commerce.completeCheckout({
      checkoutRef: requiredOption(parsed.options, "checkout"),
      correlationId: requestId,
      idempotencyKey: idempotencyKey(parsed.options)
    });
  } else if (resource === "commerce" && action === "renewal") {
    sessionOnly(env);
    requireConfirmation(parsed.options);
    result = await api.commerce.simulateMockRenewal({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      idempotencyKey: idempotencyKey(parsed.options),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "workspaces" && action === "list") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly(env);
    result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.workspaces.list({
      correlationId: requestId,
      cursor: nextCursor,
      limit: nextLimit
    })) : await api.workspaces.list({ correlationId: requestId, cursor, limit });
  } else if (resource === "workspaces" && action === "get") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly(env);
    result = await api.workspaces.get({
      correlationId: requestId,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "workspaces" && action === "create") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly(env);
    requireConfirmation(parsed.options);
    result = await api.workspaces.create({
      correlationId: requestId,
      idempotencyKey: idempotencyKey(parsed.options),
      name: requiredOption(parsed.options, "name"),
      termsAccepted: true
    });
  } else if (resource === "apps" && action === "list") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly(env);
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
      sessionOnly(env);
    requireConfirmation(parsed.options);
    result = await api.apps.create({
      correlationId: requestId,
      description: parsed.options.get("description") ?? "",
      idempotencyKey: idempotencyKey(parsed.options),
      name: requiredOption(parsed.options, "name"),
      ownerContactEmail: requiredOption(parsed.options, "owner-email"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "apps" && action === "update") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth && !env.AUTHLESS_WORKSPACE_KEY?.trim())
      throw new Error("This command requires an authenticated session or AUTHLESS_WORKSPACE_KEY.");
    requireConfirmation(parsed.options);
    result = await api.apps.updateMetadata({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      description: requiredOption(parsed.options, "description"),
      expectedVersion: integerOption(parsed.options, "version"),
      name: requiredOption(parsed.options, "name"),
      ownerContactEmail: requiredOption(parsed.options, "owner-email"),
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "apps" && action === "environment") {
    if (!env.AUTHLESS_SESSION_TOKEN?.trim() && !storedOAuth)
      sessionOnly(env);
    const environment = requiredOption(parsed.options, "environment");
    if (environment !== "test" && environment !== "production")
      throw new Error("--environment must be test or production");
    result = await api.apps.getEnvironment({
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment,
      workspaceId: requiredOption(parsed.options, "workspace")
    });
  } else if (resource === "policy") {
    const policyInput = {
      appId: requiredOption(parsed.options, "app"),
      correlationId: requestId,
      environment: requiredOption(parsed.options, "environment"),
      workspaceId: requiredOption(parsed.options, "workspace")
    };
    if (policyInput.environment !== "test" && policyInput.environment !== "production")
      throw new Error("--environment must be test or production");
    if (action === "get") {
      result = await api.policies.get(policyInput);
    } else if (action === "history") {
      result = collect ? await allPages(cursor, limit, (nextCursor, nextLimit) => api.policies.history({
        ...policyInput,
        cursor: nextCursor,
        limit: nextLimit
      })) : await api.policies.history({ ...policyInput, cursor, limit });
    } else if (action === "revision") {
      result = await api.policies.revision({
        ...policyInput,
        version: integerOption(parsed.options, "version")
      });
    } else if (action === "save") {
      requireConfirmation(parsed.options);
      result = await api.policies.saveDraft({
        ...policyInput,
        definition: parseJsonObject(requiredOption(parsed.options, "definition")),
        expectedDraftVersion: integerOption(parsed.options, "expected-draft-version"),
        idempotencyKey: idempotencyKey(parsed.options)
      });
    } else if (action === "activate") {
      requireConfirmation(parsed.options);
      result = await api.policies.activate({
        ...policyInput,
        confirmed: true,
        expectedDraftVersion: integerOption(parsed.options, "expected-draft-version"),
        idempotencyKey: idempotencyKey(parsed.options)
      });
    } else if (action === "restore") {
      requireConfirmation(parsed.options);
      result = await api.policies.restore({
        ...policyInput,
        expectedDraftVersion: integerOption(parsed.options, "expected-draft-version"),
        idempotencyKey: idempotencyKey(parsed.options),
        version: integerOption(parsed.options, "version")
      });
    } else {
      throw new Error(`Unknown policy command: ${action}`);
    }
  } else if (resource === "principals") {
    const workspaceId = requiredOption(parsed.options, "workspace");
    if (action === "list") {
      result = await api.workspaceCredentials.listPrincipals({
        correlationId: requestId,
        workspaceId
      });
    } else if (action === "get") {
      result = await api.workspaceCredentials.getPrincipal({
        correlationId: requestId,
        principalId: requiredOption(parsed.options, "principal"),
        workspaceId
      });
    } else if (action === "status") {
      requireConfirmation(parsed.options);
      const status = requiredOption(parsed.options, "status");
      if (status !== "active" && status !== "suspended" && status !== "revoked")
        throw new Error("--status must be active, suspended, or revoked");
      result = await api.workspaceCredentials.changePrincipalStatus({
        correlationId: requestId,
        expectedVersion: integerOption(parsed.options, "expected-version"),
        principalId: requiredOption(parsed.options, "principal"),
        status,
        workspaceId
      });
    } else {
      throw new Error(`Unknown principals command: ${action}`);
    }
  } else if (resource === "credentials") {
    const workspaceId = requiredOption(parsed.options, "workspace");
    if (action === "principal") {
      requireConfirmation(parsed.options);
      result = await api.workspaceCredentials.createPrincipal({
        correlationId: requestId,
        name: requiredOption(parsed.options, "name"),
        restrictions: workspaceRestrictions(parsed.options),
        scopes: workspaceScopeOption(parsed.options),
        workspaceId
      });
    } else if (action === "issue") {
      requireConfirmation(parsed.options);
      result = await retainIssuedWorkspaceSecret(await api.workspaceCredentials.issue({
        correlationId: requestId,
        expiresAt: parsed.options.get("expires-at"),
        idempotencyKey: idempotencyKey(parsed.options),
        name: requiredOption(parsed.options, "name"),
        principalId: requiredOption(parsed.options, "principal"),
        restrictions: workspaceRestrictions(parsed.options),
        scopes: workspaceScopeOption(parsed.options),
        workspaceId
      }));
    } else if (action === "list") {
      result = await api.workspaceCredentials.list({
        correlationId: requestId,
        principalId: requiredOption(parsed.options, "principal"),
        workspaceId
      });
    } else if (action === "rotate") {
      requireConfirmation(parsed.options);
      result = await retainIssuedWorkspaceSecret(await api.workspaceCredentials.rotate({
        correlationId: requestId,
        credentialId: requiredOption(parsed.options, "credential"),
        expiresAt: parsed.options.get("expires-at"),
        expectedVersion: integerOption(parsed.options, "expected-version"),
        idempotencyKey: idempotencyKey(parsed.options),
        overlapSeconds: integerOption(parsed.options, "overlap-seconds"),
        principalId: requiredOption(parsed.options, "principal"),
        workspaceId
      }));
    } else if (action === "revoke") {
      requireConfirmation(parsed.options);
      result = await api.workspaceCredentials.revoke({
        correlationId: requestId,
        credentialId: requiredOption(parsed.options, "credential"),
        expectedVersion: integerOption(parsed.options, "expected-version"),
        principalId: requiredOption(parsed.options, "principal"),
        workspaceId
      });
    } else {
      throw new Error(`Unknown credentials command: ${action}`);
    }
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
      sessionOnly(env);
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
  return message.replace(/((?:AUTHLESS_(?:SESSION_TOKEN|APP_CREDENTIAL|WORKSPACE_KEY)|access_token|client_secret|token)=)[^\s&]+/giu, "$1[redacted]");
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
