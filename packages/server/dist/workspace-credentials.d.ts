import type { AuthlessTransport } from "./transport";
export type WorkspaceServiceScope = "app:read" | "app:create" | "app:write" | "policy:read" | "policy:write" | "policy:activate" | "endpoint:write" | "oidc-profile:write" | "credential:write";
export type WorkspaceEnvironment = "test" | "production";
export type WorkspaceServiceRestrictions = {
    appIds: string[];
    environments: WorkspaceEnvironment[];
};
export type WorkspaceServicePrincipal = {
    id: string;
    workspaceId: string;
    name: string;
    status: "active" | "suspended" | "revoked";
    scopes: WorkspaceServiceScope[];
    restrictions: WorkspaceServiceRestrictions;
    createdAt: string;
    revokedAt: string | null;
    version: number;
};
export type WorkspaceServiceCredential = {
    id: string;
    principalId: string;
    workspaceId: string;
    name: string;
    scopes: WorkspaceServiceScope[];
    restrictions: WorkspaceServiceRestrictions;
    createdAt: string;
    expiresAt: string | null;
    revokedAt: string | null;
    lastUsedAt: string | null;
    version: number;
    status?: "active" | "expiring" | "revoked";
};
export type IssuedWorkspaceServiceCredential = {
    credential: WorkspaceServiceCredential;
    secret: string;
};
export type ReplayedWorkspaceServiceCredential = {
    credential: WorkspaceServiceCredential;
    replayed: true;
};
type CredentialResult = WorkspaceServiceCredential | IssuedWorkspaceServiceCredential | ReplayedWorkspaceServiceCredential;
type WorkspaceCredentialInput = {
    workspaceId: string;
    correlationId: string;
};
export interface WorkspaceCredentialClient {
    listPrincipals(input: WorkspaceCredentialInput): Promise<{
        principals: WorkspaceServicePrincipal[];
    }>;
    getPrincipal(input: WorkspaceCredentialInput & {
        principalId: string;
    }): Promise<WorkspaceServicePrincipal>;
    createPrincipal(input: WorkspaceCredentialInput & {
        name: string;
        scopes: WorkspaceServiceScope[];
        restrictions: WorkspaceServiceRestrictions;
    }): Promise<WorkspaceServicePrincipal>;
    changePrincipalStatus(input: WorkspaceCredentialInput & {
        principalId: string;
        status: WorkspaceServicePrincipal["status"];
        expectedVersion: number;
    }): Promise<WorkspaceServicePrincipal>;
    issue(input: WorkspaceCredentialInput & {
        principalId: string;
        name: string;
        scopes: WorkspaceServiceScope[];
        restrictions: WorkspaceServiceRestrictions;
        expiresAt?: string | null;
        idempotencyKey: string;
    }): Promise<CredentialResult>;
    list(input: WorkspaceCredentialInput & {
        principalId: string;
    }): Promise<{
        credentials: WorkspaceServiceCredential[];
        nextCursor: string | null;
    }>;
    rotate(input: WorkspaceCredentialInput & {
        principalId: string;
        credentialId: string;
        overlapSeconds: number;
        expiresAt?: string | null;
        expectedVersion: number;
        idempotencyKey: string;
    }): Promise<CredentialResult>;
    revoke(input: WorkspaceCredentialInput & {
        principalId: string;
        credentialId: string;
        expectedVersion: number;
    }): Promise<WorkspaceServiceCredential>;
}
export declare function createWorkspaceCredentialClient(transport: AuthlessTransport): WorkspaceCredentialClient;
export {};
