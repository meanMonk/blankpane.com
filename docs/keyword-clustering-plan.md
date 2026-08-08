# BlankPane Keyword Clustering & On-Page Deployment Plan

> Source data: `docs/archive/blank_screen.csv` (582 kw) + `docs/archive/blank_screen_1.csv` (2151 kw) — Google Keyword Planner exports.
> Analysis date: 2026-08-08 · Target: better rankings across color / tool / guide / blog pages.

---

## 1. Data snapshot

- **2,638 unique non-zero-volume keywords**, **~86.7M combined monthly searches**.
- Google Planner volume is inflated for head terms (many word-order variants of the same query collapse into one 5M bucket), so treat **relative volume + competition**, not absolute numbers.
- Competition scale: most long-tail is `Low`/`Medium`. `High` appears mostly on *wallpaper*, *backdrop/seamless* (physical products), and *monochrome wallpaper* — avoid head-on where possible.

### Volume tiers (deduped, max-volume kept)

| Tier | Volume | # kw | Notes |
|---|---|---|---|
| Head | ≥1M | 14 | `white background` 5M, `black background` 5M + word-order variants (all Low) |
| Upper-mid | 500K–1M | 16 | `white wallpaper` 500K (High), `white image` 500K, `black screen video` 500K, `4k screen background` 500K |
| Mid | 50K | 114 | `zoom background`, `white screen wallpaper/images/pic`, `video background`, `green screen background`, `make background white`, `white background editor/online`, `solid color` |
| Long-tail | 1K–10K | 470 | `white screen 1920x1080`, `white wallpaper iphone/pc/4k`, `how to make a white background`, `passport photo white background`, `black and white wallpaper` |
| Micro | 100–1K | 1,238 | heavy long-tail: `white marble/silk/wood background`, `off white`, `a4/2x2/16:9` sizes, `transparent` |
| Tail | <100 | 786 | mostly noise/typos + physical-product backdrops |

---

## 2. Keyword clusters (by volume) → owning page

Each cluster is assigned **one primary page** (the money page) + supporting pages (guide/blog/tools) that reinforce it via internal links and natural keyword usage.

### CLUSTER A — White background / screen  (head)
- **Volume: 29.5M/mo · 755 kw** — largest cluster.
- Keywords: `white background` 5M, `white screen wallpaper/images/pic`, `white background hd/4k/plain/solid`, `white image` 500K, `white page image`, `pure white background`, `white screen 1920x1080`, `a white background`.
- **Owner page:** `/white-screen/` (color) + `/` (home).
- **Support:** blog `use-white-screen-as-light-source`, guide `how-to-clean-your-monitor-with-a-white-screen`, white-screen video page.

### CLUSTER B — White wallpaper  (upper-mid + long-tail)
- **Volume: 5.3M/mo · 330 kw** — second-largest, but **High competition** at head.
- Keywords: `white wallpaper` 500K (High), `white wallpaper 4k`, `white wallpaper iphone/pc/ipad/solid/aesthetic`, `plain white wallpaper`, `white desktop wallpaper`.
- **Owner page:** **NEW `/white-wallpaper/` download page** (gap — no wallpaper asset today). 
- **Support:** extend `colors.json`/screens gallery; link from all white-ish color pages.

