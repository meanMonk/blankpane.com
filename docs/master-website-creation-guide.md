# Master Website Creation Guide — SEO/AEO Playbook for LLM-Driven Site Builds

> A distilled, reusable playbook built from the blankpane.com project. Use this as a
> foundation for any future LLM-assisted website build: a utility/tool site that ranks
> in Google **and** gets cited by AI answer engines (ChatGPT, Perplexity, Gemini, AI Overviews).

---

## 0. Core thesis

Traffic to a tool site is **not** driven by the tool itself. It's driven by:

1. **Content breadth + keyword coverage** (long-tail use-case pages)
2. **Internal linking** (tools ↔ guides ↔ colors ↔ blog clustered per topic)
3. **Multilingual surface** (translate the high-value pages)
4. **Structured data** (schema.org for both Google and AI answer engines)
5. **Machine-readable files** (`llms.txt`, robots, sitemap, video sitemap)
6. **Video** (10h fullscreen videos on YouTube + VideoObject on matching pages)
7. **Social proof + backlinks** (directories, Reddit, edu lists)

The #1 traffic driver observed across competitors: **"white screen for ___" use-case content**
— every realistic thing people do with the tool becomes an anchor page that ranks and links back to the tool.

---

## 1. Architecture that makes SEO cheap (Astro template system)

- **One template + data files → hundreds of pages.** Color pages are generated from
  `data/colors.json` × an i18n template (`i18n/template.ts`). One schema/SEO change propagates to all pages.
- **i18n via a single `template.ts`** with per-locale `getUI(lang)` — every translated page gets hreflang,
  canonical, schema, and localized text for free.
- **Static build (Astro) → Cloudflare Pages.** Fast, zero server cost, no render-blocking JS.
- Env/ops: `pnpm build`, `pnpm typecheck`, `scripts/deploy.sh` (builds all apps, deploys to Cloudflare Pages).

---

## 2. SEO checklist (per page)

- [ ] Title: `<Keyword> — <use-case value prop>` (≤ 60 chars, keyword front-loaded)
- [ ] Description: `<use-cases, comma-separated> · free in any browser, no sign-up` (≤ 155 chars)
- [ ] `canonical` on every page
- [ ] `hreflang` alternates per language + `x-default`
- [ ] `theme-color` matching brand
- [ ] OG: title, description, url, type, image (1200×630 PNG), site_name
- [ ] Twitter: `summary_large_image` + title + description + image
- [ ] `robots` meta per page (`index, follow` / `noindex` for legal pages)
- [ ] JSON-LD (see §3): WebApplication, FAQPage, BreadcrumbList, Organization `sameAs`
- [ ] VideoObject microdata on any page with a video
- [ ] PWA `manifest.json` + apple-touch-icon + favicon set
- [ ] `keywords` meta with long-tail variants on the homepage
- [ ] `lastmod` in the sitemap; per-URL `priority` + `changefreq`

---

## 3. Schema.org JSON-LD library (copy-paste patterns)

All JSON-LD is emitted in `<head>` as `<script type="application/ld+json">`. Site-wide ones live in the
base layout; page-specific ones are passed via a `jsonLd` prop.

### 3.1 WebApplication (every tool page) — the "free tool" signal
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BlankPane",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Free full-screen color tool..."
}
```

### 3.2 FAQPage (home + each color page has its own)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Q?", "acceptedAnswer": { "@type": "Answer", "text": "A." } }
  ]
}
```
Rule: each color page has its own 4–6 FAQ + a use-case accordion — never just link back to the homepage.

