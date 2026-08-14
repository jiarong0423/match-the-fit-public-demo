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
  publicReasons: string[];
  protectedNotice: string;
};
