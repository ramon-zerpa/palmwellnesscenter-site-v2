# Internal Pages Redesign — Plan (Homepage + Primary Care as visual reference)

**Goal:** bring every internal page onto the approved **Homepage + Primary Care visual language**
(same tokens, section rhythm, hero, cards, pills, FAQ, CTA band), designed in **Pencil** first
when a desktop frame is needed as a review reference, and then built **directly in Astro**, in
groups of 2 EN pages per iteration. ES mirrors each group translated (same layout, `/es/...`
slug).

**References:** `src/components/HomePage.astro` and `src/components/pages/PrimaryCarePage.astro`
(approved). See `docs/PROJECT-HANDOFF.md` for the approved global header/footer, hero behavior,
images and content decisions.
**Tokens:** `src/styles/global.css` (`bg-bg-alt`, `bg-white`, `bg-blue-deep`, `bg-blue-pale`,
`text-ink`, `text-body`, `text-muted`, `border-line`, `blue-tint`, `green-bright`, `green-dark`).
**Fonts:** Figtree (headings) + Noto Sans (body). **Radius:** `rounded-lg` cards, `rounded-md` controls/buttons.

## Rules (non-negotiable)

1. **URLs never change.** Each migrated page keeps its exact path (EN + ES).
2. **Content is preserved** from the legacy page, but **corrected to Optantra truth**
   (`docs/optimantra-services.md`): membership **$99 initial + $39/mo**, office $39,
   new patient $65, telehealth $55, IV Therapy is **live** (not "coming soon").
3. Migrating a "rich" page = create a dedicated Astro page and add its path to the `migrated`
   `Set` in `getStaticPaths()` of `src/pages/[...slug].astro`. **Do not delete the entry from
   `richpages.json`**: it stays as a historical record and the catch-all filters it out. This step
   **only applies to paths that exist in `richpages.json`** (today: the Primary Care, Physical
   Rehabilitation and Car Accident families). Pages that were never in the JSON (the Primary Care
   children) need no `migrated` entry: their explicit route is the only one that exists.
4. Bilingual: every group ships EN + ES.
5. One H1; keep title/meta/canonical/hreflang intact; images keep alt + dimensions.
6. Build must stay green and page count stable (no lost routes) after each group.

## Approach (corrected)

**No shared page template.** Each page gets its own **bespoke Astro component** under
`src/components/pages/`, designed to the home's visual language (tokens, rhythm, type,
blue/green palette) but with a **layout unique to that page**. EN + ES render the same
bespoke component via a `lang` prop. Legacy content is preserved (light edits only for
flow), with pricing corrected to Optantra truth.

## Shared building blocks (primitives only)

- `src/components/Icon.astro` — icon set (extended with shield, clipboard, pill, clock, video).
- Tokens in `src/styles/global.css`.

## Groups (EN pages; ES mirrors each)

| # | Group | Pages (EN) | ES |
|---|-------|-----------|-----|
| 1 | Flagship hubs | `/primary-care/`, `/medical-weight-loss/` | `/es/atencion-primaria/`, `/es/perdida-de-peso-medica/` |
| 2 | Rehab hub + IV | `/physical-rehabilitation/` (✅ done), `/iv-therapy/` (✅ done) | `/es/fisioterapia/`, `/es/terapia-iv/` (✅) |
| 3 | Core rehab | `/chiropractor/`, `/massage-therapy/` | `/es/quiropractico/`, `/es/terapia-de-masajes/` |
| 4 | Therapy | `/therapeutic-exercises/`, `/therapeutic-ultrasound-treatment/` | `/es/ejercicios-terapeuticos/`, `/es/tratamiento-de-ultrasonido-terapeutico/` |
| 5 | Auto accident I | `/car-accident-rehabilitation/` (✅), `/auto-accident-injury-clinic/` (✅) | `/es/rehabilitacion-de-accidentes-automovilisticos/`, `/es/clinica-de-lesiones-por-accidentes-de-auto/` (✅) |
| 6 | Auto accident II | `/car-accident-treatment/` (✅), `/car-accident-physical-therapy/` (✅) | `/es/tratamiento-de-accidentes-de-auto/` (✅), `/es/fisioterapia-para-accidente-de-auto/` (✅) |
| 7 | Auto accident III | `/car-accident-chiropractor/` (✅), `/whiplash-treatment-tampa/` (✅) | `/es/quiropractico-para-accidente-de-auto/` (✅), `/es/tratamiento-latigazo-cervical-tampa/` (✅) |
| 8 | Slip & fall + cities | `/slip-and-fall-injury-treatment/` + city cluster (`/car-accident-rehabilitation/{seminole-heights,forest-hills,carrollwood}/`) as one template | ES cluster |
| 9 | About + Contact | `/about-us/`, `/contact/` | `/es/acerca-de-nosotros/`, `/es/contacto/` |
| 10 | Blog + misc | `/news-blog/` (+ post template), `/business-profiles/` | `/es/blog-de-noticias/` |
| 11 | Legal | `/hipaa-policy/`, `/privacy-policy/` | `/es/politica-de-hipaa/`, `/es/politica-de-privacidad/` |
| 12 | New pages upgrade | ✅ done — `/chronic-condition-management/`, `/preventive-care/`, `/telemedicine/`, `/membership/` (flattened to top level, not nested) | ES mirrors ✅ |

