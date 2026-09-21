# SESSION-HANDOFF — brief de arranque

**Snapshot: 2026-09-21** · último commit publicado `ec9d1bc` · rama `main`

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

## 2. Estado: la familia de Atención Primaria está cerrada (EN+ES)

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

Hecho además en la última sesión:

- Los 4 hijos de Primary Care se **aplanaron a primer nivel** (rutas nuevas → no hicieron falta
  redirects): `/membership/`, `/preventive-care/`, `/telemedicine/`, `/chronic-condition-management/`.
- `src/components/SimplePage.astro` y `src/data/newPages.ts` **eliminados** (código muerto).
  **No recrearlos**; todas sus rutas ya tienen página propia.
- **Link de reserva corregido en las 88 apariciones del sitio** (`ec9d1bc`): `lid` corrupto
  corregido, 5 copias hardcodeadas eliminadas, 82 enlaces heredados migrados del endpoint V1 al
  canónico. Verificado en producción.

---

## 3. Próximo paso exacto

**Grupo 2 (parcial): el hub `/physical-rehabilitation/` (+ `/es/fisioterapia/`).**
Hoy usa el cuerpo heredado (`RichPage`/`RichSection`). IV Therapy, la otra mitad del grupo, ya está
rediseñada.

Procedimiento que funcionó para las 5 últimas páginas:

1. **Investigación**: abre 2 competidores directos de Tampa del mismo servicio (estructura e
   intención; nunca copiar diseño).
2. **Contenido**: lee el contenido heredado de la página + `docs/optimantra-services.md` (precios).
3. **Componente**: crea `src/components/pages/PhysicalRehabilitationPage.astro` con `lang` y un
   objeto `content` con `en`/`es`. Estructura probada: hero (contenido izq. / imagen der. + rail) →
   `AnchorNav` → intro con comparativa → 8 tarjetas → banda oscura de pasos → sección de precios →
   banda oscura integrada → confianza+horario+ubicación+supervisor → pasos → transporte → FAQ →
   área → CTA final. Alterna ~3 secciones claras por cada `bg-blue-deep`.
4. **Wrappers**: reescribe `src/pages/physical-rehabilitation.astro` y
   `src/pages/es/fisioterapia.astro`.
5. **Build** → debe dar **273**. **QA**: auditoría EN/ES a 360·412·768·1024·1440 + click + capturas.
6. **Commit y push** → Vercel despliega solo; verifica con la API y por HTTP.

Después: Grupos 3–12 de `docs/redesign-plan.md` (rehabilitación, accidentes, legal, blog…).

---

## 4. Comandos

```powershell
npm run dev -- --host 127.0.0.1     # SIEMPRE 127.0.0.1; "localhost" FALLA en esta máquina
npm run build                        # debe dar 273 páginas
npm run preview

# QA (requiere el dev server levantado)
.\tools\qa\cdp-pc.ps1 -Urls @("/physical-rehabilitation/","/es/fisioterapia/") `
                      -Widths @(360,412,768,1024,1440) -Mode audit
.\tools\qa\cdp-pc.ps1 -Urls @("/physical-rehabilitation/") -Widths @(390,1440) -Mode click
.\tools\qa\cdp-pc.ps1 -Urls @("/physical-rehabilitation/") -Widths @(1440) -Mode shots -ScrollY @(0,1200,2400)
```

**No existe `lint`, `typecheck` ni `test`.** No los inventes: el build + el harness CDP son la
verificación. El build **rompe** ante un icono Lucide inexistente o una referencia mal formada.

Commit messages: PowerShell 5.1 no tiene heredocs → escribe el texto a un archivo y usa
`git commit -F <archivo>`.

Despliegue: **el push es el deploy.** `git commit` + `git push origin main`; Vercel despliega solo.
Nunca `vercel deploy` a mano. Para comprobar el deploy, usa la API (ver § 9 de `AGENTS.md`) o HTTP,
no la consola.

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
  rutas que existen en `richpages.json` (hoy: `/primary-care/`, `/medical-weight-loss/` + ES). Las
  páginas nuevas que nunca estuvieron en el JSON no lo necesitan.

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
- `src/components/pages/*.astro` — las 7 páginas del grupo (plantilla de facto).
- `src/components/AnchorNav.astro`, `src/components/Icon.astro`, `src/lib/lucide.ts`.
- `src/i18n/{ui,utils,altmap}.ts` — nav, rutas/`APPOINTMENT_URL`, mapa hreflang.
- `src/styles/global.css` — tokens, breakpoints, `@layer`, primitivas del hero.
- `src/pages/[...slug].astro` — catch-all (richpages) + blog.
- `tools/qa/cdp-pc.ps1` — harness de QA.
