# SESSION-HANDOFF — brief de arranque

**Snapshot: 2026-09-22** · último commit publicado `b68ac95` · rama `main`

> Pega este archivo (o su ruta) al empezar un chat nuevo. Es autosuficiente, pero **la referencia
> vinculante es `AGENTS.md`** y el estado canónico está en `docs/PROJECT-HANDOFF.md`. Si algo
> aquí contradice `AGENTS.md`, manda `AGENTS.md`.

---

## 1. Qué es

Reconstrucción de `palmwellness.center` como sitio **Astro 5 estático**, bilingüe **EN (raíz) / ES
(`/es/`, slugs traducidos)**, con **Atención Primaria como servicio bandera**. Rehabilitación queda
como segunda línea. El sitio viejo (WordPress/Oxygen) sigue en el dominio final.

| | |
|---|---|
| Producción (preview, **noindex**) | `https://palmwellnesscenter-site-v2.vercel.app/` |
| Dominio final (aún sitio viejo) | `https://www.palmwellness.center/` |
| Repo | `github.com/ramon-zerpa/palmwellnesscenter-site-v2` |
| Build | **273 páginas** — si cambia sin añadir/quitar ruta, es un bug |
| Herramientas | Astro 5, Tailwind v4 (`src/styles/global.css`), Lucide, Vercel |
| Entorno | Windows + **PowerShell 5.1** (no bash), dev en `http://127.0.0.1:4321/` |

---

## 2. Estado actual

Cada página es un componente propio bajo `src/components/pages/`; las rutas EN/ES son wrappers de
~23 líneas (`Layout` → `TopBar` → `Header` → `main` → `Footer`).

| EN | ES | Componente |
|---|---|---|
| `/` | `/es/inicio/` | `HomePage.astro` ← referencia visual aprobada |
| `/primary-care/` | `/es/atencion-primaria/` | `PrimaryCarePage.astro` ← referencia visual aprobada |
| `/medical-weight-loss/` | `/es/perdida-de-peso-medica/` | `MedicalWeightLossPage.astro` |
| `/iv-therapy/` | `/es/terapia-iv/` | `IvTherapyPage.astro` |
| `/chronic-condition-management/` | `/es/manejo-enfermedades-cronicas/` | `ChronicConditionManagementPage.astro` |
| `/preventive-care/` | `/es/atencion-preventiva/` | `PreventiveCarePage.astro` |
| `/telemedicine/` | `/es/telemedicina/` | `TelemedicinePage.astro` |
| `/membership/` | `/es/membresia/` | `MembershipPage.astro` |
| `/physical-rehabilitation/` | `/es/fisioterapia/` | `PhysicalRehabilitationPage.astro` |
| `/car-accident-rehabilitation/` | `/es/rehabilitacion-de-accidentes-automovilisticos/` | `CarAccidentRehabilitationPage.astro` |
| `/car-accident-treatment/` | `/es/tratamiento-de-accidentes-de-auto/` | `CarAccidentTreatmentPage.astro` |
| `/auto-accident-injury-clinic/` | `/es/clinica-de-lesiones-por-accidentes-de-auto/` | `AutoAccidentInjuryClinicPage.astro` |
| `/car-accident-chiropractor/` | `/es/quiropractico-para-accidente-de-auto/` | `CarAccidentChiropractorPage.astro` |

Hitos recientes:

- **Atención Primaria cerrada, EN+ES.** Los 4 hijos anidados se **aplanaron a primer nivel**
  (`/membership/`, `/preventive-care/`, `/telemedicine/`, `/chronic-condition-management/`; rutas
  nuevas → sin redirects). `src/components/SimplePage.astro` y `src/data/newPages.ts`
  **eliminados**; no recrearlos.
- **Link de reserva corregido en las 88 apariciones del sitio** (`ec9d1bc`). `APPOINTMENT_URL` es la
  única fuente: se importa, nunca se copia.
- **Grupo 2 cerrado** (`1fed483`): `/physical-rehabilitation/` + `/es/fisioterapia/`.
- **Familia de accidentes rediseñada, EN+ES** (`7e53823`, `b68ac95`): el hub de rehabilitación, la
  clínica de lesiones, el tratamiento y el quiropráctico. Sus tarjetas de "Treatment options" y
  "Our services" **enlazan** a las páginas de servicio (`/chiropractor/`, `/physical-rehabilitation/`,
  `/massage-therapy/`, …).
- Las 6 rutas nuevas se añadieron al `Set` `migrated` de `src/pages/[...slug].astro` (×2 por idioma).

---

## 3. Próximo paso exacto

**Cerrar los grupos 6 y 7 de `docs/redesign-plan.md`.** Ya están hechas las mitades
`/car-accident-treatment/` y `/car-accident-chiropractor/`; faltan:

