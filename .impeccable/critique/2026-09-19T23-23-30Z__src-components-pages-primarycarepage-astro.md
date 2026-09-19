---
target: "Group 1: Primary Care + Medical Weight Loss pages"
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\raymo\\Downloads\\palm-wellness\\src\\components\\pages\\PrimaryCarePage.astro"
target_fingerprint: "sha256:73382ed8c3c6489673068eb7b0d96cd9ba1230e0f5d9d1ca0579f61e18e9474c"
target_path: "C:\\Users\\raymo\\Downloads\\palm-wellness\\src\\components\\pages\\PrimaryCarePage.astro"
timestamp: 2026-09-19T23-23-30Z
slug: src-components-pages-primarycarepage-astro
---
Method: dual-agent (A: design review · B: detector + technical evidence)

# Critique — Primary Care + Medical Weight Loss (Group 1)

## Design Health Score (Nielsen)
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | PC sticky subnav has no active/scroll-spy state; WL has none |
| 2 | Match System / Real World | 4 | Plain, credible language ("not a diet", "not quick fixes") |
| 3 | User Control and Freedom | 3 | No back-to-top on ~15-section pages; Booking opens new tab |
| 4 | Consistency and Standards | 2 | Homepage's 3-plan pricing + eyebrow rhythm not carried in |
| 5 | Error Prevention | 2 | Pricing conflicts across pages; no inline eligibility check |
| 6 | Recognition Rather Than Recall | 3 | Longer WL page has no anchor nav |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 2 | ~15 sections; "why integrated" + "why choose" overlap |
| 9 | Error Recovery | 2 | No path for "not a GLP-1 candidate" / "insurer won't cover" |
| 10 | Help and Documentation | n/a | FAQ is the documentation and is adequate |
| **Total** | | **21/32 (66%)** | **Acceptable (borderline)** |

## Design Specificity Verdict
Category-interchangeable skeleton, product-specific copy. Both pages run the same
15-section skeleton and the WL hero is a near find-and-replace of PC's. Visual coherence
with HomePage is strong; structural specificity is weak — the two pages should not share
one section order. Detector: 0 findings on both files (exit 0). Lighthouse a11y 100/100;
only best-practices `image-size-responsive` fails (shared header logo, not page content).

## Overall Impression
Strong copy, weak evidence. The pages tell a credible story but the trust moments show
placeholders, and the highest-intent questions (eligibility, cost) are answered last.

## What's Working
1. Pain-point copy ("rushed 10-15 minute visits", "less need to repeat your history").
2. WL safety candor: common + rare side effects disclosed; direct-pay stated.
3. Membership card craft: 46px price, mt-auto CTA, dark/light contrast, phone CTA.

## Priority Issues
- **P0 — Placeholder imagery at trust moments.** WL "Care Team / Photo coming soon", PC IV + Telemedicine "Image coming soon". Healthcare credibility; reads unfinished. Fix: real photos or remove the slot.
- **P1 — WL has no anchor subnav** despite being the longer page. Add WL anchors (Services, Safety, Program & Cost, Team, Get started, FAQ).
- **P1 — Eligibility + cost buried.** Cost is FAQ #5, candidacy FAQ #10. Add an inline cost range beside the $299 card + a short candidacy check.
- **P2 — Pricing incoherence across pages** ($39 office vs homepage $65 new patient; "45-60" vs "60-minute"). Use one shared price source.
- **P2 — Flat rhythm / duplicated intent** across "why integrated" and "why choose"; restore eyebrow hierarchy used on the homepage.

## Persona Red Flags
- **Jordan (first-timer):** "GLP-1", "PA, ACN", "BMI" unexpanded; "12% off IV therapy" before IV is defined; direct-pay only in FAQ #3.
- **Casey (mobile):** WL ~15 sections of scroll with no jump nav; PC subnav links ~22px tall (passes WCAG via gap exception, but weak thumb targets); FAQ collapses to one long column.
- **Riley (stress tester):** "Hundreds of satisfied patients annually" unsourced; "60-minute" vs "45-60 minute" conflict; supervising physician unnamed; serious side effects use the same check icon as benefits; no last-reviewed date.

## Minor Observations
- Serious side effects use the same check icon shape/weight as positives.
- " - " (space-hyphen) used as an em dash throughout.
- Non-member price 28px vs member 46px (membership reads as *the* product).
- Same why-integrated image on both pages; homepage hero image reused as WL integrated thumb.
- WL sections lack `id`s (no deep links); no breadcrumbs.
- 7 images lack width/height (PC integrated; MWL integrated) — CLS risk.
- No custom focus-visible styles (UA ring retained); a11y otherwise 100.

## Questions to Consider
1. If the logo were removed, could a patient tell which page they are on before the headline?
2. The page promises "unhurried visits" and then shows "Photo coming soon" where the provider should be — which promise breaks first?
3. GLP-1 candidacy is the highest-intent query; why is it answered last?
