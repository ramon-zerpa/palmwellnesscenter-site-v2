# Palm Wellness Center — Project Handoff

**Updated:** 2026-09-21  
**Last published commit:** `b42a682 Refresh care imagery and homepage metadata`  
**Branch:** `main` · a push to `origin main` deploys automatically through Vercel.

Read this after `AGENTS.md` at the beginning of a new session. It is the concise, current
handoff; `AGENTS.md` remains the binding technical and operational reference.

---

## 1. Where the project stands

The current preview is a bilingual Astro 5 rebuild of Palm Wellness Center. EN routes are at the
root and ES routes use `/es/` with translated slugs. Production preview is
`https://palmwellnesscenter-site-v2.vercel.app/`; the final domain still serves the old site.

The client has approved the present visual direction of:

- Homepage: `src/components/HomePage.astro`.
- Primary Care: `src/components/pages/PrimaryCarePage.astro`.
- Global `TopBar`, `Header`, `LanguageSwitcher`, sticky mobile CTA and `Footer`.

Use Homepage and Primary Care as the visual and interaction reference for future bespoke pages.
Keep each page's content, photo and information hierarchy specific to its service; do not turn
them into one generic page template.

The next planned migration is **Group 2**: Physical Rehabilitation and IV Therapy, EN + ES. See
`docs/redesign-plan.md`.

## 2. Approved global UI decisions

- One `.shell` only: 1200px max width; never nest competing content-width containers.
- Desktop top bar: address left, hours centered, licenses right. Mobile: address only.
- Main nav: Primary Care (with Medical Weight Loss and IV Therapy beneath it), Physical
  Rehabilitation, About Us, Blog and Contact. Do not restore Weight Loss as a top-level item.
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

## 4. Images approved in the latest session

All are optimized WebP assets under `public/images/` and are already wired into EN and ES.

| Asset | Used by | Notes |
|---|---|---|
| `primary-care-hero-female-provider.webp` | Primary Care hero | Female provider; focal point top-right. |
| `professional-compassionate-primary-care.webp` | Primary Care trust section | Consultation scene; focal point top. |
| `integrated-care-coordinated-team.webp` | Homepage “Integrated care means…” | Primary-care provider, rehabilitation clinician and patient; safe in 16:9 crop. |
| `patient-transportation-assistance.webp` | Homepage + Primary Care transportation blocks | Replaced former taxi/car image in an earlier approved session. |

The remaining SVGs in `public/images/placeholders/` are for interior pages not redesigned yet.
Do not replace approved images unless the user requests it.

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

- `npm run build` passed after the latest changes with **273 pages**.
- Responsive harness audit passed for Homepage and Primary Care in EN/ES at 360px and 1440px:
  zero horizontal overflow, one H1, no clipped text and no images missing dimensions.
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

# Replace the URLs with @("/","/es/inicio/") when working on Homepage.
.\tools\qa\cdp-pc.ps1 -Urls @("/","/es/inicio/") `
  -Widths @(360,412,768,1024,1440) -Mode audit
```

For the broad checklist, required breakpoints and Windows/PowerShell gotchas, follow `AGENTS.md`
§§2 and 7. No `lint`, `typecheck` or test scripts exist; do not invent them.

## 8. Important unresolved work

1. Redesign Groups 2–12 per `docs/redesign-plan.md`; start with Physical Rehabilitation + IV
   Therapy.
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

## 9. Non-negotiable source of truth

- URLs: preserve all existing paths; no new redirect/consolidation without approval.
- Business data: NAP, licenses and professionals are immutable.
- Prices and active services: `docs/optimantra-services.md` is the authoritative source.
  Membership = $99 initial + $39/month; IV Therapy is active.
- Bilingual routes and language switcher: update `src/i18n/altmap.ts` when a new page pair is
  added.
- Icons: Lucide only through `src/lib/lucide.ts` and `src/components/Icon.astro`; never hand-code
  SVG.
- Commit/push: only when explicitly requested. “Commit local” means no push; “commit and push”
  means push `main` and let Vercel deploy. Never use a manual `vercel deploy`.
