# AGENTS.md

Memoria operativa de **palmwellness.center (v2)**. Léelo antes de tocar nada: contiene las
decisiones que ya se tomaron, por qué se tomaron, y los errores que ya se cometieron para no
repetirlos. Si eres un agente nuevo, este archivo más `docs/` te ahorran empezar de cero.

Última verificación de los datos de este archivo: **2026-09-24**.

---

## 0. Qué es esto

Reconstrucción de `palmwellness.center` (hoy un WordPress/Oxygen con una migración Astro débil)
como sitio **Astro 5 estático**, con **reposicionamiento: Atención Primaria pasa a ser el
servicio bandera**; rehabilitación (quiropráctica, fisioterapia, accidentes, masajes,
ultrasonido, ejercicios terapéuticos) baja a sección secundaria. Bilingüe EN/ES.

- **Producción actual (v2):** `https://palmwellnesscenter-site-v2.vercel.app/` — **preview temporal
  en Vercel**.
- **Destino final:** **Cloudflare Pages**, desde el repo antiguo
  `TrueWebmaster6/palmwellnesscenter-site`. Es la decisión clave del proyecto: ver § 9.
- **Dominio final:** `https://www.palmwellness.center/` (todavía sirve el sitio viejo — el
  corte de DNS no se ha hecho).
- **Referencia heredada:** carpeta `legacy/` (clon de `TrueWebmaster6/palmwellnesscenter-site`).
  **Solo lectura y gitignoreada.** Se usa para copiar contenido, nunca para copiar diseño.

---

## 1. Comandos

