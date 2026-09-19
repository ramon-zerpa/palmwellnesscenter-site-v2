# SEO / Quality Action Plan

- **Target:** `https://palmwellnesscenter-site-v2.vercel.app/`
- **Date:** 2026-09-19
- **Related report:** `seo/FULL-AUDIT-REPORT.md`

## Done during this audit

1. ✅ **Fixed broken internal link** `/primary-care-membership/` (404) → locale-aware
   `/primary-care/membership/` and `/es/atencion-primaria/membresia/`
   (`src/components/RichSection.astro:738`).
2. ✅ **Fixed hreflang** on all new pages — added 9 EN↔ES pairs (18 entries) to
   `src/i18n/altmap.ts`; rebuild verified reciprocal `en`/`es`/`x-default`.
3. ✅ **Removed `/pricing/` + `/locations/` pages** (EN & ES, + `/locations/north-tampa/`)
   at client request — these were new pages, not present in the legacy site. Updated nav
   (`src/i18n/ui.ts`), `altmap.ts`, `public/llms.txt`, docs and data; deleted unused
   `Pricing.astro` + `data/pricing.ts`.

## Priority fixes (pending)

### P1 — before final launch

1. **Logo resolution (Best Practices 96 → 100)**
   - Evidence: LH `image-size-responsive` fails on `logo.webp` (120×60 displayed larger).
   - Fix: request SVG or 2× raster logo from client; update header/footer image.

2. **`llms.txt` quality (65/100)**
   - Evidence: `llms_txt_checker.py` → "No links found".
   - Fix: add key page links: `- [Primary Care](https://www.palmwellness.center/primary-care/): ...`

3. **AI crawler policy in `robots.txt`**
   - Evidence: 11 crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, CCBot, anthropic-ai, FacebookBot, Amazonbot, ChatGPT-User) inherit `*`.
   - Fix: explicitly allow/deny per business intent.

4. **Thin content**
   - Evidence: `/pricing/` 194 words; `/iv-therapy/` 238 words.
   - Fix: expand with unique, intent-focused copy (services, what to expect, FAQ).

### P2 — within 1 month

5. **Structured data**
   - Evidence: only `MedicalClinic` present.
   - Fix: add `BreadcrumbList` site-wide; `Service`/`Offer` on `/pricing/`; `FAQPage` on pages with FAQs (FAQ schema is permitted for healthcare).

6. **Internal linking & anchor text**
   - Evidence: 18 pages with ≤1 incoming link; 16 links with no anchor text.
   - Fix: add contextual internal links from related content; label icon-only links with `aria-label`.

7. **Social meta polish**
   - Evidence: `og:image` missing dimensions; `twitter:site`/`creator` absent.
   - Fix: add `og:image:width/height` (1200×630) and Twitter handles if available.

### P3 — verify after Cloudflare migration

8. **Security headers** — confirm `public/_headers` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) is served on Cloudflare Pages; re-run `security_headers.py`.
9. **Cache headers** — confirm asset caching (`cache-insight`) improves on Cloudflare.
10. **Production Lighthouse** — re-measure on the live domain with a clean browser (this machine's audits are contaminated by AdBlock360 on real domains).

## Re-run commands

```powershell
$env:PYTHONUTF8=1; $SK="C:\Users\raymo\.claude\skills\seo"
python "$SK\scripts\robots_checker.py"  <url>
python "$SK\scripts\llms_txt_checker.py" <url>
python "$SK\scripts\security_headers.py" <url>
python "$SK\scripts\social_meta.py"      <url>
python "$SK\scripts\broken_links.py"     <url> --workers 5
python "$SK\scripts\redirect_checker.py" <url>
python "$SK\scripts\internal_links.py"   <url> --depth 1 --max-pages 20
```
