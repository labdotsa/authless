import type { CreateWorkspaceRequest, Workspace, WorkspaceCapability, WorkspaceListEnvelope } from "./generated";
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
}
export declare function createWorkspaceClient(transport: AuthlessTransport): WorkspaceClient;
