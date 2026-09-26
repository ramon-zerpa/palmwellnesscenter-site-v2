# Sveltia CMS — autenticación (pendiente)

Estado actual: el editor existe en `public/admin/` (Sveltia cargado desde CDN) y
`public/admin/config.yml` ya apunta al repo final y define las dos colecciones del blog. Lo único
que falta para que **se pueda iniciar sesión y publicar** es la autenticación con GitHub:
desplegar el worker `sveltia-cms-auth` y poner su URL en `backend.base_url`.

Hoy `backend.base_url` sigue siendo el placeholder `https://YOUR-SVELTIA-AUTH.workers.dev`.

---

## Por qué hace falta un "worker de auth"

Sveltia es una app **estática** que se abre en el navegador. Para guardar cambios tiene que commitear
a GitHub, y eso exige OAuth de GitHub. Un OAuth de GitHub necesita un **client secret**, y un secreto
**no puede vivir en el navegador** (cualquiera lo vería). Por eso se despliega un pequeño servidor —
el worker `sveltia-cms-auth` — que:

1. recibe al usuario que quiere entrar,
2. hace el intercambio OAuth con GitHub usando el client secret (guardado como secreto en el worker),
3. devuelve al navegador un token para commitear.

El `base_url` de `config.yml` es, simplemente, la URL de ese worker.

No hay que guardar secretos en el repo: viven en el worker (Cloudflare).

---

## Deber ser (pasos)

### 1. Crear la GitHub OAuth App

En GitHub (con la cuenta/org dueña del repo final, `TrueWebmaster6`):

_Settings → Developer settings → OAuth Apps → New OAuth App_

| Campo | Valor |
|---|---|
| Application name | `Palm Wellness CMS` |
| Homepage URL | `https://www.palmwellness.center/` (o el dominio del preview mientras se revisa) |
| Authorization callback URL | `https://<worker>.<subdominio>.workers.dev/callback` |

Guardar el **Client ID** y generar un **Client Secret**. (El callback apunta al worker, no al sitio;
por eso se puede poner la URL del worker antes de desplegarlo y luego ajustarla.)

### 2. Desplegar el worker en Cloudflare

Usar el proyecto oficial `sveltia/sveltia-cms-auth` (worker de Cloudflare). Dos vías:

- Botón **Deploy to Cloudflare Workers** del repo, o
- `wrangler deploy` con una cuenta de Cloudflare.

Configurar los secretos/variables del worker:

- `GITHUB_CLIENT_ID` = el Client ID del paso 1
- `GITHUB_CLIENT_SECRET` = el Client Secret del paso 1
- `ALLOWED_DOMAINS` (opcional pero recomendado) = dominios desde los que se usará el editor,
  por ejemplo: `palmwellnesscenter-site-v2.vercel.app,www.palmwellness.center`

Anotar la URL resultante, p. ej. `https://palm-wellness-cms-auth.<tu-subdominio>.workers.dev`.

### 3. Apuntar `config.yml` al worker

En `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: TrueWebmaster6/palmwellnesscenter-site
  branch: main
  base_url: https://palm-wellness-cms-auth.<tu-subdominio>.workers.dev   # sin barra final
```

### 4. Permisos

Quien edite en el CMS debe tener **permiso de escritura** en el repo
`TrueWebmaster6/palmwellnesscenter-site` (colaborador con acceso de push).

### 5. Probar

Abrir `https://<dominio>/admin/`, pulsar **Login with GitHub**, crear un borrador y comprobar que
aparece el commit en `main` (y, con el repo correcto, el deploy).

---

## Decisiones y matices

- **Repo final vs. preview.** El CMS apunta al repo **final** `TrueWebmaster6/palmwellnesscenter-site`
  (decisión del cliente, ver `AGENTS.md` § 9). Consecuencia: durante la etapa de preview en Vercel
  (que se construye desde `ramon-zerpa/palmwellnesscenter-site-v2`) un post guardado desde el CMS
  **no** aparecerá en el preview, porque va a otro repo. Si se quiere **probar el editor de punta a
  punta ahora**, hay que apuntar temporalmente `backend.repo` al repo del preview y dar acceso a él;
  antes del lanzamiento debe quedar en `TrueWebmaster6`.
- **`site_url` / `display_url`** en `config.yml` apuntan a `https://www.palmwellness.center` (el
  dominio final). Son solo para la UI del editor; no afectan a la autenticación.
- **Cambio de dominio (preview → final).** El callback OAuth va al worker, así que cambiar el dominio
  del sitio normalmente no rompe el login; solo hay que asegurarse de incluir el dominio nuevo en
  `ALLOWED_DOMAINS` si el worker lo usa.
- **Nada de esto toca el build ni el sitio público.** `/admin/` es una página estática con
  `<meta name="robots" content="noindex">` y el preview entero ya va con `noindex`.

---

## Variables de entorno del *sitio* (no del CMS)

Ojo, no confundir: el **formulario de contacto** necesita sus propias variables en el hosting
(Cloudflare Pages / Vercel), no en el worker de Sveltia. Ver `AGENTS.md` § 10
(`TURNSTILE_SECRET_KEY`, `MAILGUN_*`, `PUBLIC_TURNSTILE_SITE_KEY`).
