export const conformanceScenarios = [
  "success",
  "denial",
  "expiry",
  "invalid-redirect",
  "pkce-failure",
  "state-failure",
  "nonce-failure",
  "consent-expansion",
  "revocation",
  "logout",
  "refresh-rotation",
  "webhook-replay",
] as const;

export type ConformanceScenario = (typeof conformanceScenarios)[number];
export type ConformanceDiagnostic = Readonly<{
  correlationId: string;
  outcome: "pass" | "expected-rejection" | "fail";
  safeCode: string;
  scenario: ConformanceScenario;
}>;

/** Non-deployed runner: records only allow-listed codes and opaque correlation references. */
export async function runConformanceConsole(
  probe: (
    scenario: ConformanceScenario,
  ) => Promise<Omit<ConformanceDiagnostic, "scenario">>,
): Promise<ConformanceDiagnostic[]> {
  const report: ConformanceDiagnostic[] = [];
  for (const scenario of conformanceScenarios) {
    const result = await probe(scenario);
    if (!/^[A-Za-z0-9._:-]{3,128}$/.test(result.correlationId))
      throw new Error(`Unsafe correlation reference for ${scenario}`);
    if (!/^conformance_[a-z0-9_]{3,64}$/.test(result.safeCode))
      throw new Error(`Unsafe diagnostic code for ${scenario}`);
    report.push(Object.freeze({ ...result, scenario }));
  }
  return report;
}
