# 01 — Ordered Project Timeline (day by day)

> Every row maps to a real commit (`git log --reverse`). Order = the order we actually worked in.
> Date format: 2026-MM-DD.

---

## Day 0 — Research & gut-check (before any code)

| # | Step / prompt | Output | Status |
|---|---|---|---|
| 0.1 | Niche gut-check: "is a fullscreen color tool a good build-once niche?" → volume from Keyword Planner CSVs | Yes; keywords heavily cannibalized → build ~10–15 real clustered pages, not 500 thin ones | ✅ |
| 0.2 | Keyword research export (Google Keyword Planner) | `docs/archive/blank_screen.csv` (582 kw) + `blank_screen_1.csv` (2151 kw), 2,638 unique kw ≈ 86.7M/mo | ✅ |
| 0.3 | Quick CPC/volume snapshot | `docs/archive/keywords.md` (black screen 189.8K/$0.86, white screen 122.2K/$0.63, ES/PT cheap) | ✅ |
| 0.4 | Competitor + traffic research (EN only) | `docs/archive/compitators.md` — whitescreen.online 2.5M, whitescreen.dev 1.1M, whitedisplay.com 114K; noted dev's License/Guides/Privacy/T&C/About pages | ✅ |
| 0.5 | AdSense monetization research | `docs/archive/adsense-setup.md` — thin-content rejection, vignette hijack, RPM $3–7, mass providers | ✅ |
| 0.6 | Backlink strategy research | `docs/archive/backlink.md` — directories, Reddit, edu/org, Quora/StackExchange tiers | ✅ |
| 0.7 | SEO on-page/schema/technical checklist research | `docs/archive/seo-checklist-prompt.md` | ✅ |
| 0.8 | YouTube content plan | `docs/archive/README-videos.md` — 12 titles/descriptions/tags + channel setup | ✅ |

---

## Day 1 — 2026-08-06 · Build the core tool + deploy

| # | Step | Commit | What was done | Status |
|---|---|---|---|---|
| 1.1 | Scaffold monorepo | `6c79669` | `pnpm-workspace.yaml`, `packages/web/app1` (Astro), deploy scripts, initial setup | ✅ |
| 1.2 | Build the full-screen color tool site | `cbbc55f` | 13 locales, canvas PNG download, fullscreen color pages from `colors.json` × `i18n/template.ts`, deploy to Cloudflare Pages | ✅ |
| 1.3 | Build 9 tool pages + hub | `bec6a91` | zoom-light, ring-light, flashlight, broken-screen, fake-update, no-signal, dead-pixel, screen-cleaner, countdown + `/tools/` hub + `RelatedTools.astro`; SEO: og:image, twitter:card, Organization schema, font preload, hreflang, breadcrumbs, useful 404, tools nav | ✅ |

---

## Day 2 — 2026-08-07 · Brand, SEO foundation, PWA, media

| # | Step | Commit | What was done | Status |
|---|---|---|---|---|
| 2.1 | Social preview image | `b7eab30` | `og-default.png` (1200×630) placeholder | ✅ |
| 2.2 | Fix overlay null error + move description below tool + favicon | `1997d77` | UX + branding polish | ✅ |
| 2.3 | Popular colors + tool cards on every page | `a75fa31` | Global overlay Esc/tap dismiss, ring-light fullscreen fills viewport, broken-screen active styles, countdown swatch visibility, clickable preview cards | ✅ |
| 2.4 | Rebrand blank-screen → blankpane.com | `93a43d1` | FullScreenColor → BlankPane, hello@blankpane.com, canonical domain | ✅ |
| 2.5 | Fix nav brand text all locales | `b875091` | full/screen → Blank/Pane in 13 locales | ✅ |
| 2.6 | AEO: llms.txt + AI-crawler robots.txt | `ffadb57` | GPTBot/Claude-Web/anthropic-ai/Google-Extended/CCBot allowed, both sitemaps referenced | ✅ |
| 2.7 | Nav bar centering | `55d8ce5` | Same 1080px max-width as content | ✅ |
| 2.8 | Google Analytics gtag + event tracking | `ec31c32` | Full event tracking | ✅ |
| 2.9 | Sitemap tuning | `9bc7c97` | lastmod/changefreq/priority per section | ✅ |
| 2.10 | Fix gtag ReferenceError | `4edee59` | Move inline def to body script | ✅ |
| 2.11 | Mobile centering + Screens video grid | `586f7c6` | Layout + video surface | ✅ |
| 2.12 | Complete favicon/PWA icon set | `6d4eb01` | PNG/SVG/ICO/apple-touch/manifest | ✅ |
| 2.13 | Broken-screen wallpaper generator (fal.ai) | `ff157b9` | `scripts/generate-wallpapers.mjs` (flat screen-effect prompts 1–15) | ✅ |
| 2.14 | SEO audit tooling | `b4d4ca5` | hreflang, reachability, duplicate meta, render-blocking fixes + `scripts/seo-audit.mjs` | ✅ |
| 2.15 | PWA installable + restore fullscreen/OLED tools | `e274924` | `manifest.json` + `sw.js` + SW registration | ✅ |
| 2.16 | Interface-style wallpapers 16–26 | `9b21bf5` | fake-update, screensavers, etc. | ✅ |
| 2.17 | SEO screen wallpaper data + gallery + localized pages | `6959d98` | `screens.ts`, `ScreenGallery.astro` | ✅ |
| 2.18 | Solid-color video generator + YouTube content | `6b5344a` | `scripts/generate-color-videos.mjs` (12 colors × 10h) | ✅ |
| 2.19 | Write the SEO review & action plan | `3d7e16b` | `docs/seo-review-and-action-plan.md` (competitor analysis → gaps → prioritized plan) | ✅ |
| 2.20 | IndexNow setup | `c10fd16`, `928c716` | + remove ad-rails | ✅ |

