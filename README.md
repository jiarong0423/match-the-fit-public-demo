# FitStyle Map Public Demo Source

This is the simplified public source package for FitStyle Map.

It intentionally keeps only:

- a lightweight judge-facing UI shell
- public API contracts
- bounded PASS / REVIEW / HOLD response examples
- disclosure-boundary documentation

It intentionally excludes:

- Body Fit ID raw vectors and calibration coordinates
- scoring weights and reversible decode logic
- source-candidate images and repair history
- YouCam API keys, task IDs, dispatch ledgers, and provider URLs
- raw prompt packets, rejected candidates, and QA transcripts

Production and judge staging use a protected backend for private computation.
The public frontend should never need to know the full formula to explain the
product flow.
