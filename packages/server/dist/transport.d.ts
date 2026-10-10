import type { AppAccessGrant } from "./generated";
export interface AuthlessApiOperation {
    authorization: string;
    method: string;
    retrySafety: "safe" | "unsafe";
}
type ApiFailureAction = "sign-in" | "reauthenticate" | "retry" | "switch-context" | "return" | "inspect-status" | "contact-support";
type ApiFailureKind = "session" | "permission" | "fresh-auth" | "missing" | "conflict" | "validation" | "rate-limit" | "network" | "provider" | "unavailable";
type ApiFailureOutcome = "unknown" | "not-applied";
export declare class AuthlessApiError extends Error {
    readonly action: ApiFailureAction;
    readonly code: string;
    readonly correlationId: string;
    readonly currentGrant?: AppAccessGrant;
    readonly error: string;
    readonly kind: ApiFailureKind;
    readonly outcome?: ApiFailureOutcome;
    readonly preserveEdits?: true;
    readonly retryAt?: number;
    readonly retrySafety: AuthlessApiOperation["retrySafety"];
    readonly status: number;
    constructor(input: {
        action: ApiFailureAction;
        code: string;
        correlationId: string;
        currentGrant?: AppAccessGrant;
        error?: string;
        kind: ApiFailureKind;
        outcome?: ApiFailureOutcome;
        preserveEdits?: true;
        retryAt?: number;
        retrySafety: AuthlessApiOperation["retrySafety"];
        status: number;
    });
}
export type AuthlessFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
interface AuthlessApiClientCommonOptions {
    baseUrl: string;
    fetch?: AuthlessFetch;
    retry?: AuthlessRetryOptions;
}
export type AuthlessApiClientOptions = AuthlessApiClientCommonOptions & ({
    managementAccessToken: string;
    appCredentialToken?: never;
    sessionToken?: never;
} | {
    appCredentialToken: string;
    managementAccessToken?: never;
    sessionToken?: never;
} | {
    appCredentialToken?: never;
    managementAccessToken?: never;
    sessionToken: string;
});
export interface AuthlessRetryOptions {
    /** Initial exponential-backoff delay. Defaults to 100; accepts 0 through 30000. */
    baseDelayMilliseconds?: number;
    /** Total attempts for safe operations. Defaults to 2; accepts 1 through 3. */
    maxAttempts?: number;
}
export interface AuthlessTransport {
    execute<T>(input: {
        body?: string;
        correlationId: string;
        decode?: (response: Response) => Promise<T>;
        headers?: Record<string, string>;
        operation: AuthlessApiOperation;
        path: string;
    }): Promise<T>;
}
export declare function createAuthlessTransport(options: AuthlessApiClientOptions): AuthlessTransport;
export {};