### CLUSTER C — Video backgrounds
- **Volume: 5.7M/mo · 56 kw**
- Keywords: `black screen video` 500K, `white background video` 5K, `video background` 50K, `free in video`, `screen video`.
- **Owner page:** `/videos/` grid + `WatchVideo` fullscreen sections on color pages.
- **Support:** new `/black-screen-video/` page (500K) + `white-screen-video` page; VideoObject microdata (P1#7 already planned).

### CLUSTER D — Black screen / background
- **Volume: 5.2M/mo · 51 kw**
- Keywords: `black background` 5M (Low), `black screen image` 50K, `black screen wallpaper full screen`.
- **Owner page:** `/black-screen/` (color) + guide `how-to-use-a-black-screen-to-save-battery`.
- **Support:** `black screen video` page (see Cluster C).

### CLUSTER E — Screen background / 4K  (mid)
- **Volume: 825K/mo · 61 kw**
- Keywords: `4k screen background` 500K, `screen screensaver` 50K, `home screen`, `broken screen image` 50K, `full screen background`.
- **Owner page:** `/colors/` hub + resolution presets in `ColorTool` (already 4K/FHD/story/A4).
- **Support:** per-color 4k download mentions in color-page copy + FAQ.

### CLUSTER F — Black & white (monochrome)
- **Volume: 436K/mo · 234 kw**
- Keywords: `black and white wallpaper 4k` 50K, `black and white background` 50K, `black and white aesthetic wallpaper`, `b&w background` (mostly High).
- **Owner page:** `/gray-screen/` + blog/guide.
- **Support:** one guide "black and white screen backgrounds for aesthetics" linking to gray/black/white pages.

### CLUSTER G — Editor / remove / change white  (high-intent, we own the capability)
- **Volume: 351K/mo · 59 kw**
- Keywords: `white background picture editor` 50K, `white background photo editor` 50K, `white background online` 50K, `white background editor` 50K, `add white background to photo`, `remove white background`.
- **Owner page:** **NEW `/white-background-editor/`** positioning the existing download/custom-color tool as an editor (gap — we do this today but don't claim the intent).
- **Support:** FAQ on every color page ("make a white background"), blog how-to.

### CLUSTER H — Make-white how-to  (question intent)
- **Volume: 263K/mo · 146 kw**
- Keywords: `make background white` 50K, `make a white background` 50K, `make white background transparent`, `make photo background white`, `make image background white`, `how to make the background of a photo white` (many Medium).
- **Owner page:** **NEW guide** `/guides/how-to-make-a-white-background/` (top-5 guide by intent volume).
- **Support:** blog post + FAQ wiring to all color pages.

### CLUSTER I — Solid / plain / blank
- **Volume: 247K/mo · 33 kw**
- Keywords: `solid color` 50K, `plain white background` 50K, `plain background`, `solid white background`, `blank white background`.
- **Owner page:** `/blank-screen/` + `/` hero (already claims solid color).
- **Support:** FAQ + home lede.

### CLUSTER J — Zoom / video-call
- **Volume: 189K/mo · 82 kw**
- Keywords: `zoom background` 50K (Low), `zoom background images`, `white background for zoom` 5K, `plain background for zoom`.
- **Owner page:** `/zoom-background-screen/` (color) + `zoom-light-screen` tool.
- **Support:** guide `how-to-set-up-a-green-screen-for-zoom`, blog `best-zoom-background-colors`.

### CLUSTER K — Photography backdrop / seamless  (physical-product intent)
- **Volume: 151K/mo · 55 kw** — most `High` competition.
- Keywords: `white backdrop` 50K (High), `white seamless paper` (High), `white studio backdrop` 5K, `photo booth backdrop`.
- **Owner page:** none for physical products → **cover cheaply**: one FAQ + one guide section ("free digital alternative to buying a seamless backdrop") on `/white-screen/`.
- **Support:** `white background for photography` use-case already exists.

### CLUSTER L — Passport / ID / 2×2 / A4  (tool opportunity)
- **Volume: 43.8K/mo · 66 kw** (growing intent, low competition)
- Keywords: `white background passport photo online free` 5K, `white background 2x2` 5K, `passport size photo white background` 5K, `white background a4 size` 5K, `1x1 white background`, `2x2 picture editor`.
- **Owner page:** **NEW `/passport-photo-white-background/` tool page** — reuse custom-size PNG download (2×2 preset) + guidance. High intent = future conversion.
- **Support:** blog + guide section; preset already supports 2×2 custom sizes.

### CLUSTER M — Green screen
- **Volume: 67.5K/mo · 10 kw**
- Keywords: `green screen background` 50K (High), `green screen images` 5K, `background for green screen video`.
- **Owner page:** `/green-screen/` (color) + guide `how-to-set-up-a-green-screen-for-zoom`.
- **Support:** green-screen use-case grid (exists).

### CLUSTER N — Transparent
- **Volume: 52K/mo · 52 kw**
- Keywords: `make white background transparent`, `white to transparent`, `transparent background photoshop`.
- **Owner page:** fold into guide CLUSTER H (section on transparent export) — no separate page needed.

### CLUSTERS O–T — Other colors (blue/red/pink/yellow/gray/purple/orange + white-and-X)
- **Combined: ~150K/mo.** Each color page's use-case grid + FAQ already targets these. Keep as-is; add "white and X" phrases naturally into color-page copy where relevant.

---

## 3. On-page keyword deployment rule (the core ask)

Use the owner keyword **+ 2–4 cluster variants**, naturally, at these touchpoints **per page**:

| Placement | Frequency | Example (white-screen page) |
|---|---|---|
| `<title>` | 1 exact keyword, front-loaded | `White Screen — Fullscreen White Background Tool` |
| `<meta description>` | keyword + 1 variant | `...pure white background...` |
| `<h1>` | 1 exact | `White Screen` |
| intro / lede | keyword 2–3× (first 150 words) | `white screen`, `white background`, `plain white` |
| H2 sections | 1 keyword per section | "Why use a **white screen** for photos" |
| body sentences | keyword every 3–4 paragraphs | natural, not stuffed |
| use-case cards | 1 keyword each (they already do) | `white screen for photography` |
| FAQ Q+A | keyword in question + answer | `How do I make a white background?` |
| alt text / og:image | 1 keyword | `white-screen-fullscreen-1920x1080` |
| internal-link anchor | keyword-rich | "Open the **white screen** tool" |
| JSON-LD name/description | 1 keyword | WebApplication/FAQPage |

**Rule of thumb:** target **2–4 natural occurrences per 100 words** of a cluster's head keyword, spread across placement types — enough for relevance, never enough to look stuffed. Every money page should also link to 2–3 supporting guide/blog/tool pages using keyword-rich anchors (reinforces topical authority).

---

## 4. Prioritized execution (in order)

### P0 — This week (highest ROI)
1. **Create `/guides/how-to-make-a-white-background/`** (CLUSTER H, 263K/mo) — targets the biggest question cluster we don't cover; wires into all color pages.
2. **Create `/white-background-editor/`** (CLUSTER G, 351K/mo) — claim the "editor" intent with our existing custom-color + PNG download tool.
3. **Create `/white-wallpaper/`** (CLUSTER B, 5.3M/mo) — download page + 4K/FHD PNG assets + resolution table.
4. **On-page deployment pass for the 3 highest pages** (`/`, `/white-screen/`, `/black-screen/`): rewrite title/description/intro/FAQ so the cluster head keyword appears at all placement types (per §3).

### P1 — Next week
5. **Create `/passport-photo-white-background/`** tool page (CLUSTER L, 43.8K/mo, low comp, high intent).
6. **Create `/black-screen-video/` + `/white-screen-video/`** pages (CLUSTER C, 5.7M/mo) + VideoObject microdata.
7. **Apply §3 deployment pass** to remaining color pages (green, zoom, blue, red, pink, yellow, gray, purple, orange, blank) and all 9 tool pages + 10 guides + 4 blog posts.
8. **Add "black and white backgrounds" guide** (CLUSTER F) linking gray/black/white pages.

### P2 — Later
9. Physical-product backdrop FAQ/guide section (CLUSTER K) — cheap coverage, no dedicated page.
10. Translate new pages per-locale; keep tool pages EN-only per prior decision.
11. Re-run keyword exports quarterly and re-balance the clusters.

---

## 5. Acceptance
- `pnpm run build` passes.
- Each P0/P1 page has its owner keyword + variants at ≥6 of the 10 placement types (§3).
- Internal links: every new page links to 2–3 supporting pages and receives ≥2 inbound links (color pages + guides).
- Track in Search Console: impressions for the 5 head clusters (`white background`, `white wallpaper`, `white background editor`, `make background white`, `black screen video`) within 2–4 weeks.
