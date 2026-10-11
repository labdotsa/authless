import type { CommercialBillingCancellationEnvelope, CommercialBillingCancellationConfirmationRequest, CommercialBillingCancellationReviewEnvelope, CommercialBillingCancellationReviewRequest, CommercialBillingChangeAuthorization, CommercialBillingChangeAuthorizationRequest, CommercialBillingChangeReviewEnvelope, CommercialBillingChangeReviewRequest, CommercialBillingEnvelope, CommercialBillingRefundEnvelope, CommercialBillingRefundRequest } from "./generated";
import type { AuthlessTransport } from "./transport";
/** Inputs for the workspace-owned Authless plan and billing surface. */
export interface WorkspaceBillingPathInput {
    workspaceId: string;
}
export interface ReviewWorkspaceBillingChangeInput extends WorkspaceBillingPathInput, CommercialBillingChangeReviewRequest {
    correlationId: string;
}
export interface AuthorizeWorkspaceBillingChangeInput extends WorkspaceBillingPathInput, CommercialBillingChangeAuthorizationRequest {
    correlationId: string;
}
export interface ReviewWorkspaceBillingCancellationInput extends WorkspaceBillingPathInput, CommercialBillingCancellationReviewRequest {
    correlationId: string;
}
export interface ConfirmWorkspaceBillingCancellationInput extends WorkspaceBillingPathInput, CommercialBillingCancellationConfirmationRequest {
    correlationId: string;
}
export interface RequestWorkspaceBillingRefundInput extends WorkspaceBillingPathInput, CommercialBillingRefundRequest {
    correlationId: string;
}
/**
 * Workspace-owned Authless billing. This is deliberately separate from
 * `CommerceClient`, which is the app owner's catalog and personal buyer
 * subscription surface. Every operation is session-authorized by the API.
 */
export interface BillingClient {
    inspect(input: WorkspaceBillingPathInput & {
        correlationId: string;
    }): Promise<CommercialBillingEnvelope>;
    reviewChange(input: ReviewWorkspaceBillingChangeInput): Promise<CommercialBillingChangeReviewEnvelope>;
    authorizeChange(input: AuthorizeWorkspaceBillingChangeInput): Promise<CommercialBillingChangeAuthorization>;
    reviewCancellation(input: ReviewWorkspaceBillingCancellationInput): Promise<CommercialBillingCancellationReviewEnvelope>;
    confirmCancellation(input: ConfirmWorkspaceBillingCancellationInput): Promise<CommercialBillingCancellationEnvelope>;
    requestRefund(input: RequestWorkspaceBillingRefundInput): Promise<CommercialBillingRefundEnvelope>;
}
export declare function createBillingClient(transport: AuthlessTransport): BillingClient;
