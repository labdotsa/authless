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
var issueWorkspaceAvatarIntentOperation = {
  authorization: "session",
  method: "POST",
  path: "/workspaces/{workspaceId}/avatar/intents",
  retrySafety: "unsafe",
  status: "stable"
};
var uploadWorkspaceAvatarOperation = {
  authorization: "session",
  method: "PUT",
  path: "/workspaces/{workspaceId}/avatar/intents/{intentId}",
  retrySafety: "unsafe",
  status: "stable"
};
var attachWorkspaceAvatarOperation = {
  authorization: "session",
  method: "PUT",
  path: "/workspaces/{workspaceId}/avatar",
  retrySafety: "unsafe",
  status: "stable"
};
var removeWorkspaceAvatarOperation = {
  authorization: "session",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/avatar",
  retrySafety: "unsafe",
  status: "stable"
};
var createAppIconUploadIntentOperation = {
  authorization: "session-or-workspace-service",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/icon/intents",
  retrySafety: "safe",
  status: "stable"
};
var uploadAppIconOperation = {
  authorization: "session-or-workspace-service",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/icon/intents/{intentId}",
  retrySafety: "unsafe",
  status: "stable"
};
var publishAppIconOperation = {
  authorization: "session-or-workspace-service",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/icon",
  retrySafety: "unsafe",
  status: "stable"
};
var clearAppIconOperation = {
  authorization: "session-or-workspace-service",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/icon",
  retrySafety: "unsafe",
  status: "stable"
};
var beginGuestConversionIntentOperation = {
  authorization: "guest",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-conversion/intents",
  retrySafety: "unsafe",
  status: "experimental"
};
var getGuestConversionIntentOperation = {
  authorization: "public",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-conversion/intents/{intent}",
  retrySafety: "safe",
  status: "experimental"
};
var confirmGuestConversionOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/guest-conversion",
  retrySafety: "unsafe",
  status: "experimental"
};
var getAppProfileMeOperation = {
  authorization: "public",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/me",
  retrySafety: "safe",
  status: "experimental"
};
var updateAppProfileMeOperation = {
  authorization: "public",
  method: "PATCH",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/me",
  retrySafety: "unsafe",
  status: "experimental"
};
var getAppProfileSubjectOperation = {
  authorization: "public",
  method: "GET",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}",
  retrySafety: "safe",
  status: "experimental"
};
var updateAppProfileSubjectOperation = {
  authorization: "public",
  method: "PATCH",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}",
  retrySafety: "unsafe",
  status: "experimental"
};
var createAppProfileUserAvatarIntentOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar-intents",
  retrySafety: "unsafe",
  status: "experimental"
};
var createAppProfileSubjectUserAvatarIntentOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar-intents",
  retrySafety: "unsafe",
  status: "experimental"
};
var createAppProfileAppAvatarIntentOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar-intents",
  retrySafety: "unsafe",
  status: "experimental"
};
var createAppProfileSubjectAppAvatarIntentOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar-intents",
  retrySafety: "unsafe",
  status: "experimental"
};
var uploadAppProfileUserAvatarOperation = {
  authorization: "public",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar/{intentId}",
  retrySafety: "unsafe",
  status: "experimental"
};
var uploadAppProfileSubjectUserAvatarOperation = {
  authorization: "public",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar/{intentId}",
  retrySafety: "unsafe",
  status: "experimental"
};
var uploadAppProfileAppAvatarOperation = {
  authorization: "public",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar/{intentId}",
  retrySafety: "unsafe",
  status: "experimental"
};
var uploadAppProfileSubjectAppAvatarOperation = {
  authorization: "public",
  method: "PUT",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar/{intentId}",
  retrySafety: "unsafe",
  status: "experimental"
};
var publishAppProfileUserAvatarOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var removeAppProfileUserAvatarOperation = {
  authorization: "public",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/user/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var publishAppProfileSubjectUserAvatarOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var removeAppProfileSubjectUserAvatarOperation = {
  authorization: "public",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/user/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var publishAppProfileAppAvatarOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var removeAppProfileAppAvatarOperation = {
  authorization: "public",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profile/app/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var publishAppProfileSubjectAppAvatarOperation = {
  authorization: "public",
  method: "POST",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};
var removeAppProfileSubjectAppAvatarOperation = {
  authorization: "public",
  method: "DELETE",
  path: "/workspaces/{workspaceId}/apps/{appId}/{environment}/profiles/{subjectId}/app/avatar",
  retrySafety: "unsafe",
  status: "experimental"
};

// src/app-profiles.ts
function avatarOperation(input, action) {
  const subject = input.subjectId !== undefined;
  if (action === "intent") {
    return {
      ...subject ? input.side === "user" ? createAppProfileSubjectUserAvatarIntentOperation : createAppProfileSubjectAppAvatarIntentOperation : input.side === "user" ? createAppProfileUserAvatarIntentOperation : createAppProfileAppAvatarIntentOperation,
      authorization: "app-credential"
    };
  }
  if (action === "upload") {
    return {
      ...subject ? input.side === "user" ? uploadAppProfileSubjectUserAvatarOperation : uploadAppProfileSubjectAppAvatarOperation : input.side === "user" ? uploadAppProfileUserAvatarOperation : uploadAppProfileAppAvatarOperation,
      authorization: "app-credential"
    };
  }
  if (action === "publish") {
    return {
      ...subject ? input.side === "user" ? publishAppProfileSubjectUserAvatarOperation : publishAppProfileSubjectAppAvatarOperation : input.side === "user" ? publishAppProfileUserAvatarOperation : publishAppProfileAppAvatarOperation,
      authorization: "app-credential"
    };
  }
  return {
    ...subject ? input.side === "user" ? removeAppProfileSubjectUserAvatarOperation : removeAppProfileSubjectAppAvatarOperation : input.side === "user" ? removeAppProfileUserAvatarOperation : removeAppProfileAppAvatarOperation,
    authorization: "app-credential"
  };
}
function profilePath(input, suffix) {
  return "/workspaces/" + encodeURIComponent(input.workspaceId) + "/apps/" + encodeURIComponent(input.appId) + "/" + encodeURIComponent(input.environment) + suffix;
}
function avatarPath(input, suffix) {
  const target = input.subjectId ? `/profiles/${encodeURIComponent(input.subjectId)}/${input.side}` : `/profile/${input.side}`;
  return profilePath(input, `${target}/avatar${suffix}`);
}
function profileHeaders(input) {
  return {
    ...input.expectedVersion === undefined ? {} : { "if-match": `"${input.expectedVersion}"` },
    ...input.idempotencyKey === undefined ? {} : { "idempotency-key": input.idempotencyKey },
    ...input.sessionReference === undefined ? {} : { "x-session-reference": input.sessionReference }
  };
}
function createAppProfilesClient(transport) {
  return {
    async getApp(input) {
      const path = profilePath(input, `/profiles/${encodeURIComponent(input.subjectId)}`);
      return transport.execute({
        correlationId: input.correlationId,
        operation: {
          ...getAppProfileSubjectOperation,
          authorization: "app-credential"
        },
        path
      });
    },
    async updateApp(input) {
      const path = profilePath(input, `/profiles/${encodeURIComponent(input.subjectId)}`);
      const body = {
        ...input.displayName !== undefined ? { displayName: input.displayName } : {},
        expectedVersion: input.expectedVersion
      };
      return transport.execute({
        body: JSON.stringify(body),
        correlationId: input.correlationId,
        headers: profileHeaders(input),
        operation: {
          ...updateAppProfileSubjectOperation,
          authorization: "app-credential"
        },
        path
      });
    },
    async getUser(input) {
      return transport.execute({
        correlationId: input.correlationId,
        headers: profileHeaders(input),
        operation: {
          ...getAppProfileMeOperation,
          authorization: "app-credential"
        },
        path: profilePath(input, "/profile/me")
      });
    },
    async updateUser(input) {
      if (input.displayName !== undefined && input.resetFields !== undefined)
        throw new TypeError("displayName and resetFields cannot be used together.");
      const body = input.resetFields === undefined ? {
        ...input.displayName !== undefined ? { displayName: input.displayName } : {},
        expectedVersion: input.expectedVersion
      } : {
        expectedVersion: input.expectedVersion,
        resetFields: [...input.resetFields]
      };
      return transport.execute({
        body: JSON.stringify(body),
        correlationId: input.correlationId,
        headers: profileHeaders(input),
        operation: {
          ...updateAppProfileMeOperation,
          authorization: "app-credential"
        },
        path: profilePath(input, "/profile/me")
      });
    },
    async resetUser(input) {
      return this.updateUser({
        ...input,
        resetFields: input.resetFields ?? ["avatar", "displayName"]
      });
    },
    async issueAvatarIntent(input) {
      return transport.execute({
        correlationId: input.correlationId,
        operation: avatarOperation(input, "intent"),
        path: avatarPath(input, "-intents")
      });
    },
    async uploadAvatar(input) {
      return transport.execute({
        body: input.body,
        correlationId: input.correlationId,
        headers: {
          ...profileHeaders(input),
          "content-type": input.contentType
        },
        operation: avatarOperation(input, "upload"),
        path: avatarPath(input, `/${encodeURIComponent(input.intentId)}`)
      });
    },
    async publishAvatar(input) {
      return transport.execute({
        body: JSON.stringify({
          assetId: input.assetId,
          revision: input.revision
        }),
        correlationId: input.correlationId,
        headers: profileHeaders(input),
        operation: avatarOperation(input, "publish"),
        path: avatarPath(input, "")
      });
    },
    async removeAvatar(input) {
      return transport.execute({
        body: JSON.stringify({ expectedVersion: input.expectedVersion }),
        correlationId: input.correlationId,
        headers: profileHeaders(input),
        operation: avatarOperation(input, "remove"),
        path: avatarPath(input, "")
      });
    }
  };
}

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
    },
    async issueIconIntent(input) {
      const path = createAppIconUploadIntentOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      const body = await transport.execute({
        correlationId: input.correlationId ?? crypto.randomUUID(),
        operation: createAppIconUploadIntentOperation,
        path
      });
      return body.value;
    },
    async uploadIcon(input) {
      const path = uploadAppIconOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId)).replace("{intentId}", encodeURIComponent(input.intentId));
      const body = await transport.execute({
        body: input.body,
        correlationId: input.correlationId ?? crypto.randomUUID(),
        headers: { "content-type": input.contentType },
        operation: uploadAppIconOperation,
        path
      });
      return body.value;
    },
    async publishIcon(input) {
      const path = publishAppIconOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      const body = await transport.execute({
        body: JSON.stringify({
          assetId: input.assetId,
          expected: input.expected,
          revision: input.revision
        }),
        correlationId: input.correlationId ?? crypto.randomUUID(),
        operation: publishAppIconOperation,
        path
      });
      return body.value;
    },
    async clearIcon(input) {
      const path = clearAppIconOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{appId}", encodeURIComponent(input.appId));
      await transport.execute({
        body: JSON.stringify({ expected: input.expected }),
        correlationId: input.correlationId ?? crypto.randomUUID(),
        operation: clearAppIconOperation,
        path
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
      const bearerAuthorization = input.operation.authorization === "guest" ? undefined : input.operation.authorization === "app-credential" ? appCredentialToken : input.operation.authorization === "session-or-app-credential" ? appCredentialToken || managementAccessToken : input.operation.authorization === "session-or-workspace-service" ? workspaceServiceCredentialToken || managementAccessToken : input.operation.authorization === "workspace-service" ? workspaceServiceCredentialToken : undefined;
      const guestAuthorization = input.operation.authorization === "guest";
      if ((appCredentialToken || workspaceServiceCredentialToken) && !bearerAuthorization && !guestAuthorization)
        throw new TypeError(input.operation.authorization === "session" || input.operation.authorization === "session-or-management-oauth" ? "This Authless API operation requires a platform session." : "This Authless API operation does not accept the configured credential.");
      if (input.headers && Object.keys(input.headers).some((name) => /^(authorization|cookie|proxy-authorization|x-authless-client)$/iu.test(name)) && !guestAuthorization)
        throw new TypeError("Request headers cannot override server credentials or client identity.");
      const authorityHeaders = guestAuthorization ? {} : appCredentialToken || managementAccessToken || workspaceServiceCredentialToken ? {
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

// src/bulk-access.ts
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

// src/memberships.ts
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

// src/online-sessions.ts
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

// src/policies.ts
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

// src/workspace-credentials.ts
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

// src/workspaces.ts
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
    },
    async issueAvatarIntent(input) {
      const path = issueWorkspaceAvatarIntentOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      return transport.execute({
        correlationId: crypto.randomUUID(),
        operation: issueWorkspaceAvatarIntentOperation,
        path
      });
    },
    async uploadAvatar(input) {
      const path = uploadWorkspaceAvatarOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId)).replace("{intentId}", encodeURIComponent(input.intentId));
      return transport.execute({
        body: input.body,
        correlationId: crypto.randomUUID(),
        headers: { "content-type": input.contentType },
        operation: uploadWorkspaceAvatarOperation,
        path
      });
    },
    async attachAvatar(input) {
      const path = attachWorkspaceAvatarOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      const body = await transport.execute({
        body: JSON.stringify({
          assetId: input.assetId,
          assetRevision: input.assetRevision,
          expected: input.expected
        }),
        correlationId: crypto.randomUUID(),
        operation: attachWorkspaceAvatarOperation,
        path
      });
      return body.avatar;
    },
    async removeAvatar(input) {
      const path = removeWorkspaceAvatarOperation.path.replace("{workspaceId}", encodeURIComponent(input.workspaceId));
      const body = await transport.execute({
        body: JSON.stringify({ expected: input.expected }),
        correlationId: crypto.randomUUID(),
        operation: removeWorkspaceAvatarOperation,
        path
      });
      return body.avatar;
    }
  };
}

