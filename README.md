# Palm Wellness Center — sitio v2

Reconstrucción de **palmwellness.center** como sitio **Astro 5 estático**, bilingüe EN/ES, con un
reposicionamiento deliberado: **Atención Primaria es el servicio bandera**, respaldada por
**Rehabilitación Física** (quiropráctica, fisioterapia, accidentes, masajes, ultrasonido y
ejercicios terapéuticos) como segunda línea clave.

El sitio anterior era un WordPress/Oxygen con una migración Astro débil. Aquí se reconstruye con
un design system propio, conservando **todas** las URLs indexadas del sitio viejo.

| | |
|---|---|
| **Preview actual (Vercel)** | https://palmwellnesscenter-site-v2.vercel.app/ |
| **Destino final** | **Cloudflare Pages**, desde el repo `TrueWebmaster6/palmwellnesscenter-site` (ver `AGENTS.md` § 9) |
| **Dominio final** | https://www.palmwellness.center/ — todavía sirve el sitio viejo, el DNS no se ha cortado |
| **Repositorio (preview)** | https://github.com/ramon-zerpa/palmwellnesscenter-site-v2 |
| **Repositorio (final)** | https://github.com/TrueWebmaster6/palmwellnesscenter-site |
| **Páginas** | 272 |
| **Idiomas** | EN en la raíz · ES en `/es/` con slugs traducidos |

> **¿Eres un agente o vienes a tocar código?** Lee en este orden
> [`AGENTS.md`](./AGENTS.md) → [`docs/PROJECT-HANDOFF.md`](./docs/PROJECT-HANDOFF.md) → el
> documento específico de tu tarea. Ahí están las reglas vinculantes, el estado aprobado, los
> cambios recientes, los bugs conocidos y el siguiente paso. Este README es la vista general.

---

## Stack

- **Astro 5** (`output: "static"`)
- **Tailwind CSS v4** vía `@tailwindcss/vite` — el design system vive en `src/styles/global.css`
  (tokens en `@theme`, defaults en `@layer base`, componentes en `@layer components`)
- **`@astrojs/sitemap`** — genera `sitemap-index.xml`
- **Lucide** (`lucide-static`) — única familia de iconos, resuelta en `src/lib/lucide.ts`
- **Sharp** — usado por el plugin `rehypeLocalImageDimensions` de `astro.config.mjs`, que añade
  `width`/`height`/`loading`/`decoding` a cada `<img>` del markdown (evita CLS)
- Fuentes autoalojadas: **Figtree** (títulos) + **Noto Sans** (cuerpo)
- Deploy en **Vercel**

## Requisitos

- Node 20+
- **Windows + PowerShell 5.1** (el entorno actual). Ver la sección "Entorno" de `AGENTS.md`:
  hay detalles no obvios (heredocs no funcionan, `localhost` no resuelve al dev server, etc.).

## Arranque rápido

```powershell
npm install
npm run dev -- --host 127.0.0.1     # http://127.0.0.1:4321/
```

**Navega siempre a `127.0.0.1`, nunca a `localhost`.** En esta máquina `localhost` resuelve a
IPv6 (`::1`) y el dev server escucha solo en IPv4, así que `localhost` falla.

```powershell
npm run build      # debe dar 272 páginas
npm run preview    # sirve dist/ localmente
```

El build **es** la verificación: no hay `lint`, `typecheck` ni `test`. Rompe a propósito si
aparece un icono no reconocido o una referencia mal formada.

> Regla de oro: si el build deja de dar **272** páginas sin que hayas añadido o quitado una ruta
> a propósito, has perdido o duplicado una ruta. (`/business-profiles/` está retirada con 301 al
> Brand Hub externo: es el único descenso intencional del conteo.)

## Estructura

