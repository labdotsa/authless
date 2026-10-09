import type { BulkAccessOperation, BulkAccessOperationEnvelope, BulkAccessPreview, BulkAccessResultListEnvelope, ConfirmBulkAccessRequest, CreateBulkAccessPreviewRequest, ExecuteBulkAccessPreviewRequest } from "./generated";
import { type AuthlessTransport } from "./transport";
export interface CreateBulkAccessPreviewInput extends CreateBulkAccessPreviewRequest {
    appId: string;
    correlationId: string;
    workspaceId: string;
}
export interface GetBulkAccessPreviewInput {
    appId: string;
    correlationId: string;
    previewId: string;
    workspaceId: string;
}
export interface GetBulkAccessOperationInput {
    appId: string;
    correlationId: string;
    operationId: string;
    workspaceId: string;
}
export interface CancelBulkAccessOperationInput extends ConfirmBulkAccessRequest {
    appId: string;
    correlationId: string;
    expectedVersion: number;
    idempotencyKey: string;
    operationId: string;
    workspaceId: string;
}
export interface ListBulkAccessResultsInput {
    appId: string;
    correlationId: string;
    cursor?: string;
    limit?: number;
    operationId: string;
    workspaceId: string;
}
export type DownloadBulkAccessResultsInput = GetBulkAccessOperationInput;
export interface BulkAccessResultArtifact {
    content: string;
    contentSha256: string;
    rowCount: number;
}
export interface ExecuteBulkAccessPreviewInput extends ExecuteBulkAccessPreviewRequest {
    appId: string;
    correlationId: string;
    idempotencyKey: string;
    previewId: string;
    workspaceId: string;
}
export interface BulkAccessClient {
    cancelOperation(input: CancelBulkAccessOperationInput): Promise<BulkAccessOperationEnvelope>;
    createPreview(input: CreateBulkAccessPreviewInput): Promise<BulkAccessPreview>;
    downloadResults(input: DownloadBulkAccessResultsInput): Promise<BulkAccessResultArtifact>;
    executePreview(input: ExecuteBulkAccessPreviewInput): Promise<BulkAccessOperationEnvelope>;
    getOperation(input: GetBulkAccessOperationInput): Promise<BulkAccessOperation>;
    getPreview(input: GetBulkAccessPreviewInput): Promise<BulkAccessPreview>;
    listResults(input: ListBulkAccessResultsInput): Promise<BulkAccessResultListEnvelope>;
}
export declare function createBulkAccessClient(transport: AuthlessTransport): BulkAccessClient;
