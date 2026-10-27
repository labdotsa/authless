export type AppSessionRecord = {
    accountSubject: string;
    csrfToken: string;
    id: string;
    expiresAt: number;
};
export interface AppSessionStore {
    create(record: AppSessionRecord): Promise<void>;
    read(id: string): Promise<AppSessionRecord | null>;
    delete(id: string): Promise<void>;
}
export interface AppSessionAdapter {
    create(accountSubject: string, ttlSeconds?: number): Promise<AppSessionRecord>;
    read(id: string): Promise<AppSessionRecord | null>;
    rotate(id: string, accountSubject: string, ttlSeconds?: number): Promise<AppSessionRecord | null>;
    clear(id: string): Promise<void>;
    switchAccount(id: string, accountSubject: string, ttlSeconds?: number): Promise<AppSessionRecord | null>;
    verifyCsrf(record: AppSessionRecord, token: string): boolean;
}
export declare function createAppSessionAdapter(store: AppSessionStore, now?: () => number): AppSessionAdapter;
export declare const appSessionCookie: Readonly<{
    name: "__Host-custom_app_session";
    httpOnly: true;
    path: "/";
    sameSite: "lax";
    secure: true;
}>;
export declare function requireSameOrigin(request: Request, expectedOrigin: string): void;
export declare function requireCsrf(session: AppSessionRecord, request: Request, adapter: Pick<AppSessionAdapter, "verifyCsrf">): void;
