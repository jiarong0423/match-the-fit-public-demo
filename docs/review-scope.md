# Review Scope

FitStyle Map has two useful review surfaces.

## Public Code Surface

This repository shows the product concept, decision funnel, typed API contract,
and sample cases. It is meant for quick technical review, local setup, and demo
video support.

## Live Staging Surface

The live staging app demonstrates the complete experience: source models,
outfit matrix, visual comparison, send counters, confirmation prompts, and
provider proof flow.

## Engineering Boundary

The source model calibration service, provider integration, and QA evidence
pipeline are runtime services. They support the product but do not need to be
embedded in the public review shell for judges to understand the architecture.

## Review Recommendation

Use this repository to inspect how the product is structured. Use the staging
URL to test the full workflow.
