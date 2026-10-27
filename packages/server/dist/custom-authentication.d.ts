import type { CustomAuthenticationMethod, CustomAuthenticationMode, CustomAuthenticationTransactionResponse } from "@authless/contracts";
import type { AuthlessTransport } from "./transport";
export type CustomAuthenticationPath = {
    appId: string;
    browserSessionBinding?: string;
    clientId: string;
    codeChallenge?: string;
    environmentId: string;
    method: CustomAuthenticationMethod;
    mode: CustomAuthenticationMode;
    origin: string;
    policyVersion: number;
    principalMode: "person" | "guest";
    redirectUri: string;
    requestedScopes?: string[];
    state: string;
    nonce: string;
    workspaceId: string;
    correlationId: string;
};
export type CustomAuthenticationProof = {
    completed: true;
    proof: {
        authenticatedAt: string;
        continuationToken?: string;
        method: CustomAuthenticationMethod;
        principalMode: "person" | "guest";
    };
};
export type CustomAuthenticationRegistration = {
    appId: string;
    clientId: string;
    environmentId: string;
    method: CustomAuthenticationMethod;
    mode: CustomAuthenticationMode;
    origin: string;
    redirectUri: string;
    workspaceId: string;
};
export interface CustomAuthenticationClient {
    begin(input: CustomAuthenticationPath): Promise<CustomAuthenticationTransactionResponse>;
    read(input: CustomAuthenticationPath & {
        transactionId: string;
    }): Promise<CustomAuthenticationTransactionResponse>;
    challengeEmail(input: CustomAuthenticationPath & {
        email?: string;
        transactionId: string;
    }): Promise<{
        accepted: true;
        expiresAt: string;
        resendAt: string;
    }>;
    verifyEmail(input: CustomAuthenticationPath & {
        code: string;
        transactionId: string;
    }): Promise<{
        accepted: true;
    }>;
    acceptGuest(input: CustomAuthenticationPath & {
        transactionId: string;
    }): Promise<{
        accepted: true;
    }>;
    complete(input: CustomAuthenticationPath & {
        transactionId: string;
    }): Promise<CustomAuthenticationProof>;
    cancel(input: CustomAuthenticationPath & {
        transactionId: string;
    }): Promise<{
        cancelled: true;
    }>;
}
export declare function createCustomAuthenticationClient(transport: AuthlessTransport, registration: CustomAuthenticationRegistration): CustomAuthenticationClient;
