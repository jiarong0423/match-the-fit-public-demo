"use client";

import { useState } from "react";
import type { PublicPreVtoDecision } from "../lib/publicContracts";
import { publicDemoCases } from "../lib/publicSampleCases";

export default function FitStylePublicDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [decision, setDecision] = useState<PublicPreVtoDecision | null>(null);
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
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-8 text-[#172033]">
      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-lg border border-[#d8cdbd] bg-white p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6f6256]">
            FitStyle Map
          </p>
          <h1 className="mt-2 text-3xl font-black">
            Match the fit before generating the look.
          </h1>
          <p className="mt-4 text-sm leading-6 text-[#657080]">
            FitStyle Map checks whether an outfit is worth sending to visual
            try-on before spending generation cost.
          </p>
          <div className="mt-5 grid gap-2">
            {publicDemoCases.map((item, index) => (
              <button
                className={`rounded-md border px-3 py-3 text-left text-sm font-black transition ${
                  activeIndex === index
                    ? "border-[#315f8c] bg-[#eef7fb] text-[#315f8c]"
                    : "border-[#d8cdbd] bg-[#fbfaf7] text-[#625847]"
                }`}
                key={item.id}
                onClick={() => {
                  setActiveIndex(index);
                  setDecision(null);
                  setStatus("idle");
                }}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-lg border border-[#d8cdbd] bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase text-[#6f6256]">
                Public API Contract
              </p>
              <h2 className="mt-2 text-2xl font-black">{activeCase.outfit}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#657080]">
                {activeCase.concept}
              </p>
            </div>
            <button
              className="rounded-md bg-[#315f8c] px-4 py-3 text-sm font-black text-white transition hover:bg-[#244c70]"
              disabled={status === "loading"}
              onClick={runDecision}
              type="button"
            >
              {status === "loading" ? "Checking" : "Run Pre-VTO Gate"}
            </button>
          </div>

          {status === "error" ? (
            <p className="mt-5 rounded-md border border-[#e7bba8] bg-[#fff1eb] px-4 py-3 text-sm font-bold text-[#a3482f]">
              The public contract endpoint did not respond.
            </p>
          ) : null}

          {decision ? (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-[#bddbc8] bg-[#eef8f1] p-4">
                <div className="text-xs font-black uppercase text-[#2f6b4c]">
                  Verdict
                </div>
                <div className="mt-2 text-3xl font-black text-[#2f6b4c]">
                  {decision.verdict}
                </div>
              </div>
              <div className="rounded-lg border border-[#c7d8e5] bg-[#eef7fb] p-4">
                <div className="text-xs font-black uppercase text-[#315f8c]">
                  Confidence
                </div>
                <div className="mt-2 text-3xl font-black text-[#315f8c]">
                  {decision.confidence}%
                </div>
              </div>
              <div className="rounded-lg border border-[#d8cdbd] bg-[#fbfaf7] p-4">
                <div className="text-xs font-black uppercase text-[#625847]">
                  Public Reasons
                </div>
                <ul className="mt-2 grid gap-1 text-sm font-bold text-[#384252]">
                  {decision.publicReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-[#d8cdbd] bg-white p-4 md:col-span-3">
                <div className="text-xs font-black uppercase text-[#625847]">
                  Decision Funnel
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {decision.funnelLayers.map((layer) => (
                    <div
                      className="rounded-md border border-[#e4dacc] bg-[#fbfaf7] p-3"
                      key={layer.label}
                    >
                      <div className="text-sm font-black text-[#172033]">
                        {layer.label}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-[#657080]">
                        {layer.purpose}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-[#657080]">
                  {decision.decisionNote}
                </p>
              </div>
              <div className="rounded-lg border border-[#c7d8e5] bg-[#eef7fb] p-4 md:col-span-3">
                <div className="text-xs font-black uppercase text-[#315f8c]">
                  YouCam API Usage
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-3">
                  <div className="rounded-md bg-white p-3">
                    <div className="text-xs font-black uppercase text-[#657080]">
                      API Category
                    </div>
                    <div className="mt-1 text-sm font-black text-[#172033]">
                      {decision.youCamApi.category}
                    </div>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <div className="text-xs font-black uppercase text-[#657080]">
                      Product Role
                    </div>
                    <div className="mt-1 text-sm leading-6 text-[#172033]">
                      {decision.youCamApi.role}
                    </div>
                  </div>
                  <div className="rounded-md bg-white p-3">
                    <div className="text-xs font-black uppercase text-[#657080]">
                      Send Policy
                    </div>
                    <div className="mt-1 text-sm leading-6 text-[#172033]">
                      {decision.youCamApi.sendPolicy}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#315f8c]">
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
