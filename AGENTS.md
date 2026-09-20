# AGENTS.md

Memoria operativa de **palmwellness.center (v2)**. Léelo antes de tocar nada: contiene las
decisiones que ya se tomaron, por qué se tomaron, y los errores que ya se cometieron para no
repetirlos. Si eres un agente nuevo, este archivo más `docs/` te ahorran empezar de cero.

Última verificación de los datos de este archivo: **2026-09-20**.

---

## 0. Qué es esto

Reconstrucción de `palmwellness.center` (hoy un WordPress/Oxygen con una migración Astro débil)
como sitio **Astro 5 estático**, con **reposicionamiento: Atención Primaria pasa a ser el
servicio bandera**; rehabilitación (quiropráctica, fisioterapia, accidentes, masajes,
ultrasonido, ejercicios terapéuticos) baja a sección secundaria. Bilingüe EN/ES.

- **Producción actual (v2):** `https://palmwellnesscenter-site-v2.vercel.app/`
- **Dominio final:** `https://www.palmwellness.center/` (todavía sirve el sitio viejo — el
  corte de DNS no se ha hecho).
- **Referencia heredada:** carpeta `legacy/` (clon de `TrueWebmaster6/palmwellnesscenter-site`).
  **Solo lectura y gitignoreada.** Se usa para copiar contenido, nunca para copiar diseño.

---

## 1. Comandos

```powershell
npm run dev -- --host 127.0.0.1   # dev en http://127.0.0.1:4321/
npm run build                      # debe dar 273 páginas
npm run preview
```

### Publicar: el push es el deploy (no hay paso manual)

**Directiva del cliente, no la reinterpretes:**

| Te dice | Haces |
|---|---|
| "commit local" | `git commit` y **nada más**. Sin push, sin deploy. |
| "commit y push" / "sube al remoto" | `git commit` + `git push origin main`. **Vercel despliega solo.** No lances `vercel deploy`: es redundante y crea un deployment huérfano que no corresponde a ningún commit. |
| "deploy" explícito sin push | Raro. Si pasa, pregunta antes: lo normal es que el deploy venga del push. |

La razón por la que ya no hay paso manual: el proyecto está **conectado a GitHub**
(`ramon-zerpa/palmwellnesscenter-site-v2`, framework `astro`, **rama de producción `main`**), así
que un push a `main` produce un deployment de producción automáticamente. Para comprobar que
salió, consulta la API (ver sección 9) en vez de fiarte de la consola.

**No existe `lint`, `typecheck` ni `test`.** No los inventes. La verificación real es:
`npm run build` (el build **rompe** ante un icono desconocido y ante referencias mal formadas)
más el harness CDP de `tools/qa/` (sección 7).

Regla de oro del build: **273 páginas**. Si el número cambia sin que hayas añadido o quitado
una ruta a propósito, es un bug: alguna ruta se perdió o se duplicó.

---

## 2. Entorno (Windows + PowerShell 5.1)

| Hecho | Consecuencia |
|---|---|
| El shell es **PowerShell 5.1**, no bash | Los heredocs (`<<`) **no funcionan**. Para commit messages: escribe el texto a un archivo y usa `git commit -F <archivo>` |
| `localhost` resuelve a `::1` (IPv6) y el dev server escucha solo en IPv4 | El dev server se arranca con `--host 127.0.0.1` y **siempre** se navega a `http://127.0.0.1:4321/`. `localhost` **falla** |
| `rg` (ripgrep) no está instalado | Usa `Select-String` o `Get-Content -LiteralPath` |
| `Set-Content -Encoding UTF8` / `-NoNewline` escriben **BOM** | Nunca los uses para archivos fuente. Usa las herramientas de edición de archivos |
| Rutas con corchetes (`[...slug].astro`) | `$env:GIT_LITERAL_PATHSPECS = "1"` antes de `git` |
| Regex del tipo `[^}]*x[^{]*\{[^}]*\}` sobre archivos grandes | Backtracking catastrófico. Evítalo |
| Hay un **AdBlock360Svc** instalado en la máquina | Contamina las métricas de Lighthouse contra el dominio de producción. Mide siempre contra `127.0.0.1` |
| Chrome | `C:\Program Files\Google\Chrome\Application\chrome.exe` |

