# 04 — Next Steps (open items, in priority order)

> Derived from `docs/seo-review-and-action-plan.md` §9, `docs/keyword-clustering-plan.md` §4,
> `docs/adsense-readiness.md` §6. Items are the ☐ checkboxes from `03-action-items.md`.

---

## P0 — Do now (traffic + trust)
1. **Monitor AdSense approval** — account is connected and applied; approval is manual review.
   - Auto Ads already enabled at Min load; real Publisher ID already swapped into `ads.txt` (done 2026-08-09).
   - If Auto-Vignettes start hijacking "Download PNG / Go Full Screen", add `data-google-vignette="false"` to those buttons.
2. **Uploads & listings are done** — all 12 videos uploaded to the `blankscreen` channel + "Blank Screens" playlist built; PH / BetaList / AlternativeTo / SaaSHub / TinyStartups submitted; Reddit / edu-org / Quora-StackExchange backlinks placed (2026-08-09).
3. **Search Console**: re-submit sitemap so the new guide/editor/wallpaper pages get indexed; request indexing on the 3 P0 pages.

## P1 — Content/tool gaps (deferred this round)
5. New tool pages: `/passport-photo-white-background/` (43.8K/mo), `/black-screen-video/` + `/white-screen-video/` (5.7M/mo cluster) + VideoObject.
6. whitescreen.im-style tools: screen-uniformity-test, oled-gray-screen-test, dvd-screensaver, bouncing-dvd-logo, static-screen.
7. Translate the 57 use-case items + the 10 guides per-locale (currently EN-only).
8. `green/blue screen for ___` use-case depth on `zoom-background-screen`.

## P2 — Compounding
9. **Social proof block** on homepage (Google-form rating) + add `aggregateRating` to schema once reviews exist.
10. **Profile footprint**: confirm remaining `Organization.sameAs` (Pinterest, YouTube) are live.
11. At **~10K visits/mo** → apply to a mass provider (Ezoic/Setupad) for header bidding (+20–50% RPM); replace `ads.txt` with their file (keep Google line, keep in sync).
12. At **~50K visits/mo** → evaluate Mediavine/Raptive.
13. Multilingual depth — extend the current languages toward competitor long-tail coverage.

## Acceptance reminders
- `pnpm build` must pass after every change.
- Re-run `pnpm seo:prod` + `pnpm lh:prod` before any big content drop.
- Keep `ads.txt` in sync each time a network is added (missing line = $0 from that network).
- Verify schema by inspecting **built `dist/`**, not the rendered page (JSON-LD isn't visible to crawlers in fetched HTML).
