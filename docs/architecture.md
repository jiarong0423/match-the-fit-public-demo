# Architecture

FitStyle Map is organized as a decision system before visual try-on. The core
idea is to judge whether an outfit is a strong styling candidate before asking a
VTO layer to produce the final visual proof.

## Product Architecture

```mermaid
flowchart TB
  A["Shopper or source model context"] --> B["Fit signal profile"]
  C["Outfit reference"] --> D["Garment signal profile"]
  B --> E["FitStyle decision funnel"]
  D --> E
  E --> F{"Pre-VTO verdict"}
  F -->|PASS| G["Recommended try-on candidate"]
  F -->|REVIEW| H["Comparison or human review candidate"]
  F -->|HOLD| I["Revise styling or keep as negative control"]
  G --> J["YouCam Fashion / Apparel VTO proof layer"]
  H --> J
  J --> K["Shopper-facing try-on result"]
  K --> L["Review feedback for future styling rules"]
```

## Decision Funnel

```mermaid
flowchart LR
  A["Scenario"] --> B["Style tags"]
  B --> C["Body signals"]
  C --> D["Outfit template"]
  D --> E["Material and construction"]
  E --> F["Garment readiness"]
  F --> G["VTO proof"]
```

| Layer | Review Question |
|---|---|
| Scenario | Where will the outfit be worn, and what decision does the shopper need? |
| Style tags | Does the visual language match the scenario? |
| Body signals | Which public fit signals affect this styling decision? |
| Outfit template | Does the silhouette improve proportion before VTO? |
| Material and construction | Will the fabric behavior support the silhouette? |
| Garment readiness | Is the candidate ready enough to spend provider units? |
| YouCam VTO proof | Does the generated image confirm the decision for shoppers? |

## Runtime Flow

```mermaid
sequenceDiagram
  participant Judge
  participant UI as FitStyle UI
  participant API as Pre-VTO API
  participant Engine as Decision Engine
  participant Proof as YouCam VTO Proof Layer

  Judge->>UI: Select source model and outfit reference
  UI->>API: POST sourceModelId and referenceId
  API->>Engine: Run public decision funnel
  Engine-->>API: PASS / REVIEW / HOLD with reasons
  API-->>UI: Return typed public contract
  UI-->>Judge: Show confidence, reasons, and funnel layers
  UI->>Proof: Full staging sends approved candidates to YouCam Fashion / Apparel VTO
```

## Code Map

| File | Purpose |
|---|---|
| `app/FitStylePublicDemo.tsx` | Interactive product review surface |
| `app/api/fitstyle/pre-vto-decision/route.ts` | Public API route |
| `lib/publicDecisionEngine.ts` | Auditable decision logic |
| `lib/publicSampleCases.ts` | Sample product cases and fit signals |
| `lib/publicContracts.ts` | Typed API contract |

## YouCam API Cost-Control Concept

FitStyle Map treats YouCam Fashion / Apparel VTO as the final proof layer, not
the first screening step. The product can show send counters and confirmation
prompts so reviewers know generation cost is being managed while still allowing
hands-on testing.
