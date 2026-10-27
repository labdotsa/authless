import type { GuestAdmissionPolicy, GuestAdmissionUsageResponse } from "./generated";
import type { AuthlessTransport } from "./transport";
type GuestAdmissionUsage = GuestAdmissionUsageResponse["usage"];
export type GuestAdmissionPath = {
    workspaceId: string;
    appId: string;
    environment: "test" | "production";
};
export interface GuestAdmissionClient {
    get(input: GuestAdmissionPath & {
        correlationId: string;
    }): Promise<GuestAdmissionPolicy>;
    update(input: GuestAdmissionPath & {
        correlationId: string;
        policy: GuestAdmissionPolicy;
    }): Promise<GuestAdmissionPolicy>;
    usage(input: GuestAdmissionPath & {
        correlationId: string;
    }): Promise<GuestAdmissionUsage>;
}
export declare function createGuestAdmissionClient(transport: AuthlessTransport): GuestAdmissionClient;
export {};
