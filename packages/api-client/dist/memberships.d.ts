import type { AppAccessGrantEnvelope, AppMembershipAccessEnvelope, AppMembershipEnvelope, AppMembershipInvitationAccepted, AppMembershipLifecycleEnvelope, AppMembershipListEnvelope, AppMembershipStatus, ChangeAppMembershipStatusRequest, GrantAppEntitlementRequest, GrantAppRoleRequest, InviteAppMembershipRequest, RevokeAppEntitlementRequest, RevokeAppRoleRequest } from "./generated";
import type { AuthlessTransport } from "./transport";
export interface ListAppMembershipsInput {
    appId: string;
    correlationId: string;
    cursor?: string;
    limit?: number;
    query?: string;
    status?: AppMembershipStatus;
    workspaceId: string;
}
export interface GetAppMembershipInput {
    appId: string;
    correlationId: string;
    membershipId: string;
    workspaceId: string;
}
export interface InviteAppMembershipInput extends InviteAppMembershipRequest {
    appId: string;
    correlationId: string;
    idempotencyKey: string;
    workspaceId: string;
}
export interface ChangeAppMembershipStatusInput extends ChangeAppMembershipStatusRequest {
    appId: string;
    correlationId: string;
    expectedVersion: number;
    idempotencyKey: string;
    membershipId: string;
    workspaceId: string;
}
export interface GetAppMembershipAccessInput extends GetAppMembershipInput {
}
export interface GrantAppRoleInput extends GrantAppRoleRequest {
    appId: string;
    correlationId: string;
    expectedDefinitionVersion: number;
    idempotencyKey: string;
    membershipId: string;
    workspaceId: string;
}
export interface GrantAppEntitlementInput extends GrantAppEntitlementRequest {
    appId: string;
    correlationId: string;
    expectedDefinitionVersion: number;
    idempotencyKey: string;
    membershipId: string;
    workspaceId: string;
}
export interface RevokeAppRoleInput extends RevokeAppRoleRequest {
    appId: string;
    correlationId: string;
    expectedGrantVersion: number;
    grantId: string;
    idempotencyKey: string;
    membershipId: string;
    workspaceId: string;
}
export interface RevokeAppEntitlementInput extends RevokeAppEntitlementRequest {
    appId: string;
    correlationId: string;
    expectedGrantVersion: number;
    grantId: string;
    idempotencyKey: string;
    membershipId: string;
    workspaceId: string;
}
export interface AppMembershipClient {
    changeStatus(input: ChangeAppMembershipStatusInput): Promise<AppMembershipLifecycleEnvelope>;
    get(input: GetAppMembershipInput): Promise<AppMembershipEnvelope["membership"]>;
    invite(input: InviteAppMembershipInput): Promise<AppMembershipInvitationAccepted>;
    list(input: ListAppMembershipsInput): Promise<AppMembershipListEnvelope>;
}
export interface AppAccessClient {
    get(input: GetAppMembershipAccessInput): Promise<AppMembershipAccessEnvelope["access"]>;
    grantRole(input: GrantAppRoleInput): Promise<AppAccessGrantEnvelope>;
    grantEntitlement(input: GrantAppEntitlementInput): Promise<AppAccessGrantEnvelope>;
    revokeEntitlement(input: RevokeAppEntitlementInput): Promise<AppAccessGrantEnvelope>;
    revokeRole(input: RevokeAppRoleInput): Promise<AppAccessGrantEnvelope>;
}
export declare function createAppMembershipClient(transport: AuthlessTransport): AppMembershipClient;
export declare function createAppAccessClient(transport: AuthlessTransport): AppAccessClient;
