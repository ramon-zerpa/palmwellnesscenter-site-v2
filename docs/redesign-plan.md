# Internal Pages Redesign — Plan (Home as visual reference)

**Goal:** bring every internal page onto the **HomePage visual language** (same tokens,
section rhythm, hero, cards, pills, FAQ, CTA band), designed in **Pencil** first (frame
approved by the client) and then built **directly in Astro**, in **groups of 2 EN pages** per
iteration. ES mirrors each group translated (same layout, `/es/...` slug).

**Reference:** `src/components/HomePage.astro` (approved).
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
   `richpages.json`**: it stays as a historical record and the catch-all filters it out.
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
| 2 | Rehab hub + IV | `/physical-rehabilitation/`, `/iv-therapy/` | `/es/fisioterapia/`, `/es/terapia-iv/` |
| 3 | Core rehab | `/chiropractor/`, `/massage-therapy/` | `/es/quiropractico/`, `/es/terapia-de-masajes/` |
| 4 | Therapy | `/therapeutic-exercises/`, `/therapeutic-ultrasound-treatment/` | `/es/ejercicios-terapeuticos/`, `/es/tratamiento-de-ultrasonido-terapeutico/` |
| 5 | Auto accident I | `/car-accident-rehabilitation/`, `/auto-accident-injury-clinic/` | `/es/rehabilitacion-de-accidentes-automovilisticos/`, `/es/clinica-de-lesiones-por-accidentes-de-auto/` |
| 6 | Auto accident II | `/car-accident-treatment/`, `/car-accident-physical-therapy/` | `/es/tratamiento-de-accidentes-de-auto/`, `/es/fisioterapia-para-accidente-de-auto/` |
| 7 | Auto accident III | `/car-accident-chiropractor/`, `/whiplash-treatment-tampa/` | `/es/quiropractico-para-accidente-de-auto/`, `/es/tratamiento-latigazo-cervical-tampa/` |
| 8 | Slip & fall + cities | `/slip-and-fall-injury-treatment/` + city cluster (`/car-accident-rehabilitation/{seminole-heights,forest-hills,carrollwood}/`) as one template | ES cluster |
| 9 | About + Contact | `/about-us/`, `/contact/` | `/es/acerca-de-nosotros/`, `/es/contacto/` |
| 10 | Blog + misc | `/news-blog/` (+ post template), `/business-profiles/` | `/es/blog-de-noticias/` |
| 11 | Legal | `/hipaa-policy/`, `/privacy-policy/` | `/es/politica-de-hipaa/`, `/es/politica-de-privacidad/` |
| 12 | New pages upgrade | `/primary-care/membership/`, `/primary-care/chronic-condition-management/` then `/primary-care/preventive-care/`, `/primary-care/telemedicine/` | ES mirrors |

## Per-group workflow

1. Read the legacy content (`richpages.json` blocks) for the 2 pages.
2. Draft corrected bilingual content into `servicePages.ts` (or the relevant data file).
3. Create the dedicated Astro pages (EN + ES) using the shared template.
4. Add the 2 pages' paths to the `migrated` `Set` in `[...slug].astro` (×2 for ES).
5. `npm run build` → verify routes still 200, no orphan/broken links, hreflang intact.
6. Screenshot/QA pass (desktop + mobile) in one batched round.
7. Report + move to next group.

## Status

- [x] Group 1 — `/primary-care/` + `/medical-weight-loss/` (bespoke EN/ES components)
- [ ] Group 2 … Group 12
