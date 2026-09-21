# Palm Wellness Center — Project Handoff

**Updated:** 2026-09-21  
**Last published commit:** `ec9d1bc Fix the appointment booking link everywhere`  
**Branch:** `main` · a push to `origin main` deploys automatically through Vercel.

Read this after `AGENTS.md` at the beginning of a new session. It is the concise, current
handoff; `AGENTS.md` remains the binding technical and operational reference. For a paste-in
brief to start a brand-new chat, use `docs/SESSION-HANDOFF.md`.

---

## 1. Where the project stands

The current preview is a bilingual Astro 5 rebuild of Palm Wellness Center. EN routes are at the
root and ES routes use `/es/` with translated slugs. Production preview is
`https://palmwellnesscenter-site-v2.vercel.app/`; the final domain still serves the old site.

**The Primary Care family is closed in EN + ES.** Every page is bespoke, built in the approved
visual language, with its own content and photography:

| EN | ES | Component |
|---|---|---|
| `/` | `/es/inicio/` | `HomePage.astro` (approved reference) |
| `/primary-care/` | `/es/atencion-primaria/` | `PrimaryCarePage.astro` (approved reference) |
| `/medical-weight-loss/` | `/es/perdida-de-peso-medica/` | `MedicalWeightLossPage.astro` |
| `/iv-therapy/` | `/es/terapia-iv/` | `IvTherapyPage.astro` |
| `/chronic-condition-management/` | `/es/manejo-enfermedades-cronicas/` | `ChronicConditionManagementPage.astro` |
| `/preventive-care/` | `/es/atencion-preventiva/` | `PreventiveCarePage.astro` |
| `/telemedicine/` | `/es/telemedicina/` | `TelemedicinePage.astro` |
| `/membership/` | `/es/membresia/` | `MembershipPage.astro` |

Use Homepage and Primary Care as the visual and interaction reference for future bespoke pages.
Keep each page's content, photo and information hierarchy specific to its service; do not turn
them into one generic page template.

The Primary Care children that used to be nested under `/primary-care/` were **flattened to top
level** (they are new URLs, so no redirects were needed) and `SimplePage.astro` +
`src/data/newPages.ts` were deleted once no route imported them.

The next planned migration is **Group 2**: `/physical-rehabilitation/` (+ `/es/fisioterapia/`),
which still renders the legacy body. IV Therapy, the other half of that group, is already
redesigned. See `docs/redesign-plan.md`.

## 2. Approved global UI decisions

- One `.shell` only: 1200px max width; never nest competing content-width containers.
- Desktop top bar: address left, hours centered, licenses right. Mobile: address only.
- Main nav: Primary Care with six children (Medical Weight Loss, IV Therapy, Chronic Condition
  Care, Preventive Care, Telemedicine, Membership), Physical Rehabilitation, About Us, Blog and
  Contact. Do not restore Weight Loss as a top-level item.
- Language switcher: compact EN/ES pill beside Book Appointment on desktop; at the bottom of the
  mobile menu, left of the Book CTA. Active side: `blue-deep` / white; alternate: `blue-pale` /
  `blue-deep`; no heavy outline.
- Mobile menu CTA row: 1.5rem top padding, 1rem bottom padding; no trailing white space.
- Sticky mobile CTA: dark-blue background, white Call button and pale-turquoise Book button;
  1.5rem top and 1rem bottom padding. The footer bottom bar reserves bottom clearance so the CTA
  cannot cover credits.
- Hover language: actionable cards and standalone buttons rise 2px with the single subtle shadow
  `0 10px 24px -14px rgba(0,0,0,0.22)`. Do not double-apply hover elevation to a card and its
  nested button.
- Alternate roughly three light sections with a dark `blue-deep` band. On dark sections use
  white headings, `blue-tint` body copy and `green-bright` checks.

## 3. Hero standard

All redesigned service heroes have content on the left and a photo on the right. Reuse the
existing primitives in `src/styles/global.css`:

- framed photo shadow;
- full-image entrance that translates right-to-left (not a reveal/wipe);
- subtle resting drift;
- heartbeat icon and dynamic vital line;
- reduced-motion mode with a static, fully visible final state.

