import type { AuthlessTransport } from "./transport";
export type OnlineSessionValidation = {
    status: "compliant";
    sessionId: string;
    policyVersion: number;
} | {
    status: "interaction_required";
    sessionId: string;
    policyVersion: number;
    reason: "consent" | "proof";
} | {
    status: "denied" | "expired";
    sessionId: string | null;
    policyVersion: null;
    reason: string;
};
export type ValidateOnlineSessionInput = {
    workspaceId: string;
    appId: string;
    environment: "test" | "production";
    sessionReference: string;
    correlationId: string;
};
export interface OnlineSessionClient {
    validate(input: ValidateOnlineSessionInput): Promise<OnlineSessionValidation>;
}
export declare function createOnlineSessionClient(transport: AuthlessTransport): OnlineSessionClient;
