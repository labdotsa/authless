import type { App, AppEnvironment, AppListEnvelope, CreateAppRequest, EndpointSet, OidcClientProfile, UpdateAppMetadataRequest } from "./generated";
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
export interface AppClient {
    create(input: CreateAppInput): Promise<App>;
    getEnvironment(input: GetAppEnvironmentInput): Promise<AppEnvironment>;
    list(input: ListAppsInput): Promise<AppListEnvelope>;
    updateMetadata(input: UpdateAppMetadataInput): Promise<App>;
    replaceEndpoints(input: ReplaceAppEnvironmentEndpointsInput): Promise<AppEnvironment>;
    replaceOidcProfile(input: ReplaceAppEnvironmentOidcProfileInput): Promise<AppEnvironment>;
    activateEnvironment(input: ActivateAppEnvironmentInput): Promise<AppEnvironment>;
}
export declare function createAppClient(transport: AuthlessTransport): AppClient;