---

## Day 3 — 2026-08-08 · Content engine + AdSense readiness

| # | Step | Commit | What was done | Status |
|---|---|---|---|---|
| 3.1 | Use-case accordions + white-screen video | `d22380b` | `UseCaseAccordion.astro` + `src/data/useCases.ts` (57 long-tail items); `WatchVideo.astro` on white pages; color tiles link to dedicated pages | ✅ |
| 3.2 | `/guides/` hub + 10 guides | `e090beb` | `src/data/guides.ts`, `/guides/` hub + `[slug].astro` (Article+Breadcrumb JSON-LD), `RelatedGuides.astro` wired into tools/colors/home | ✅ |
| 3.3 | Video generation + YouTube content | `b9b0629`, `67025fe` | generated videos; content pack | ✅ |
| 3.4 | Fullscreen hints + click-to-fullscreen on stages | `611466c` | tool previews + screen galleries open fullscreen | ✅ |
| 3.5 | Keyword clustering plan | `b4dc737` | `docs/keyword-clustering-plan.md` + CSVs; 14 clusters A–T → owning pages | ✅ |
| 3.6 | Align action plan with clustering | `602b6de` | P0/P1 priorities updated | ✅ |
| 3.7 | Archive raw research | `3e89b6a`, `fbcd1b5` | `docs/archive/README.md` + digests into action plan | ✅ |
| 3.8 | P0 keyword pages | `4174bec` | `/guides/how-to-make-a-white-background/`, `/white-background-editor/`, `/white-wallpaper/` + deployment pass on `/`, `/white-screen/`, `/black-screen/` | ✅ |
| 3.9 | AdSense readiness stack | `d101bb7` | `ads.txt`, `FeedbackModal.astro`, `CookieBanner.astro`, `/api/feedback`, strengthened legal pages + `docs/adsense-readiness.md` | ✅ |
| 3.10 | Mass-provider / header-bidding learning | `19e147a` | from competitor ads.txt | ✅ |
| 3.11 | P1 SEO: keyword meta + VideoObject + b&w guide | `8ea4ae6` | homepage `@graph` (ItemList + Organization sameAs), VideoObject on color pages, black-and-white guide | ✅ |
| 3.12 | Feedback → VaayaLabs leads API | `d1dd1de`, `848d09d`, `3aaf2cb` | env vars + local functions:dev/test | ✅ |
| 3.13 | PWA install prompt banner | `52f284b`, `cd3e451` | `PwaInstallBanner.astro` + guard | ✅ |

---

## Day 4 — 2026-08-09 · YouTube uploads + AdSense submit + listings

| # | Step | Commit | What was done | Status |
|---|---|---|---|---|
| 4.1 | Bulk YouTube uploader | `6814eaf`, `9a646fc`, `e540ffc` | `packages/youtube-uploader` with keyword-rich metadata + `--retry` | ✅ |
| 4.2 | Upload videos 2–6 | `90828f3` | Manual uploads (channel `blankscreen`) | ✅ → all 12 uploaded later same day |
| 4.3 | Deploy script: functions + AdSense script | `6dad120` | deploy now calls API + includes Google AdSense script | ✅ |
| 4.4 | Directory/launch listing copy | `6680df7` | `docs/directory-listings.md` (PH/BetaList/AlternativeTo/SaaSHub/TinyStartups) | ✅ |
| 4.5 | Sitemap + content upload to YouTube | `03152af` | sitemap refresh + upload workflow | ✅ |
| 4.6 | AdSense application submitted | manual | account connected, script in BaseLayout, ownership verified → awaiting approval | ✅ (pending review) |
| 4.7 | Lead flow validated end-to-end | manual | Feedback → VaayaLabs leads API confirmed working | ✅ |
| 4.8 | AdSense post-approval setup | manual | Real Publisher ID into `ads.txt`, Auto Ads enabled (Min load) | ✅ (2026-08-09) |
| 4.9 | YouTube complete | manual | Remaining 6 videos uploaded (12/12), "Blank Screens" playlist, cards/end screens/pinned comments | ✅ (2026-08-09) |
| 4.10 | Directory submissions | manual | Product Hunt, BetaList, AlternativeTo, SaaSHub, TinyStartups | ✅ (2026-08-09) |
| 4.11 | Backlinks placed | manual | Reddit answers, edu/org resource links, Quora/StackExchange | ✅ (2026-08-09) |

---

## The distilled journey (10 steps for any new project)

1. **Research first** — keyword exports + competitors + monetization + backlinks (4 docs) before writing code.
2. **Build the core tool** (single working demo) + Astro scaffold with a data-driven template.
3. **Deploy early** to Cloudflare Pages; establish HTTPS, `robots.txt`, `sitemap.xml`.
4. **Brand + identity** — domain, OG image, favicon/PWA set, GA.
5. **SEO/AEO foundation** — llms.txt, hreflang, JSON-LD, audit tooling, IndexNow.
6. **Content engine** — guides hub, per-page use-case grids, wallpaper/editor/download pages (one template → hundreds of pages).
7. **On-page keyword deployment** per cluster (title→JSON-LD placement table).
8. **AdSense readiness** — legal pages, cookie banner, feedback modal, ads.txt, leads API.
9. **YouTube** — generate videos, bulk uploader, channel setup, upload.
10. **Apply + measure** — submit AdSense, track Search Console, then build backlinks.