// src/guest-admission.ts
import { createPublicKey, verify as verifySignature } from "node:crypto";
async function requireGuestCapability(input) {
  const principal = await input.verifier.verifySignedPrincipal(input.token);
  if (principal?.principalKind !== "anonymous")
    throw new GuestActionDeniedError("invalid_principal");
  if (principal.audience !== input.audience || principal.appId !== input.appId || principal.environmentId !== input.environmentId || principal.expiresAt <= Date.now() / 1000)
    throw new GuestActionDeniedError("authority_mismatch");
  if (!principal.capabilities.includes(input.capability))
    throw new GuestActionDeniedError("capability_denied");
  if (!await input.verifier.verifyOnlineAuthority({
    token: input.token,
    jti: principal.jti,
    subject: principal.subject,
    appId: input.appId,
    environmentId: input.environmentId
  }))
    throw new GuestActionDeniedError("authority_revoked");
  return principal;
}

class GuestActionDeniedError extends Error {
  code;
  constructor(code) {
    super(`Guest action denied: ${code}`);
    this.name = "GuestActionDeniedError";
    this.code = code;
  }
}
async function createGuestDraft(input) {
  const principal = await requireGuestCapability({
    ...input,
    capability: "app:draft"
  });
  return input.create(principal);
}
function createGuestJwtVerifier(input) {
  return {
    verifySignedPrincipal: async (token) => {
      const [encodedHeader, encodedPayload, encodedSignature, ...remaining] = token.split(".");
      if (!encodedHeader || !encodedPayload || !encodedSignature || remaining.length)
        return null;
      try {
        const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString("utf8"));
        if (header.alg !== "RS256" || !header.kid)
          return null;
        const key = input.jwks.find((candidate) => candidate.kid === header.kid && candidate.alg === "RS256");
        if (!key)
          return null;
        const signingKey = createPublicKey({
          key: { kty: key.kty, n: key.n, e: key.e },
          format: "jwk"
        });
        if (!verifySignature("RSA-SHA256", Buffer.from(`${encodedHeader}.${encodedPayload}`), signingKey, Buffer.from(encodedSignature, "base64url")))
          return null;
        const claims = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
        const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
        if (claims.iss !== input.issuer || !audience.includes(input.audience) || typeof claims.exp !== "number" || claims.exp <= Date.now() / 1000 || typeof claims.sub !== "string" || claims.principal_kind !== "anonymous" || typeof claims.app_id !== "string" || typeof claims.environment_id !== "string" || !Array.isArray(claims.guest_capabilities) || !claims.guest_capabilities.every((value) => typeof value === "string"))
          return null;
        return {
          principalKind: "anonymous",
          subject: claims.sub,
          audience: input.audience,
          appId: claims.app_id,
          environmentId: claims.environment_id,
          capabilities: claims.guest_capabilities,
          expiresAt: claims.exp,
          ...typeof claims.jti === "string" ? { jti: claims.jti } : {}
        };
      } catch {
        return null;
      }
    },
    verifyOnlineAuthority: ({ token, ...request }) => input.authority({ token, ...request })
  };
}
// src/app-session.ts
import { randomBytes, timingSafeEqual } from "node:crypto";
var token = () => randomBytes(32).toString("base64url");
function createAppSessionAdapter(store, now = () => Date.now()) {
  const create = async (accountSubject, ttlSeconds = 3600) => {
    if (!accountSubject || !Number.isSafeInteger(ttlSeconds) || ttlSeconds < 60 || ttlSeconds > 86400)
      throw new TypeError("Invalid app session input");
    const record2 = {
      accountSubject,
      csrfToken: token(),
      id: token(),
      expiresAt: now() + ttlSeconds * 1000
    };
    await store.create(record2);
    return record2;
  };
  const read = async (id) => {
    if (!id)
      return null;
    const record2 = await store.read(id);
    if (!record2 || record2.expiresAt <= now()) {
      if (record2)
        await store.delete(record2.id);
      return null;
    }
    return record2;
  };
  const rotate = async (id, accountSubject, ttlSeconds = 3600) => {
    const current = await read(id);
    if (!current)
      return null;
    const next = await create(accountSubject, ttlSeconds);
    await store.delete(current.id);
    return next;
  };
  return {
    create,
    read,
    rotate,
    clear: (id) => store.delete(id),
    switchAccount: rotate,
    verifyCsrf: (record2, candidate) => {
      const expected = Buffer.from(record2.csrfToken);
      const actual = Buffer.from(candidate);
      return expected.length === actual.length && timingSafeEqual(expected, actual);
    }
  };
}
var appSessionCookie = Object.freeze({
  name: "__Host-custom_app_session",
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: true
});
function requireSameOrigin(request, expectedOrigin) {
  if (request.headers.get("origin") !== expectedOrigin)
    throw new Error("origin_forbidden");
}
function requireCsrf(session, request, adapter) {
  const candidate = request.headers.get("x-csrf-token");
  if (!candidate || !adapter.verifyCsrf(session, candidate))
    throw new Error("csrf_failed");
}
// src/custom-authentication.ts
function binding(input) {
  return {
    appId: input.appId,
    browserSessionBinding: input.browserSessionBinding,
    clientId: input.clientId,
    codeChallenge: input.codeChallenge,
    environmentId: input.environmentId,
    method: input.method,
    mode: input.mode,
    nonce: input.nonce,
    origin: input.origin,
    policyVersion: input.policyVersion,
    principalMode: input.principalMode,
    redirectUri: input.redirectUri,
    requestedScopes: input.requestedScopes,
    state: input.state,
    workspaceId: input.workspaceId
  };
}
function path(transactionId, operation3) {
  return `/v1/custom-auth/transactions/${encodeURIComponent(transactionId)}${operation3 ? `/${operation3}` : ""}`;
}
function createCustomAuthenticationClient(transport, registration) {
  const execute = async (input, retrySafety) => {
    const transactionPath = input.transactionId ? path(input.transactionId, input.operation) : "/v1/custom-auth/transactions";
    const body = { ...binding(input), ...input.body };
    const response = await transport.execute({
      body: JSON.stringify(body),
      correlationId: input.correlationId,
      headers: { "x-authless-client-id": registration.clientId },
      operation: {
        authorization: "app-credential",
        method: "POST",
        retrySafety
      },
      path: transactionPath
    });
    return response;
  };
  const validate = (input) => {
    for (const [key, expected] of Object.entries(registration)) {
      if (input[key] !== expected)
        throw new TypeError(`custom-auth binding ${key} does not match registration`);
    }
  };
  return {
    begin: async (input) => {
      validate(input);
      const result = await execute(input, "unsafe");
      return result.transaction;
    },
    read: async (input) => {
      validate(input);
      const result = await execute(input, "safe");
      return result.transaction;
    },
    challengeEmail: async (input) => {
      validate(input);
      return execute({
        ...input,
        operation: "challenge",
        body: input.email ? { email: input.email } : undefined
      }, "unsafe");
    },
    verifyEmail: async (input) => {
      validate(input);
      return execute({ ...input, operation: "verify", body: { code: input.code } }, "unsafe");
    },
    acceptGuest: async (input) => {
      validate(input);
      return execute({ ...input, operation: "verify" }, "unsafe");
    },
    complete: async (input) => {
      validate(input);
      return execute({ ...input, operation: "complete" }, "unsafe");
    },
    cancel: async (input) => {
      validate(input);
      return execute({ ...input, operation: "cancel" }, "unsafe");
    }
  };
}
// src/guest-admission-client.ts
function path2(input, suffix = "") {
  return `/workspaces/${encodeURIComponent(input.workspaceId)}/apps/${encodeURIComponent(input.appId)}/${input.environment}/guest-admission${suffix}`;
}
function createGuestAdmissionClient(transport) {
  return {
    get: async (input) => {
      const body = await transport.execute({
        operation: {
          authorization: "workspace",
          method: "GET",
          retrySafety: "safe"
        },
        path: path2(input),
        correlationId: input.correlationId
      });
      return body.policy;
    },
    update: async (input) => {
      const body = await transport.execute({
        operation: {
          authorization: "workspace",
          method: "PUT",
          retrySafety: "unsafe"
        },
        path: path2(input),
        correlationId: input.correlationId,
        body: JSON.stringify({
          ...input.policy,
          expectedPolicyVersion: input.policy.policyVersion
        })
      });
      return body.policy;
    },
    usage: async (input) => {
      const body = await transport.execute({
        operation: {
          authorization: "workspace",
          method: "GET",
          retrySafety: "safe"
        },
        path: path2(input, "/usage"),
        correlationId: input.correlationId
      });
      return body.usage;
    }
  };
}
// src/guest-conversion.ts
function path3(input, suffix) {
  return `/workspaces/${encodeURIComponent(input.workspaceId)}/apps/${encodeURIComponent(input.appId)}/${encodeURIComponent(input.environment)}/guest-conversion${suffix}`;
}
function assertBearer(value) {
  if (!value.startsWith("Bearer ") || value.length <= "Bearer ".length)
    throw new TypeError("authorization must be a Bearer guest access token.");
  return value;
}
function createGuestConversionClient(transport) {
  return {
    async begin(input) {
      return transport.execute({
        operation: beginGuestConversionIntentOperation,
        path: path3(input, "/intents"),
        correlationId: input.correlationId,
        headers: {
          authorization: assertBearer(input.authorization),
          dpop: input.dpop,
          origin: input.origin,
          "x-authless-browser-binding": input.browserBinding,
          "x-csrf-token": input.csrfToken
        },
        body: JSON.stringify({ requestedScopes: input.requestedScopes })
      });
    },
    async read(input) {
      return transport.execute({
        operation: {
          ...getGuestConversionIntentOperation,
          authorization: "guest"
        },
        path: path3(input, `/intents/${encodeURIComponent(input.intent)}`),
        correlationId: input.correlationId
      });
    },
    async confirm(input) {
      const body = await transport.execute({
        operation: {
          ...confirmGuestConversionOperation,
          authorization: "guest"
        },
        path: path3(input, ""),
        correlationId: input.correlationId,
        headers: {
          "x-authless-conversion-intent": input.intent,
          "idempotency-key": input.idempotencyKey
        },
        body: JSON.stringify({
          confirmation: input.confirmation,
          ...input.mergeProfile === undefined ? {} : { mergeProfile: input.mergeProfile }
        })
      });
      return body.conversion;
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
    appProfiles: createAppProfilesClient(transport),
    billing: createBillingClient(transport),
    commerce: createCommerceClient(transport),
    workspaces: createWorkspaceClient(transport),
    policies: createPolicyClient(transport),
    workspaceCredentials: createWorkspaceCredentialClient(transport),
    onlineSessions: createOnlineSessionClient(transport)
  };
}
export {
  requireSameOrigin,
  requireGuestCapability,
  requireCsrf,
  createWorkspaceCredentialClient,
  createWorkspaceClient,
  createPolicyClient,
  createOnlineSessionClient,
  createGuestJwtVerifier,
  createGuestDraft,
  createGuestConversionClient,
  createGuestAdmissionClient,
  createCustomAuthenticationClient,
  createCommerceClient,
  createBulkAccessClient,
  createBillingClient,
  createAuthlessTransport,
  createAuthlessServerClient,
  createAuditClient,
  createAppSessionAdapter,
  createAppProfilesClient,
  createAppMembershipClient,
  createAppClient,
  createAppAccessClient,
  appSessionCookie,
  GuestActionDeniedError,
  AuthlessApiError
};
