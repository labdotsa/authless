export type VerifiedGuestPrincipal = {
    principalKind: "anonymous";
    subject: string;
    audience: string;
    appId: string;
    environmentId: string;
    capabilities: readonly string[];
    expiresAt: number;
    jti?: string;
};
export type GuestAuthorityVerifier = {
    verifySignedPrincipal(token: string): Promise<VerifiedGuestPrincipal | null>;
    verifyOnlineAuthority(input: {
        token: string;
        jti?: string;
        subject: string;
        appId: string;
        environmentId: string;
    }): Promise<boolean>;
};
export declare function requireGuestCapability(input: {
    token: string;
    audience: string;
    appId: string;
    environmentId: string;
    capability: "app:read" | "app:draft";
    verifier: GuestAuthorityVerifier;
}): Promise<VerifiedGuestPrincipal>;
export declare class GuestActionDeniedError extends Error {
    readonly code: "invalid_principal" | "authority_mismatch" | "capability_denied" | "authority_revoked";
    constructor(code: GuestActionDeniedError["code"]);
}
/** Example server boundary: every protected write must call the online verifier first. */
export declare function createGuestDraft(input: {
    token: string;
    audience: string;
    appId: string;
    environmentId: string;
    verifier: GuestAuthorityVerifier;
    create: (principal: VerifiedGuestPrincipal) => Promise<string>;
}): Promise<string>;
export declare function createGuestJwtVerifier(input: {
    issuer: string;
    audience: string;
    jwks: readonly {
        kid: string;
        kty: "RSA";
        n: string;
        e: string;
        alg?: string;
    }[];
    authority: (request: {
        token: string;
        jti?: string;
        subject: string;
        appId: string;
        environmentId: string;
    }) => Promise<boolean>;
}): GuestAuthorityVerifier;
