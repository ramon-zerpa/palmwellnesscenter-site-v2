---
target: homepage (/ including header and footer)
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\raymo\\Downloads\\palm-wellness\\src\\pages\\index.astro"
target_fingerprint: "sha256:c39dd48dd2a0a78dfcd7a4ad7edde2d453921837a0d8eddd109072f760e7b14c"
target_path: "C:\\Users\\raymo\\Downloads\\palm-wellness\\src\\pages\\index.astro"
timestamp: 2026-09-20T00-24-55Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design-review subagent · B: detector+browser-evidence subagent)

# Critique — Homepage (full surface: utility bar, header, all sections, footer)
Target: `src/pages/index.astro` + `src/components/{TopBar,Header,HomePage,Footer}.astro`
Reference world: `.pen` frames `bi8Au` (Homepage — Desktop 1440) and `vDSME` (Homepage — Mobile 390).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 3 | Active nav state OK; mobile menu had no ESC/announced state |
| 2 | Match system / real world | 4 | Bilingual, plain clinic language, real tel:/address |
| 3 | User control and freedom | 2 | Desktop dropdowns hover-only; no keyboard/ESC exit |
| 4 | Consistency and standards | 3 | Nav labels diverged from committed design ("Physical Rehabilitation", "Blog") |
| 5 | Error prevention | 3 | No forms; external booking opens without warning |
| 6 | Recognition rather than recall | 3 | Membership mixed recurring + per-visit models |
| 7 | Flexibility and efficiency | 1 | No persistent Book affordance on mobile (<640px hidden) |
| 8 | Aesthetic and minimalist design | 3 | Seven near-identical centered bands flattened the page |
| 9 | Error recovery | 3 | Nothing to recover on a landing page |
| 10 | Help and documentation | 3 | FAQ (6 Q) + phone/address/hours/licenses |

**Total 28/40 — "Good" (70%).**

## Design Specificity Verdict
Copy is genuinely authored for this product (transportation, bilingual care, named providers, GLP-1/NAD+, Linebaugh Ave). The shell was category-interchangeable: repeated eyebrow → centered H2 → lead → pill/card grid, with sparse imagery and two visible fidelity gaps against the committed design (header overflow; missing mobile sticky action bar).

## Priority Issues
- **[P0] Header overflows its container by 71px at 1280–1440.** Book button right edge x=1334 vs container content edge x=1263; nav 685px. Fix: full-bleed header shell + shorter nav labels.
- **[P0] No sticky mobile action bar.** Design `vDSME` has a 390×66 Call+Book bar; header Book was hidden below 640px. Fix: fixed bottom Call/Book bar + body bottom padding.
- **[P1] Hover-only desktop dropdowns.** `group-hover` only, no keyboard path, no aria state.
- **[P1] Membership model ambiguity.** Recurring membership and per-visit pricing presented as one grid.
- **[P3] Mid-page monotony.** Conditions → Rehabilitation → Service Area were three text-only centered bands.

## Persona Red Flags
- **Jordan (first-timer):** nav said "Physical Rehabilitation" while the page said "Rehabilitation"; "eligible patients" for free transport never defined on-page.
- **Casey (distracted mobile):** no persistent Book in the header at 390px; hero CTAs inline rather than full-width; no thumb-zone action; FAQ/booking far below the fold.
- **Sam (a11y):** hover-only dropdowns; nested interactive `<a>` inside `<summary>` in the mobile menu; toggle lacked ESC close/focus return.

## Minor Observations
- Footer tagline was still rehabilitation-first legacy copy, contradicting the primary-care-first repositioning.
- Footer "Services" column dumped 11 legacy links instead of 5.
- Hero/service images declared wrong intrinsic aspect ratios.
- The "Rehabilitation services" strip in Services was a fake affordance (arrow, not a link).
- Hardcoded `year = 2026`.

## Deterministic Scan
`impeccable detect --json` on the five homepage files: **exit 0, 0 findings** (before and after fixes). No false positives to report.

## Fixes Applied (post-critique)
1. Header rebuilt: full-bleed `container-wide` shell, 6 short nav labels (Primary Care, Weight Loss, IV Therapy, Rehabilitation, About, Contact), focus-within dropdown support, accessible mobile disclosure menu with ESC + focus return. **Header overflow 71px → 0 at 1280 and 1440.**
2. Added mobile sticky Call/Book action bar (<xl) with `env(safe-area-inset-bottom)` support and body bottom padding.
3. Footer: primary-care-first tagline, 5-item Services column, explicit Company column, 44px social tap targets.
4. Homepage composition de-monotonized: Conditions, Rehabilitation, Service Area and FAQ converted from centered bands to alternating split layouts; real imagery added; hero + final CTAs stack full-width on mobile.
5. Design tokens: radius scale (6/10/16/20), `danger`, `footer-*` colours added; corrected image intrinsic dimensions.
6. Membership clarity note ("No membership required - you can also pay per visit").
7. Fake affordance fixed: rehabilitation strip is now a real link.

## Verified
Build 273 pages; detector exit 0; all 32 nav/footer/legal URLs return 200; mobile menu open/toggle/ESC/focus verified in-browser; tap targets ≥44px; header overflow 0 at 1280/1440/1024/390.