Every image must be checked in its actual `object-fit: cover` container at desktop and mobile.
Set the focal point per asset instead of assuming `center`:

- Primary Care hero uses `object-top-right`.
- Primary Care “Professional and compassionate care…” uses `object-top`.
- Homepage integrated-care image is 16:9 with a central safe composition and `object-center`.
- The Membership, Telemedicine and Preventive heroes use landscape photos with `object-center`;
  they crop safely in the 560×440 frame. Verify each new hero visually at 1440 and 360 before
  shipping, and never use a graphic with baked-in text (see §4).

## 4. Images approved in the latest session

All are optimized WebP assets under `public/images/` and are already wired into EN and ES.

| Asset | Used by | Notes |
|---|---|---|
| `primary-care-hero-female-provider.webp` | Primary Care hero; Telemedicine trust | Female provider; focal point top-right. |
| `professional-compassionate-primary-care.webp` | Primary Care / MWL / IV / Chronic / Preventive / Membership trust; Telemedicine hero | Consultation scene; focal point top. |
| `integrated-care-coordinated-team.webp` | Homepage “Integrated care means…” | Primary-care provider, rehabilitation clinician and patient; safe in 16:9 crop. |
| `comprehensive-primary-care-that-works-with-your-body.webp` | Homepage, IV Therapy and Chronic heroes | Physician reviewing a patient's record. |
| `mature-woman-exercising-for-healthy-lifestyle.webp` | Chronic “why follow-up”; Preventive hero | Active lifestyle. |
| `primary-care-membership.webp` | Preventive “who it's for”; Membership hero | Diverse group with a clinician. |
| `patient-transportation-assistance.webp` | Transportation block on every page | Replaced former taxi/car image in an earlier approved session. |

**Avoid assets that are graphics with baked-in text** (for example
`osteoporosis-prevention-management-man-knee-pain.webp` carries a printed headline and a brand
band): cropping them to a hero or section box cuts the text and looks like a layout bug. Open the
file and look at it before approving it.

There is **no dedicated photography** for IV Therapy, Telemedicine, Chronic Condition Management
or Preventive Care yet; those pages reuse approved photos. The SVGs in
`public/images/placeholders/` mark that gap. Do not replace approved images unless the user asks.

## 5. Homepage SEO metadata — approved current copy

Homepage metadata must cover both service lines, not Primary Care alone. `Layout.astro` carries
the same title/description to Open Graph and Twitter cards.

| Locale | Title | Description |
|---|---|---|
| EN `/` | `Primary Care & Physical Rehabilitation in Tampa | Palm Wellness Center` | `Primary care and physical rehabilitation in Tampa, FL. Chronic care, prevention, medical weight loss, IV therapy, and injury recovery. Bilingual care.` |
| ES `/es/inicio/` | `Atención Primaria y Rehabilitación Física en Tampa | Palm Wellness Center` | `Atención primaria y rehabilitación física en Tampa, FL. Enfermedades crónicas, prevención, pérdida de peso médica, terapia IV y recuperación de lesiones.` |

Primary Care remains focused only on its service line:

| Locale | Title | Description |
|---|---|---|
| EN `/primary-care/` | `Primary Care in Tampa - Palm Wellness Center` | `Integrated primary care in Tampa with chronic condition management, preventive care, and telemedicine. Extended visits, bilingual providers, and a membership from $99, then $39/month.` |
| ES `/es/atencion-primaria/` | `Atención Primaria en Tampa - Palm Wellness Center` | `Atención primaria integrada en Tampa con manejo de enfermedades crónicas, atención preventiva y telemedicina. Consultas extendidas, proveedores bilingües y membresía desde $99, luego $39/mes.` |

The full business name is immutable in title tags: **Palm Wellness Center**. Do not shorten it to
“Palm Wellness.”

## 6. Recent verification and performance context

- `npm run build` passes with **273 pages**.
- Every page of the Primary Care family was audited in EN/ES at 360·412·768·1024·1440: zero
  horizontal overflow, one H1, no clipped text, no images missing dimensions, anchor clicks never
  write a hash into the URL.