```
astro.config.mjs        site, i18n, sitemap, plugin de dimensiones de imagen
tsconfig.json
src/
  components/
    TopBar.astro        barra superior (dirección, horario, licencias)
    Header.astro        nav principal (megamenú por desplegables) + CTA
    Footer.astro
    Icon.astro          renderiza Lucide (fuente: src/lib/lucide.ts)
    AnchorNav.astro     nav de anclas de página (sin hash en la URL)
    HomePage.astro      homepage
    pages/              páginas rediseñadas a medida (PrimaryCarePage, MedicalWeightLossPage,
                        IvTherapyPage, ChronicConditionManagementPage, PreventiveCarePage,
                        TelemedicinePage, MembershipPage, PhysicalRehabilitationPage,
                        CarAccidentRehabilitationPage, CarAccidentTreatmentPage,
                        AutoAccidentInjuryClinicPage, CarAccidentChiropractorPage,
                        CarAccidentPhysicalTherapyPage, WhiplashTreatmentPage)
    BlogIndex.astro, BlogPost.astro, ContactPage.astro, ContactForm.astro
    blog/               PostTableOfContents.astro, PostShare.astro, PostRecent.astro
  layouts/
    Layout.astro        <head>, meta, hreflang, JSON-LD
  data/
    home.ts                contenido de la homepage
    blogArchive.ts         paginación/orden del blog (6 por página)
  i18n/
    ui.ts                  nav + diccionario de cadenas
    utils.ts               rutas, traducciones, APPOINTMENT_URL, PHONE_TEL, SOCIAL
    altmap.ts              mapa hreflang EN↔ES
  content/blog/           185 posts markdown (92 EN / 93 ES)
  lib/                    lucide.ts (iconos), structured-data.ts (JSON-LD), rehype-table-labels.mjs
  pages/                  rutas explícitas + catch-all [...slug].astro (solo blog)
  styles/global.css       design system completo
public/                   imágenes, fuentes, robots.txt, admin/ (CMS), llms.txt
functions/api/contact.ts  función del formulario de contacto (ver "Bugs conocidos")
tools/qa/                 harness de verificación CDP
docs/, seo/, design-system/
legacy/                   sitio viejo, SOLO LECTURA (gitignoreado)
```

## Cómo funciona el routing

Hay dos vías de render:

1. **Rutas explícitas** en `src/pages/` — páginas rediseñadas y páginas nuevas
   (`primary-care/index.astro`, `iv-therapy.astro`, `contact.astro`, `news-blog.astro`…).
2. **Blog** — markdown de `src/content/blog/`, resuelto por la colección en el catch-all
   `src/pages/[...slug].astro`, que **solo** sirve el blog (`BlogPost.astro`).

El renderer heredado (`richpages.json`, `RichPage.astro`, `RichSection.astro`, `BlockList.astro`) se
**eliminó** cuando las 41 entradas quedaron migradas a páginas propias o retiradas. **Cada URL tiene
hoy su ruta explícita** (o un 301, como `/business-profiles/`). Para una página nueva: crea su
componente en `src/components/pages/` y su ruta EN/ES; no hay ningún `Set` que tocar. Detalles en
`AGENTS.md` § 4.1.

## Cómo funciona el i18n

- EN vive en la raíz (`/primary-care/`); ES bajo `/es/` **con slugs traducidos**
  (`/es/atencion-primaria/`). Sin prefijo para el idioma por defecto.
- El nav y las cadenas salen de `src/i18n/ui.ts`; las rutas compartidas y el enlace de reserva
  (`APPOINTMENT_URL`, OptiMantra V2) de `src/i18n/utils.ts`.
- **`APPOINTMENT_URL` es la única fuente del link de reserva: impórtala, nunca la copies.** Si hay
  que cambiarla, se cambia solo ahí; los datos que no admiten `import` (markdown) se editan aparte
  y luego se verifica que no queda el valor viejo en `src` ni en `dist`.
- El mapa hreflang EN↔ES está en `src/i18n/altmap.ts`. **Al añadir una página, añade su par
  ahí**, o el switcher de idioma y los `<link rel="alternate">` no la encontrarán.

## Contenido y precios

**`docs/optimantra-services.md` es la verdad del negocio.** Si un texto heredado contradice ese
archivo, gana el archivo. Los datos que más se equivocan en el contenido viejo:

| Dato | Valor real |
|---|---|
| Membresía | **$99 inicial + $39/mes** |
| Visita de oficina | $39 |
| Paciente nuevo | $65 |
| Seguimiento | $59 |
| Telehealth | $55 (seguimiento $45) |
| Programa de pérdida de peso | $299 |
| IV Therapy | **activo** (el sitio viejo dice "coming soon") |

El blog se edita como markdown en `src/content/blog/{en,es}/`. Hay un CMS en `public/admin/`.

## Verificación

El build más el harness CDP de `tools/qa/` (mide la página real en Chrome headless por DevTools
Protocol). Con el dev server levantado:

