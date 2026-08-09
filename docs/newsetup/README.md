# BlankPane — Project Journey Map (docs/newsetup)

> Purpose: reconstruct the exact order of everything we did, from "start a project" to
> "deployed + AdSense applied + YouTube uploading". Use this as the **roadmap for the next
> project** (or for replaying this one). Every item is tied to a real commit/date.
>
> Generated: 2026-08-09 · Source: full `git log --reverse`, `docs/master-website-creation-guide.md`,
> `docs/seo-review-and-action-plan.md`, `docs/keyword-clustering-plan.md`, `docs/adsense-readiness.md`,
> and the `docs/archive/` research docs.

---

## Index

| File | What it is |
|---|---|
| `01-timeline.md` | Ordered journey: every phase, step, commit, and what it did (day-by-day) |
| `02-prompts.md` | The exact prompts/workflows used (research, build, SEO, monetization) |
| `03-action-items.md` | Master checklist — all action items in order, ✅ done / ☐ remaining |
| `04-next-steps.md` | What's still open, in priority order |

## The one-paragraph story

Started as a single-file fullscreen color tool → Astro static site with 13 locales → 9 tool pages →
branded `blankpane.com` with full SEO stack (llms.txt, robots, sitemap, JSON-LD, hreflang) →
content engine (guides hub, use-case grids, wallpaper/editor pages, blog) → AdSense readiness
(legal pages, cookie banner, feedback modal, ads.txt, leads API) → YouTube channel + 12 color videos
(bulk uploader) → AdSense applied + approved setup (pub ID, Auto Ads) → directory listings + backlinks placed.
Traffic lever = content breadth + internal linking, not the tool itself.

## Command reference used throughout

```bash
pnpm install
pnpm dev                    # app1 on http://localhost:3000
pnpm build / pnpm typecheck
pnpm deploy                 # Cloudflare Pages (project `blank-screen`, override: CLOUDFLARE_PAGES_PROJECT=blankpane)
pnpm videos:gen             # generate 12 color videos
pnpm screens:gen            # generate broken-screen wallpapers (fal.ai)
pnpm seo:local / pnpm seo:prod
pnpm lh:local / pnpm lh:prod
```
