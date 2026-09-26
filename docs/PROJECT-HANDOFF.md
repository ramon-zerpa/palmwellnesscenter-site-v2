# Palm Wellness Center — Project Handoff

**Updated:** 2026-09-24  
**Last published commit:** the legal pages (Group 11, EN/ES) and the `/business-profiles/` retirement published on top of `3703a3c` (Group 9)  
**Branch:** `main` · a push to `origin main` deploys automatically through Vercel (preview).  
**Final target (key):** **Cloudflare Pages**, from the old repo `TrueWebmaster6/palmwellnesscenter-site`. The Vercel preview (`ramon-zerpa/palmwellnesscenter-site-v2`) is temporary — see `AGENTS.md` § 9.

Read this after `AGENTS.md` at the beginning of a new session. It is the concise, current
handoff; `AGENTS.md` remains the binding technical and operational reference. For a paste-in
brief to start a brand-new chat, use `docs/SESSION-HANDOFF.md`.

---

## 1. Where the project stands

The current preview is a bilingual Astro 5 rebuild of Palm Wellness Center. EN routes are at the
root and ES routes use `/es/` with translated slugs. The preview is
`https://palmwellnesscenter-site-v2.vercel.app/`; the final domain still serves the old site.

**Final destination:** when approved, the site is deployed on **Cloudflare Pages** from the old repo
`TrueWebmaster6/palmwellnesscenter-site`. There, `public/_redirects`, `public/_headers` and the
`functions/api/contact.ts` contact form work natively; on the Vercel preview they are inert (the form
404s). Sveltia authors into that final repo. See `AGENTS.md` § 9.

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

**Group 2 is closed** (`/physical-rehabilitation/` + `/es/fisioterapia/`,
`PhysicalRehabilitationPage.astro`), and **the car accident family is redesigned in EN + ES**:

| EN | ES | Component |
|---|---|---|
| `/car-accident-rehabilitation/` | `/es/rehabilitacion-de-accidentes-automovilisticos/` | `CarAccidentRehabilitationPage.astro` |
| `/car-accident-treatment/` | `/es/tratamiento-de-accidentes-de-auto/` | `CarAccidentTreatmentPage.astro` |
| `/auto-accident-injury-clinic/` | `/es/clinica-de-lesiones-por-accidentes-de-auto/` | `AutoAccidentInjuryClinicPage.astro` |
| `/car-accident-chiropractor/` | `/es/quiropractico-para-accidente-de-auto/` | `CarAccidentChiropractorPage.astro` |
| `/car-accident-physical-therapy/` | `/es/fisioterapia-para-accidente-de-auto/` | `CarAccidentPhysicalTherapyPage.astro` |
| `/whiplash-treatment-tampa/` | `/es/tratamiento-latigazo-cervical-tampa/` | `WhiplashTreatmentPage.astro` |

**Group 3 is closed** (`/chiropractor/` + `/es/quiropractico/`, `/massage-therapy/` +
`/es/terapia-de-masajes/`):

| EN | ES | Component |
|---|---|---|
| `/chiropractor/` | `/es/quiropractico/` | `ChiropractorPage.astro` |
| `/massage-therapy/` | `/es/terapia-de-masajes/` | `MassageTherapyPage.astro` |

Both paths existed in `richpages.json`, so they were added to the `migrated` `Set`. The massage
page's legacy hero was a YouTube thumbnail with baked-in text ("MASSAGE THERAPY / HEALTH BENEFITS")
and a brand watermark; it was replaced with the clean `massage-therapy-session.webp`. The
chiropractor hero uses `integrated-wellness-services-chiropractor.webp` (a full clinical scene)
rather than the white-background provider cutout, which read as a floating white box in the frame.

**Group 4 is closed** (`/therapeutic-exercises/` + `/es/ejercicios-terapeuticos/`,
`/therapeutic-ultrasound-treatment/` + `/es/tratamiento-de-ultrasonido-terapeutico/`):

| EN | ES | Component |
|---|---|---|
| `/therapeutic-exercises/` | `/es/ejercicios-terapeuticos/` | `TherapeuticExercisesPage.astro` |
| `/therapeutic-ultrasound-treatment/` | `/es/tratamiento-de-ultrasonido-terapeutico/` | `TherapeuticUltrasoundPage.astro` |

