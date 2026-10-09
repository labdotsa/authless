import { createSessionHandle } from "@authless/sveltekit";
import {
  createDpopProof,
  pendingAuthorization,
  pendingTransactions,
  sessions,
} from "$lib/server/authless-demo";
import type { Handle } from "@sveltejs/kit";

const projectSession = createSessionHandle({ readSession: sessions.read });

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pendingAuthorization = pendingAuthorization;
  event.locals.pendingTransactions = pendingTransactions;
  event.locals.sessions = sessions;
  event.locals.createDpopProof = createDpopProof;
  event.locals.jwks = { keys: [] };
  const bridgedEvent = {
    ...event,
    locals: event.locals as unknown as Record<string, unknown>,
  };
  return projectSession({
    event: bridgedEvent,
    resolve: async () => resolve(event),
  });
};
