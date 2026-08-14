# Submission Alignment

This document maps FitStyle Map to the YouCam API Skin AI & Apparel VTO
Hackathon requirements.

Official references:

- Devpost overview: https://youcam-api.devpost.com/
- Official rules: https://youcam-api.devpost.com/rules

## Requirement Checklist

| Requirement | Coverage |
|---|---|
| Working project | Next.js app with interactive UI and local API route |
| Required API category | YouCam Fashion / Apparel VTO |
| Project description | README explains features, functionality, and retail value |
| Code repository | Public code includes typed contracts, decision logic, sample cases, and setup instructions |
| Relevant licensing | `LICENSE` grants judging and review use |
| Project screenshots | Capture UI, decision result, YouCam confirmation/proof flow |
| Demo video | Must be 1-3 minutes and publicly visible on YouTube, Vimeo, or Youku |
| End-to-end experience | Video should show source model selection, outfit comparison, decision gate, YouCam send/proof |
| YouCam API explanation | Video and text should state that Fashion / Apparel VTO is used as the final proof layer |
| Target device footage | Show the web app running in the browser used for judging |
| Third-party media | Use original footage; avoid unlicensed music, trademarks, and copyrighted material |

## Judging Criteria

| Official criterion | FitStyle Map positioning |
|---|---|
| Technological Implementation | Integrates YouCam Fashion / Apparel VTO as the proof layer after a fit-aware decision gate. |
| Design | Complete product loop: select model, inspect fit/risk outfits, get decision, confirm send, review proof. |
| Potential Impact | Reduces weak VTO attempts and helps retailers turn virtual try-on into a better shopping decision. |
| Quality of the Idea | Uses YouCam API in a non-obvious way: VTO becomes evidence after FitStyle ranks outfit readiness. |

## Suggested Demo Video Outline

Keep the video between one and three minutes:

1. Problem: apparel VTO can waste API units when every outfit is generated before
   fit screening.
2. Product: FitStyle Map adds a pre-VTO decision layer for retailers and
   shoppers.
3. Workflow: select source model, compare recommended and risk outfits, inspect
   PASS / REVIEW / HOLD reasons.
4. YouCam API: explain that YouCam Fashion / Apparel VTO is used after the
   FitStyle gate as the visual proof layer.
5. End-to-end proof: show the confirmation/send flow and the resulting proof
   screen or saved YouCam output.

## Devpost Submission Assets

- Hosted app URL: live FitStyle Map staging URL.
- Code repository URL: this public repository.
- Demo video URL: public YouTube link strongly preferred.
- Screenshots: product overview, decision result, YouCam proof flow.
- Text description: use the README concept summary and the value statement
  below.
- Testing notes: include judge access instructions if the staging URL is gated.

## Short Text Description Draft

FitStyle Map is a pre-VTO decision layer for fashion retail. It evaluates
whether an outfit is worth sending to YouCam Fashion / Apparel VTO by comparing
model context, silhouette, material behavior, shoe line, accessory placement,
and styling risk. Shoppers get clearer try-on guidance, and retailers reduce
weak generation attempts by sending only higher-quality candidates into visual
proof.