Both were in `richpages.json` → `migrated` `Set`. This closes the catch-all's content-substitution
layer: `src/data/therapeuticExercises.ts` was deleted (nothing imported it anymore). With Groups
3 and 4 closed, **the entire rehabilitation cluster is redesigned**. The ultrasound page reuses
`ultrasound-therapy-on-patient-shoulder.webp` (hero), `how-ultrasound-therapy-works-to-improve-healing-and-recovery-img.webp`
and `ultrasound-therapy-for-patinet-leg.webp`; the exercises page uses
`therapeutic-exercises-session.webp` as hero. `muscle-strains-treated-physical-therapy.webp` carries
a brand watermark and was not used.

With Groups 6 and 7 closed, the **whole car accident family is redesigned**. On the treatment,
clinic and whiplash pages the "Treatment options" / "Our services" cards **link** to the matching
service pages (`/chiropractor/`, `/physical-rehabilitation/`, `/massage-therapy/`,
`/therapeutic-exercises/`, `/therapeutic-ultrasound-treatment/`, `/car-accident-chiropractor/`);
they are not plain text. Keep that behavior on future pages.

Use Homepage and Primary Care as the visual and interaction reference for future bespoke pages.
Keep each page's content, photo and information hierarchy specific to its service; do not turn
them into one generic page template.

The Primary Care children that used to be nested under `/primary-care/` were **flattened to top
level** (they are new URLs, so no redirects were needed) and `SimplePage.astro` +
`src/data/newPages.ts` were deleted once no route imported them.

**Group 8 is closed.** It has two parts, both EN + ES:

| EN | ES | Component |
|---|---|---|
| `/slip-and-fall-injury-treatment/` | `/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/` | `SlipAndFallInjuryPage.astro` |
| `/car-accident-rehabilitation/seminole-heights/` | `/es/rehabilitacion-de-accidentes-automovilisticos/seminole-heights/` | `CityCarAccidentRehabPage.astro` (`city="seminole-heights"`) |
| `/car-accident-rehabilitation/forest-hills/` | `/es/rehabilitacion-de-accidentes-automovilisticos/forest-hills/` | `CityCarAccidentRehabPage.astro` (`city="forest-hills"`) |
| `/car-accident-rehabilitation/carrollwood/` | `/es/rehabilitacion-de-accidentes-automovilisticos/carrollwood/` | `CityCarAccidentRehabPage.astro` (`city="carrollwood"`) |

All eight paths (slip-and-fall pair + six city routes) exist in `richpages.json` and were added to
the `migrated` `Set`. The three city pages share one component and differ in city name, drive time,
local points, directions, FAQ and things-to-do. The slip-and-fall service cards **link** to the
real service pages. The legacy "slip and fall injuries — types" asset
(`slip-and-fall-injuries-different-types.webp`) carries baked-in text and a brand watermark and is
not used; the slip-and-fall hero is `common-injuries-after-falling-in-the-shower.webp`.

**Group 9 is closed** (EN + ES):

| EN | ES | Component |
|---|---|---|
| `/about-us/` | `/es/acerca-de-nosotros/` | `AboutPage.astro` (added to `migrated`) |
| `/contact/` | `/es/contacto/` | `ContactPage.astro` (rewritten in place) |

The About page preserves the legacy content, corrected to OptiMantra truth (IV Therapy is live, not
"coming soon"), with the leadership team as initials cards, the licenses and the commitment section.
The Contact route already existed (`contact.astro`), so `ContactPage.astro` was rewritten in the new
visual language while keeping `ContactForm.astro` and the Google map embed.

**Group 11 (legal) is closed too** (EN + ES): `/hipaa-policy/` + `/privacy-policy` (and their ES
mirrors `/es/politica-de-hipaa/`, `/es/politica-de-privacidad/`) use a shared `LegalPage.astro`
(`kind` prop) — a document-style layout (header, notice, prose, contact card), no commercial hero,
with the legacy address corrected to the canonical NAP.

The next planned migration is **Group 10**: the blog (`/news-blog/` + post template) — the only group
left. `/business-profiles/` was **retired** (client decision): it is no longer generated and 301s to
the external Brand Hub; the "Business Profiles" link on `/contact/` now points to that same Brand
Hub. See `docs/redesign-plan.md`.

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

Rehabilitation and car accident imagery added with Group 2 and the car accident family:

| Asset | Used by | Notes |
|---|---|---|
| `top-physical-rehabilitation-clinic-in-tampa-bay-min.jpg` | Physical Rehabilitation hero | Landscape; verify focal point per the hero standard. |
| `what-is-a-slip-and-fall-accident.webp` | Physical Rehabilitation section | Fall-injury illustration. |
| `comprehensive-physical-therapy-for-car-accident-victims-in-tampa.webp` | Car Accident Rehabilitation hero; Car Accident Physical Therapy hero | Man with neck pain by a car. |
| `auto-accident-rehabilitation-in-tampa-fl.webp` | Physical Rehabilitation; Auto Accident Injury Clinic | Rehabilitation session. |
| `car-accident-treatment-background.webp` | Car Accident Treatment hero | Landscape; content left / photo right. |
| `delayed-injury-symptoms-after-a-car-accident.webp` | Car Accident Treatment section | Delayed-symptom context. |
| `how-to-find-doctor-after-a-car-accident-main-banner.webp` | Auto Accident Injury Clinic hero | Landscape banner. |
| `how-to-find-doctor-after-a-car-accident-inner-image.webp` | Car Accident Chiropractor section | Supporting scene. |
| `auto-accident-injury-background.webp` | Car Accident Chiropractor hero; Whiplash symptoms | Landscape; content left / photo right. |
| `chiropractor-tampa-conditions-we-treat.webp` | Car Accident Chiropractor section | Conditions context. |
| `regular-therapy-sessions.webp` | Car Accident Rehabilitation trust | Therapy session; `object-top`. |
| `medical-office-chiropractor-rehabilitating-patient-back.webp` | Car Accident Chiropractor trust | Adjustment scene; `object-top`. |
| `conditions-we-treat-at-our-tampa-rehabilitation-clinic.webp` | Car Accident Physical Therapy trust | Therapy session; `object-top`. |
| `therapist-examining-patient.jpg` | Whiplash treatment trust | Stretch scene; `object-top`. |
| `integrated-wellness-services-chiropractor.webp` | Car Accident Treatment trust | Doctor with patient; `object-top`. |
| `trust-palm-wellness-center-for-auto-accident-injuries.webp` | Auto Accident Injury Clinic trust | Driving scene; `object-top`. |
| `chiropractor-helping-his-patient.webp` | Car Accident Physical Therapy 14-day rule section | Consultation scene. |

**The trust block image ("Professional and compassionate care you can trust") always uses
`object-top`**, never `object-center`: the box is only 240/300px tall and a centered crop cuts the
subjects' heads. This is the only image in the site with that rule.

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

- `npm run build` passes with **272 pages** (273 before `/business-profiles/` was retired).
- Every page of the Primary Care family, Physical Rehabilitation and the car accident family was
  audited in EN/ES at 360·412·768·1024·1440: zero horizontal overflow, one H1, no clipped text, no
  images missing dimensions, anchor clicks never write a hash into the URL.
- The appointment booking link was verified in production after `ec9d1bc`: **273/273 pages** carry
  the canonical URL, and there is **zero** occurrence of the old corrupt `lid` or the legacy V1
  endpoint in `src` or `dist`.
- The car accident family was verified live after `b68ac95`: the redesigned pages and their linked
  service cards were confirmed over HTTP on the preview.
- Groups 6 and 7 (`CarAccidentPhysicalTherapyPage`, `WhiplashTreatmentPage` + ES) were audited in
  EN/ES at 360·412·768·1024·1440: clean, and the trust block images were confirmed to show heads
  with `object-top`.
- Group 3 (`ChiropractorPage`, `MassageTherapyPage` + ES) was audited in EN/ES at
  360·412·768·1024·1440: zero horizontal overflow, one H1, no clipped text, no images missing
  dimensions; anchor clicks resolve to the right target without writing a hash into the URL. Build
  stays at **273 pages** (the four migrated paths moved from the catch-all to explicit routes).
- Group 4 (`TherapeuticExercisesPage`, `TherapeuticUltrasoundPage` + ES) was audited in EN/ES at
  360·412·768·1024·1440 with the same results (zero overflow, one H1, no clipped text, no missing
  image dimensions), and anchor clicks were verified. Build stays at **273 pages**, and deleting
  `src/data/therapeuticExercises.ts` did not change the count.
- Group 8 (`SlipAndFallInjuryPage` + `CityCarAccidentRehabPage` × 3 cities, EN/ES) was audited: the
  slip-and-fall pair and all six city routes show zero horizontal overflow, one H1, no clipped text
  and no images missing dimensions; anchor clicks resolve to the right target without writing a hash
  into the URL. Build stays at **273 pages**.