### 3.3 Organization with sameAs (identity + trust for AI citation)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BlankPane",
  "url": "https://blankpane.com",
  "logo": "https://blankpane.com/og-image-home.png",
  "sameAs": [
    "https://twitter.com/blankpane",
    "https://www.youtube.com/@blankpane"
  ]
}
```
Every social/YouTube profile in `sameAs` doubles as a brand-entity backlink signal.

### 3.4 VideoObject (on the page whose video it matches — NOT the homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "White Screen 10 Hours — Fullscreen White Screen Video",
  "description": "Full-screen solid white video...",
  "thumbnailUrl": ["https://i.ytimg.com/vi/gOJhbS_LhrM/maxresdefault.jpg"],
  "uploadDate": "2026-08-08T00:00:00.000Z",
  "duration": "PT10H",
  "contentUrl": "https://www.youtube.com/watch?v=gOJhbS_LhrM",
  "embedUrl": "https://www.youtube.com/embed/gOJhbS_LhrM?rel=0",
  "url": "https://www.youtube.com/watch?v=gOJhbS_LhrM",
  "publisher": { "@type": "Organization", "name": "BlankPane", "url": "https://blankpane.com" }
}
```
Key points:
- Use the **YouTube watch URL** as `contentUrl`/`url` and the **embed URL** as `embedUrl`.
- Use the **YouTube thumbnail** (`https://i.ytimg.com/vi/{id}/maxresdefault.jpg`), not your OG image.
- Duration `PT10H` matches the actual video length.
- Keep per-video IDs in a single data file (`data/youtube.ts`) so both the sitemap and schema stay in sync.

### 3.5 HowTo (step-based guide pages)
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Check for Dead Pixels...",
  "description": "excerpt",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Step title", "text": "Step body" }
  ],
  "totalTime": "PT10M"
}
```
Pair with an `Article` + `BreadcrumbList` on the same guide page.

### 3.6 BlogPosting (blog posts)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Title",
  "description": "excerpt",
  "datePublished": "2026-03-12",
  "dateModified": "2026-03-12",
  "author": { "@type": "Organization", "name": "BlankPane", "url": "https://blankpane.com" },
  "publisher": { "@type": "Organization", "name": "BlankPane", "url": "https://blankpane.com" },
  "mainEntityOfPage": "https://blankpane.com/blog/slug/"
}
```

### 3.7 ItemList (homepage: all major tools/colors — feeds internal-link signals)

### 3.8 BreadcrumbList (guides, tools)

---

## 4. AEO/GEO — getting cited by AI answer engines

### 4.1 `llms.txt` (served at `/llms.txt`)
Plain-text machine-readable summary. Structure:
```
# SiteName
> Updated: YYYY-MM-DD
> One-line description.

## Capabilities
- Runs 100% client-side, no signup, no account, free.
- Downloads up to 8K PNG; 13 languages; YouTube channel link.
- Explicitly answers the "does X require signup" comparison questions.

## Quick Start         # 4-6 top pages
## Guides              # grouped by intent cluster
## Screen Tools        # by category
## Solid Colors        # every color, hex, one-line description
## Blog
## Info                # legal/about/contact
```
Rules learned:
- Add an **`> Updated:` date** — LLM crawlers weight freshness.
- Add a **Capabilities block** right under the intro (AI answers "does X need signup" from llms.txt directly).
- If two pages look like duplicates for a different query-intent (e.g. `/white-screen/` vs `/zoom-background-screen/`),
  add a one-line note explaining the intent split so an LLM doesn't treat it as redundant.
- Optional: `llms-full.txt` with full page content for your top 5–6 pages (deeper grounding).

### 4.2 robots.txt
- Allow all crawlers including AI bots explicitly (GPTBot, Claude-Web, anthropic-ai, Google-Extended, CCBot).
- Reference both `sitemap.xml` and `video-sitemap.xml`.

### 4.3 Answer-first content
- Each tool page carries its own self-contained FAQ + use-case sections.
- The direct answer to "how do I make my screen white" is a tight 1–2 sentence answer near the top of the
  matching page, not buried in a homepage FAQ.

---

## 5. Video / YouTube strategy (color-tool sites)

- **Generate videos with a script** (`scripts/generate-color-videos.mjs`): 12 colors × 10h loop, tiny H.264 files → `public/videos/<slug>.mp4`.
- **Channel name matches search intent** (e.g. `blankscreen` → `@blankpane`).
- **Upload via API** (`packages/youtube-uploader`): markdown metadata files next to each MP4 — title/description/tags/keyword filename.
  - Title = exact high-volume phrase (≤60 chars) + "10 Hours" + intent words + `| Brand`.
  - First 2 lines of the description repeat the keyword + link to the **exact matching page** (two-way SEO signal).
  - Filename override = the query (e.g. `white-screen-white-full-screen-10-hours.mp4`) — a ranking signal.
  - OAuth quota: ~6 uploads/day default (1,600 units each) — needs phone-verified account for >15 min videos.
