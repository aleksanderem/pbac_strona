# Deployment Lessons — PBAC (Next.js + Payload CMS on RunCloud)

A field report from migrating a static Next.js site to Payload CMS and deploying
it as a managed Node app on RunCloud (server: `atlas`, IP `138.201.133.106`,
domain `pbac.pl`). Postgres lives off-server at `46.225.152.204:5433`.

Captures every gotcha that cost real time so the next deploy of this stack is
linear rather than archaeological.

## Stack target

- Next.js **15.4.11** (NOT 16 — see Payload compat below)
- React 19.2
- Payload CMS 3.84 (Postgres adapter, lexical editor, PL/EN i18n)
- Node **22.x** (Payload's ESM tsx loader needs ≥20.10; 22 is the safest)
- RunCloud webapp `pbac` (id 2860266) with stack `hybrid` (default for "custom")
- nginx-rc (`/usr/local/sbin/nginx-rc`) reverse-proxy → Node :3000
- PM2 running as `runcloud` user, autostarted via systemd unit `pm2-runcloud.service`
- Let's Encrypt SSL via RunCloud API, both `pbac.pl` and `www.pbac.pl` in SAN

## Phase 0 — converting static export to dynamic site

**Gotcha 1: `output: "export"` blocks Payload entirely.**
The original `next.config.ts` had `output: "export"` for static-only deploys.
Payload's `/admin` and `/api/*` routes are SSR/dynamic. Static export forbids
them. Removed it. Public pages still SSG by default (the build output proves
it: `○ Static`, `● SSG`, `ƒ Dynamic` — admin/api are the only `ƒ`).

**Gotcha 2: route groups must own root layouts.**
Per Payload Next 15 docs the structure must be:
- `app/(frontend)/layout.tsx` — your site's root layout, owns `<html><body>`
- `app/(frontend)/page.tsx`, `app/(frontend)/blog/...` etc.
- `app/(payload)/layout.tsx` — Payload's generated `RootLayout`, also owns `<html><body>`
- `app/(payload)/admin/[[...segments]]/page.tsx`, `app/(payload)/api/...`
- **NO top-level `app/layout.tsx`**

If you keep `app/layout.tsx`, Next nests its `<html>` inside Payload's `<html>`.
That nested invalid HTML manifests as React #418 hydration error in `/admin`
(visible in production console as `Minified React error #418 args[]=text&args[]=`).
Symptom is silent because admin still renders — but reconciliation is broken
and any state-driven action can fail.

When restructuring, paths that need fixing:
- `import "./globals.css"` → `import "../globals.css"` (file stays at top-level `app/`)
- Top-level `app/` keeps shared metadata only: `globals.css`, `favicon.ico`,
  `manifest.ts`, `robots.ts`, `sitemap.ts`, `llms.txt`

## Phase 1 — Payload setup

**Gotcha 3: Payload 3 ESM tsx loader needs Node 22.**
On Node 20.19 you get `TypeError: Illegal constructor at new CacheStorage`
because Node's bundled `caches` global collides with `undici`'s `CacheStorage`.
Workaround attempts with `npm i undici@latest` don't help — Payload bundles its
own copy of undici nested under `node_modules/payload/node_modules/undici`.
Just install Node 22 via nvm and pin via `.nvmrc` + `package.json` engines.

**Gotcha 4: package.json must be `"type": "module"`.**
Payload's CLI (`payload generate:importmap`, `payload migrate`, etc.) uses tsx
in ESM mode. Without `"type": "module"` you get
`ERR_MODULE_NOT_FOUND` on `payload.config.ts` imports. Add it. Verify the rest
of the codebase has no `require()` calls (Next.js codebase usually doesn't).

**Gotcha 5: payload.config.ts imports must be extensionless.**
Tried `import { Users } from "./payload/collections/Users.js"` to satisfy ESM
runtime — that breaks Turbopack/webpack which want extensionless paths from
TypeScript bundler-mode resolution. Conversely, extensionless imports work in
both because tsx + Next handle both. Default to no extension.

**Gotcha 6: `i18n.supportedLanguages` keys must point to imported translation modules.**
Setting `{ pl: undefined, en: undefined }` errors with
`Language pl not supported`. Must be:
```ts
import { pl } from "@payloadcms/translations/languages/pl";
import { en } from "@payloadcms/translations/languages/en";
// ...
i18n: { supportedLanguages: { pl, en }, fallbackLanguage: "pl" }
```

**Gotcha 7: Payload pg pool default of 10 × N build workers > Postgres `max_connections`.**
Build SSGs 173 pages with 8 parallel workers, each spinning up a Payload
instance with default pool size 10 = 80 connections. Postgres default
`max_connections = 100`, often less for shared DBs. Build fails halfway with
`FATAL: sorry, too many clients already`. Cap pool tight in `payload.config.ts`:
```ts
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
    max: 3,
    idleTimeoutMillis: 10_000,
  },
})
```

**Gotcha 8: SSG over WAN-distant DB needs longer timeout.**
Default `staticPageGenerationTimeout` is 60s. With Postgres on a different
host than the build runner (50ms+ latency) and 173 pages each doing a few
queries, individual pages exceed 60s and the build aborts with
`Failed to build /produkty/.../slug after 3 attempts`. Bump to 5 min:
```ts
const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 300,
};
```

**Gotcha 9: `experimental.workerThreads: false` + `experimental.cpus: 1` breaks build.**
Tried serializing build workers to reduce DB contention; got
`SyntaxError: Unexpected end of JSON input` at "Collecting page data".
Drop both. Pool cap (Gotcha 7) handles contention without breaking the worker IPC.

**Gotcha 10: Next 16 + Payload = officially unsupported.**
Payload at deploy time was 3.84. Its peer is
`>=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.2 <17.0.0`.
Next 16.1.x is in the gap. `next dev` and `next build` both warn
`Payload: You are using an unsupported Next.js 16 version`. The admin
mostly works but throws React #418 on hydration intermittently. Stay on 15.4.x.

If you're on Next 16: `npm i --legacy-peer-deps next@~15.4` pulls the highest
compatible 15.4 patch (15.4.11 at write-time).

**Gotcha 11: Turbopack production build only works on Next ≥ 16.1.**
If you keep `next build --turbopack` after downgrading to 15.4 you get:
`Error: Payload: Your Next.js version does not support using Turbopack for
production builds. The minimum Next.js version required for Turbopack Builds
is 16.1.0`. Drop the `--turbopack` flag. Webpack build is fine on 15.4.

**Gotcha 12: cleanup after npm install --legacy-peer-deps may leave empty dirs.**
After downgrading `next`, `node_modules/payload/` ended up as an empty
directory and the build complained `Module not found: 'payload'`. `rm -rf
node_modules package-lock.json && npm install --legacy-peer-deps` from scratch
fixed it. Cheaper than diagnosing the stale tree.

## Phase 2 — content migration

**Gotcha 13: Polish slugs need explicit ASCII transliteration.**
`articles[].category` are Polish strings ("Klimatyzatory", "Pompy ciepła").
When generating slugs you must strip diacritics (`ą→a, ć→c, ę→e, ł→l, ń→n,
ó→o, ś→s, ż→z, ź→z`) before `replace(/[^a-z0-9]+/g, "-")`. Otherwise you get
URL-unsafe slugs and broken Postgres unique indexes.

**Gotcha 14: dotenv must run before payload.config import in scripts.**
Static `import` is hoisted, so this is wrong:
```ts
import "dotenv/config";
import config from "../payload.config";  // evaluates BEFORE dotenv loads .env.local
```
Use dynamic import:
```ts
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });
const { default: config } = await import("../payload.config.js");
```

**Gotcha 15: Payload local API needs both `DATABASE_URI` and `PAYLOAD_SECRET`.**
Without `PAYLOAD_SECRET` you get
`Error: missing secret key. A secret key is needed to secure Payload`.
Generate with `openssl rand -base64 32`. Hold it in `.env.local` (gitignored)
plus the production secrets file.

**Gotcha 16: server-only data in server components, prop-drilling for clients.**
After the data moved from `lib/*.ts` (statically imported) to Payload (DB
fetch), every consumer needs adjustment:
- Server components: `import { ... } from "@/lib/cms"` and become `async`,
  add `await` to call sites.
- Client components (`"use client"`): cannot fetch from Payload directly
  during render. Wrap them in a thin async server component that fetches
  data and passes it as props. We renamed the original to `*-view.tsx`
  (kept the `"use client"`) and replaced the export with a server wrapper
  that calls `getAllTestimonialsAsync()`/etc. and renders `<View
  testimonials={...} />`. Same pattern applied to `testimonials-section`,
  `contact-section`, `cta-section`, `navbar` (renamed core to `navbar-client.tsx`).

This keeps client-side bundle small and CMS edits flow into client islands
without giving them Payload runtime.

## Phase 3 — hydration mismatches

**Gotcha 17: `Number.toLocaleString("pl-PL")` and `Date.toLocaleDateString("pl-PL")`
return different bytes on Node vs browser ICU.**
Node 22's ICU emits `1 234` (regular space), Chrome's emits `1 234`
(narrow no-break space `U+202F`). Server-rendered HTML and client React render
disagree → React #418. Build deterministic helpers:
```ts
export function formatPLN(value: number): string {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const PL_MONTHS = ["stycznia", "lutego", ...];
export function formatPLDate(input: Date | string): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return `${d.getUTCDate()} ${PL_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
```
Find and replace every `toLocaleString("pl-PL")` and `toLocaleDateString("pl-PL", ...)`
in the codebase. Use UTC accessors (`getUTCDate` etc.) so server + client
agree regardless of Node TZ vs browser TZ.

**Gotcha 18: web components rendered server-side fail to hydrate cleanly.**
The previous setup had `<easier-icon name="..." />` (IconsEasier SDK web
component) in JSX. Server emitted `<easier-icon>` tags, the SDK loaded
`afterInteractive` and replaced them with `<svg>`. When React's reconciler
ran during hydration it saw the swapped DOM and threw #418. Replaced every
`<easier-icon>` with Lucide React equivalents and removed the SDK script.

**Gotcha 19: chunk hash equality ≠ "old code is being served".**
Saw the same `b343536b571a1e41.js` chunk hash on multiple deploys and
thought rebuild had failed. It hadn't — that hash was for the React framework
chunk whose content didn't change. The actually-changed chunks had different
hashes. Always grep the *served HTML* for old patterns (e.g. the previous
literal `<easier-icon>`) to confirm the deploy landed.

## Phase 4 — RunCloud deployment via API

**Gotcha 20: RunCloud v3 API does NOT cover deploy script or autoDeploy.**
`POST /servers/{id}/webapps/{appId}/git` accepts `{ provider, repository,
branch }` but silently ignores `deployScript` and `autoDeploy` fields. v3
supports GET + DELETE on `/git/script` and `/git/auto-deploy` — for read and
nuke, not write. To set them:
```
PATCH /api/v2/servers/{id}/webapps/{appId}/git/{gitId}/script
Content-Type: application/json
{ "deployScript": "<bash>", "autoDeploy": true }
```
v2 endpoint, undocumented in the v3 docs page. Required body fields:
`deployScript` and `autoDeploy` (both must be present together, even on
update).

**Gotcha 21: GitHub deploy key is per-system-user.**
RunCloud generates a deploy key for the system user that owns the webapp
(usually `runcloud` for the default user). Fetch via:
```
GET /api/v3/servers/{id}/users/{userId} → field "deploymentKey"
```
Then `gh api -X POST /repos/<owner>/<repo>/keys -f title="..." -f key="..."`.
Without this, `POST /git` returns
`GIT Authentication error or unknown branch or you don't register your
deployment key to github`.

**Gotcha 22: GitHub auto-deploy webhook URL.**
RunCloud's `autoDeploy: true` does not register the webhook on GitHub for you
unless you connected via OAuth in the panel. With API-driven setup you must
manually create the GitHub webhook:
```
URL:          https://manage.runcloud.io/webhooks/git/{pullKey1}/{pullKey2}
Content-type: application/json
Events:       push
```
`pullKey1` and `pullKey2` come from `GET /servers/{id}/webapps/{appId}`.

**Gotcha 23: `POST /api/v3/servers/{id}/webapps/custom` defaults stack to `hybrid`.**
That gives a webapp ready for PHP-FPM via Apache backend on port 81. There's
no API field to override the stack to "static" or anything Node-friendly.
Workaround: live with hybrid and override nginx routing per-webapp (see
Gotcha 27).

**Gotcha 24: `appwrite sites update` (irrelevant — left over) wipes VCS link.**
`update` on Appwrite Sites without `--installation-id`, `--provider-repository-id`,
`--provider-branch` resets them to empty strings (Laravel-style PUT semantics).
RunCloud may or may not have the same trap; safer to always pass the full
payload on every `PATCH/PUT` call regardless of which fields you actually
intended to change.

**Gotcha 25: Appwrite Sites self-hosted has 30s sync timeout default.**
Unrelated to RunCloud, but came up while trying Appwrite first: build of any
non-trivial Next.js app with Payload exceeds the 30s function execution limit;
bumping to `timeout: 900` works on the Sites object but the actual builder
container OOM-killed the whole tunnel anyway. Self-hosted Appwrite Sites
isn't a good fit for Next 16 + Payload as of mid-2026.

## Phase 5 — nginx routing on RunCloud "hybrid" stack

**Gotcha 26: Default `proxy_pass http://backend;` in `pbac.d/proxy.conf` points to Apache:81.**
RunCloud's hybrid stack defines a global `upstream backend { server 127.0.0.1:81; }`
in `nginx.conf` and every webapp's `pbac.d/proxy.conf` ends with
`proxy_pass http://backend;`. So out of the box your webapp serves Apache,
not Node.

Don't edit `nginx.conf` (changing `upstream backend`) — affects ALL webapps.
Don't edit `pbac.d/proxy.conf` either — RunCloud's panel regenerates it on
PHP/SSL/stack changes.

**Gotcha 27: Use per-webapp `extra.d/*.conf` includes to redirect to Node.**
RunCloud's `pbac.d/main.conf` exposes these include hooks (none of the rest
are documented in the public API):
```
include /etc/nginx-rc/extra.d/pbac.location.main-before.*.conf;   # before location blocks
include /etc/nginx-rc/extra.d/pbac.location.root.*.conf;          # inside location /
include /etc/nginx-rc/extra.d/pbac.location.html.*.conf;          # inside .html regex
include /etc/nginx-rc/extra.d/pbac.location.static.*.conf;        # inside static-asset regex
include /etc/nginx-rc/extra.d/pbac.location.main.*.conf;          # at server level after locations
include /etc/nginx-rc/extra.d/pbac.location.proxy.*.conf;         # inside @proxy named location
include /etc/nginx-rc/extra.d/pbac.headers.*.conf;                # inside headers.conf
```
The trick: put `return 418;` in each of `pbac.location.{root,static,html}`
and define an `error_page 418 = @pbacnode;` plus the named location in
`pbac.location.main`. Nginx short-circuits on `return` before reaching the
default `proxy_pass http://backend;` (which still parses fine syntactically),
the error_page handler internally redirects to `@pbacnode`, which proxies to
Node:3000.

This requires zero edits to shared/global nginx configs, zero edits to the
"do not edit" pbac.d files, no sudo for runcloud user — only `extra.d/`
files writable by root.

**Gotcha 28: `try_files $uri @named` returns 403 for `/`.**
`try_files $uri @pbacnode` matches `$uri = /` against `root /home/runcloud/webapps/pbac/`
which IS a directory; with autoindex off, nginx returns 403 instead of falling
through. Use a guaranteed-missing path: `try_files /__pbac_never_exists @pbacnode;`.
Or simpler — just `return 418;` plus error_page (Gotcha 27).

**Gotcha 29: HTTP/2 streaming RSC needs `proxy_buffering off`.**
Symptom: `ERR_HTTP2_PROTOCOL_ERROR 200 (OK)` in browser console for streamed
admin pages. nginx-rc by default buffers proxy responses; combined with
HTTP/2 framing on the frontend and chunked Transfer-Encoding from Node,
the connection desyncs. In `pbac.location.main.runcloud-hub.conf` for the
named `@pbacnode` location:
```
proxy_buffering off;
proxy_request_buffering off;
chunked_transfer_encoding on;
proxy_read_timeout 600s;
proxy_send_timeout 600s;
```
Mandatory for Payload admin and any Next.js page that streams (RSC, Suspense
boundaries, etc.).

## Phase 6 — SSL + multiple hostnames

**Gotcha 30: Let's Encrypt cert covers only the primary domain by default.**
`POST /webapps/{id}/ssl` issues a cert for the webapp's `domains[type=primary]`
entry. Visiting `https://www.pbac.pl/` returned the *default* nginx-rc cert
(belonging to whatever the first webapp on the box is — `crm2.kolabogroup.pl`
in our case), so browsers showed "Not Secure".

Fix: add the alias domain first, then reissue:
```
POST /api/v3/servers/{id}/webapps/{appId}/domains
{ "name": "www.pbac.pl", "www": 0, "redirection": "none" }

DELETE /api/v3/servers/{id}/webapps/{appId}/ssl/{sslId}

POST /api/v3/servers/{id}/webapps/{appId}/ssl
{
  "provider": "letsencrypt",
  "enableHttp": true,
  "enableHsts": false,
  "authorizationMethod": "http-01",
  "environment": "live"   // NB: "live", not "production" — RunCloud rejects "production"
}
```
Within ~30s the cert SAN includes both names. Verify with
`openssl s_client -servername www.pbac.pl -connect www.pbac.pl:443 | openssl
x509 -noout -ext subjectAltName`.

## Phase 7 — runtime / process management

**Gotcha 31: PM2 `reload` in fork mode acts like `restart`; use `--update-env`.**
Without `--update-env`, an env-var change in `.env.local` doesn't propagate
to the running process. Always:
```
pm2 reload pbac --update-env || pm2 start npm --name pbac --cwd "$APP_DIR" -- start
pm2 save
```
The `|| pm2 start` covers the first deploy when no process exists yet.

**Gotcha 32: PM2 systemd autostart needs root invocation once.**
On a fresh server:
```
env PATH=/home/runcloud/.nvm/versions/node/v22.22.2/bin:$PATH \
    /home/runcloud/.nvm/versions/node/v22.22.2/bin/pm2 \
    startup systemd -u runcloud --hp /home/runcloud
```
Generates and enables `pm2-runcloud.service`. Without this, PM2 dies on
reboot and the site goes down until someone SSHes in.

**Gotcha 33: secrets file outside the webapp directory.**
`runcloud/deploy.sh` does `git fetch && git reset --hard origin/main`,
which would wipe any `.env.local` written into the webapp dir on every
deploy. Keep secrets at `/home/runcloud/.env.pbac` (chmod 600, owned by
`runcloud:runcloud`), source it inside `deploy.sh`, generate `.env.local`
fresh every deploy from those values. Survives `git reset --hard` because
it lives outside the repo.

## Security gotchas

**Gotcha 34: never inline real credentials in committed docs.**
Initial `runcloud/README.md` had the production Postgres URI as an "example"
inside a heredoc. Repo was public. Cost: rotation of the leaked password.
Use placeholders only, even in private repos.

**Gotcha 35: `git add -A` after a clean install can stage local agent artifacts.**
First commit on the deploy branch accidentally included `.claude/skills/...`
and `docs/superpowers/...` — local Claude Code tooling. Add to `.gitignore`
proactively if you use any such tools:
```
.claude/
docs/superpowers/
```
And prefer `git add <specific paths>` over `git add -A` when in doubt.

**Gotcha 36: hooks/permissions block external operations until explicit consent.**
Local agent permissions correctly blocked: psql to a random IP, posting
secrets to third-party APIs (Appwrite Sites variables), SSH'ing into a
shared production server, and force-pushing to main. Each block is signal
that the action is touching shared infrastructure or secrets — slow down
and confirm before working around. None of the blocks during this deploy
were spurious.

## Reproducible boot from scratch

Roughly the order to do this on a new repo:

1. **Project**: Next 15.4.x, React 19.2, `output` not set to `export`, Node 22.
2. **Payload**: install `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`,
   `@payloadcms/richtext-lexical`, `@payloadcms/ui`, `@payloadcms/translations`,
   `sharp`, `graphql`. Pin `undici@^8` for Node-22 ICU compat.
3. **Layouts**: do NOT keep `app/layout.tsx`. Move public site into
   `app/(frontend)/` with its own layout. Payload generates `app/(payload)/`.
4. **Config**: `payload.config.ts` with `pl + en` translations imported,
   `pool.max = 3`, lexical editor, types output to `payload-types.ts`.
5. **next.config.ts**: `withPayload(nextConfig, { devBundleServerPackages: false })`,
   `staticPageGenerationTimeout: 300`.
6. **Helpers**: `lib/utils.ts` with deterministic `formatPLN` and `formatPLDate`;
   never use `toLocaleString("pl-PL")` in render paths.
7. **Data layer**: `lib/cms/*.ts` with `cache()`-wrapped async fetchers
   matching the existing types so consumer pages just need `async/await`.
8. **Client islands**: split into `*-view.tsx` (use client) + `*.tsx` server
   wrapper that prop-drills CMS data.
9. **RunCloud**: create custom webapp, register deploy key on GitHub, link
   git via `POST /webapps/{id}/git`, set deploy script via
   `PATCH /v2/.../git/{gitId}/script` with autoDeploy true, register GitHub
   webhook to `https://manage.runcloud.io/webhooks/git/{pullKey1}/{pullKey2}`.
10. **nginx**: write `pbac.location.{root,static,html}.runcloud-hub.conf`
    with `return 418;` plus `pbac.location.main.runcloud-hub.conf` defining
    `error_page 418 = @pbacnode;` and the named location with
    `proxy_buffering off; proxy_request_buffering off; chunked_transfer_encoding on;`.
11. **Server prep** (one-time): nvm + Node 22 + pm2 for `runcloud` user;
    `pm2 startup systemd` as root; create `/home/runcloud/.env.pbac` with
    `DATABASE_URI` + `PAYLOAD_SECRET` (chmod 600, chown runcloud:runcloud).
12. **Deploy**: `runcloud/deploy.sh` (committed in repo) handles git pull,
    npm install, build, .env.local generation from secrets file, pm2
    reload + save.
13. **SSL**: add `www.<domain>` as alias before requesting the cert; reissue
    after any domain change so the SAN list includes both.
14. **First admin**: visit `/admin/create-first-user`, enter email + password.