- Group 9 (`AboutPage` + rewritten `ContactPage`, EN/ES) was audited at 360·412·768·1024·1440:
  zero horizontal overflow, one H1, no clipped text, no images missing dimensions, and anchor clicks
  resolve without writing a hash. Build stays at **273 pages** (`/about-us/` moved from the
  catch-all to an explicit route; `/contact/` was already explicit).
- Group 11 (`LegalPage` for HIPAA + Privacy, EN/ES) was audited at 360·768·1440: zero horizontal
  overflow, one H1, no clipped text, no images missing dimensions. The four legal paths moved from
  the catch-all to explicit routes, so the build stays at **272 pages**. The legacy HIPAA address
  was corrected to the canonical NAP.
- The user reported PageSpeed Insights results of **97 mobile / 100 desktop** for the preview
  homepage. Treat those as the current performance reference. A local Lighthouse attempt was
  contaminated by the machine's AdBlock360 injection, so do not use it as a baseline or change
  performance work without a new user request.
- Use Google Chrome as the user's preferred browser for visual review.

## 7. Commands and QA

```powershell
# Always use IPv4; localhost fails on this machine.
npm run dev -- --host 127.0.0.1

# Required validation: expected output is 272 pages.
npm run build

# Responsive audit with the dev server running.
.\tools\qa\cdp-pc.ps1 -Urls @("/primary-care/","/es/atencion-primaria/") `
  -Widths @(360,412,768,1024,1440) -Mode audit

# For any redesigned page, point -Urls at its EN/ES pair, e.g.
.\tools\qa\cdp-pc.ps1 -Urls @("/car-accident-treatment/","/es/tratamiento-de-accidentes-de-auto/") `
  -Widths @(360,412,768,1024,1440) -Mode audit

# Anchor behaviour (must not write a hash into the URL) and screenshots.
.\tools\qa\cdp-pc.ps1 -Urls @("/car-accident-treatment/") -Widths @(390,1440) -Mode click
.\tools\qa\cdp-pc.ps1 -Urls @("/car-accident-treatment/") -Widths @(1440) -Mode shots -ScrollY @(0,1600,3200)
```

For the broad checklist, required breakpoints and Windows/PowerShell gotchas, follow `AGENTS.md`
§§2 and 7. No `lint`, `typecheck` or test scripts exist; do not invent them.

## 8. Important unresolved work

1. Redesign Groups 10–12 per `docs/redesign-plan.md`; the only group left is Group 10 (blog).
   Groups 2–11 are closed: rehabilitation, car accident, slip-and-fall, city cluster, About,
   Contact and legal (HIPAA + Privacy) are done. `/business-profiles/` is retired (301 to the
   external Brand Hub), not redesigned.
2. Interior pages still rendered through `RichPage`/`RichSection` retain legacy body design even
   though they inherit the current header/footer and icons.
3. The Contact form **404s on the Vercel preview** because `functions/api/contact.ts` is a
   Cloudflare Pages function. On the final Cloudflare Pages target it works with **no code change**;
   just load its env vars in the Cloudflare dashboard before the DNS cutover.
4. `public/_redirects` and `public/_headers` are ignored by Vercel but active on Cloudflare. The
   `/business-profiles/` 301 lives in both `vercel.json` (preview) and `public/_redirects` (final).
   On Cloudflare there is nothing to port; on Vercel, keep the `redirects` block when removing the
   `noindex` header.
5. The preview is intentionally noindex (`public/robots.txt` + `vercel.json` header). Remove both
   only as part of the final launch checklist in `AGENTS.md` §9.
6. The immutable logo remains low resolution (`public/images/logo.webp`, 120×60). The client must
   supply an SVG or 2× asset; do not redraw it.
7. No dedicated photography exists for IV Therapy, Telemedicine, Chronic Condition Management or
   Preventive Care; they reuse approved photos until the client delivers new assets.
8. Sveltia CMS login is **not wired**: `backend.base_url` is still the placeholder worker URL. The
   GitHub OAuth app + `sveltia-cms-auth` Cloudflare Worker must be deployed and its URL set in
   `public/admin/config.yml`. Step-by-step in `docs/sveltia-auth-setup.md`.

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
  means push `main` and let Vercel deploy. Never use a manual `vercel deploy`. Check the result
  with `vercel ls palmwellnesscenter-site-v2` (the CLI auth self-refreshes); do **not** call the
  Vercel REST API with the `token` in `auth.json` (rotating OAuth → `invalidToken`) or with the
  ephemeral `VERCEL_OIDC_TOKEN` in `.env.local`.