- **Grupo 6**: `/car-accident-physical-therapy/` (+ `/es/fisioterapia-para-accidente-de-auto/`).
- **Grupo 7**: `/whiplash-treatment-tampa/` (+ `/es/tratamiento-latigazo-cervical-tampa/`).

Después: **grupos 3 y 4** (`/chiropractor/`, `/massage-therapy/`, `/therapeutic-exercises/`,
`/therapeutic-ultrasound-treatment/` + ES), y luego grupos 8-12.

Procedimiento que funciona:

1. **Investigación**: abre 2 competidores directos de Tampa del mismo servicio (estructura e
   intención; nunca copiar diseño).
2. **Contenido**: lee el contenido heredado de la página (`richpages.json`) + `docs/optimantra-services.md` (precios).
3. **Componente**: crea `src/components/pages/<X>Page.astro` con `lang` y un objeto `content` con
   `en`/`es`. Estructura probada: hero (contenido izq. / imagen der. + rail) → `AnchorNav` →
   secciones alternando `bg-white`/`bg-bg-alt`/`bg-blue-deep` (≈3 claras por cada oscura) →
   confianza+horario+ubicación+supervisor → transporte → FAQ → área → CTA final. Las secciones con
   `id` usan `scroll-mt-24 lg:scroll-mt-[184px]`.
4. **Wrappers**: crea/reescribe las rutas EN y ES como archivos de ~23 líneas.
5. **Catch-all**: añade las rutas al `Set` `migrated` de `[...slug].astro` **solo si la ruta existe
   en `richpages.json`**.
6. **Build** → debe dar **273**. **QA**: auditoría EN/ES a 360·412·768·1024·1440 + click + capturas.
7. **Commit y push** → Vercel despliega solo; verifica con `vercel ls` y por HTTP.

---

## 4. Comandos

```powershell
npm run dev -- --host 127.0.0.1     # SIEMPRE 127.0.0.1; "localhost" FALLA en esta máquina
npm run build                        # debe dar 273 páginas
npm run preview

# QA (requiere el dev server levantado)
.\tools\qa\cdp-pc.ps1 -Urls @("/car-accident-treatment/","/es/tratamiento-de-accidentes-de-auto/") `
                      -Widths @(360,412,768,1024,1440) -Mode audit
