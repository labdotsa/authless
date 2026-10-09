import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.authless) return { status: "signed_out" as const };
  const session = await locals.sessions.require(locals.authless.sessionId);
  if (!session.subject) throw error(403, "access_unavailable");
  return { status: "signed_in" as const, subject: session.subject };
};
