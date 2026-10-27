import type { CreateWorkspaceRequest, Workspace, WorkspaceAvatar, WorkspaceCapability, WorkspaceListEnvelope } from "./generated";
import type { AuthlessTransport } from "./transport";
export type { WorkspaceCapabilitiesEnvelope, WorkspaceCapability, } from "./generated";
export interface GetWorkspaceInput {
    correlationId: string;
    workspaceId: string;
}
export interface CreateWorkspaceInput extends CreateWorkspaceRequest {
    correlationId: string;
    idempotencyKey: string;
}
export interface ListWorkspacesInput {
    correlationId: string;
    cursor?: string;
    limit?: number;
}
export interface WorkspaceClient {
    create(input: CreateWorkspaceInput): Promise<Workspace>;
    get(input: GetWorkspaceInput): Promise<Workspace>;
    getCapabilities(input: GetWorkspaceInput): Promise<WorkspaceCapability>;
    list(input: ListWorkspacesInput): Promise<WorkspaceListEnvelope>;
    issueAvatarIntent(input: {
        workspaceId: string;
    }): Promise<unknown>;
    uploadAvatar(input: {
        workspaceId: string;
        intentId: string;
        body: Uint8Array;
        contentType: string;
    }): Promise<unknown>;
    attachAvatar(input: {
        workspaceId: string;
        assetId: string;
        assetRevision: number;
        expected: WorkspaceAvatar | null;
    }): Promise<WorkspaceAvatar | null>;
    removeAvatar(input: {
        workspaceId: string;
        expected: WorkspaceAvatar | null;
    }): Promise<WorkspaceAvatar | null>;
}
export declare function createWorkspaceClient(transport: AuthlessTransport): WorkspaceClient;