```powershell
# overflow horizontal, contenedor, header, nav de anclas, h1, imágenes sin
# dimensiones, taps pequeños y texto recortado — 2 idiomas × 5 anchos
.\tools\qa\cdp-pc.ps1 -Urls @("/primary-care/","/es/atencion-primaria/") `
                      -Widths @(360,412,768,1024,1440) -Mode audit

.\tools\qa\cdp-pc.ps1 -Mode motion   # animaciones + prefers-reduced-motion
.\tools\qa\cdp-pc.ps1 -Mode click    # click real: ¿escribe el hash en la URL?
.\tools\qa\cdp-pc.ps1 -Mode shots -ScrollY @(0,1200,2400)   # capturas a %TEMP%\pc-*.png
```

Anchos de referencia: **360 · 390 · 412 · 768 · 1024 · 1440**. Son anchos de captura, no
breakpoints (los breakpoints son `sm 40rem`, `md 48rem`, `lg 64rem`, `xl 80rem`).

## Deploy

**El push es el deploy.** El proyecto está conectado a GitHub
(`ramon-zerpa/palmwellnesscenter-site-v2`, rama de producción `main`), así que un push a `main`
produce un deployment de producción en Vercel automáticamente. No hay paso manual.

```powershell
git commit ...          # solo local: no publica nada
git push origin main    # publica: Vercel despliega solo
```

No lances `vercel deploy` a mano: crearía un deployment huérfano que no corresponde a ningún
commit. Para comprobar el último deploy usa `vercel ls palmwellnesscenter-site-v2` (auth del CLI,
auto-refrescante); **no** llames a la REST API con el token de `auth.json` (OAuth rotativo) ni con
el `VERCEL_OIDC_TOKEN` efímero de `.env.local`.

> **El sitio es un preview y no debe indexarse.** Está aplicado: `public/robots.txt` sirve
> `Disallow: /` y `vercel.json` fuerza el header `X-Robots-Tag: noindex, nofollow, noarchive`.
> **Las dos piezas hay que revertirlas antes de apuntar el dominio real**, o el sitio de
> producción nacerá con `noindex` y no se indexará nunca. Checklist exacto en `AGENTS.md` § 9.

> **Antes de apuntar el dominio real, lee `AGENTS.md` § 9.**
> El repo trae artefactos de **Cloudflare Pages** (`public/_redirects`, `public/_headers`,
> `functions/api/contact.ts`) que **Vercel ignora**. Consecuencia verificada: el formulario de
> contacto responde **404** en producción y los headers de seguridad no están activos.

## Reglas que no se negocian

1. **Las URLs existentes no cambian.** Se conservan las 262 del sitemap heredado
   (`seo/sitemap-baseline.xml`); solo se añaden nuevas. Retirar o consolidar exige un 301 y
   aprobación del cliente.
2. **Inmutable:** logo, NAP, licencias y profesionales.
3. **Un solo contenedor** de 1200px (`.shell`); no anides anchos.
4. **Solo 4 breakpoints**; no inventes media queries a otros valores.
5. **Una sola familia de iconos** (Lucide); nunca un `<svg>` a mano.
6. **Verifica el responsive de verdad** a los 6 anchos, no lo asumas.

## Documentación

| Archivo | Contenido |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | memoria operativa: reglas, gotchas, estado, bugs conocidos |
| [`docs/SESSION-HANDOFF.md`](./docs/SESSION-HANDOFF.md) | **brief de arranque** para pegar en un chat nuevo |
| [`docs/PROJECT-HANDOFF.md`](./docs/PROJECT-HANDOFF.md) | relevo de sesión: decisiones aprobadas, imágenes, metadatos, QA y siguiente fase |
| `docs/redesign-plan.md` | los 12 grupos de migración de páginas |
| `docs/optimantra-services.md` | precios y servicios reales |
| `docs/ux-ui-brief.md` | brief de diseño que guio Pencil |
| `seo/url-inventory.md` | las 262 URLs heredadas y su política |
| `seo/FULL-AUDIT-REPORT.md` | auditoría SEO del sitio heredado |
| `design-system/palm-wellness-center/MASTER.md` | tokens y sistema de diseño |
| `design-system/pencil-design/` | documento de Pencil (`.pen`) con los frames aprobados |
