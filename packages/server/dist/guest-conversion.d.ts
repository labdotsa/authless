import type { GuestConversionConfirmationRequest, GuestConversionIntent, GuestConversionIntentCreated, GuestConversionIntentRequest, GuestConversionResponse } from "./generated";
import type { AuthlessTransport } from "./transport";
export type GuestConversionPath = {
    workspaceId: string;
    appId: string;
    environment: "test" | "production";
};
export type BeginGuestConversionInput = GuestConversionPath & GuestConversionIntentRequest & {
    authorization: string;
    browserBinding: string;
    correlationId: string;
    csrfToken: string;
    dpop: string;
    origin: string;
};
export type ReadGuestConversionIntentInput = GuestConversionPath & {
    correlationId: string;
    intent: string;
};
export type ConfirmGuestConversionInput = GuestConversionPath & GuestConversionConfirmationRequest & {
    correlationId: string;
    idempotencyKey: string;
    intent: string;
};
export interface GuestConversionClient {
    begin(input: BeginGuestConversionInput): Promise<GuestConversionIntentCreated>;
    read(input: ReadGuestConversionIntentInput): Promise<GuestConversionIntent>;
    confirm(input: ConfirmGuestConversionInput): Promise<GuestConversionResponse["conversion"]>;
}
export declare function createGuestConversionClient(transport: AuthlessTransport): GuestConversionClient;
