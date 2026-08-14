import { NextResponse } from "next/server";
import type { PublicPreVtoRequest } from "../../../../lib/publicContracts";
import { runPublicPreVtoDecision } from "../../../../lib/publicDecisionEngine";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<PublicPreVtoRequest>;
  const result = runPublicPreVtoDecision(body);

  return NextResponse.json(result, {
    headers: {
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}