## Per-group workflow

1. Read the legacy content (`richpages.json` blocks) for the pages, plus `docs/optimantra-services.md`.
2. Build the bespoke component under `src/components/pages/<Page>.astro`, holding the bilingual
   copy inline in its `content` object (EN + ES).
3. Create/wrap the dedicated Astro routes (EN + ES).
4. Add the pages' paths to the `migrated` `Set` in `[...slug].astro` when they exist in `richpages.json`.
5. `npm run build` → verify routes still 200, no orphan/broken links, hreflang intact.
6. Screenshot/QA pass (desktop + mobile) in one batched round.
7. Report + move to next group.

## Status

- [x] Homepage — approved visual reference, EN + ES
- [x] Group 1 — `/primary-care/` + `/medical-weight-loss/` (bespoke EN/ES components)
- [x] Primary Care family closed — `/iv-therapy/`, `/chronic-condition-management/`,
      `/preventive-care/`, `/telemedicine/`, `/membership/` (+ ES), built one page at a time in
      the approved language, each with its own component under `src/components/pages/`.
      The 4 nested children were flattened to top level (new URLs, so no redirects were needed).
- [x] Group 2 — `/physical-rehabilitation/` + `/es/fisioterapia/` (`PhysicalRehabilitationPage.astro`,
      commit `1fed483`); `/iv-therapy/` was already redesigned.
- [x] Group 5 — `/car-accident-rehabilitation/` + `/auto-accident-injury-clinic/` (+ ES)
      (`CarAccidentRehabilitationPage.astro` `7e53823`, `AutoAccidentInjuryClinicPage.astro` `b68ac95`).
- [x] Group 6 — `/car-accident-treatment/` + `/car-accident-physical-therapy/` (+ ES)
      (`CarAccidentTreatmentPage.astro` `b68ac95`, `CarAccidentPhysicalTherapyPage.astro`).
- [x] Group 7 — `/car-accident-chiropractor/` + `/whiplash-treatment-tampa/` (+ ES)
      (`CarAccidentChiropractorPage.astro` `b68ac95`, `WhiplashTreatmentPage.astro`). With this, the
      whole car accident family is closed.
- [ ] Groups 3, 4 and 8–12 — still on the legacy body.

**Per-page workflow actually used** (repeat for the next groups):

1. Research two direct Tampa competitors for that service (structure and intent, never copy).
2. Read the legacy content for the page (`richpages.json`) + `docs/optimantra-services.md` for prices.
3. Build the bespoke EN component in the approved language (hero + `AnchorNav` + 11–15 sections,
   alternating light and `blue-deep` bands, FAQ, transport, final CTA).
4. Wrap EN/ES routes as ~23-line files (`Layout` → `TopBar` → `Header` → `main` → `Footer`), and add
   the paths to the `migrated` `Set` in `[...slug].astro` when the path exists in `richpages.json`.
5. `npm run build` → **273 pages**; audit EN/ES at 360·412·768·1024·1440 with `tools/qa/cdp-pc.ps1`
   (overflow, H1, image dimensions, clipped text, anchor clicks); review screenshots.
6. Commit + push (Vercel deploys), then verify the live pages over HTTP.