- The appointment booking link was verified in production after `ec9d1bc`: **273/273 pages** carry
  the canonical URL, and there is **zero** occurrence of the old corrupt `lid` or the legacy V1
  endpoint in `src` or `dist`.
- The user reported PageSpeed Insights results of **97 mobile / 100 desktop** for the preview
  homepage. Treat those as the current performance reference. A local Lighthouse attempt was
  contaminated by the machine's AdBlock360 injection, so do not use it as a baseline or change
  performance work without a new user request.
- Use Google Chrome as the user's preferred browser for visual review.

## 7. Commands and QA

```powershell
# Always use IPv4; localhost fails on this machine.
npm run dev -- --host 127.0.0.1

# Required validation: expected output is 273 pages.
npm run build

# Responsive audit with the dev server running.
.\tools\qa\cdp-pc.ps1 -Urls @("/primary-care/","/es/atencion-primaria/") `
  -Widths @(360,412,768,1024,1440) -Mode audit

# For any page of the Primary Care family, point -Urls at its EN/ES pair, e.g.
.\tools\qa\cdp-pc.ps1 -Urls @("/membership/","/es/membresia/") `
  -Widths @(360,412,768,1024,1440) -Mode audit

# Anchor behaviour (must not write a hash into the URL) and screenshots.
.\tools\qa\cdp-pc.ps1 -Urls @("/membership/") -Widths @(390,1440) -Mode click
.\tools\qa\cdp-pc.ps1 -Urls @("/membership/") -Widths @(1440) -Mode shots -ScrollY @(0,1600,3200)
```

For the broad checklist, required breakpoints and Windows/PowerShell gotchas, follow `AGENTS.md`
§§2 and 7. No `lint`, `typecheck` or test scripts exist; do not invent them.

## 8. Important unresolved work

1. Redesign Groups 2–12 per `docs/redesign-plan.md`; the immediate page is
   `/physical-rehabilitation/` (+ `/es/fisioterapia/`), which still uses the legacy body.
2. Interior pages still rendered through `RichPage`/`RichSection` retain legacy body design even
   though they inherit the current header/footer and icons.
3. The Contact form is **404 in Vercel production** because `functions/api/contact.ts` is a
   Cloudflare Pages function. Move it to Vercel's `/api` convention or migrate hosting before the
   final DNS cutover.
4. `public/_redirects` and `public/_headers` are Cloudflare artifacts ignored by Vercel. Port
   required redirects/security headers to `vercel.json` before launch.
5. The preview is intentionally noindex (`public/robots.txt` + `vercel.json` header). Remove both
   only as part of the final launch checklist in `AGENTS.md` §9.
6. The immutable logo remains low resolution (`public/images/logo.webp`, 120×60). The client must
   supply an SVG or 2× asset; do not redraw it.
7. No dedicated photography exists for IV Therapy, Telemedicine, Chronic Condition Management or
   Preventive Care; they reuse approved photos until the client delivers new assets.

## 9. Non-negotiable source of truth

- URLs: preserve all existing paths; no new redirect/consolidation without approval.
- Business data: NAP, licenses and professionals are immutable.
- Prices and active services: `docs/optimantra-services.md` is the authoritative source (captured
  from the client's OptiMantra patient portal, `servicesallV2`, 2026-09-19). Membership = $99
  initial + $39/month; IV Therapy is active.
- Appointment link: `APPOINTMENT_URL` in `src/i18n/utils.ts` is the **only** source. Import it;
  never hardcode the URL in components or data. Data files that cannot import it
  (`richpages.json`, blog markdown) must be updated and then re-checked with `Select-String` so no
  stale value survives in `src` or `dist`.
- Bilingual routes and language switcher: update `src/i18n/altmap.ts` when a new page pair is
  added.
- Icons: Lucide only through `src/lib/lucide.ts` and `src/components/Icon.astro`; never hand-code
  SVG.
- Commit/push: only when explicitly requested. “Commit local” means no push; “commit and push”
  means push `main` and let Vercel deploy. Never use a manual `vercel deploy`.
