# Full SEO / Quality Audit Report

- **Target:** `https://palmwellnesscenter-site-v2.vercel.app/` (Vercel preview of the new Astro site)
- **Canonical production domain configured:** `https://www.palmwellness.center/`
- **Date:** 2026-09-19
- **Methodology:** Agentic SEO Skill v3.0.1 (deterministic scripts + LLM-first analysis) + Lighthouse (mobile, clean Chrome profile)
- **Pages measured:** `/`, `/pricing/`, `/es/precios/`, `/iv-therapy/` + internal-link crawl (16 pages, 51 unique URLs)
- **Post-audit change (2026-09-19):** `/pricing/`, `/es/precios/`, `/locations/`, `/es/ubicaciones/`, `/locations/north-tampa/` and `/es/ubicaciones/north-tampa/` were **removed** at client request (new pages, not present in the legacy site). Their hreflang entries, nav items, `llms.txt` links and docs were removed accordingly.

## Overall Assessment: **Good**

The site has a strong technical/on-page foundation. The two significant defects found
(broken internal link + incorrect hreflang on new pages) were **fixed during this audit**
and verified in a rebuild.

## Score Card

| Category | Weight | Score | Notes |
| --- | ---: | ---: | --- |
| Technical SEO | 25% | 92 | Clean redirects, sitemap OK, one broken internal link (fixed) |
| On-Page SEO | 15% | 90 | 1× H1, titles/meta/canonical/OG present, thin content on 2 pages |
| Schema / Structured Data | 15% | 70 | Only `MedicalClinic`; no Breadcrumb/Service/Offer/FAQ |
| Performance (CWV) | 10% | 96 | Local clean: 98/99 Lighthouse, LCP 2.0–2.3s, TBT 0, CLS 0 |
| Image Optimization | 10% | 80 | Logo 120×60 low-res (client asset) |
| AI Search Readiness (GEO) | 5% | 65 | `llms.txt` present but low quality; AI crawlers not managed |
| Security Headers | — | n/a | `_headers` is Cloudflare-only; not applied on Vercel |

## Lighthouse (mobile, clean profile, localhost build)

| Page | Perf | A11y | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 98 | 100 | 96 | 100 | 2.3 s | 0 ms | 0 |
| `/pricing/` | 99 | 100 | 96 | 100 | 2.0 s | 0 ms | 0 |

Only deduction: **Best Practices 96** → `image-size-responsive` (logo displayed larger than 120×60 source).

## Findings

| # | Severity | Area | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | 🔴 Critical | Internal links | `/primary-care-membership/` was linked but returned **404** | `<a href="/primary-care-membership/">` in `RichSection.astro:738`; live 404 | **FIXED** → locale-aware `/primary-care/membership/` + `/es/atencion-primaria/membresia/` |
| 2 | 🔴 Critical | Hreflang | New pages emitted wrong `hreflang` (fell back to `/` and `/es/inicio/`) | `/pricing/` es → `/es/inicio/`; `/iv-therapy/` es → `/es/inicio/`; `/es/precios/` en → `/` | **FIXED** → added 9 pairs (18 entries) to `src/i18n/altmap.ts`; rebuild verified reciprocal |
| 3 | ⚠️ Warning | Images | Logo is low-resolution (120×60) | LH `image-size-responsive` score 0 on `logo.webp` | Request SVG/2× logo from client (logo is immutable) |
| 4 | ⚠️ Warning | AI Search (GEO) | `llms.txt` quality 65/100, 0 links | `llms_txt_checker.py` → "No links found" | Add key page links `- [Title](URL): description` |
| 5 | ⚠️ Warning | Robots / AI | 11 AI crawlers not explicitly managed | `robots_checker.py` → GPTBot, ClaudeBot, PerplexityBot, Google-Extended, … inherit `*` | Decide policy (allow/deny) per crawler |
| 6 | ⚠️ Warning | Content | Thin content on two key pages | `/pricing/` 194 words; `/iv-therapy/` 238 words | Expand with unique, intent-focused copy |
| 7 | ⚠️ Warning | Social | `og:image` missing `width`/`height`; `twitter:site`/`creator` absent | `social_meta.py` (85/100) | Add `og:image:width/height` (1200×630); optional twitter handles |
| 8 | ℹ️ Info | Schema | Only `MedicalClinic` on all pages | `parse_html.py` → `schema: ['MedicalClinic']` | Add `BreadcrumbList`, `Service`/`Offer` (pricing), `FAQPage` (allowed for healthcare) |
| 9 | ℹ️ Info | Internal links | 18 pages with ≤1 incoming link; 16 links with empty anchor text | `internal_links.py` (377 internal links) | Add contextual internal links; label icon-only links |
| 10 | ℹ️ Info | Security | 5 security headers missing **on Vercel** (HSTS present) | `security_headers.py` (45/100) | Expected: `public/_headers` applies on Cloudflare Pages — verify post-migration |
| 11 | ℹ️ Info | Redirects | No redirect chains, HTTPS OK | `redirect_checker.py` → single 200 hop, 285 ms | None |
| 12 | ℹ️ Info | Broken links (home) | 26/26 links healthy | `broken_links.py` → 0 broken on `/` | None |

## Performance detail

- Local clean build: **home 98 / pricing 99** — LCP 2.0–2.3 s, TBT 0 ms, CLS 0, total 275 KiB, 0 unused JS/CSS.
- Vercel preview measured ~60 because of **environment contamination**, not site code:
  - `filtering.adblock360.com` injects ~108 KB JS + Google Fonts (Inter) + 0-cache requests into the browser during audits (see Environment Limitations).
  - `public/_headers` (cache-control) is Cloudflare-specific and not applied on Vercel → assets not cached.

## Environment Limitations

1. **AdBlock360 (`AdBlock360Svc`) injects into real domains** during local Chrome/Lighthouse runs (script `filtering.adblock360.com`, Inter font, ad-related CSS, DOM bloat up to ~986 KB). It does **not** inject on `localhost`, which is why clean local scores are 98/99. Production-domain Lighthouse numbers from this machine are **not reliable** until the injector is disabled/excluded. Use PageSpeed Insights or a clean machine for final production measurement.
2. **PageSpeed Insights API** returned `Rate limited by Google API` (no API key) → CWV via PSI unavailable; Lighthouse used instead.
3. Vercel Deployment Protection was disabled for this preview to allow public checks.