---

## 3. Mapa del repositorio

```
astro.config.mjs      site, i18n (en raíz / es en /es/), sitemap, inlineStylesheets: "always",
                      rehypeLocalImageDimensions (añade width/height/loading/decoding a los <img>)
src/pages/            rutas explícitas + catch-all [...slug].astro
src/components/       Header, TopBar, Footer, Icon, AnchorNav, HomePage, pages/*
src/data/             contenido (ver 4.6)
src/i18n/             ui.ts (nav + diccionario), utils.ts (rutas, APPOINTMENT_URL, NAP), altmap.ts (hreflang)
src/content/blog/     posts markdown (en/ y es/), colección Astro
src/styles/global.css design system completo: tokens, breakpoints, base, @layer components
public/               imágenes, fuentes, admin/ (CMS), _headers y _redirects (ver 9)
functions/api/        contact.ts — Cloudflare Pages Function (ver 9)
tools/qa/             harness de verificación CDP (ver 7)
docs/                 plan, precios, brief
seo/                  inventario de URLs, sitemap base, auditorías
design-system/        frames de Pencil (.pen) + assets
legacy/               sitio viejo, solo lectura
```

---

## 4. Arquitectura

### 4.1 Routing y el mecanismo de migración

Hay tres vías de render, y **la tercera es la que importa para saber si una página está
migrada o no**:

1. **Rutas explícitas** en `src/pages/` (`index.astro`, `primary-care/index.astro`, …). Se
   renderizan con su componente dedicado.
2. **Blog**: `src/content/blog/**/*.md` vía la colección, resuelta en `[...slug].astro`.
3. **Todo lo demás**: `src/pages/[...slug].astro`, que lee `src/data/richpages.json`
   (41 entradas) y lo pinta con `RichPage.astro`.

**Cómo se migra una página a diseño nuevo**: **NO se borra la entrada de `richpages.json`.**
Se añade la ruta al `Set` llamado `migrated` dentro de `getStaticPaths()` de `[...slug].astro`.
Así la entrada vieja queda como archivo histórico y el catch-all la ignora. Migradas hoy:
`/primary-care/`, `/es/atencion-primaria/`, `/medical-weight-loss/`, `/es/perdida-de-peso-medica/`.

El catch-all también hace de **capa de sustitución de contenido**: si existe un archivo en
`src/data/` para esa ruta (`physicalRehabilitation.ts`, `therapeuticExercises.ts`), usa ese en
lugar del JSON heredado.

### 4.2 i18n

- EN en la raíz (`/primary-care/`), ES bajo `/es/` **con slugs traducidos** (`/es/atencion-primaria/`).
  No hay prefijo para el idioma por defecto (`prefixDefaultLocale: false`).
- `src/i18n/ui.ts` → `nav` (menú + desplegables) y `translations` (diccionario de cadenas).
- `src/i18n/utils.ts` → `useTranslations(lang)`, `routes` (destinos compartidos), `getAltUrl()`,
  **`APPOINTMENT_URL`** (OptiMantra V2, compartido por ambos idiomas), `PHONE_TEL`, `SOCIAL`.
- `src/i18n/altmap.ts` → mapa hreflang EN↔ES derivado del sitio viejo. Es la fuente del
  switcher de idioma y de los `<link rel="alternate">`. **Si añades una página, añade su par aquí.**

### 4.3 Iconos: una sola familia (Lucide)

- Única fuente: `src/lib/lucide.ts`. Mapea nombres heredados de Font Awesome/WordPress a iconos
  de Lucide, cachea el SVG y **lanza un error en build si el nombre no existe**.
