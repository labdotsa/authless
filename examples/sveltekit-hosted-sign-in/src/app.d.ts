import type {
  createDpopProof,
  fetchJwks,
  pendingAuthorization,
  pendingTransactions,
  sessions,
} from "$lib/server/authless-demo";

declare global {
  namespace App {
    interface Locals {
      authless: {
        sessionId: string;
        subject: string;
        expiresAt?: string;
      } | null;
      createDpopProof: typeof createDpopProof;
      jwks: Awaited<ReturnType<typeof fetchJwks>>;
      pendingAuthorization: typeof pendingAuthorization;
      pendingTransactions: typeof pendingTransactions;
      sessions: typeof sessions;
      authlessError?: string;
    }
  }
}
