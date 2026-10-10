import type { AuditEventListEnvelope, AuditOutcome } from "./generated";
import type { AuthlessTransport } from "./transport";
export interface ListAuditEventsInput {
    action?: string;
    actorRef?: string;
    appId?: string;
    correlationId: string;
    cursor?: string;
    eventCorrelationId?: string;
    from?: string;
    limit?: number;
    outcome?: AuditOutcome;
    resourceRef?: string;
    to?: string;
    workspaceId: string;
}
export interface AuditClient {
    list(input: ListAuditEventsInput): Promise<AuditEventListEnvelope>;
}
export declare function createAuditClient(transport: AuthlessTransport): AuditClient;
