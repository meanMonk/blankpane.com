# 02 — Prompts / Workflows we used

> Reusable prompts that drove each phase. Full text of the long ones lives in `docs/archive/`.

## 1. Niche gut-check prompt (before build)
```
Quick gut check on the niche, then the build. Is "X" a good "build once, forget" niche?
[...] If yes: pull real keyword clusters out of the CSV and build the tool now.
```
→ Result: build ~10–15 real clustered pages, not 500 thin ones. (`docs/archive/content-prompt.md`)

## 2. Build prompt (Astro static site)
```
You are building keyword-targeted pages for an Astro static site deployed on Cloudflare Pages.
Reuse BaseLayout.astro and the [color].astro template pattern — do not invent a new template.
For each entry: add a row to colors.json (slug, name, hex, light, intent, volume).
For the 4 highest-volume entries ONLY: also create a hand-written long-form page override with:
  1. H1 matching the primary keyword exactly once
  2. 150–200 word intro using keyword + 2 close variants
  3. click-to-fullscreen button (reuse existing script)
  4. "why people use this" section (3 real use-cases specific to that color)
  5. unique 4-question FAQ + FAQPage JSON-LD (no copy-paste across pages)
  6. internal links to 4 other color pages
Do not reuse sentences across pages. Do not keyword-stuff.
Also generate: /about/, /privacy-policy/, /terms-of-service/, /cookie-policy/, /disclaimer/, /contact/.
Finally, translate ONLY white-screen, black-screen, zoom-background-screen into /hi/ /es/ /pt-br/ /id/ + hreflang.
Output: list every file you create/modify before writing code.
```
→ Result: `cbbc55f` core site. (`docs/archive/content-prompt.md`)

## 3. SEO implementation prompt (per-page audit)
```
You are auditing and fixing SEO on an existing Astro project.
Go through every page in src/pages/ (including generated [color].astro and tools/{slug}.astro):
  1. HEAD/META — unique <title> 50-60 chars keyword-first, meta description 140-160, canonical,
     og:title/description/type/url/image, twitter:card=summary_large_image, robots index,follow.
  2. SCHEMA — WebApplication, FAQPage (EXACTLY matching visible text), BreadcrumbList,
     Organization (homepage only, sameAs array).
  3. CONTENT DEDUP — flag any two pages sharing >1 near-identical sentence (don't auto-rewrite).
  4. INTERNAL LINKING — 3-4 sibling links + 1 bridge + 1 hub link per page.
  5. TECHNICAL — @astrojs/sitemap, robots.txt, custom 404, hreflang if language folders exist.
  6. PERFORMANCE — preload fonts, no render-blocking JS above fold.
Output: markdown report per file (already-correct / changed / flagged-for-manual-review).
```
→ Result: `b4d4ca5` audit tooling. (`docs/archive/seo-checklist-prompt.md`)

## 4. SEO review / competitor prompt
```
focus only for en websites. https://www.whitescreen.online/ 2.5M traffic, whitescreen.dev 1.1M,
whitedisplay.com 114K. Review sitemap & fetch content from each url and make notes & learning
for us to improve. Create quick video.
```
→ Result: `docs/seo-review-and-action-plan.md` + gap list (guides hub, use-case sections, etc.)

## 5. Keyword clustering workflow
```
Google Keyword Planner exports (582 + 2151 kw) → cluster into 14 intents (A–T) by volume →
assign each cluster ONE owner page (money page) + supporting guide/blog/tool pages →
deploy owner keyword + 2–4 variants at 10 placement touchpoints per page.
```
→ Result: `docs/keyword-clustering-plan.md` (volume tiers, owner pages, placement table).

## 6. Video generation workflow
```bash
node scripts/generate-color-videos.mjs            # all 12 colors → public/videos/<slug>.mp4
pnpm videos:gen                                    # alias
# env: VIDEO_WIDTH=1920 VIDEO_HEIGHT=1080 VIDEO_FPS=1 VIDEO_DURATION=36000 VIDEO_CRF=30 VIDEO_PRESET=veryslow
```
→ Result: 12 × 10h solid-color videos, ~tens of MB each.

## 7. Wallpaper generation workflow (fal.ai)
```bash
export FAL_KEY=...
node scripts/generate-wallpapers.mjs all          # 26 broken-screen/interface wallpapers
pnpm screens:gen                                   # alias
```
→ Prompts live in `docs/archive/prank-screen.prompt.md` + inline `WALLPAPERS` array.

## 8. YouTube upload workflow
```bash
# packages/youtube-uploader — bulk uploader, metadata from README-videos.md
# title = exact phrase (≤60) + "10 Hours" + intent + | BlankPane
# description: first 2 lines repeat keyword + link to matching blankpane.com/<slug>/
# filename BEFORE upload = the query (e.g. white-screen-white-full-screen-10-hours.mp4)
node uploader.js --retry       # retry failed pairs
```
→ Result: channel `blankscreen`, 6/12 uploaded.

## 9. AdSense readiness checklist prompt (compressed)
```
For a utility site: content (text/FAQ/use-cases/guides), legal pages (Privacy/Terms/Cookie/Disclaimer/About/Contact),
cookie consent, feedback/contact, ads.txt, Search Console verification, fast+HTTPS+mobile,
ads below the fold never over tool buttons, data-google-vignette="false" on tool buttons if Auto Ads misbehave.
```
→ Result: `docs/adsense-readiness.md` + the full AdSense stack (3.9–3.10).

## 10. Deployment workflow
```bash
pnpm build && pnpm deploy     # CLOUDFLARE_PAGES_PROJECT=blankpane pnpm deploy
# deploy.sh now also: keeps /api/feedback functions + includes AdSense script
```
