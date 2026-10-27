import type { AppEnvironment, AppProfileView } from "./generated";
import type { AuthlessTransport } from "./transport";
type ProfilePath = {
    appId: string;
    environment: AppEnvironment["kind"];
    workspaceId: string;
};
export type AppProfileSubjectPath = ProfilePath & {
    subjectId: string;
};
export type AppProfileMutation = ProfilePath & {
    correlationId: string;
    displayName?: string | null;
    expectedVersion: number;
    idempotencyKey: string;
};
export type AppProfileSubjectMutation = AppProfileMutation & {
    subjectId: string;
};
export type AppProfileSessionPath = ProfilePath & {
    correlationId: string;
    sessionReference: string;
};
export type AppProfileSessionMutation = AppProfileMutation & {
    resetFields?: readonly AppProfileResetField[];
    sessionReference: string;
};
export type AppProfileResetField = "avatar" | "displayName";
export type AppProfileResetInput = Omit<AppProfileSessionMutation, "displayName"> & {
    resetFields?: readonly AppProfileResetField[];
};
export type AppProfileAvatarSide = "app" | "user";
export type AppProfileAvatarPath = ProfilePath & {
    side: AppProfileAvatarSide;
    subjectId?: string;
};
export type AppProfileAvatarIntentInput = AppProfileAvatarPath & {
    correlationId: string;
};
export type AppProfileAvatarUploadInput = AppProfileAvatarPath & {
    body: Uint8Array;
    contentType: "image/jpeg" | "image/png" | "image/webp";
    correlationId: string;
    expectedVersion: number;
    idempotencyKey: string;
    intentId: string;
};
export type AppProfileAvatarMutationInput = AppProfileAvatarPath & {
    correlationId: string;
    expectedVersion: number;
    idempotencyKey: string;
};
export type AppProfileAvatarPublishInput = AppProfileAvatarMutationInput & {
    assetId: string;
    revision: number;
};
type AppProfileAvatarIntent = {
    assetId: string;
    expiresAt: string;
    id: string;
    purpose: "app_profile";
};
export interface AppProfilesClient {
    getApp(input: AppProfileSubjectPath & {
        correlationId: string;
    }): Promise<AppProfileView>;
    updateApp(input: AppProfileSubjectMutation): Promise<AppProfileView>;
    getUser(input: AppProfileSessionPath): Promise<AppProfileView>;
    updateUser(input: AppProfileSessionMutation): Promise<AppProfileView>;
    resetUser(input: AppProfileResetInput): Promise<AppProfileView>;
    issueAvatarIntent(input: AppProfileAvatarIntentInput): Promise<AppProfileAvatarIntent>;
    uploadAvatar(input: AppProfileAvatarUploadInput): Promise<AppProfileView>;
    publishAvatar(input: AppProfileAvatarPublishInput): Promise<AppProfileView>;
    removeAvatar(input: AppProfileAvatarMutationInput): Promise<AppProfileView>;
}
export declare function createAppProfilesClient(transport: AuthlessTransport): AppProfilesClient;
export {};
