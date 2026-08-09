# 03 — Master Action-Item Checklist (in order taken)

> ✅ = completed · ☐ = open/remaining. Order = the sequence we actually followed.
> Cross-references: `docs/seo-review-and-action-plan.md` §9, `docs/keyword-clustering-plan.md` §4,
> `docs/adsense-readiness.md` §6.

---

## Phase 0 — Research (all done before code)
- [x] Export keywords (582 + 2151 kw, 2,638 unique)
- [x] Competitor analysis (whitescreen.online / .dev / whitedisplay.com)
- [x] AdSense monetization research
- [x] Backlink strategy research
- [x] SEO checklist research
- [x] YouTube content plan

## Phase 1 — Core build
- [x] Astro monorepo scaffold + Cloudflare Pages deploy
- [x] Fullscreen color tool, 13 locales, canvas PNG download
- [x] 9 tool pages + `/tools/` hub + RelatedTools
- [x] og-image, favicon set, PWA manifest + SW
- [x] Rebrand → blankpane.com, hello@blankpane.com

## Phase 2 — SEO/AEO foundation
- [x] `llms.txt` (live endpoint) + AI-crawler `robots.txt`
- [x] Sitemap with lastmod/changefreq/priority + video sitemap
- [x] hreflang + canonical + OG/Twitter + theme-color
- [x] JSON-LD: WebApplication, FAQPage, BreadcrumbList, Organization (sameAs), ItemList, VideoObject
- [x] GA4 gtag + event tracking
- [x] IndexNow setup
- [x] SEO audit tooling (`scripts/seo-audit.mjs`, `lh-audit.mjs`)

## Phase 3 — Content engine
- [x] `/guides/` hub + 10 guides across 5 intent clusters
- [x] Use-case accordions (57 long-tail items, 12 colors)
- [x] White-screen video section (WatchVideo.astro)
- [x] Screens/wallpaper gallery + 26 fal.ai wallpapers
- [x] P0 keyword pages: how-to-make-white-background guide, white-background-editor, white-wallpaper
- [x] On-page keyword deployment pass (home, white, black)
- [x] P1: keyword meta + @graph + VideoObject + black-and-white guide
- [x] 4 blog posts

## Phase 4 — AdSense readiness
- [x] Legal pages strengthened (Privacy/Terms/Cookie/Disclaimer/About/Contact)
- [x] Cookie consent banner (EU/UK)
- [x] ★ Feedback modal + `/contact/`
- [x] `/api/feedback` Cloudflare Function → VaayaLabs leads API (validated end-to-end)
- [x] `ads.txt` (placeholder pub ID)
- [x] AdSense script in BaseLayout + ownership verified
- [x] AdSense application **submitted** — awaiting approval
- [x] Replace placeholder pub ID in `ads.txt` after approval (done 2026-08-09)
- [x] Enable Auto Ads (Min load) after approval (done 2026-08-09)

## Phase 5 — YouTube
- [x] Generate 12 color videos (10h)
- [x] Channel `blankscreen` setup (description, keywords, banner)
- [x] Bulk uploader package with keyword metadata + `--retry`
- [x] Upload all 12 videos
- [x] Build "Blank Screens" playlist
- [x] Card/end screen + pinned comments on all videos

## Phase 6 — Launch / listings (drafts ready)
- [x] `docs/directory-listings.md` copy for PH / BetaList / AlternativeTo / SaaSHub / TinyStartups
- [x] Submit Product Hunt (highest equity first)
- [x] Submit BetaList + AlternativeTo same day
- [x] Submit SaaSHub + TinyStartups
- [x] 3–5 contextual Reddit answers (r/monitor, r/animation, r/techsupport, r/baking)
- [x] 1–2 edu/org resource-list links
- [x] Quora + StackExchange dead-pixel answers

## Phase 7 — Measurement
- [x] `pnpm build` green after every change
- [ ] Search Console: submit updated sitemap post-content-drop
- [ ] Track: indexed pages, head-term + long-tail impressions, avg position (2–4 week check)
- [ ] Add `aggregateRating` once reviews exist
