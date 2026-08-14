import { NextResponse } from "next/server";
import type { PublicPreVtoDecision, PublicPreVtoRequest } from "../../../../lib/publicContracts";

const publicReasonMap = {
  "source-f-petite-flat-front-156": [
    "high-waist anchor preserved",
    "low shoe weight",
    "neckline stays readable",
  ],
  "source-d-tall-slim-office-177": [
    "long vertical line preserved",
    "cool contrast supported",
    "hem and shoe-ground line visible",
  ],
  "source-c-black-editorial-174": [
    "structured waist signal",
    "near-face contrast supported",
    "garment volume remains controlled",
  ],
} as const;

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<PublicPreVtoRequest>;
  const sourceModelId = body.sourceModelId || "source-f-petite-flat-front-156";
  const publicReasons =
    publicReasonMap[sourceModelId as keyof typeof publicReasonMap] ??
    publicReasonMap["source-f-petite-flat-front-156"];

  const result: PublicPreVtoDecision = {
    ok: true,
    sourceModelId,
    referenceId: body.referenceId || "public-demo-reference",
    verdict: "PASS",
    confidence: 84,
    publicReasons: Array.from(publicReasons),
    protectedNotice:
      "Body vectors, raw calibration, scoring weights, and YouCam task details are computed server-side and are not part of the public contract.",
  };

  return NextResponse.json(result, {
    headers: {
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}