- `src/components/Icon.astro` es el componente real (`name`, `class`, `solid`). `FaIcon.astro`
  es un simple delegado que se conserva para no tocar los sitios que aún lo usan.
- Los únicos SVG que no son de Lucide: los glifos de marca Facebook/Instagram y 1 marca de agua
  decorativa en `RichSection.astro`.
- **Regla:** nunca añadas un `<svg>` a mano. Añade el alias en `lucide.ts` y usa `<Icon>`.

### 4.4 Layout: un solo contenedor

**Una sola fila de contenido** para topbar, header, todas las secciones y el footer: la clase
`.shell` (`max-width: var(--shell-max)` = **1200px**; `padding-inline` 1.25rem, 2rem desde `lg`).
Caja 1200 / contenido 1136. Nunca metas un contenedor propio dentro de otro: anida solo el
padding, no el ancho.

Patrón de página (el que hay que replicar en las páginas siguientes): `Layout` → `TopBar` →
`Header` → `main` → `Footer`. La página vive en `src/components/pages/*.astro`, recibe `lang`, y
las rutas EN/ES son **wrappers de ~23 líneas** que solo la importan y le pasan el idioma.

### 4.5 Tokens y breakpoints (`src/styles/global.css`)

Paleta: `blue #2a67b1`, `blue-deep #164e93`, `blue-dark #165096`, `blue-tint #afcbff`,
`blue-pale #d7f9ff`, `green #78a74b`, `green-dark #558429`, `green-bright #c4e038`,
`ink #374047`, `body #606e79`, `muted #677079`, `line #dee1e3`, `bg-alt #f9f9fa`,
`danger #dc2626`, `footer-bg #123252`.
Radios: sm 6 / md 10 / lg 16 / xl 20 px. Fuentes: **Figtree** (títulos) + **Noto Sans** (cuerpo),
autoalojadas y precargadas.

Breakpoints declarados: `sm 40rem` · `md 48rem` · `lg 64rem` · `xl 80rem`.
**No introduzcas media queries a otros valores.** Los anchos de QA (360·390·412·768·1024·1440)
son para capturas, no son breakpoints.

Dos cosas de `global.css` que parecen detalles y no lo son:

- `@import "tailwindcss" source(none)` + `@source "../"`: Tailwind escanea **solo código de
  aplicación**. Sin esto escanea artefactos guardados en `seo/` y `docs/`, y las cadenas que
  encuentra ahí inyectan utilidades muertas (fue lo que hizo ambigua la clase `.container`).
- `.shell` y `.prose` viven en `@layer components`, y los defaults de elementos en
  `@layer base`. **No los saques de su capa**: sin capa, esas reglas ganan a *todas* las
  utilidades de Tailwind y luego no hay forma de sobreescribir un `max-w-*` o un color puntual.

### 4.6 De dónde sale el contenido

Precios y servicios: **`docs/optimantra-services.md` es la verdad** (seguro médico real). Si el
texto heredado contradice ese archivo, gana el archivo. Los números que más se equivocan en el
contenido viejo: membresía **$99 inicial + $39/mes**, oficina $39, paciente nuevo $65,
telehealth $55, **IV Therapy está ACTIVO** (el sitio viejo dice "coming soon").

---

## 5. Reglas vinculantes (directivas del cliente, no las reinterpretes)

1. **Las URLs no cambian.** Se conservan *todas* las del sitemap heredado (`seo/sitemap-baseline.xml`,
   262 URLs indexadas). Solo se añaden nuevas. Consolidar o retirar exige un 301 y aprobación
   previa. (`/pricing/` y `/locations/` se retiraron ya, por decisión del cliente. No los recrees.)
2. **Inmutable:** logo, NAP (1004 W Linebaugh Ave Ste A, Tampa, FL 33612 · (813) 443-5370 ·
   fax (813) 443-5604), licencias HCCA10302 y MM28422, y los profesionales.
3. **Móvil: no hay frame de Pencil aparte.** Se diseña una vez y **Tailwind hace el responsive**.
   "Hit once, build code".