```powershell
npm run dev -- --host 127.0.0.1   # dev en http://127.0.0.1:4321/
npm run build                      # debe dar 272 páginas
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
salió, usa `vercel ls palmwellnesscenter-site-v2` (ver sección 9) en vez de fiarte de la consola.

**No existe `lint`, `typecheck` ni `test`.** No los inventes. La verificación real es:
`npm run build` (el build **rompe** ante un icono desconocido y ante referencias mal formadas)
más el harness CDP de `tools/qa/` (sección 7).

Regla de oro del build: **272 páginas**. Si el número cambia sin que hayas añadido o quitado
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
`/primary-care/`, `/medical-weight-loss/`, `/physical-rehabilitation/`,
`/car-accident-rehabilitation/`, `/car-accident-treatment/`, `/auto-accident-injury-clinic/`,
`/car-accident-chiropractor/`, `/car-accident-physical-therapy/`, `/whiplash-treatment-tampa/`
y sus espejos ES.

Ojo: **el `Set` `migrated` solo hace falta para rutas que existen en `richpages.json`.** Las otras
cinco páginas del grupo de Atención Primaria (`/iv-therapy/`, `/chronic-condition-management/`,
`/preventive-care/`, `/telemedicine/`, `/membership/` y sus espejos ES) **nunca estuvieron en el
JSON**: venían de `src/data/newPages.ts` con el componente genérico `SimplePage.astro`, y ambos se
borraron al cerrar el grupo. Por eso no aparecen en `migrated` y **no es un olvido**: al no haber
entrada en el JSON, la ruta explícita es la única que existe.

El catch-all **ya no hace sustitución de contenido**: los archivos de sustitución
(`physicalRehabilitation.ts`, `therapeuticExercises.ts`) se eliminaron y esas rutas ya son páginas
propias. `richpages.json` queda solo como archivo histórico del resto.

Hay además un `Set` **`removed`** (distinto de `migrated`) para rutas **retiradas del sitio** que no
se reconstruyen: hoy solo `/business-profiles/`, que deja de generarse y pasa a un **301** hacia el
Brand Hub externo (en `vercel.json` y `public/_redirects`). Cuando una ruta se retire con 301
aprobado, va aquí, no a `migrated`.

### 4.2 i18n

- EN en la raíz (`/primary-care/`), ES bajo `/es/` **con slugs traducidos** (`/es/atencion-primaria/`).
  No hay prefijo para el idioma por defecto (`prefixDefaultLocale: false`).
- `src/i18n/ui.ts` → `nav` (menú + desplegables) y `translations` (diccionario de cadenas).
- `src/i18n/utils.ts` → `useTranslations(lang)`, `routes` (destinos compartidos), `getAltUrl()`,
  **`APPOINTMENT_URL`** (OptiMantra V2, compartido por ambos idiomas), `PHONE_TEL`, `SOCIAL`.
- **`APPOINTMENT_URL` es la única fuente del link de reserva.** No copies la URL en componentes ni
  en datos: **impórtala**. Duplicarla ya costó caro una vez (ver § 6).
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

Precios y servicios: **`docs/optimantra-services.md` es la verdad** (seguro médico real). Es una
captura del portal de pacientes de OptiMantra del cliente (`servicesallV2`, 2026-09-19); el portal
solo expone el catálogo dentro del flujo de paciente, así que ese archivo es la referencia. Si el
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

**El link de reserva se rompe en cuanto lo copias.** En septiembre de 2026 el `lid` de
`APPOINTMENT_URL` estaba corrupto (decodificaba a un base64 inválido: llevaba un `.`) y, además, la
misma URL estaba **hardcodeada en 5 puntos del código y en 82 enlaces del contenido heredado**
(`richpages.json` y 2 posts del blog) apuntando al endpoint viejo V1
(`/optimus/patient/patientaccess/servicesall`). Resultado: el botón de reserva abría el scheduler
en unas páginas y no en otras. **Impórtala siempre.** Si hay que cambiarla, se cambia en
`src/i18n/utils.ts` y en ningún sitio más; si además hay que tocarla en datos que no admiten
`import` (`richpages.json`, markdown), hazlo y verifica con `Select-String` que no queda ninguna
aparición del valor viejo **ni en `src` ni en `dist`**.

**Cuidado con las imágenes que en realidad son "gráficos con texto".**
`osteoporosis-prevention-management-man-knee-pain.webp` (entre otras) lleva un titular impreso y
una banda de marca; al recortarla a una caja de hero o de sección el texto se corta y parece un
error de maquetación. Antes de aprobar un asset, **ábrelo y míralo**: si trae texto incrustado, no
sirve como fotografía de sección.

**Bloque de confianza: la imagen va `object-top`, no `object-center`.** La caja mide solo
240/300px de alto, así que un `object-center` recorta la banda central y **corta la cabeza** de los
sujetos. El `<img>` de "Professional and compassionate care you can trust" lleva siempre
`object-cover object-top lg:h-[300px]` en todas las páginas. Es la única imagen del sitio con esa
regla; el resto de imágenes usa `object-center` (o su focal punto propio).

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

## 8. Estado actual (2026-09-22)

**Hecho**

- **Grupo de Atención Primaria cerrado, EN+ES.** Páginas a medida sobre la referencia visual
  aprobada (Homepage + Primary Care): Homepage, `/primary-care/`, `/medical-weight-loss/`,
  `/iv-therapy/`, `/chronic-condition-management/`, `/preventive-care/`, `/telemedicine/` y
  `/membership/`, con sus espejos ES. Cada una mantiene contenido y fotografía propios; no son un
  template genérico.
- Los hijos de Atención Primaria que vivían anidados bajo `/primary-care/` se **aplanaron a primer
  nivel** (`/membership/`, `/preventive-care/`, `/telemedicine/`, `/chronic-condition-management/`
  + ES). Son rutas **nuevas** (no estaban en el sitemap heredado), así que **no hicieron falta
  redirects** (commits `459c815`, `c81fa38`). `/iv-therapy/` siempre fue de primer nivel.
- **Link de reserva corregido en las 88 apariciones del sitio** (`ec9d1bc`): `lid` corregido en
  `APPOINTMENT_URL`, 5 copias hardcodeadas eliminadas (ahora se importa la constante) y 82 enlaces
  heredados migrados del endpoint V1 al canónico. Verificado en producción (273/273 páginas con el
  link bueno, 0 con el viejo).
- **`src/components/SimplePage.astro` y `src/data/newPages.ts` eliminados**: al cerrar el grupo
  ninguna ruta los importaba. Nadie debe recrearlos.
- **Grupo 2 cerrado, EN+ES.** El hub `/physical-rehabilitation/` (+ `/es/fisioterapia/`) tiene
  componente propio (`PhysicalRehabilitationPage.astro`, commit `1fed483`); `/iv-therapy/` ya estaba
  rediseñada.
- **Familia de accidentes de auto rediseñada, EN+ES** (commits `7e53823` y `b68ac95`):
  `/car-accident-rehabilitation/`, `/car-accident-treatment/`, `/auto-accident-injury-clinic/` y
  `/car-accident-chiropractor/` con sus espejos ES. Las tarjetas de "Treatment options" y
  "Our services" **enlazan** a las páginas de servicio (`/chiropractor/`,
  `/physical-rehabilitation/`, `/massage-therapy/`, …), no son texto suelto.
- **Grupos 6 y 7 cerrados, EN+ES**: `/car-accident-physical-therapy/`
  (+ `/es/fisioterapia-para-accidente-de-auto/`) y `/whiplash-treatment-tampa/`
  (+ `/es/tratamiento-latigazo-cervical-tampa/`), con componente propio cada una. Con esto queda
  cerrada toda la familia de accidentes de auto.
- **Grupo 3 cerrado, EN+ES**: `/chiropractor/` (+ `/es/quiropractico/`) y `/massage-therapy/`
  (+ `/es/terapia-de-masajes/`), con `ChiropractorPage.astro` y `MassageTherapyPage.astro`. Ambas
  estaban en `richpages.json` → sus rutas entraron en el `Set` `migrated`. El hero heredado de
  masaje era un thumbnail de YouTube con texto y marca incrustados: el hero es ahora
  `massage-therapy-session.webp` (y el de quiropráctica
  `integrated-wellness-services-chiropractor.webp`, no el recorte sobre blanco).
- **Grupo 4 cerrado, EN+ES**: `/therapeutic-exercises/` (+ `/es/ejercicios-terapeuticos/`) y
  `/therapeutic-ultrasound-treatment/` (+ `/es/tratamiento-de-ultrasonido-terapeutico/`), con
  `TherapeuticExercisesPage.astro` y `TherapeuticUltrasoundPage.astro`. Ambas estaban en
  `richpages.json` → al `Set` `migrated`. Con esto **se elimina la capa de sustitución de
  contenido** del catch-all: `src/data/therapeuticExercises.ts` se borró (ya no lo importaba nadie)
  y `[...slug].astro` dejó de mapear rutas a datos propios. El asset
  `muscle-strains-treated-physical-therapy.webp` lleva un watermark de marca: no se usa.
- **Grupo 8 cerrado, EN+ES**: `/slip-and-fall-injury-treatment/`
  (+ `/es/rehabilitacion-de-lesiones-por-resbalones-y-caidas/`) con `SlipAndFallInjuryPage.astro`, y
  el clúster de ciudades de accidentes de auto
  `/car-accident-rehabilitation/{seminole-heights,forest-hills,carrollwood}/` (+ espejos ES) como
  **una plantilla** (`CityCarAccidentRehabPage.astro`, prop `city`). Las 8 rutas estaban en
  `richpages.json` → al `Set` `migrated`. El asset `slip-and-fall-injuries-different-types.webp`
  trae texto y marca incrustados: no se usa.
- **Grupo 9 cerrado, EN+ES**: `/about-us/` (+ `/es/acerca-de-nosotros/`) con `AboutPage.astro` (al
  `Set` `migrated`), y `/contact/` (+ `/es/contacto/`) reescrita en sitio en `ContactPage.astro`
  (la ruta ya existía; conserva `ContactForm.astro` y el mapa). Contenido corregido: IV Therapy ya
  no dice "coming soon".
- **`/business-profiles/` retirada** (decisión del cliente, 2026-09-24): ya no se genera (Set
  `removed`) y `vercel.json` + `public/_redirects` la mandan con **301** al Brand Hub externo. El
  enlace "Business Profiles" de `/contact/` apunta ya a ese mismo Brand Hub (como el del footer).
- **Sveltia CMS**: `backend.repo` apunta al repo final `TrueWebmaster6/palmwellnesscenter-site`
  (destino Cloudflare, § 9).
- **Grupo 11 (legal) cerrado, EN+ES**: `/hipaa-policy/` + `/privacy-policy/`
  (+ `/es/politica-de-hipaa/`, `/es/politica-de-privacidad/`) con `LegalPage.astro` (prop `kind`),
  las cuatro al `Set` `migrated`. Son páginas de documento (header + aviso + prosa + tarjeta de
  contacto), sin hero comercial. Corregida la dirección heredada (`8900 N. Armenia Ave` →
  NAP canónico `1004 W Linebaugh Ave Ste A`).
- Header, TopBar y Footer nuevos, con el contenedor único de 1200px; familia única de iconos
  (Lucide), `AnchorNav`, sistema de hover y primitivas de movimiento del hero, todo reutilizable.
- Héroes con imagen a la derecha: entrada completa por desplazamiento de derecha a izquierda (no
  wipe), sombra, leve deriva, corazón pulsante y línea vital dinámica. Para cada nueva foto,
  verifica el `object-position` en el contenedor real; no asumas `center`.
- Todas las páginas del grupo auditadas en EN/ES a 360·412·768·1024·1440: sin overflow, 1 H1, sin
  texto recortado y sin imágenes sin dimensiones. El build sigue produciendo **272 páginas** (273
  menos `/business-profiles/`, retirada — ver § 4.1 y § 9).
- Pencil: frame **`EnF3Q` (Primary Care Desktop)** construido y aprobado por el cliente.
- `AGENTS.md`, `README.md`, `docs/` y el harness CDP versionado en `tools/qa/`.
- Preview **no indexable**: `robots.txt` con `Disallow: /` + header `X-Robots-Tag` (ver § 9).
- Último commit funcional publicado: `3703a3c` (Grupo 9: About + Contact, EN/ES).
  Consulta `docs/PROJECT-HANDOFF.md` (estado canónico) y `docs/SESSION-HANDOFF.md` (brief de
  arranque de sesión) antes de tocar código.

**Siguiente**

1. **Grupo 10** de `docs/redesign-plan.md`: blog (`/news-blog/` + plantilla de post). Es lo único
   que queda (`/business-profiles/` se retiró con 301 al Brand Hub, no se rediseña).
2. **Grupos 1-11 cerrados**: rehabilitación, accidentes, slip & fall + ciudades, About, Contact y
   legal (HIPAA + Privacidad, EN/ES).

**Pendiente / bloqueado**

- No existe fotografía propia de IV Therapy, telemedicina, manejo crónico ni preventiva: esas
  páginas reutilizan fotos aprobadas. Cuando el cliente entregue fotos nuevas, se sustituyen.
  `public/images/placeholders/{iv-therapy,telemedicine,care-team,general}.svg` quedan como
  marcador de esas carencias.
- El logo es `public/images/logo.webp`, 120×60 y de baja resolución. El cliente debe entregar
  SVG o 2×. Es inmutable: no lo rediseñes.
- Las páginas de rehabilitación y el resto del interior aún usan el cuerpo heredado
  (`RichPage`/`RichSection`): ya heredan header/footer e iconos nuevos, pero su contenido no está
  en el lenguaje visual nuevo.
- **El frame `EnF3Q` y el código divergen en 2 puntos**: Pencil todavía muestra el separador del
  bloque de Related Services (eliminado en código) y el orden viejo del nav de anclas. El código
  aprobado prevalece; sincronizar Pencil si se vuelve a editar ese frame.
- **El formulario de contacto está muerto en producción** (§ 10). Es lo único que hoy pierde
  leads de verdad.
- **Sveltia CMS — auth pendiente**: falta desplegar el worker `sveltia-cms-auth` (GitHub OAuth) y
  poner su URL en `backend.base_url` (hoy el placeholder `https://YOUR-SVELTIA-AUTH.workers.dev`).
  Sin eso el editor no puede iniciar sesión. **El "deber ser", paso a paso, está en
  `docs/sveltia-auth-setup.md`.** El resto de `config.yml` ya coincide con `src/content.config.ts`.
