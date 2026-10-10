import type { App, AppEnvironment, AppListEnvelope, CreateAppRequest } from "./generated";
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
export interface AppClient {
    create(input: CreateAppInput): Promise<App>;
    getEnvironment(input: GetAppEnvironmentInput): Promise<AppEnvironment>;
    list(input: ListAppsInput): Promise<AppListEnvelope>;
}
export declare function createAppClient(transport: AuthlessTransport): AppClient;
