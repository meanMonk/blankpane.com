# BlankPane

Source for blankpane.com — a free full-screen color tool built with Astro,
deployed to Cloudflare Pages.

## Layout

```
blank-screen/
├── packages/
│   └── web/
│       └── app1/   # Astro static site (src/pages/*.astro)
├── scripts/
│   └── deploy.sh   # build + deploy to Cloudflare Pages
└── package.json
```

## Quick start (local)

```bash
pnpm install
pnpm dev                 # all apps on their ports (app1: http://localhost:3000)
```

Build a single app:

```bash
cd packages/web/app1
pnpm install
pnpm build               # -> dist/
```

## Deploy to Cloudflare Pages

Requires wrangler auth (`npx wrangler login` once).

```bash
pnpm deploy                                   # builds + deploys to project `blank-screen`
CLOUDFLARE_PAGES_PROJECT=blankpane pnpm deploy  # override project name
```

Each app's `dist/` is uploaded with `wrangler pages deploy`. First deploy
creates the project; afterwards the same name updates it in place.

## Cloudflare Pages Functions & env vars

`packages/web/app1/functions/api/feedback.ts` is a Cloudflare Pages Function
(routes at `/api/feedback`) used by the on-site ★ Feedback modal. It forwards
each submission to the VaayaLabs leads API, so the app needs two env vars:

| Var | Purpose | Example |
|---|---|---|
| `LEADS_API_URL` | Leads endpoint to POST to | `https://admin.vaayulabs.com/api/leads` |
| `LEADS_API_KEY` | Secret token, sent as `x-api-key` header | `your-secret-token` |

### Set them in Cloudflare (required for prod)

1. Cloudflare dashboard → **Workers & Pages** → your Pages project
   (`blank-screen`).
2. **Settings → Environment variables** → add `LEADS_API_URL` and
   `LEADS_API_KEY` (mark the key as *secret*).
3. Re-deploy (`pnpm deploy`). Until `LEADS_API_KEY` is set, the function
   returns `500 not_configured` and the modal falls back to email.

### Set them locally (dev)

```bash
cd packages/web/app1
cp .dev.vars.example .dev.vars    # then paste your real token into .dev.vars
pnpm functions:dev                # build + serve dist & functions on :8788
pnpm functions:test               # in another terminal: POST /api/feedback
```

`.dev.vars` (and `dev.vars`) are gitignored — never commit real secrets.

## SEO audits

Two quick JSON-report scripts cover the dist build locally and the live site:

```bash
pnpm seo:local          # static audit of packages/web/app1/dist → seo-report-local.json
pnpm seo:prod           # crawl https://blankpane.com        → seo-report-prod.json
pnpm lh:local           # Lighthouse mobile+desktop on dist  → lh-report-local.json
pnpm lh:prod            # Lighthouse mobile+desktop on live  → lh-report-prod.json
```

- `scripts/seo-audit.mjs` — dependency-free HTML audit of every page (title/meta/canonical/H1/OG/JSON-LD/hreflang/viewport), plus internal-linking graph analysis (dead links, orphans, click depth, unreachable pages, hreflang reciprocity) and sitemap coverage. Flags `--dist`, `--base`, `--url`, `--out`, `--max-pages`.
- `scripts/lh-audit.mjs` — real Lighthouse runs (mobile + desktop) for performance/SEO/accessibility/best-practices on key pages. Auto-installs `lighthouse` via npx on first run and needs Google Chrome. Flags `--mode`, `--pages`, `--form-factor`, `--out`.

Reports are gitignored. Review `seo-report-*.json` (and paste into an online SEO checker) to prioritize fixes.

## Add a site

Copy `packages/web/app1` (or any Astro/Vite static app) into `packages/web/`,
install, and build. Static apps with a `dist/` are picked up automatically by
`scripts/deploy.sh`.