- El `noindex` del preview **hay que retirarlo antes de apuntar el dominio real** (§ 9).

---

## 9. Despliegue y privacidad del preview

> ### ⚠️ CLAVE — destino final (no confundir con el preview)
>
> **El sitio de producción se despliega en Cloudflare Pages, desde el repo
> `TrueWebmaster6/palmwellnesscenter-site`.** El despliegue actual en Vercel
> (`ramon-zerpa/palmwellnesscenter-site-v2`) es **solo la etapa de preview/revisión**. Cuando el
> cliente apruebe, el proyecto vuelve a Cloudflare Pages y al repo antiguo.
>
> Consecuencias que hay que tener presentes en todo momento:
> - En Cloudflare **sí funcionan** `public/_redirects`, `public/_headers` y
>   `functions/api/contact.ts` (Pages Functions). En Vercel eran inertes (ver § 10).
> - El mecanismo de redirects/headers de producción es `_redirects`/`_headers`, **no**
>   `vercel.json`. `vercel.json` existe solo para que el preview de Vercel se comporte igual
>   (mismo `noindex` y mismo 301).
> - Sveltia (`public/admin/config.yml`) apunta al repo final `TrueWebmaster6/palmwellnesscenter-site`.
> - Portar el repo a `TrueWebmaster6` no exige reescribir código: es el mismo proyecto.

