import {
  getPublicDemoCase,
  publicFunnelLayers,
  type PublicDemoCase,
} from "./publicSampleCases";
import type { PublicPreVtoDecision, PublicPreVtoRequest } from "./publicContracts";

function confidenceForCase(demoCase: PublicDemoCase) {
  const fitSignals = demoCase.publicSignals.filter((signal) => signal.tone === "fit").length;
  const reviewSignals = demoCase.publicSignals.filter(
    (signal) => signal.tone === "review",
  ).length;
  return Math.min(92, 68 + fitSignals * 7 - reviewSignals * 3);
}

function verdictForCase(demoCase: PublicDemoCase): PublicPreVtoDecision["verdict"] {
  const holdCount = demoCase.publicSignals.filter((signal) => signal.tone === "hold").length;
  const reviewCount = demoCase.publicSignals.filter(
    (signal) => signal.tone === "review",
  ).length;

  if (holdCount > 0) {
    return "HOLD";
  }

  if (reviewCount >= 2) {
    return "REVIEW";
  }

  return "PASS";
}

export function runPublicPreVtoDecision(
  input: Partial<PublicPreVtoRequest>,
): PublicPreVtoDecision {
  const demoCase = getPublicDemoCase(input.sourceModelId);
  const verdict = verdictForCase(demoCase);

  return {
    ok: true,
    sourceModelId: demoCase.id,
    referenceId: input.referenceId || "public-demo-reference",
    verdict,
    confidence: confidenceForCase(demoCase),
    modelName: demoCase.modelName,
    scenario: demoCase.scenario,
    outfit: demoCase.outfit,
    concept: demoCase.concept,
    publicReasons: demoCase.publicSignals.map(
      (signal) => `${signal.label}: ${signal.reason}`,
    ),
    funnelLayers: publicFunnelLayers.map((layer) => ({
      label: layer.label,
      purpose: layer.purpose,
    })),
    decisionNote:
      "The decision layer keeps the product review focused on fit signals, outfit readiness, and whether the look should move into visual proof.",
  };
}
