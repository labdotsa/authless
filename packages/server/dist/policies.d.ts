import type { AuthenticationPolicyDefinitionDto, AuthenticationPolicyDto } from "@authless/contracts";
import type { AuthlessTransport } from "./transport";
export type PolicyRevision = {
    version: number;
    definition: AuthenticationPolicyDefinitionDto;
    activatedAt: string | null;
    activatedBy?: string | null;
    impact?: AuthenticationPolicyDto["comparison"];
};
export type PolicyHistoryEnvelope = {
    items: PolicyRevision[];
    nextCursor: string | null;
};
export type PolicyClientInput = {
    workspaceId: string;
    appId: string;
    environment: "test" | "production";
    correlationId: string;
};
export interface PolicyClient {
    get(input: PolicyClientInput): Promise<AuthenticationPolicyDto>;
    history(input: PolicyClientInput & {
        cursor?: string;
        limit?: number;
    }): Promise<PolicyHistoryEnvelope>;
    revision(input: PolicyClientInput & {
        version: number;
    }): Promise<PolicyRevision>;
    saveDraft(input: PolicyClientInput & {
        definition: AuthenticationPolicyDefinitionDto;
        expectedDraftVersion: number;
        idempotencyKey: string;
    }): Promise<AuthenticationPolicyDto>;
    activate(input: PolicyClientInput & {
        expectedDraftVersion: number;
        idempotencyKey: string;
        confirmed: true;
    }): Promise<AuthenticationPolicyDto>;
    restore(input: PolicyClientInput & {
        version: number;
        expectedDraftVersion: number;
        idempotencyKey: string;
    }): Promise<AuthenticationPolicyDto>;
}
export declare function createPolicyClient(transport: AuthlessTransport): PolicyClient;
