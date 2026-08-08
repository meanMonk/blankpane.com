# BlankPane SEO Review — Competitor Analysis, Learnings & Action Plan

> Reviewed: 2026-08-07 · Focus: EN-market white-screen/color-screen tools
> Competitors reviewed: whitescreen.online (2.5M), whitescreen.dev (1.1M), whitescreen.im (#1 Google), whitedisplay.com (114K), whitedisplay displaymaster.dev, whitescreenstester.com

---

## 1. Why competitors get huge traffic — the summary

The traffic is **not** driven by the tool itself. It is driven by **content breadth + keyword coverage + internal linking + multilingual surface + social proof**. The highest-traffic site (whitescreen.online) ranks for hundreds of long-tail queries, not just "white screen".

### 1.1 The #1 traffic driver: "white screen for ___" use-case content

whitescreen.online fills its homepage with dozens of use-case sections, each one targeting a low-competition, high-intent long-tail query:

| Use-case section | Target keyword |
|---|---|
| white screen to copy drawings | "white screen to copy drawings" |
| white screen as a light source | "white screen as light source" |
| white screen to catch flies | "white screen to catch flies" |
| white screen to make a flipbook | "white screen flipbook" |
| white screen to focus yourself | "white screen for focus" |
| white screen to draw at night | "white screen for drawing" |
| white screen to read at night | "white screen for reading light" |
| white screen for makeup | "white screen for makeup lighting" |
| white screen to clean monitor | "white screen for cleaning monitor" |
| white screen to find dead pixels | "white screen dead pixel test" |
| white screen to check monitor | "white screen monitor test" |
| white screen to blank screen | "white screen to hide screen" |

**Learning:** the #1 page we should build is the use-case grid — every realistic thing people do with a white/black screen becomes an anchor that ranks and links back to the tool.

### 1.2 Content breadth per site

| Site | Color pages | Tool/other pages | Guides/blog | Languages | Extras |
|---|---|---|---|---|---|
| whitescreen.online | 9 colors + zoom + ring | ~5 prank, ~5 fake-update, ~5 screensaver | Use-case sections | 12 | video, ratings, calculators |
| whitescreen.dev | 9 colors + zoom-lighting | white-screen-image, broken-screen | `/guides` hub | 14 | 10-hr video, downloadable PNGs, PWA |
| whitescreen.im | 11 colors | ~18 sub-tools (monitor-test, oled-gray-test, uniformity-test, dvd-screensaver, etc.) | 5 dedicated guides | 7 | brightness/OLED/keep-awake features |
| whitedisplay.com | 5 colors | minimal | none | 1 | social share, legacy |
| blankpane.com (us) | 12 colors | 9 tools | 4 blog posts (no /guides) | 11 | llms.txt, sitemap, JSON-LD |

### 1.3 What we already do well (blankpane.com)

- 12 color pages (auto-generated, multilingual via `i18n/template.ts`)
- 9 tool pages, sitemap with priorities, llms.txt, robots.txt
- JSON-LD: WebApplication + FAQPage + BreadcrumbList + Organization
- hreflang alternates, canonical, OG/Twitter meta, clean Astro build
- Fast, in-browser, no-download tools with real utility (PNG download, fullscreen, presets)

### 1.4 Where we fall behind (the gaps to close)

1. **No `/guides/` hub page** — every strong competitor has one. Our content is buried under `/blog/`.
2. **No "white screen for ___" long-tail sections** — the #1 traffic driver is absent.
3. **Thin color pages** — template gives only ~3 uses + 4 FAQs, all near-identical across colors.
4. **No downloadable image pages** (`/white-screen-image` style) — whitescreen.dev ranks for "white screen 4k background" via static PNG pages.
5. **No per-test tool pages** (screen-uniformity-test, oled-gray-screen-test) that whitescreen.im ranks for.
6. **No social proof / ratings on-page.**
7. **Blog posts don't cross-link** to color/tool pages and vice versa — weak internal link graph.

---

## 2. Meta tags used by high-ranking sites (copied verbatim)

### whitescreen.im — #1 Google result
```html
<title>White Screen - Free Fullscreen White Display Tool Online</title>
<meta name="description" content="Free white screen tool for monitor cleaning, dead pixel detection, Zoom lighting, video calls, photography, and screen testing. Works on all devices instantly. No ads, no downloads.">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#3b82f6">
<meta property="og:title" content="White Screen - Free Fullscreen White Display Tool Online">
<meta property="og:description" content="Free white screen tool for monitor cleaning, dead pixel detection, Zoom lighting, video calls, photography, and screen testing. Works on all devices instantly. No ads, no downloads.">
<meta property="og:url" content="https://whitescreen.im">
<meta property="og:type" content="website">
<meta property="og:image" content="https://whitescreen.im/images/white-screen-1920x1080.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="626">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="White Screen.im">
<meta name="twitter:card" content="summary_large_image">
```
Pattern: **title = "Keyword — value prop"**, description = comma-separated **use-cases** + "no ads, no downloads" trust phrases, exact-size OG image (1200×626).

### whitescreen.online — 2.5M traffic
```html
<title>White Screen Online · Bright White Light</title>
<meta name="description" content="Open a white screen online in fullscreen. Use it as bright white light, flashlight, or Zoom lighting — free in any browser, no sign-up.">
<meta name="keywords" content="white screen, bright white screen, white light, blank white screen, plain white screen, full white screen, white screen online, flashlight screen, white screen website, pc white screen, white screen full screen, completely white screen, white screen on computer monitor">
<meta name="theme-color" content="#f5f4f4">
<meta property="og:title" content="White Screen Online · Bright White Light">
<meta property="og:description" content="Open a white screen online in fullscreen. Use it as bright white light, flashlight, or Zoom lighting — free in any browser, no sign-up.">
<meta property="og:url" content="https://www.whitescreen.online/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://www.whitescreen.online/image/og/white.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://www.whitescreen.online/">
<!-- VideoObject microdata: keeps a looping video indexable -->
<meta itemprop="description" content="Use a white screen video to show white full-screen page...">
<meta itemprop="thumbnailUrl" content="/image/white-background.png">
<meta itemprop="uploadDate" content="2020-05-03T20:00:00+03:00">
<meta itemprop="duration" content="PT1H1S">
<meta itemprop="embedUrl" content="https://www.youtube.com/embed/IIpDkAdxQqU?loop=1">
```
Pattern: **long `keywords` list of long-tail variants**, VideoObject microdata for the video, canonical always present.

### whitescreen.dev — 1.1M traffic
```html
<title>White Screen – Fullscreen Tool for Cleaning, Zoom & Focus</title>
<meta name="description" content="Use this fullscreen white screen tool to clean your monitor, improve Zoom lighting, focus better, or test for dead pixels. No ads. Pure white.">
<meta name="robots" content="index,follow,noodp">
<meta name="google-site-verification" content="4tjkMFi_NttJU7QX9C7uSyJL26CnpYnVqFqhszvyLWE">
<meta name="theme-color" content="#006CE0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="manifest" href="/manifest.json">
<link rel="canonical" href="https://whitescreen.dev/">
<link rel="alternate" href="https://whitescreen.dev/" hreflang="en">
<meta property="og:type" content="Website">
<meta property="og:site_name" content="whitescreen.dev">
<meta property="og:title" content="White Screen – Fullscreen Tool for Cleaning, Zoom & Focus">
<meta property="og:url" content="https://whitescreen.dev/">
<meta property="og:image" content="https://whitescreen.dev/images/pro/white-screen_32.png">
<meta property="og:description" content="Use this fullscreen white screen tool to clean your monitor, improve Zoom lighting, focus better, or test for dead pixels. No ads. Pure white.">
<meta name="twitter:card" content="Website">
<meta name="twitter:site" content="@whitescreen.dev">
<meta name="twitter:creator" content="@whitescreen.dev">
<meta name="twitter:title" content="White Screen – Fullscreen Tool for Cleaning, Zoom & Focus">
<meta name="twitter:description" content="Use this fullscreen white screen tool to clean your monitor, improve Zoom lighting, focus better, or test for dead pixels. No ads. Pure white.">
<meta name="twitter:image" content="https://whitescreen.dev/images/pro/white-screen_32.png">
```
Plus the **richest JSON-LD in the niche** — a `@graph` containing:
- **WebApplication**: `offers` (price 0 USD), `aggregateRating` (4.9 / 140), `screenshot`, `license`, `browserRequirements`, `publisher`
- **FAQPage**: 3 Q&A
- **BreadcrumbList**
- **Organization** with `sameAs` (Instagram, Pinterest, blogs, linktree — backlink/profile footprint)
- **ItemList** of all color/tool pages (feeds internal-link signals)
- **ImageObject** with license metadata for its downloadable wallpapers

Pattern: full trust stack — verification, PWA manifest, WebApp schema with rating + offer, hreflang, and profile links in `sameAs`.

---

## 3. The meta/SEO checklist we should adopt

Applied per page on blankpane.com (mostly already present — see gaps):

- [ ] Title: `<Keyword> — <use-case value prop>` (≤ 60 chars, front-loaded keyword)
- [ ] Description: `<use-cases, comma separated> · free in any browser, no sign-up` (≤ 155 chars)
- [ ] `canonical` on every page
- [ ] `hreflang` alternates per language (we have this via `alternateLinks`)
- [ ] `theme-color` matching brand
- [ ] OG: title, description, url, type, image (1200×626 PNG), locale, site_name
- [ ] Twitter: summary_large_image + title + description + image
- [ ] `robots` meta per page (index,follow / noindex for legal)
- [ ] JSON-LD: WebApplication (with `offers` price 0 + `aggregateRating` when reviews exist), FAQPage, BreadcrumbList, Organization `sameAs`
- [ ] VideoObject microdata for the Screens video grid
- [ ] PWA `manifest.json` + `apple-touch-icon` + favicon set (already added)
- [ ] `keywords` meta with long-tail variants on the homepage
- [ ] google-site-verification meta

---

## 4. Prioritized action plan (in execution order)

### P0 — This week (highest ROI, lowest effort)

1. **Add `/guides/` hub page**
   - Index all existing content grouped by intent (Monitor Testing, Cleaning, Lighting, Focus, Pranks).
   - Each guide card links to its tool/color page **and** the related blog post.
   - Add `/guides/` to nav, footer, llms.txt, sitemap (priority 0.8).
   - This is the internal-linking backbone every competitor has and we lack.

2. **Add "white screen for ___" use-case sections to color pages** ✅ DONE (2026-08-08)
   - Extend `i18n/template.ts` so each color page renders a 6–10 item use-case grid targeting long-tail ("white screen for reading", "black screen for focus", "green screen for chroma key").
   - One template change → covers all 12 color pages → directly replicates the #1 traffic driver.
   - **Implemented as:** shared `UseCaseAccordion.astro` component (per-color `<details>` accordion driven by `src/data/useCases.ts` — 8 items white, 6 black, 8 green, 4 zoom, 5 blue, 4 red, 4 pink, 3 yellow, 4 gray, 3 purple, 3 orange, 3 blank). Wired into EN `[page].astro`, localized `[lang]/[page].astro`, and homepage. Each item targets a keyword-planner long-tail query (e.g. "green screen for zoom", "blue screen for photography", "white monitors for gaming"), with original wording, and links to related tools (`/tools/dead-pixel-test/`, `/tools/screen-cleaner/`, blog posts) where relevant. Also shipped: white-screen video section (`WatchVideo.astro`, `/videos/white-screen.mp4`, opens fullscreen on its own — not the ScreenGallery image pattern) and color tiles now link to each color's dedicated page instead of switching colors client-side (`ColorSwatches.astro`). New i18n keys added to all 13 locales: `useCasesTitle`, `watchVideoTitle`, `watchVideoBody`, `watchVideoButton` (+ updated `hint`).

3. **Reframe blog → guides & deepen**
   - Bump blog to 6–8 posts, each targeting a question query (`how to clean your monitor with a white screen`, `how to fix stuck pixels`, `white screen vs gray screen for OLED`).
   - Cross-link every post to 2–3 color/tool pages and list posts on `/guides/`.

4. **Downloadable image pages** (`/white-screen-image/` + 2–3 colors)
   - Static PNG pages (1920×1080, 4K, 8K) + resolution table. Closes a direct whitescreen.dev ranking gap fast.

### P1 — Next week (mechanical, high volume)

5. **Add `keywords` meta + rich JSON-LD to homepage**
   - Adopt whitescreen.online long-tail keywords + whitescreen.dev `@graph` (WebApp + ItemList + Organization `sameAs`).
   - Add `aggregateRating` once reviews exist.

6. **New tool pages to match whitescreen.im's indexable set**
   - `screen-uniformity-test`, `oled-gray-screen-test`, `dvd-screensaver`, `bouncing-dvd-logo`, `static-screen`.
   - Reuse existing canvas/video-grid infra (we already added the Screens video grid).

7. **VideoObject microdata for Screens video grid**
   - Make each `/videos/screen-N.mp4` indexable with duration/thumbnail/embed meta.

8. **Internal linking pass**
   - Guides ↔ tools ↔ colors link graph; add "Related guides" section to color pages and "Related tools" already present.

### P2 — Later (compounding)

9. **Social proof block** — Google-form rating (like whitescreen.online 8.4/10) displayed on homepage.
10. **Resolution-pill URLs or meta coverage** — capture "white screen 4k/8k" queries in FAQs.
11. **Profile footprint** — fill `Organization.sameAs` (Twitter/X, Pinterest, GitHub, blog) and get `google-site-verification`.
12. **PWA install prompt** — manifest + service worker install banner (whitescreen.dev uses one to drive re-engagement).
13. **Multilingual depth** — extend the current 11 languages to match competitors' long-tail translation coverage.

---

## 5. Acceptance / measurement

- `pnpm run build` passes after each change.
- Search Console: submit updated sitemap after `/guides/` + new pages land.
- Track: indexed pages count, "white screen" + "white screen for X" impressions, avg position.
- After P0: expect new long-tail impressions within 2–4 weeks; positions improve as `/guides/` passes internal link equity.

---

## 6. What's done / remaining

### Done
- ✅ **P0 #1 — `/guides/` hub system** (2026-08-08): `src/data/guides.ts` with 10 guides across 5 clusters (monitor-testing, cleaning, lighting, focus, pranks), `/guides/` hub + `/guides/[slug].astro` article template (Article + Breadcrumb JSON-LD). `RelatedGuides.astro` wired into all 10 tool pages, EN + localized color pages, and the homepage. Guides added to nav (EN), footer (EN), sitemap (priority 0.8, weekly) and llms.txt. All guide content original wording; `keyword` tracked but not rendered. 311 pages total.
- ✅ **P0 #2 — use-case sections on color pages** (2026-08-08): `UseCaseAccordion.astro` + `src/data/useCases.ts` (57 long-tail items across 12 colors), wired into EN + all localized color pages and the homepage. White-screen video section (`WatchVideo.astro`, opens fullscreen) shipped on white-screen pages. Color tiles now link to each color's dedicated page (`ColorSwatches.astro`) instead of client-side switching. New i18n keys in all 13 locales.
- ✅ **UX/UI fixes (uncommitted until push)**: tool-page reorder (interactive tool first), locale-aware color tiles, ThemeSwitcher icon buttons (nav + footer), WatchVideo inline player, VideoCard on color pages. Follow-up round: SVG icon rendering (`set:html`), slug-preserving language switcher (`alternateLinks`), real color videos. Final round: `preview-stage` hover/click → fullscreen with a new `fullscreenHint` chip on the stage (13 locales), `stage-expand` bolder/bigger, `ScreenGallery` + color-page screen viewer open in the shared `#overlay` fullscreen instead of a lightbox modal, and visible "⛶ Tap or press F for full screen" chips on all 9 tool-page preview stages (countdown preview now also opens fullscreen on click).

### Remaining
- **P0 #3** Reframe blog → guides & deepen (6–8 posts).
- **P0 #4** Downloadable image pages (`/white-screen-image/` + 2–3 colors).
- **P1 #5–8**: keywords meta + rich JSON-LD, new tool pages (uniformity/oled-gray/dvd-screensaver/bouncing-dvd/static), VideoObject microdata for Screens grid, internal-linking pass.
- **P2 #9–13**: social proof, resolution-pill URLs, profile footprint, PWA install prompt, multilingual depth.
- **Follow-ups from this change**: translate the 57 use-case items per-locale (currently English-only); consider a `green screen for ___` / `blue screen for ___` use-case depth on the `zoom-background-screen` page; add VideoObject microdata for the white-screen video; translate the 10 guides per-locale (currently English-only).
- **Tool-page translations (recommend SKIP before close)**: the 9 tool pages + `/tools/` hubs are currently EN-only, and the ~60 tool UI strings are hardcoded English. Localizing them (13 locales × 9 tools × ~60 strings) is high effort, low SEO return with ~2 days left — search traffic for tool queries is overwhelmingly English, and the pages already rank under the EN slugs. Recommendation: ship P1 items instead; keep tool pages EN-only unless a later maintenance round localizes them.
