import type { CreateWorkspaceRequest, Workspace, WorkspaceListEnvelope } from "./generated";
import type { AuthlessTransport } from "./transport";
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
    list(input: ListWorkspacesInput): Promise<WorkspaceListEnvelope>;
}
export declare function createWorkspaceClient(transport: AuthlessTransport): WorkspaceClient;
