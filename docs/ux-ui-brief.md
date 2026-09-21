# UX/UI Brief for Pencil — Palm Wellness Center

Phase 2 deliverable. Guides the visual design in Pencil.dev. **Pencil output becomes the visual source of truth after approval.**
Companion tokens: `design-system/palm-wellness-center/MASTER.md`.

---

## 1. Project context

Rebuild of `palmwellness.center` (currently an acceptable-but-weak Astro migration of a WordPress site). Same company, same logo, same contact data and licenses. **Service priority changes: Primary Care becomes the flagship service**; Medical Weight Loss, active IV Therapy and Telemedicine support it; Physical Rehabilitation (chiropractic, physical therapy, auto accident, slip & fall, massage, ultrasound, therapeutic exercise) is the second key service line. Bilingual EN/ES. Serves Tampa / Hillsborough County.

## 2. Positioning & primary goal

- **Positioning:** "Integrated primary care that works with your body — with rehabilitation under the same roof."
- **Primary goal:** appointment bookings (call / online via Optantra) + membership sign-ups.
- **Secondary goals:** weight-loss program leads, insurance verification, telemedicine.

## 3. Audience & personas

1. **Uninsured/underinsured Hispanic adult (35–60)** — needs affordable primary care, Spanish-first, chronic condition (diabetes/hypertension). Trust + price clarity matter.
2. **Working adult with chronic condition** — wants extended visits, telemedicine, prescription management, same-day.
3. **Weight-loss seeker (30–55)** — physician-supervised GLP-1 program, wants legitimacy and results.
4. **Post-injury patient** — auto accident / slip & fall; needs rehab + documentation, often finds clinic via accident search.

## 4. Information architecture (bilingual)

**EN routes on the left; ES mirror under `/es/`. All existing URLs are PRESERVED (see `seo/url-inventory.md`). Only additions.**

- **Home** `/` · ES `/es/inicio/`
- **Primary Care (flagship hub)** `/primary-care/` · `/es/atencion-primaria/`
  - NEW `/primary-care/membership/` · `/es/atencion-primaria/membresia/`
  - NEW `/primary-care/chronic-condition-management/` · `/es/atencion-primaria/manejo-enfermedades-cronicas/`
  - NEW `/primary-care/preventive-care/` · `/es/atencion-primaria/atencion-preventiva/`
  - NEW `/primary-care/telemedicine/` · `/es/atencion-primaria/telemedicina/`
  - NEW condition pages: `/primary-care/hypertension/`, `/primary-care/diabetes/`, `/primary-care/high-cholesterol/`, `/primary-care/thyroid/` (+ ES)
- **Medical Weight Loss** `/medical-weight-loss/` · `/es/perdida-de-peso-medica/`
- **IV Therapy** NEW `/iv-therapy/` · `/es/terapia-iv/`
- **Rehabilitation (secondary hub)** `/physical-rehabilitation/` · `/es/fisioterapia/`
  - existing: `/chiropractor/`, `/car-accident-rehabilitation/`, `/slip-and-fall-injury-treatment/`, `/massage-therapy/`, `/therapeutic-exercises/`, `/therapeutic-ultrasound-treatment/`, `/auto-accident-injury-clinic/` (kept as-is)
- **About & Team** `/about-us/` · `/es/acerca-de-nosotros/`
- **Blog hub** `/news-blog/` · `/es/blog-de-noticias/` (articles stay at their existing root slugs)
- **Contact** `/contact/` · `/es/contacto/`
- **Legal** `/hipaa-policy/`, `/privacy-policy/` (+ ES)

**URL policy:** never change an existing URL. Any consolidation requires explicit approval + 301. New URLs are free.

## 5. Page templates

- **Home** — the priority funnel (see §6).
- **Service hub** (Primary Care, Weight Loss, Rehab) — H1 with city keyword, promise intro, "who it's for", what-to-expect, conditions treated, FAQ, CTA, related services.
- **Service detail / condition page** — problem→solution, eligibility, visit walkthrough, FAQ, FAQ schema, CTA, neighborhood-serving copy.
- **Membership/pricing** — comparison table + benefits + CTA.
- **Provider bio** — photo, credentials, languages, care philosophy.
- **Location** — NAP, map, hours, directions, transportation, served neighborhoods.
- **Blog hub / article** — categories, author/date, internal links.
- **Legal** — plain, accessible.

## 6. Homepage section order (desktop)

1. **Utility bar** — desktop: address · hours · licenses; mobile: address only.
2. **Header** — logo, nav (Primary Care first), EN/ES pill and persistent **Book Appointment**.
   On mobile, the language pill and Book CTA close the expanded menu.
3. **Hero** — H1 (primary care promise), trust badges, dual CTA (Book / Call), image at right.
   Shared hero treatment: frame shadow, full-image entrance translated from right to left (no
   reveal wipe), light resting drift, heartbeat badge and dynamic vital line; respect reduced
   motion. Set the image focal point per asset after checking desktop and mobile.
4. **Flagship services grid** — Primary Care, Medical Weight Loss and active IV Therapy.
5. **Why integrated care** — differentiators: integrated primary care + rehab, free transportation, bilingual team, extended visits.
6. **Membership pricing** — $99 initial + $39/month; Office Visit $39; New Patient $65;
   Telehealth $55. Present clear comparisons + CTA.
7. **Meet your care team** — Leivys C. Marsall PA ACN, Dr. Orellana-Molina MD, Michel Reyes LMT.
8. **Conditions treated** — chronic + preventive quick-links to condition pages.
9. **Rehabilitation (secondary)** — compact block, subdued styling.
10. **Service area** — map + served neighborhoods.
11. **Social proof** — testimonials/reviews.
12. **FAQ** — accordion, FAQ schema.
13. **Final CTA** — book/call + transportation note.
14. **Footer** — text brand name; columns for Primary Care, Physical Rehabilitation and Contact;
    text-only pale-turquoise social/Brand Hub pills; legal links centered in the bottom bar and
    True Webmaster credit on the right.

**Mobile:** same order; collapsible nav; **sticky bottom bar** = Call + Book; one-tap phone.

## 7. Content model

- Providers (immutable data): name, credentials, role, languages, bio.
- Services: name, summary, body, conditions[], FAQs[], related[], CTA.
- Conditions: condition, symptoms, approach, FAQs[].
- Locations: name, NAP, hours, services[], neighborhoods[], map.
- Membership plans: name, price, cadence, benefits[], CTA.
- Testimonials: quote, name, context. FAQs: q, a.
- i18n: every entity has EN + ES.

## 8. SEO & bilingual rules

- One H1/page; semantic order; descriptive internal anchor text.
- `hreflang` EN↔ES + `x-default`; self-canonical; ES pages canonical to ES.
- Schema: `MedicalClinic`/`LocalBusiness` (NAP, geo, hours, areaServed), `Physician`, `Service`, `FAQPage`, `BreadcrumbList`, `Article` for blog.
- Local: dedicated condition pages; neighborhood copy; NAP consistency.
- Images: descriptive alt, optimized formats, explicit dimensions (CLS).

## 9. Pencil deliverables (Phase 3)

1. Brand palette + typography specimen.
2. Color/spacing/radius tokens (mirror MASTER).
3. Component patterns: header/nav, hero, service card, pricing table, team card, FAQ accordion, CTA band, footer, badges.
4. **Homepage — desktop.**
5. **Homepage — mobile.**

## 10. Gate

Review Pencil output against Impeccable criteria (hierarchy, spacing, typography, anti-patterns) → refine in Pencil → **declare Pencil as the visual source of truth** → implement in Astro.
