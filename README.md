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

## Add a site

Copy `packages/web/app1` (or any Astro/Vite static app) into `packages/web/`,
install, and build. Static apps with a `dist/` are picked up automatically by
`scripts/deploy.sh`.