**Preview actual: Vercel.** Proyecto `palmwellnesscenter-site-v2`
(`prj_l32giQYMr5T4uzRUpAdb9UOWUILL`, equipo `team_20lg2lbCnRL6X3nNjhWG2ovW` = `ramon-zerpa-projects`,
plan **hobby**), framework `astro`, rama de producción `main`. Conectado a
`github.com/ramon-zerpa/palmwellnesscenter-site-v2`. **Esto es temporal** (ver el recuadro CLAVE):
el destino final es Cloudflare Pages + `TrueWebmaster6/palmwellnesscenter-site`.

Comprobar el último deploy sin fiarse de la consola:

```powershell
vercel ls palmwellnesscenter-site-v2
```

Usa el auth del propio CLI, que se auto-refresca. **No llames a la REST API con el
`token` de `auth.json`**: desde Vercel CLI v50 ese archivo guarda un OAuth token
rotativo con `expiresAt`, y cuando está vencido la API responde
`{"invalidToken":true}`. El `.env.local` tampoco sirve para esto: contiene un
`VERCEL_OIDC_TOKEN` efímero de `vercel env pull`/`vercel dev`, no un token de API.

### Este sitio NO debe ser indexado ni visto por nadie más

Es un **preview** para revisión (tú, el jefe, el cliente). No debe aparecer en buscadores ni
ser accesible para terceros.

