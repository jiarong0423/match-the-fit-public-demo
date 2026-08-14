"use client";

import { useState } from "react";
import type { PublicPreVtoDecision } from "../lib/publicContracts";
import { runPublicPreVtoDecision } from "../lib/publicDecisionEngine";
import { publicDemoCases } from "../lib/publicSampleCases";

export default function FitStylePublicDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [decision, setDecision] = useState<PublicPreVtoDecision | null>(() =>
    runPublicPreVtoDecision({
      sourceModelId: publicDemoCases[0].id,
      referenceId: "public-demo-1",
    }),
  );
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const activeCase = publicDemoCases[activeIndex];

  async function runDecision() {
    setStatus("loading");
    setDecision(null);

    try {
      const response = await fetch("/api/fitstyle/pre-vto-decision", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sourceModelId: activeCase.id,
          referenceId: `public-demo-${activeIndex + 1}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Decision request failed: ${response.status}`);
      }

      const payload = (await response.json()) as PublicPreVtoDecision;
      setDecision(payload);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="fitstyle-main">
      <section className="fitstyle-shell">
        <aside className="fitstyle-sidebar">
          <p className="fitstyle-eyebrow">
            FitStyle Map
          </p>
          <h1 className="fitstyle-title">
            Match the fit before generating the look.
          </h1>
          <p className="fitstyle-copy">
            FitStyle Map checks whether an outfit is worth sending to visual
            try-on before spending generation cost.
          </p>
          <div className="fitstyle-case-list">
            {publicDemoCases.map((item, index) => (
              <button
                className={
                  activeIndex === index
                    ? "fitstyle-case-button fitstyle-case-button-active"
                    : "fitstyle-case-button"
                }
                key={item.id}
                onClick={() => {
                  setActiveIndex(index);
                  setDecision(
                    runPublicPreVtoDecision({
                      sourceModelId: item.id,
                      referenceId: `public-demo-${index + 1}`,
                    }),
                  );
                  setStatus("idle");
                }}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="fitstyle-panel">
          <div className="fitstyle-panel-header">
            <div>
              <p className="fitstyle-eyebrow">
                Public API Contract
              </p>
              <h2 className="fitstyle-outfit-title">{activeCase.outfit}</h2>
              <p className="fitstyle-panel-copy">
                {activeCase.concept}
              </p>
            </div>
            <button
              className="fitstyle-primary-button"
              disabled={status === "loading"}
              onClick={runDecision}
              type="button"
            >
              {status === "loading" ? "Checking" : "Run Pre-VTO Gate"}
            </button>
          </div>

          {status === "error" ? (
            <p className="fitstyle-error">
              The public contract endpoint did not respond.
            </p>
          ) : null}

          {decision ? (
            <div className="fitstyle-result-grid">
              <div className="fitstyle-metric fitstyle-metric-pass">
                <div className="fitstyle-metric-label">
                  Verdict
                </div>
                <div className="fitstyle-metric-value">
                  {decision.verdict}
                </div>
              </div>
              <div className="fitstyle-metric fitstyle-metric-info">
                <div className="fitstyle-metric-label">
                  Confidence
                </div>
                <div className="fitstyle-metric-value">
                  {decision.confidence}%
                </div>
              </div>
              <div className="fitstyle-metric fitstyle-metric-neutral">
                <div className="fitstyle-metric-label">
                  Public Reasons
                </div>
                <ul className="fitstyle-reason-list">
                  {decision.publicReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
              <div className="fitstyle-wide-card">
                <div className="fitstyle-card-title">
                  Decision Funnel
                </div>
                <div className="fitstyle-funnel-grid">
                  {decision.funnelLayers.map((layer) => (
                    <div
                      className="fitstyle-funnel-step"
                      key={layer.label}
                    >
                      <div className="fitstyle-funnel-title">
                        {layer.label}
                      </div>
                      <div className="fitstyle-funnel-copy">
                        {layer.purpose}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="fitstyle-note">
                  {decision.decisionNote}
                </p>
              </div>
              <div className="fitstyle-wide-card fitstyle-youcam-card">
                <div className="fitstyle-card-title fitstyle-youcam-title">
                  YouCam API Usage
                </div>
                <div className="fitstyle-youcam-grid">
                  <div className="fitstyle-youcam-item">
                    <div className="fitstyle-youcam-label">
                      API Category
                    </div>
                    <div className="fitstyle-youcam-value">
                      {decision.youCamApi.category}
                    </div>
                  </div>
                  <div className="fitstyle-youcam-item">
                    <div className="fitstyle-youcam-label">
                      Product Role
                    </div>
                    <div className="fitstyle-youcam-text">
                      {decision.youCamApi.role}
                    </div>
                  </div>
                  <div className="fitstyle-youcam-item">
                    <div className="fitstyle-youcam-label">
                      Send Policy
                    </div>
                    <div className="fitstyle-youcam-text">
                      {decision.youCamApi.sendPolicy}
                    </div>
                  </div>
                </div>
                <p className="fitstyle-youcam-note">
                  {decision.youCamApi.proofLayer}
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