.\tools\qa\cdp-pc.ps1 -Urls @("/car-accident-treatment/") -Widths @(390,1440) -Mode click
.\tools\qa\cdp-pc.ps1 -Urls @("/car-accident-treatment/") -Widths @(1440) -Mode shots -ScrollY @(0,1200,2400)
```

**No existe `lint`, `typecheck` ni `test`.** No los inventes: el build + el harness CDP son la
verificación. El build **rompe** ante un icono Lucide inexistente o una referencia mal formada.

Commit messages: PowerShell 5.1 no tiene heredocs → escribe el texto a un archivo y usa
`git commit -F <archivo>`.

Despliegue: **el push es el deploy.** `git commit` + `git push origin main`; Vercel despliega solo.
Nunca `vercel deploy` a mano. Para comprobar el deploy usa `vercel ls palmwellnesscenter-site-v2`
(auth del CLI, auto-refrescante) o HTTP, nunca la consola. **No** llames a la REST API con el
`token` de `auth.json` (OAuth rotativo → `invalidToken`) ni con el `VERCEL_OIDC_TOKEN` de
`.env.local` (efímero).

---

## 5. Fuentes de verdad

- **Precios y servicios**: `docs/optimantra-services.md` (captura del portal de pacientes de
  OptiMantra del cliente, `servicesallV2`, 2026-09-19). Referencia rápida: membresía **$99 inicial
  + $39/mes**; Office Visit $39; paciente nuevo $65; seguimiento $59; telehealth $55 / $45; pérdida
  de peso $299; laboratorios $145 / $189 / $250; IV: Beauty $170, Mayer $170, NAD+ $199, lipotrópica
  $25. **IV Therapy está ACTIVO** (el contenido viejo dice "coming soon": está mal).
- **Link de reserva**: `APPOINTMENT_URL` en `src/i18n/utils.ts` es la **única** fuente.
  **Impórtala, nunca la copies.** Si hay que cambiarla en datos que no admiten `import`
  (`richpages.json`, markdown), edítalos y luego verifica con `Select-String` que no queda el valor
  viejo **ni en `src` ni en `dist`**.
- **URLs**: se conservan las 262 del sitemap heredado (`seo/sitemap-baseline.xml`). Solo se añaden.
  `/pricing/` y `/locations/` se retiraron por decisión del cliente: no recrearlos.
- **Inmutable**: logo, NAP (1004 W Linebaugh Ave Ste A, Tampa, FL 33612 · (813) 443-5370 · fax
  (813) 443-5604), licencias HCCA10302 y MM28422, y los profesionales.

---

## 6. Reglas que no se rompen

1. Un solo contenedor, `.shell` (1200px). No anides anchos.
2. Solo 4 breakpoints: `sm 40rem` · `md 48rem` · `lg 64rem` · `xl 80rem`. Nada de media queries a
   otros valores; 360/390/412/768/1024/1440 son **anchos de captura**, no breakpoints.
3. Iconos: solo Lucide vía `src/lib/lucide.ts` + `<Icon>`. **Nunca** un `<svg>` a mano.
4. Hover: una sola sombra `0 10px 24px -14px rgba(0,0,0,0.22)` + 2px de elevación, nunca anidada.
5. Hero: contenido a la IZQUIERDA, imagen a la DERECHA, en todas las páginas.
6. Nav de anclas: en flujo tras el hero, `lg:sticky lg:top-[70px]`, **nunca escribe el hash**.
7. Bandas oscuras: `blue-deep` (#164e93), nunca `blue` (#2a67b1) — contraste AA medido.
8. Verifica el responsive de verdad (capturas), no lo asumas.
9. Sin deuda técnica: si algo se hace, se hace bien ahora.
10. No hagas `git commit` ni deploy sin que te lo pidan explícitamente.

---

## 7. Gotchas que ya nos mordieron

- **Copiar el link de reserva lo rompe.** Ya pasó: 5 copias hardcodeadas + 82 enlaces heredados
  divergieron del valor correcto. Importa `APPOINTMENT_URL`.
- **Imágenes que son "gráficos con texto"** (p. ej. `osteoporosis-prevention-management-man-knee-pain.webp`):
  al recortarlas, el titular impreso se corta y parece un bug. Ábrelas y míralas antes de aprobarlas.
- **Pencil (MCP)**: `TakeScreenshot` devuelve vacío si se pide en el mismo `execute` que una
  mutación; y `pencil_browser` falla de forma intermitente. Cuando pase, usa el harness CDP.
- **`Set-Content -Encoding UTF8` escribe BOM** → nunca lo uses para archivos fuente.
- **`rg` no está instalado** → usa `Select-String`.
- **Páginas legacy de anclas**: el `Set` `migrated` de `[...slug].astro` **solo** hace falta para
  rutas que existen en `richpages.json` (hoy: las familias de Primary Care, Physical Rehabilitation
  y Car Accident). Las páginas nuevas que nunca estuvieron en el JSON no lo necesitan.
- **Comprobar el deploy**: `vercel ls`, no la REST API con el token de `auth.json` (ver §4).

---

## 8. Pendiente / bloqueado (nada de esto bloquea seguir maquetando)

- **El formulario de contacto está muerto en producción**: `POST /api/contact` da 404 porque
  `functions/api/contact.ts` es una función de Cloudflare Pages y Vercel busca `/api/`. Es lo único
  que hoy pierde leads de verdad.
- `public/_redirects` y `public/_headers` son artefactos de Cloudflare: **inertes** en Vercel. Hay
  que portarlos a `vercel.json` antes del lanzamiento.
- **Preview noindex** (`public/robots.txt` + header en `vercel.json`): hay que revertir **las dos**
  piezas antes de apuntar el dominio real.
- Logo de baja resolución (`public/images/logo.webp`, 120×60): el cliente debe entregar SVG o 2×.
- No hay fotografía propia de IV Therapy, telemedicina, manejo crónico ni preventiva: se reutilizan
  fotos aprobadas hasta que el cliente entregue las suyas.
- El frame de Pencil `EnF3Q` diverge del código en 2 puntos menores; el código aprobado prevalece.

---

## 9. Archivos que importan

- `AGENTS.md` — reglas vinculantes, entorno, gotchas, deploy, bugs conocidos. **Léelo primero.**
- `docs/PROJECT-HANDOFF.md` — estado canónico y decisiones aprobadas.
- `docs/redesign-plan.md` — los 12 grupos de migración + workflow.
- `docs/optimantra-services.md` — precios y servicios reales (la verdad del negocio).
- `src/components/HomePage.astro`, `src/components/pages/PrimaryCarePage.astro` — referencia visual.
- `src/components/pages/*.astro` — las 13 páginas bespoke (plantilla de facto).
- `src/components/AnchorNav.astro`, `src/components/Icon.astro`, `src/lib/lucide.ts`.
- `src/i18n/{ui,utils,altmap}.ts` — nav, rutas/`APPOINTMENT_URL`, mapa hreflang.
- `src/styles/global.css` — tokens, breakpoints, `@layer`, primitivas del hero.
- `src/pages/[...slug].astro` — catch-all (richpages) + blog.
- `tools/qa/cdp-pc.ps1` — harness de QA.
