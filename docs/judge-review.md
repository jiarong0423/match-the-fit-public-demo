# Judge Review Guide

This guide maps FitStyle Map to the YouCam API Skin AI & Apparel VTO Hackathon
requirements from a judge's point of view.

## Official Requirement Snapshot

| Official requirement | FitStyle Map evidence |
|---|---|
| Working application using at least one YouCam Skin or Fashion API | FitStyle Map uses the YouCam Fashion / Apparel VTO layer as the visual proof step after the pre-VTO decision gate. |
| Clear consumer or retail value | The product helps shoppers and retailers avoid weak VTO attempts by deciding which outfits are worth generating first. |
| Repository with source code, assets, and instructions | This repo contains the runnable public app, sample cases, decision logic, architecture docs, and setup instructions. |
| Public repo with relevant licensing, or private repo shared with contact_event@PerfectCorp.com | This repository is public and includes a review license. |
| Text description explaining features and value | README explains the product concept, workflow, consumer value, and retail value. |
| Project screenshots | Add product UI, PASS / REVIEW / HOLD result, and YouCam proof-flow screenshots in Devpost. |
| 1-3 minute demo video | `docs/submission-alignment.md` includes a YouCam-focused video outline. |
| Video explains the YouCam API used | The demo should explicitly say the project uses YouCam Fashion / Apparel VTO as the proof layer. |
| Video shows the target device experience | Record the web app running on desktop browser, or include mobile browser footage if submitting as mobile-ready. |
| No third-party trademarks or copyrighted music without permission | Use original screen recording and royalty-free or no music. |

## Judging Criteria Alignment

| Criteria | What judges should inspect | FitStyle Map answer |
|---|---|---|
| Technological Implementation | How thoroughly and skillfully is at least one YouCam API from Skin/Fashion integrated? | The full product uses YouCam Fashion / Apparel VTO after the FitStyle gate. The public repo shows the decision system and the YouCam proof handoff. |
| Design | Is this a complete product experience, not just a PoC? | The flow has model context, outfit candidates, recommendation/risk comparison, decision reasons, send counters, and visual proof. |
| Potential Impact | Does it solve a real problem for a real audience? | Apparel VTO can waste API units and produce weak shopping recommendations. FitStyle Map improves candidate quality before generation. |
| Quality of the Idea | Is the YouCam API use creative and non-obvious? | Instead of using VTO as the first screen, FitStyle Map uses it as proof after a fit-aware retail decision layer. |

## What To Look At First

1. `README.md`: product concept and run instructions.
2. `app/FitStylePublicDemo.tsx`: the judge-facing product surface.
3. `lib/publicDecisionEngine.ts`: PASS / REVIEW / HOLD decision logic.
4. `lib/publicSampleCases.ts`: source models, outfits, and fit signals.
5. `docs/architecture.md`: decision funnel and YouCam proof-layer diagrams.
6. `docs/youcam-api.md`: YouCam API usage explanation.
7. `docs/submission-alignment.md`: final Devpost checklist.

## Demo Video Checklist

The video should show:

1. The problem: VTO can generate a visually complete result before the outfit is
   actually a good retail candidate.
2. The product: FitStyle Map ranks fit and risk outfits before YouCam generation.
3. The YouCam API: Fashion / Apparel VTO is used as the visual proof layer after
   FitStyle confirms the candidate is worth sending.
4. The end-to-end flow: select model, compare outfits, run decision, confirm
   send, show YouCam result or proof screen.
5. The value: shoppers get clearer try-on decisions; retailers reduce weak
   generation attempts and can compare recommended versus risk cases.

## Final Submission Checklist

| Item | Status |
|---|---|
| Public GitHub repo | Ready |
| Local build | Ready |
| README setup | Ready |
| Sample data | Ready |
| Architecture diagram | Ready |
| YouCam API explanation | Ready |
| Runtime audit | Ready |
| Project screenshots | Pending |
| 1-3 minute demo video | Pending |
| Hosted staging URL | Pending final submission copy |
| Devpost text description | Pending final copy |
