import { type AppClient } from "./apps";
import { type AuditClient } from "./audit";
import { type BulkAccessClient } from "./bulk-access";
import { type AppAccessClient, type AppMembershipClient } from "./memberships";
import { type AuthlessApiClientOptions } from "./transport";
import { type WorkspaceClient } from "./workspaces";
export { type AppClient, type CreateAppInput, createAppClient, type GetAppEnvironmentInput, type ListAppsInput, } from "./apps";
export { type AuditClient, createAuditClient, type ListAuditEventsInput, } from "./audit";
export { type BulkAccessClient, type BulkAccessResultArtifact, type CancelBulkAccessOperationInput, type CreateBulkAccessPreviewInput, createBulkAccessClient, type DownloadBulkAccessResultsInput, type ExecuteBulkAccessPreviewInput, type GetBulkAccessOperationInput, type GetBulkAccessPreviewInput, type ListBulkAccessResultsInput, } from "./bulk-access";
export type { App, AppAccessActor, AppAccessGrant, AppAccessGrantEnvelope, AppAccessGrantState, AppAccessGrantVersionConflictEnvelope, AppAccessKind, AppEnvelope, AppEnvironment, AppEnvironmentEnvelope, AppListEnvelope, AppMembership, AppMembershipAccess, AppMembershipAccessEnvelope, AppMembershipDetail, AppMembershipEnvelope, AppMembershipInvitationAccepted, AppMembershipLifecycleEnvelope, AppMembershipListEnvelope, AppMembershipStatus, AppMembershipVersionConflictEnvelope, AuditAuthority, AuditEvent, AuditEventActor, AuditEventListEnvelope, AuditEventReason, AuditEventScope, AuditEventTarget, AuditOutcome, BulkAccessAction, BulkAccessExecutableAction, BulkAccessItemResult, BulkAccessOperation, BulkAccessOperationEnvelope, BulkAccessOperationReadEnvelope, BulkAccessOperationStatus, BulkAccessPreview, BulkAccessPreviewEnvelope, BulkAccessReason, BulkAccessResultListEnvelope, BulkAccessWarning, ChangeAppMembershipStatusRequest, ConfirmBulkAccessRequest, CreateAppRequest, CreateBulkAccessPreviewRequest, CreateWorkspaceRequest, EndpointSet, ErrorEnvelope, ExecuteBulkAccessPreviewRequest, GrantAppEntitlementRequest, GrantAppRoleRequest, InviteAppMembershipRequest, OidcClientProfile, OidcJwtAccessTokenResource, OidcPublicJwk, RevokeAppEntitlementRequest, RevokeAppRoleRequest, Workspace, WorkspaceEnvelope, WorkspaceListEnvelope, } from "./generated";
export { type AppAccessClient, type AppMembershipClient, type ChangeAppMembershipStatusInput, createAppAccessClient, createAppMembershipClient, type GetAppMembershipAccessInput, type GetAppMembershipInput, type GrantAppEntitlementInput, type GrantAppRoleInput, type InviteAppMembershipInput, type ListAppMembershipsInput, type RevokeAppEntitlementInput, type RevokeAppRoleInput, } from "./memberships";
export { type AuthlessApiClientOptions, AuthlessApiError, type AuthlessFetch, type AuthlessRetryOptions, type AuthlessTransport, createAuthlessTransport, } from "./transport";
export { type CreateWorkspaceInput, createWorkspaceClient, type GetWorkspaceInput, type ListWorkspacesInput, type WorkspaceClient, } from "./workspaces";
export interface AuthlessServerClient {
    auditEvents: AuditClient;
    appAccess: AppAccessClient;
    appMemberships: AppMembershipClient;
    bulkAccess: BulkAccessClient;
    apps: AppClient;
    workspaces: WorkspaceClient;
}
export declare function createAuthlessServerClient(options: AuthlessApiClientOptions): AuthlessServerClient;