4. **Verifica el responsive, no lo asumas.** Captura de verdad a 360/390/412/768/1024/1440.
   El error histórico de este proyecto fue dar por hecho que Tailwind resolvía el móvil.
5. **Sin deuda técnica.** Si algo hay que hacerlo bien, se hace bien ahora. "Tailwind hace las
   cosas bien a la larga".
6. **Ritmo de fondos:** cada ~3 secciones claras, una sección oscura.
7. **Nav de anclas:** se queda en el flujo, después del hero, y se pega **a ras** bajo el nav
   principal (`lg:sticky lg:top-[70px]`; el header mide 70px en `lg` y 64px por debajo).
   **Nunca escribe el hash en la URL.** En móvil las pills hacen wrap, no scroll horizontal.
8. **Hover:** un solo lenguaje. Una sombra negra sutil
   `0 10px 24px -14px rgba(0,0,0,0.22)` y 2px de elevación, aplicada a cosas accionables y a la
   tarjeta que precede a una acción. **Nunca anidada** (si la tarjeta reacciona, el botón de
   dentro no; si el tile es decorativo, no reacciona).
9. **Hero:** en todas las páginas, contenido a la IZQUIERDA e imagen a la DERECHA.

---

## 6. Gotchas (error → causa → regla)

**Iconos: el comentario de licencia de `lucide-static`.** Los archivos empiezan con
`<!-- @license … -->`, y ese `-->` contiene un `>`. Cortar el SVG desde el primer `>` metía el
`<svg>` entero dentro y generaba un **`<svg>` anidado**; el parser entraba en modo SVG y se
**comía silenciosamente los nodos de texto hermanos** (rótulos de botones, items de listas).
Ya está resuelto en `lucide.ts` (se quitan los comentarios y se ancla en `<svg>`). Si vuelves a
leer iconos a mano, no repitas el `indexOf(">")`.

**`clip-path` recorta la `box-shadow` del propio elemento.** Por eso el hero son **dos** nodos:
`.hero-media-frame` lleva el radio y la sombra en reposo, y `.hero-media` lleva el `overflow` y
el wipe de entrada. Poner la sombra en el nodo que recorta no se ve.

