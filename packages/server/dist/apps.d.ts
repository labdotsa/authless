import type { App, AppIconAssetEnvelope, AppIconBinding, AppIconUploadIntentEnvelope, AppEnvironment, AppListEnvelope, CreateAppRequest, EndpointSet, OidcClientProfile, UpdateAppMetadataRequest } from "./generated";
import type { AuthlessTransport } from "./transport";
export interface ListAppsInput {
    correlationId: string;
    cursor?: string;
    limit?: number;
    workspaceId: string;
}
export interface CreateAppInput extends CreateAppRequest {
    correlationId: string;
    idempotencyKey: string;
    workspaceId: string;
}
export interface GetAppEnvironmentInput {
    appId: string;
    correlationId: string;
    environment: AppEnvironment["kind"];
    workspaceId: string;
}
export interface UpdateAppMetadataInput extends UpdateAppMetadataRequest {
    appId: string;
    correlationId: string;
    expectedVersion: number;
    workspaceId: string;
}
export interface ReplaceAppEnvironmentEndpointsInput {
    appId: string;
    confirmed: true;
    correlationId: string;
    endpoints: EndpointSet;
    environment: AppEnvironment["kind"];
    expectedVersion: number;
    workspaceId: string;
}
export interface ReplaceAppEnvironmentOidcProfileInput {
    appId: string;
    confirmed: true;
    correlationId: string;
    environment: AppEnvironment["kind"];
    expectedVersion: number;
    profile: OidcClientProfile;
    workspaceId: string;
}
export interface ActivateAppEnvironmentInput {
    appId: string;
    confirmed: true;
    correlationId: string;
    expectedVersion: number;
    workspaceId: string;
}
export interface IssueIconIntentInput {
    appId: string;
    correlationId?: string;
    workspaceId: string;
}
export interface UploadIconInput {
    appId: string;
    body: Uint8Array;
    contentType: string;
    correlationId?: string;
    intentId: string;
    workspaceId: string;
}
export interface PublishIconInput {
    appId: string;
    assetId: string;
    correlationId?: string;
    expected: AppIconBinding | null;
    revision: number;
    workspaceId: string;
}
export interface ClearIconInput {
    appId: string;
    correlationId?: string;
    expected: AppIconBinding | null;
    workspaceId: string;
}
export type AppIconUploadIntent = AppIconUploadIntentEnvelope["value"];
export type AppIconAsset = AppIconAssetEnvelope["value"];
export interface AppClient {
    create(input: CreateAppInput): Promise<App>;
    getEnvironment(input: GetAppEnvironmentInput): Promise<AppEnvironment>;
    list(input: ListAppsInput): Promise<AppListEnvelope>;
    updateMetadata(input: UpdateAppMetadataInput): Promise<App>;
    replaceEndpoints(input: ReplaceAppEnvironmentEndpointsInput): Promise<AppEnvironment>;
    replaceOidcProfile(input: ReplaceAppEnvironmentOidcProfileInput): Promise<AppEnvironment>;
    activateEnvironment(input: ActivateAppEnvironmentInput): Promise<AppEnvironment>;
    issueIconIntent(input: IssueIconIntentInput): Promise<AppIconUploadIntent>;
    uploadIcon(input: UploadIconInput): Promise<AppIconAsset>;
    publishIcon(input: PublishIconInput): Promise<AppIconBinding>;
    clearIcon(input: ClearIconInput): Promise<void>;
}
export declare function createAppClient(transport: AuthlessTransport): AppClient;