Estado verificado el 2026-09-20: **contra los buscadores sí está cubierto** (ver "Qué está
aplicado hoy" más abajo). **Contra las personas no hay nada**: `ssoProtection` y
`passwordProtection` siguen vacíos en la API, así que cualquiera con el enlace puede verlo. El
equipo tiene **un solo miembro** (`ramon-zerpa`, OWNER) y plan **hobby**.

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
   **Ojo:** ese mismo archivo lleva ya el bloque `redirects` con el 301 de `/business-profiles/` →
   Brand Hub (ver § 4.1): al revertir el `noindex` borra **solo el bloque `headers`**, no el archivo
   entero.

Comprobar que sigue activo en producción:

```powershell
(Invoke-WebRequest "https://palmwellnesscenter-site-v2.vercel.app/primary-care/" -UseBasicParsing).Headers["X-Robots-Tag"]
(Invoke-WebRequest "https://palmwellnesscenter-site-v2.vercel.app/robots.txt" -UseBasicParsing).Content
```

### Checklist antes de apuntar el dominio real (www.palmwellness.center)

**Destino final: Cloudflare Pages**, donde `public/_headers` y `public/_redirects` **sí** se aplican.

1. Revertir `public/robots.txt` a `Allow: /` + la línea `Sitemap:` (el texto exacto está en el
   comentario del archivo).
2. Quitar el `noindex` del preview. En **Vercel** es borrar **solo el bloque `headers`** de
   `vercel.json` (conserva el bloque `redirects` con el 301 de `/business-profiles/`). En
   **Cloudflare** `vercel.json` no se usa: basta con que `public/_headers` no traiga `X-Robots-Tag`
   (hoy no lo trae) y con haber revertido `robots.txt`.
3. Formulario de contacto: en **Cloudflare funciona solo** (es una Pages Function), pero hay que
   cargar las variables de entorno en el dashboard (§ 10). En Vercel está muerto.
4. Headers de seguridad: en **Cloudflare** los aplica `public/_headers` (HSTS, nosniff, etc.). En
   Vercel habría que portarlos a `vercel.json` solo si se quiere paridad durante el preview.

Saltarse el paso 1 (o no quitar el `noindex`) deja el sitio de producción sin indexar: es el riesgo
principal de esta opción y ya está aceptado por el cliente. **En Cloudflare el peligro real es
`robots.txt`**, porque el `X-Robots-Tag` vive en `vercel.json`, que Cloudflare ignora.

**Por qué no el Tier 1**: habría bloqueado también a las personas (gratis), pero obliga a que el
jefe y el cliente creen cuenta de Vercel y acepten una invitación al equipo. Se eligió el Tier 3
para no añadir esa fricción. Consecuencia aceptada: cualquiera con el enlace puede verlo.

---

## 10. Bugs conocidos en el preview (verificados 2026-09-20)

> **Son artefactos de Vercel, no del código.** En el destino final (**Cloudflare Pages**)
> desaparecen: el formulario funciona (Pages Function) y `_redirects`/`_headers` se aplican. La
> tabla describe lo que se ve **en el preview actual**.

**El sitio se despliega en Vercel, pero el repo trae artefactos de Cloudflare Pages.**
`public/_redirects`, `public/_headers` y `functions/api/contact.ts` son convenciones de
**Cloudflare Pages**; en Vercel son inertes. Verificado contra `palmwellnesscenter-site-v2.vercel.app`:

| Ruta | Resultado | Gravedad |
|---|---|---|
| `POST /api/contact` | **404 — el formulario de contacto está muerto** | **Grave** |
| `/es/` | 404 | Menor (no está en el sitemap heredado; ES home es `/es/inicio/`) |
| `/sitemap.xml` | 404 (existe en `/sitemap-index.xml`) | Menor |
| `/home`, `/feed` | 404 | Menor (rutas de WordPress) |

- El formulario no funciona porque Vercel no compila `functions/` (busca `/api/`). En el destino
  final (Cloudflare Pages) **funciona sin cambios**: `functions/api/contact.ts` es una Pages
  Function. En Vercel necesitaría una función en `/api/`.
- Ni `_redirects` ni `_headers` se aplican: **los headers de seguridad no están activos** en el
  preview. En Cloudflare sí se aplican.
- Ninguna de las rutas caídas está en el sitemap heredado (262 URLs), así que no hay URL
  indexada perdida. Pero **antes de apuntar el dominio real hay que resolverlo**, o el corte de
  DNS deja el formulario y los redirects sin funcionar en el dominio nuevo.
- Variables de entorno que necesita el formulario: `TURNSTILE_SECRET_KEY`, `MAILGUN_API_KEY`,
  `MAILGUN_DOMAIN`, `MAILGUN_FROM`, `MAILGUN_TO` (opcional `MAILGUN_BCC`), más
  `PUBLIC_TURNSTILE_SITE_KEY` para el widget. Hoy el `.env.local` solo tiene un
  `VERCEL_OIDC_TOKEN` efímero (de `vercel env pull`), **no** las claves de Mailgun ni de Turnstile.

---

## 11. No hagas

- No toques `legacy/` (solo lectura) ni `seo/sitemap-baseline.xml`.
- No cambies una URL existente ni añadas un 301 sin aprobación.
- No copies `APPOINTMENT_URL`: impórtala siempre desde `src/i18n/utils.ts` (§ 6).
- No recrees `SimplePage.astro` ni `src/data/newPages.ts`: se eliminaron al cerrar el grupo de
  Atención Primaria y todas sus rutas ya tienen página propia.
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
| `docs/SESSION-HANDOFF.md` | **brief de arranque**: estado, próximo paso, comandos y trampas para pegar en un chat nuevo |
| `docs/redesign-plan.md` | los 12 grupos de migración |
| `docs/PROJECT-HANDOFF.md` | estado aprobado, decisiones recientes, QA y próxima fase |
| `docs/optimantra-services.md` | precios y servicios reales: la verdad del negocio |
| `docs/sveltia-auth-setup.md` | **pendiente**: cómo desplegar el worker de auth de Sveltia y conectar el CMS |
| `docs/ux-ui-brief.md` | brief de diseño que guio Pencil |
| `seo/url-inventory.md` | las 262 URLs heredadas y su política |
| `seo/FULL-AUDIT-REPORT.md`, `seo/ACTION-PLAN.md` | auditorías SEO |
