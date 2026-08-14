export type PublicPreVtoRequest = {
  sourceModelId: string;
  referenceId: string;
};

export type PublicPreVtoDecision = {
  ok: true;
  sourceModelId: string;
  referenceId: string;
  verdict: "PASS" | "REVIEW" | "HOLD";
  confidence: number;
  modelName: string;
  scenario: string;
  outfit: string;
  concept: string;
  publicReasons: string[];
  funnelLayers: {
    label: string;
    purpose: string;
  }[];
  decisionNote: string;
};
