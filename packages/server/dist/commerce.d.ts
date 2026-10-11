import type { AcceptPersonalCommerceQuoteRequest, AppCommerceCatalogEnvelope, AppCommerceCommandEnvelope, AppCommerceEntitlementListEnvelope, AppCommerceInvoiceListEnvelope, AppCommercePlan, AppCommercePlanListEnvelope, AppCommercePublisherAccountingEnvelope, AppCommerceQuoteEnvelope, AppCommerceSubscriptionListEnvelope, ChangePersonalCommerceSubscriptionRequest, CreateAppCommerceAddonRequest, CreateAppCommerceFeatureRequest, CreateAppCommercePlanRequest, CreatePersonalCommerceCheckoutRequest, CreatePersonalCommercePortalSessionRequest, CreatePersonalCommerceQuoteRequest, RecordAppCommerceUsageRequest, RequestAppCommerceRefundRequest } from "./generated";
import type { AuthlessTransport } from "./transport";
export type CommerceEnvironment = "test" | "production";
export interface AppCommercePathInput {
    appId: string;
    environment: CommerceEnvironment;
    workspaceId: string;
}
export interface ListPersonalCommerceInput {
    appId?: string;
    correlationId: string;
    cursor?: string;
    limit?: number;
}
export interface CreateAppCommercePlanInput extends AppCommercePathInput, CreateAppCommercePlanRequest {
    correlationId: string;
    idempotencyKey: string;
}
export interface CreateAppCommerceCatalogInput {
    appId: string;
    environment: CommerceEnvironment;
    workspaceId: string;
    name: string;
    defaultCurrency: string;
    correlationId: string;
    idempotencyKey: string;
}
export interface CreateAppCommerceFeatureInput extends AppCommercePathInput, CreateAppCommerceFeatureRequest {
    correlationId: string;
    idempotencyKey: string;
}
export interface CreateAppCommerceAddonInput extends AppCommercePathInput, CreateAppCommerceAddonRequest {
    correlationId: string;
    idempotencyKey: string;
}
export interface RecordAppCommerceUsageInput extends AppCommercePathInput, RecordAppCommerceUsageRequest {
    correlationId: string;
    customerRef: string;
    idempotencyKey: string;
}
export interface RequestAppCommerceRefundInput extends AppCommercePathInput, RequestAppCommerceRefundRequest {
    correlationId: string;
    idempotencyKey: string;
    invoiceId: string;
}
export interface GetAppCommerceEntitlementsInput extends AppCommercePathInput {
    correlationId: string;
    customerRef: string;
}
export interface CreatePersonalCommerceCheckoutInput extends CreatePersonalCommerceCheckoutRequest {
    correlationId: string;
    idempotencyKey: string;
}
export interface CreatePersonalCommerceQuoteInput extends CreatePersonalCommerceQuoteRequest {
    correlationId: string;
    idempotencyKey: string;
}
export interface AcceptPersonalCommerceQuoteInput extends AcceptPersonalCommerceQuoteRequest {
    correlationId: string;
    idempotencyKey: string;
    quoteId: string;
}
export interface ChangePersonalCommerceSubscriptionInput extends ChangePersonalCommerceSubscriptionRequest {
    correlationId: string;
    idempotencyKey: string;
    subscriptionRef: string;
}
export interface CreatePersonalCommercePortalSessionInput extends CreatePersonalCommercePortalSessionRequest {
    correlationId: string;
}
export interface CommerceClient {
    createCatalog(input: CreateAppCommerceCatalogInput): Promise<AppCommerceCommandEnvelope>;
    getAppView(input: {
        appId: string;
        correlationId: string;
        workspaceId: string;
    }): Promise<Record<string, unknown>>;
    getAppEnvironmentView(input: AppCommercePathInput & {
        correlationId: string;
    }): Promise<Record<string, unknown>>;
    simulateMockRenewal(input: {
        appId: string;
        correlationId: string;
        idempotencyKey: string;
        workspaceId: string;
    }): Promise<AppCommerceCommandEnvelope>;
    createPlan(input: CreateAppCommercePlanInput): Promise<AppCommercePlan>;
    createFeature(input: CreateAppCommerceFeatureInput): Promise<AppCommerceCommandEnvelope>;
    createAddon(input: CreateAppCommerceAddonInput): Promise<AppCommerceCommandEnvelope>;
    publishPlan(input: AppCommercePathInput & {
        correlationId: string;
        idempotencyKey: string;
        planId: string;
    }): Promise<AppCommerceCommandEnvelope>;
    getPublisherAccounting(input: AppCommercePathInput & {
        correlationId: string;
    }): Promise<AppCommercePublisherAccountingEnvelope>;
    releasePublisherReserves(input: AppCommercePathInput & {
        correlationId: string;
        idempotencyKey: string;
    }): Promise<AppCommerceCommandEnvelope>;
    createSettlement(input: AppCommercePathInput & {
        correlationId: string;
        idempotencyKey: string;
    }): Promise<AppCommerceCommandEnvelope>;
    simulatePayout(input: AppCommercePathInput & {
        correlationId: string;
        idempotencyKey: string;
        settlementId: string;
    }): Promise<AppCommerceCommandEnvelope>;
    recordUsage(input: RecordAppCommerceUsageInput): Promise<AppCommerceCommandEnvelope>;
    requestRefund(input: RequestAppCommerceRefundInput): Promise<AppCommerceCommandEnvelope>;
    listCatalog(input: {
        appId: string;
        correlationId: string;
        environment?: string;
    }): Promise<AppCommerceCatalogEnvelope>;
    getEntitlements(input: GetAppCommerceEntitlementsInput): Promise<AppCommerceEntitlementListEnvelope>;
    listPlans(input: AppCommercePathInput & {
        correlationId: string;
    }): Promise<AppCommercePlanListEnvelope>;
    listSubscriptions(input: ListPersonalCommerceInput): Promise<AppCommerceSubscriptionListEnvelope>;
    createCheckout(input: CreatePersonalCommerceCheckoutInput): Promise<AppCommerceCommandEnvelope>;
    createQuote(input: CreatePersonalCommerceQuoteInput): Promise<AppCommerceQuoteEnvelope>;
    acceptQuote(input: AcceptPersonalCommerceQuoteInput): Promise<AppCommerceQuoteEnvelope>;
    completeCheckout(input: {
        checkoutRef: string;
        correlationId: string;
        idempotencyKey: string;
    }): Promise<AppCommerceCommandEnvelope>;
    changeSubscription(input: ChangePersonalCommerceSubscriptionInput): Promise<AppCommerceCommandEnvelope>;
    cancelSubscription(input: {
        correlationId: string;
        idempotencyKey: string;
        subscriptionRef: string;
    }): Promise<AppCommerceCommandEnvelope>;
    resumeSubscription(input: {
        correlationId: string;
        idempotencyKey: string;
        subscriptionRef: string;
    }): Promise<AppCommerceCommandEnvelope>;
    listInvoices(input: ListPersonalCommerceInput): Promise<AppCommerceInvoiceListEnvelope>;
    createPortalSession(input: CreatePersonalCommercePortalSessionInput): Promise<AppCommerceCommandEnvelope>;
}
export declare function createCommerceClient(transport: AuthlessTransport): CommerceClient;