**Banda oscura: usa `blue-deep` (#164e93), NUNCA `blue` (#2a67b1).** Medido: cuerpo `blue-tint`
sobre `blue-deep` da **5.03:1** (pasa AA); sobre `blue` da **3.49:1** (falla). Dentro de una
banda oscura, adapta los colores: títulos blancos, cuerpo `blue-tint`, pill de eyebrow blanco/12%,
hairlines blanco/15%, tiles de icono blanco/10%, checks `green-bright`.

**El nav completo no cabe por debajo de `xl`.** Necesita 966px de contenido en EN y 1053px en ES.
Con 6 items de primer nivel no se puede bajar el breakpoint del menú.

**Verifica el desbordamiento horizontal, no lo mires.** `document.documentElement.scrollWidth - innerWidth`
tiene que dar 0 *y* no debe haber elementos con `getBoundingClientRect().right > innerWidth`
(ignorando los que están dentro de un scroller). El harness ya lo comprueba.

**Pencil (MCP):** `TakeScreenshot` devuelve **vacío si se pide en el mismo `execute` que una
mutación** — captura siempre en una llamada aparte. Y `pencil_browser` falla de forma
intermitente con `MCP error -32603: A capture is already running`; cuando pasa, usa el harness CDP.

---

## 7. Verificación: el harness CDP (`tools/qa/`)

Estos scripts abren Chrome headless por DevTools Protocol y miden la página real. Son la
herramienta de QA del proyecto (antes vivían en `%TEMP%`, ahora versionados).

```powershell
# Auditoría responsive: overflow, shell, header, nav de anclas, h1, secciones,
# imágenes sin dimensiones, taps pequeños, texto recortado
.\tools\qa\cdp-pc.ps1 -Urls @("/primary-care/","/es/atencion-primaria/") `
                      -Widths @(360,412,768,1024,1440) -Mode audit

.\tools\qa\cdp-pc.ps1 -Mode motion  # comprueba animaciones + prefers-reduced-motion
.\tools\qa\cdp-pc.ps1 -Mode click   # click real en el nav de anclas: ¿hash en la URL? ¿offset?
.\tools\qa\cdp-pc.ps1 -Mode shots -ScrollY @(0,1200,2400) -PreJs "<js>"   # capturas a %TEMP%\pc-*.png
```

Extra: `cdp-measure.ps1` (ejecuta un probe JS de `tools/qa/probes/` con `-ExprFile`),
`cdp-audit.ps1`, `cdp-fingerprint.ps1`, `cdp-shots.ps1`.

Requisito: tener el dev server levantado. Los probes de `probes/` son de un solo uso, para
mediciones concretas (deriva del hero, latido, alineación, prose).

---

## 8. Estado actual (2026-09-20)

**Hecho**

- Grupo 1 completo: `/primary-care/` y `/medical-weight-loss/` rediseñados a medida, EN+ES.
- Header, TopBar y Footer nuevos, con el contenedor único de 1200px.
- Familia única de iconos (Lucide), extracción de `AnchorNav`, sistema de hover y primitivas de
  movimiento del hero, todo reutilizable.
- Primera página del patrón nuevo verificada de punta a punta (build, 2 idiomas × 5 anchos,
  reduced-motion, click del nav de anclas).
- Pencil: frame **`EnF3Q` (Primary Care Desktop)** construido y aprobado por el cliente.
- `AGENTS.md`, `README.md` y el harness CDP versionado en `tools/qa/`.
- Preview **no indexable**: `robots.txt` con `Disallow: /` + header `X-Robots-Tag` (ver § 9).

**Siguiente**

1. **Homepage** (`src/components/HomePage.astro`): aplicar el mismo patrón (bandas oscuras,
   hover, movimiento del hero, `AnchorNav`).
2. Grupos 2-12 de `docs/redesign-plan.md` (rehabilitación, accidentes, legal, blog…).

**Pendiente / bloqueado**

- `public/images/placeholders/{iv-therapy,telemedicine,care-team,general}.svg` — el cliente debe
  entregar imágenes reales.
- El logo es `public/images/logo.webp`, 120×60 y de baja resolución. El cliente debe entregar
  SVG o 2×. Es inmutable: no lo rediseñes.
- Las páginas del interior aún usan el cuerpo heredado (`RichPage`/`RichSection`): ya heredan
  header/footer e iconos nuevos, pero su contenido no está en el lenguaje visual nuevo.
- **El frame `EnF3Q` y el código divergen en 2 puntos**: Pencil todavía muestra el separador del
  bloque de Related Services (eliminado en código) y el orden viejo del nav de anclas. Sincronizar
  si el diseño se va a seguir usando como referencia.
- **El formulario de contacto está muerto en producción** (§ 10). Es lo único que hoy pierde
  leads de verdad.
- El `noindex` del preview **hay que retirarlo antes de apuntar el dominio real** (§ 9).

---

## 9. Despliegue y privacidad del preview

**Vercel, no Cloudflare.** Proyecto `palmwellnesscenter-site-v2`
(`prj_l32giQYMr5T4uzRUpAdb9UOWUILL`, equipo `team_20lg2lbCnRL6X3nNjhWG2ovW` = `ramon-zerpa-projects`,
plan **hobby**), framework `astro`, rama de producción `main`. Conectado a
`github.com/ramon-zerpa/palmwellnesscenter-site-v2`.

Comprobar el último deploy sin fiarse de la consola:

```powershell
$tok = (Get-Content "$env:APPDATA\com.vercel.cli\Data\auth.json" -Raw | ConvertFrom-Json).token
$h = @{ Authorization = "Bearer $tok" }
$p = Invoke-RestMethod "https://api.vercel.com/v9/projects/palmwellnesscenter-site-v2" -Headers $h
Invoke-RestMethod "https://api.vercel.com/v6/deployments?projectId=$($p.id)&limit=3&target=production" -Headers $h |
  ForEach-Object { $_.deployments | Select-Object url, readyState, created }
```

### Este sitio NO debe ser indexado ni visto por nadie más

Es un **preview** para revisión (tú, el jefe, el cliente). No debe aparecer en buscadores ni
ser accesible para terceros. Hoy **no hay ninguna protección activa**: `ssoProtection` y
`passwordProtection` están vacíos en la API, y el sitio es público en
`https://palmwellnesscenter-site-v2.vercel.app/`. El equipo tiene **un solo miembro**
(`ramon-zerpa`, OWNER) y plan **hobby**.

**Estado: aplicado el Tier 3** (decisión del cliente, 2026-09-20). Los otros tres siguen
disponibles por si más adelante hace falta bloquear también el acceso humano.

Opciones evaluadas:

| Tier | Solución | Coste | Protege de | Fricción |
|---|---|---|---|---|
| **1** | **Vercel Authentication** con scope **All Deployments** (Settings → Deployment Protection) | **gratis en todos los planes** | todo el mundo, buscadores incluidos: sin sesión se recibe 401 | cada revisor necesita cuenta de Vercel + invitación al equipo |
| 2 | **Password Protection** | Pro, **$20/mes por proyecto** (no existe en Hobby) | cualquiera sin la contraseña | ninguna: se comparte una contraseña |
| **3** | **APLICADO** — `robots.txt` con `Disallow: /` + header `X-Robots-Tag: noindex` en `vercel.json` | gratis | buscadores. **No** de una persona con el enlace | hay que retirarlo antes del lanzamiento (ver checklist) |
| 4 | Mover el preview a **Cloudflare Pages + Cloudflare Access** | gratis (Zero Trust, hasta 50 usuarios) | cualquiera sin un correo autorizado (login por código de un solo uso) | migrar el hosting. A cambio revive el formulario de contacto, los `_redirects` y los `_headers`, hoy inertes |

**El Tier 1 es la respuesta correcta por defecto** y es reciente: hasta el **2026-09-09** proteger
un dominio de producción exigía el add-on *Advanced Deployment Protection* de **$150/mes**; desde
esa fecha Vercel Authentication con scope *All Deployments* es gratis en todos los planes. No
requiere tocar código, no deja `noindex` en el HTML y por tanto **no hay nada que recordar
deshacer el día del lanzamiento**.

El Tier 1 sigue siendo la opción correcta si algún día hay que bloquear también a las personas, y
es reciente: hasta el **2026-09-09** proteger un dominio de producción exigía el add-on
*Advanced Deployment Protection* de **$150/mes**; desde esa fecha Vercel Authentication con scope
*All Deployments* es gratis en todos los planes y no requiere tocar código.

### Qué está aplicado hoy (Tier 3)

Dos piezas, y **las dos** hay que revertir antes de apuntar el dominio real:

1. `public/robots.txt` → `Disallow: /`. El procedimiento de reversión está escrito dentro del
   propio archivo, para que quien lo abra lo vea antes de tocarlo.
2. `vercel.json` → header `X-Robots-Tag: noindex, nofollow, noarchive` en `/(.*)`. Es JSON
   estricto, **no admite comentarios**, así que la advertencia vive aquí y en `robots.txt`.

Comprobar que sigue activo en producción:

```powershell
(Invoke-WebRequest "https://palmwellnesscenter-site-v2.vercel.app/primary-care/" -UseBasicParsing).Headers["X-Robots-Tag"]
(Invoke-WebRequest "https://palmwellnesscenter-site-v2.vercel.app/robots.txt" -UseBasicParsing).Content
```

### Checklist antes de apuntar el dominio real (www.palmwellness.center)

1. Revertir `public/robots.txt` a `Allow: /` + la línea `Sitemap:` (el texto exacto está en el
   comentario del archivo).
2. Borrar `vercel.json`, o solo su bloque `headers`.
3. Resolver el formulario de contacto: **sigue muerto** (§ 10).
4. Portar a `vercel.json` los headers de seguridad de `public/_headers` (HSTS, nosniff, etc.),
   hoy inertes.

Saltarse el paso 1 o el 2 deja el sitio de producción con `noindex`: **no se indexaría nunca**.
Es el riesgo principal de esta opción y ya está aceptado por el cliente.

**Por qué no el Tier 1**: habría bloqueado también a las personas (gratis), pero obliga a que el
jefe y el cliente creen cuenta de Vercel y acepten una invitación al equipo. Se eligió el Tier 3
para no añadir esa fricción. Consecuencia aceptada: cualquiera con el enlace puede verlo.

---

## 10. Bugs conocidos en producción (verificados 2026-09-20)

**El sitio se despliega en Vercel, pero el repo trae artefactos de Cloudflare Pages.**
`public/_redirects`, `public/_headers` y `functions/api/contact.ts` son convenciones de
**Cloudflare Pages**; en Vercel son inertes. Verificado contra `palmwellnesscenter-site-v2.vercel.app`:

| Ruta | Resultado | Gravedad |
|---|---|---|
| `POST /api/contact` | **404 — el formulario de contacto está muerto** | **Grave** |
| `/es/` | 404 | Menor (no está en el sitemap heredado; ES home es `/es/inicio/`) |
| `/sitemap.xml` | 404 (existe en `/sitemap-index.xml`) | Menor |
| `/home`, `/feed` | 404 | Menor (rutas de WordPress) |

- El formulario no funciona porque Vercel no compila `functions/` (busca `/api/`). Necesita:
  una función en `/api`, o volver a Cloudflare Pages como destino.
- Ni `_redirects` ni `_headers` se aplican: **los headers de seguridad no están activos**.
- Ninguna de las rutas caídas está en el sitemap heredado (262 URLs), así que no hay URL
  indexada perdida. Pero **antes de apuntar el dominio real hay que resolverlo**, o el corte de
  DNS deja el formulario y los redirects sin funcionar en el dominio nuevo.
- Variables de entorno que necesita el formulario: `TURNSTILE_SECRET_KEY`, `MAILGUN_API_KEY`,
  `MAILGUN_DOMAIN`, `MAILGUN_FROM`, `MAILGUN_TO` (opcional `MAILGUN_BCC`), más
  `PUBLIC_TURNSTILE_SITE_KEY` para el widget. Hoy el `.env.local` solo tiene el token de Vercel.

---

## 11. No hagas

- No toques `legacy/` (solo lectura) ni `seo/sitemap-baseline.xml`.
- No cambies una URL existente ni añadas un 301 sin aprobación.
- No reescribas el logo, el NAP, las licencias ni los profesionales.
- No añadas un segundo contenedor ni un ancho distinto de `.shell`.
- No añadas breakpoints fuera de los 4 declarados.
- No añadas `<svg>` a mano ni fuentes de iconos distintas de Lucide.
- No "arregles" el interfaz móvil con scroll horizontal donde el patrón dice wrap.
- No hagas `git commit` ni deploy sin que te lo pidan.
- No lances `vercel deploy` a mano: el push a `main` ya produce el deployment de producción.
- No añadas scripts de `lint`/`test` inventados: no existen y el build es la verificación.

---

## 12. Documentos hermanos

| Archivo | Contenido |
|---|---|
| `README.md` | visión general, stack, cómo arrancar |
| `docs/redesign-plan.md` | los 12 grupos de migración |
| `docs/optimantra-services.md` | precios y servicios reales: la verdad del negocio |
| `docs/ux-ui-brief.md` | brief de diseño que guio Pencil |
| `seo/url-inventory.md` | las 262 URLs heredadas y su política |
| `seo/FULL-AUDIT-REPORT.md`, `seo/ACTION-PLAN.md` | auditorías SEO |
