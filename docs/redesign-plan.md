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
3. Every URL has an explicit route (or a 301). The legacy `richpages.json` renderer
   (`RichPage`/`RichSection`/`BlockList`) was removed once all 41 entries were migrated or retired,
   so there is no `Set` to maintain: a new page is just its bespoke component plus its EN/ES route.
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
| 3 | Core rehab | `/chiropractor/` (✅), `/massage-therapy/` (✅) | `/es/quiropractico/`, `/es/terapia-de-masajes/` (✅) |
| 4 | Therapy | `/therapeutic-exercises/` (✅), `/therapeutic-ultrasound-treatment/` (✅) | `/es/ejercicios-terapeuticos/`, `/es/tratamiento-de-ultrasonido-terapeutico/` (✅) |
| 5 | Auto accident I | `/car-accident-rehabilitation/` (✅), `/auto-accident-injury-clinic/` (✅) | `/es/rehabilitacion-de-accidentes-automovilisticos/`, `/es/clinica-de-lesiones-por-accidentes-de-auto/` (✅) |
| 6 | Auto accident II | `/car-accident-treatment/` (✅), `/car-accident-physical-therapy/` (✅) | `/es/tratamiento-de-accidentes-de-auto/` (✅), `/es/fisioterapia-para-accidente-de-auto/` (✅) |
| 7 | Auto accident III | `/car-accident-chiropractor/` (✅), `/whiplash-treatment-tampa/` (✅) | `/es/quiropractico-para-accidente-de-auto/` (✅), `/es/tratamiento-latigazo-cervical-tampa/` (✅) |
| 8 | Slip & fall + cities | `/slip-and-fall-injury-treatment/` (✅) + city cluster (`/car-accident-rehabilitation/{seminole-heights,forest-hills,carrollwood}/`) as one template (✅) | ES cluster (✅) |
| 9 | About + Contact | `/about-us/` (✅), `/contact/` (✅) | `/es/acerca-de-nosotros/` (✅), `/es/contacto/` (✅) |
| 10 | Blog | `/news-blog/` (+ post template) (✅) | `/es/blog-de-noticias/` (✅) |
| 11 | Legal | `/hipaa-policy/` (✅), `/privacy-policy/` (✅) | `/es/politica-de-hipaa/`, `/es/politica-de-privacidad/` (✅) |
| 12 | New pages upgrade | ✅ done — `/chronic-condition-management/`, `/preventive-care/`, `/telemedicine/`, `/membership/` (flattened to top level, not nested) | ES mirrors ✅ |

## Per-group workflow

1. Read the legacy content for the pages (from `seo/` or the live site) plus `docs/optimantra-services.md`.
2. Build the bespoke component under `src/components/pages/<Page>.astro`, holding the bilingual
   copy inline in its `content` object (EN + ES).
3. Create/wrap the dedicated Astro routes (EN + ES).
4. `npm run build` → verify routes still 200, no orphan/broken links, hreflang intact.
5. Screenshot/QA pass (desktop + mobile) in one batched round.
6. Report + move to next group.

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
- [x] Group 3 — `/chiropractor/` + `/massage-therapy/` (+ ES) (`ChiropractorPage.astro`,
      `MassageTherapyPage.astro`). Both were in `richpages.json`, so their paths were added to the
      `migrated` `Set`. Massage's legacy hero was a YouTube thumbnail with baked-in text and a
      brand watermark: the hero is now `massage-therapy-session.webp`.
- [x] Group 4 — `/therapeutic-exercises/` + `/therapeutic-ultrasound-treatment/` (+ ES)
      (`TherapeuticExercisesPage.astro`, `TherapeuticUltrasoundPage.astro`). Both were in
      `richpages.json` → `migrated` `Set`. This closes the content-substitution layer of the
      catch-all: `src/data/therapeuticExercises.ts` was deleted. With this, **all of rehabilitation
      is redesigned**.
- [x] Group 8 — `/slip-and-fall-injury-treatment/` (+ ES) with `SlipAndFallInjuryPage.astro`, and the
      city cluster `/car-accident-rehabilitation/{seminole-heights,forest-hills,carrollwood}/` (+ ES)
      as one template (`CityCarAccidentRehabPage.astro`, `city` prop). All eight paths were in
      `richpages.json` → `migrated` `Set`.
- [x] Group 9 — `/about-us/` (+ `/es/acerca-de-nosotros/`) with `AboutPage.astro` (added to the
      `migrated` `Set`), and `/contact/` (+ `/es/contacto/`) rewritten in place in
      `ContactPage.astro` (route already existed; keeps `ContactForm.astro` and the map embed).
- [x] Group 11 — `/hipaa-policy/` + `/privacy-policy/` (+ ES) with a shared `LegalPage.astro`
      (`kind` prop). Document-style layout (header + notice + prose + contact card), no commercial
      hero. The legacy HIPAA address was corrected to the canonical NAP.
- [x] Group 10 — blog closed, EN/ES (`a80aa1b`): listing (`BlogIndex.astro`) with a full-bleed
      hero, card grid and windowed pagination, plus the post template (`BlogPost.astro`) with
      breadcrumb, masthead + share, TOC, body, sticky recent-posts sidebar and CTA. Kept the legacy
      pagination URLs (`/news-blog/N/`, 6 per page) and the root-level post URLs. New:
      `src/lib/structured-data.ts`, `src/lib/rehype-table-labels.mjs`, `src/components/blog/*`.
      Responsive tables (cards below `md`) and TOC links that never write the hash. **This closes
      the redesign: every group is done.**
- **Retired (client decision, 2026-09-24):** `/business-profiles/` is removed from the site and 301s
  to the external Brand Hub (see `vercel.json` + `public/_redirects`). This is the one intentional
  drop in the page count.
- **Legacy renderer deleted:** once all 41 `richpages.json` entries were migrated or retired,
  `src/data/richpages.json`, `RichPage.astro`, `RichSection.astro` and `BlockList.astro` were removed.
  The `[...slug].astro` catch-all now only serves the blog.

**Per-page workflow actually used** (repeat for the next groups):

1. Research two direct Tampa competitors for that service (structure and intent, never copy).
2. Read the legacy content for the page (from `seo/` or the live site) + `docs/optimantra-services.md`
   for prices.
3. Build the bespoke EN component in the approved language (hero + `AnchorNav` + 11–15 sections,
   alternating light and `blue-deep` bands, FAQ, transport, final CTA).
4. Wrap EN/ES routes as ~23-line files (`Layout` → `TopBar` → `Header` → `main` → `Footer`). No
   `Set` to update: each URL has its own explicit route.
5. `npm run build` → **272 pages**; audit EN/ES at 360·412·768·1024·1440 with `tools/qa/cdp-pc.ps1`
   (overflow, H1, image dimensions, clipped text, anchor clicks); review screenshots.
6. Commit + push (Vercel deploys), then verify the live pages over HTTP.
