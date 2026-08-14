export type PublicSignalTone = "fit" | "review" | "hold";

export type PublicSignal = {
  label: string;
  tone: PublicSignalTone;
  reason: string;
};

export type PublicDemoCase = {
  id: string;
  label: string;
  modelName: string;
  modelStory: string;
  outfit: string;
  scenario: string;
  concept: string;
  publicSignals: PublicSignal[];
};

export const publicFunnelLayers = [
  {
    id: "scenario",
    label: "Scenario gate",
    purpose: "Understand where the outfit will be used before judging fit.",
  },
  {
    id: "style",
    label: "Style tag gate",
    purpose: "Translate the use case into a visual language and reject mismatched trends.",
  },
  {
    id: "body",
    label: "Body feature segment",
    purpose: "Map fit concerns to non-sensitive public body-signal labels.",
  },
  {
    id: "template",
    label: "Outfit template",
    purpose: "Choose silhouettes that improve proportion before VTO.",
  },
  {
    id: "material",
    label: "Material and construction",
    purpose: "Filter fabrics that may look fine in VTO but behave poorly in purchase.",
  },
  {
    id: "spec",
    label: "Garment readiness",
    purpose: "Hold candidates that need more product specs before spending provider units.",
  },
  {
    id: "proof",
    label: "VTO proof layer",
    purpose: "Generate a visual proof only after the candidate passes the decision funnel.",
  },
] as const;

export const publicDemoCases: PublicDemoCase[] = [
  {
    id: "source-f-petite-flat-front-156",
    label: "F / Lina",
    modelName: "Lina",
    modelStory:
      "A petite source profile where waist height, shoe weight, and upper-body clutter strongly affect the final shopping read.",
    outfit: "Ivory cropped knit cardigan + sheer high-neck inner + high-waist blue A-line skirt",
    scenario: "Spring office-to-weekend styling",
    concept:
      "The look keeps the upper body clean while using a raised waist and lighter shoe line to preserve vertical proportion.",
    publicSignals: [
      {
        label: "High-waist anchor",
        tone: "fit",
        reason: "The skirt placement keeps the torso-leg split readable.",
      },
      {
        label: "Low shoe weight",
        tone: "fit",
        reason: "A lighter shoe line avoids visually shortening the petite frame.",
      },
      {
        label: "Neckline clarity",
        tone: "fit",
        reason: "The sheer high-neck layer stays clean instead of adding heavy front volume.",
      },
    ],
  },
  {
    id: "source-d-tall-slim-office-177",
    label: "D / Irina",
    modelName: "Irina",
    modelStory:
      "A taller source profile where long vertical lines, hem visibility, and cool contrast determine whether the styling reads polished.",
    outfit: "Cropped turtleneck knit + high-waist narrow skirt",
    scenario: "Polished office styling",
    concept:
      "The look preserves a long vertical line while keeping hem and shoe-ground visibility stable.",
    publicSignals: [
      {
        label: "Vertical continuity",
        tone: "fit",
        reason: "The outfit avoids breaking the line with low placement or bulky contrast.",
      },
      {
        label: "Cool contrast",
        tone: "fit",
        reason: "The palette supports a clean near-face read without flattening the silhouette.",
      },
      {
        label: "Hem visibility",
        tone: "review",
        reason: "The final proof should keep the skirt hem and shoe line visible.",
      },
    ],
  },
  {
    id: "source-c-black-editorial-174",
    label: "C / Noa",
    modelName: "Noa",
    modelStory:
      "An editorial source profile where structure, near-face contrast, and garment volume must stay controlled before visual proof.",
    outfit: "Draped ivory short-sleeve blouse + mocha high-waist wide trousers",
    scenario: "Editorial smart-casual styling",
    concept:
      "The look uses soft drape and a structured waist cue while keeping volume from overwhelming the source profile.",
    publicSignals: [
      {
        label: "Structured waist cue",
        tone: "fit",
        reason: "The outfit keeps a clear center anchor before the trouser volume expands.",
      },
      {
        label: "Near-face contrast",
        tone: "fit",
        reason: "Ivory near the face prevents the styling from becoming visually heavy.",
      },
      {
        label: "Volume control",
        tone: "review",
        reason: "Wide trousers remain viable when the top and waist stay readable.",
      },
    ],
  },
];

export function getPublicDemoCase(sourceModelId: string | undefined) {
  return (
    publicDemoCases.find((item) => item.id === sourceModelId) ?? publicDemoCases[0]
  );
}