- **On-site tie-in**: the same MP4 is embedded on the color page (fast, no YouTube iframe) **plus** a
  "Watch on YouTube" link; VideoObject schema points at the YouTube URL.
- **Video sitemap** (`video-sitemap.xml`): `<video:video>` entries (thumbnail_loc, title, description,
  content_loc = YouTube URL, player_loc = embed URL, duration in seconds, publication_date, family_friendly).
  Referenced from robots.txt.
- **Playlist** of all videos — session watch-time lifts every video.

---

## 6. Content clusters (the internal-link backbone)

Build guides grouped by intent, each guide linking to 2–3 tools/colors and vice versa:

- monitor-testing (dead pixels, stuck pixels, uniformity/backlight bleed, download color screen)
- cleaning (clean monitor with white screen)
- lighting (white screen as ring light, green screen for Zoom)
- focus & battery (black screen saves battery, blank screen focus)
- pranks (broken screen, fake update, no signal)
- design (make a white background, black-and-white backgrounds)

Every color page cross-links to 2–4 relevant tools, its matching guide, and its matching video.
That cluster (schema + video + guide + tool + color page on one URL) is the topical depth thin
single-purpose competitors can't match.

---

## 7. Monetization (AdSense on a tool site)

- **Readiness gate is "thin content"**: add text/use-case/FAQ/guide blocks BEFORE applying.
- Required before applying: legal pages (Privacy/Terms/Cookie/Disclaimer/About/Contact), cookie consent
  banner (EU/UK), feedback form, `ads.txt`, verified ownership, AdSense script.
- **Placement rules**: ads below the fold / in the FAQ grid — never over tool controls (fullscreen/PNG download).
  Watch Google Auto-Vignettes hijacking tool clicks (`data-google-vignette="false"` on tool buttons).
  Aggressive monetization (3 banners + pop-under + anchor) → account disabled.
- Economics: utility niche RPM ≈ $3–7. Premium brokers (Ezoic, Setupad, etc.) need ~10K visitors/mo, +20–50% RPM.
- Alternatives if rejected: Adsterra, PropellerAds, Infolinks, affiliate, Buy Me a Coffee.

---

## 8. Backlinks (the largest remaining gap vs. competitors)

Tiers (value first):
1. Web-tool & indie directories: **Product Hunt, BetaList, AlternativeTo, Crunchbase, SaaSHub, TinyStartups**
2. Contextual Reddit answers (r/monitor, r/macbook, r/techsupport, r/animation) — helpful, disclose, don't spam
3. Edu/org resource lists + hardware-review sites
4. Q&A: Quora + StackExchange

Guardrails: avoid link farms; a handful of real topically-relevant links beats volume.

---

## 9. Measurement / acceptance

- `pnpm build` passes after every change.
- Search Console: submit `sitemap.xml` + `video-sitemap.xml` after launching new pages.
- Track: indexed page count, head-term + long-tail impressions, avg position.
- Expect new long-tail impressions within 2–4 weeks of a content drop.

---

## 10. What NOT to skip (project post-mortem)

1. **`og-image-home.png`/`.svg` must be committed** and used for `og:image`, Organization `logo`, and video thumbnails fallback.
2. Keep the **YouTube video IDs in one data file** — schema, sitemap, and page embeds all read from it.
3. `llms.txt` is a live endpoint (`pages/llms.txt.ts`), not a static file — keep it in sync with real routes.
4. When Claude/Gemini reviews the site, it can't see JSON-LD in fetched HTML — verify schema by inspecting
   the built `dist/` output, not the rendered page.
5. YouTube `@handle` can change after channel rename — update `data/youtube.ts` + `sameAs` together.
