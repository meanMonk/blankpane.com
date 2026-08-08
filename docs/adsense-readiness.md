# AdSense Approval — Learning & Readiness Guide

> Companion to `docs/seo-review-and-action-plan.md` §5. This doc is the step-by-step "how to get approved and
> monetized" playbook for blankpane.com — what must be true on the site, what you (manually) do, the provider
> options with their requirements, and a realistic timeline. Full source research: `docs/archive/adsense-setup.md`.

---

## 1. Why utility sites get rejected (and how we already fixed it)

Google rejects utility sites (calculators, color tools, converters) for **Low Value Content** when they are
almost pure JavaScript with no readable text. Approval depends on readable, original content + trust pages.

| Risk | Our status |
|---|---|
| Thin content | ✅ 314 pages with intro + use-cases + FAQs + 10 guides + 4 blog posts + wallpaper/editor pages |
| Missing legal pages | ✅ Privacy, Terms, Cookie, Disclaimer, About, Contact (all live, localized) |
| No contact/feedback | ✅ `/contact/` + **★ Feedback modal** (rating + comment + email) on every page |
| Ads overlapping the tool | ✅ No ads live yet; when added, must stay below the fold and off the fullscreen/download buttons |
| No cookie consent (EU/UK) | ✅ **Cookie banner** live (accept/decline, links to policies) |
| Missing `ads.txt` | ✅ `public/ads.txt` shipped (placeholder pub ID — **you must fill it after approval**) |

**The content + trust + compliance stack is the thing that gets a utility site approved.** Keep adding original
guide/blog text — more readable content only helps.

---

## 2. Site readiness checklist (everything to confirm before applying)

- [ ] **Domain live on HTTPS** via Cloudflare — blankpane.com serves over HTTPS (done).
- [ ] **Privacy Policy** covers: what's collected, log files, cookies/ads (Google AdSense + DART/AdChoices opt-out),
      analytics, CCPA rights, GDPR rights, children under 13, contact. ✅ (strengthened 2026-08-08).
- [ ] **Terms / Cookie / Disclaimer / About / Contact** all live and linked in the footer. ✅
- [ ] **Cookie consent banner** present for EU/UK traffic. ✅ (`CookieBanner.astro`)
- [ ] **Feedback + contact** channel. ✅ (`FeedbackModal.astro` + `/contact/`)
- [ ] **Readable original content** on every page (not just the tool). ✅ (guides, use-cases, FAQs)
- [ ] **Mobile-friendly + fast** (Core Web Vitals pass — Lighthouse runs are in `lh-report-*.json`). ✅
- [ ] **`ads.txt`** present. ✅ — **but the placeholder `pub-XXXXXXXX` must be replaced** with the real publisher ID
      the moment AdSense approval lands (otherwise AdSense reports "ads.txt not detected" and won't serve).
- [ ] **Search Console** ownership verified (google-site-verification meta or DNS TXT). ⬜ do before/at application.
- [ ] **A bit of organic traffic** — AdSense approval is easier with real search traffic + indexed pages. The
      P0 keyword pages + guides are the traffic engine; apply after the site has been indexed a few weeks.

---

## 3. AdSense application — what to expect & manual steps

### Manual steps (you do these; ~30–45 min)
1. Create an AdSense account at https://adsense.google.com using a real Google account.
2. Enter your site URL → **blankpane.com**.
3. **Site verification**: paste the `google-site-verification` meta tag (or DNS TXT) — verify ownership in Search Console.
4. Submit the site for review. Google reviews the *whole site*, not one page.
5. **After approval** (email from AdSense):
   - Grab your **Publisher ID** (Settings → Account information).
   - Put it in `public/ads.txt` replacing `pub-XXXXXXXXXXXXXXXX` → deploy.
   - Add the AdSense `<script async src="https://pagead2.googlesyndication.com/...">` to `BaseLayout.astro` `<head>`.
   - In AdSense → **Auto ads**, enable **Auto Ads** and set the **Ad Load** slider to *Min* (start conservative).
   - **Critical for a click-heavy tool:** if Auto-Vignettes start popping full-screen ads when users tap
     *Download PNG* / *Go Full Screen*, add `data-google-vignette="false"` to those buttons.
6. Verify `ads.txt` is fetchable: https://blankpane.com/ads.txt

### Timeline
| Phase | When | What happens |
|---|---|---|
| Apply | Day 0 | Submit site + ownership verification |
| Review | Day 0 – 2 weeks (usually 2–5 days) | Automated + manual review of the whole site |
| Approval | ~2–14 days | Email with next steps; account goes to "Getting ready" |
| Ads live | 1–2 days after approval | After pasting pub ID in `ads.txt`, adding script, enabling Auto Ads |
| First earnings report | Next month | Payments threshold $100, via bank/check/EFT |

**If rejected:** Google emails the reason (usually "Low Value Content" or "Insufficient Content"). Fix = add more
original guide/blog/FAQ text, wait 30 days, re-apply. Our content stack makes this unlikely.

---

## 4. Other ad providers (backups / once you have traffic)

| Provider | Min traffic | Best for | Approval | RPM uplift vs AdSense | Notes |
|---|---|---|---|---|---|
| **Google AdSense** | none | Baseline display + Auto Ads | Medium (content review) | baseline | Start here |
| **Ezoic** | ~10K/mo | Header bidding, AI placement | Medium | +20–50% | Premium broker, biggest uplift |
| **Snigel** | ~50K/mo (managed) | Managed ad strategy | Managed | +20–50% | Handles setup so ads don't break the tool |
| **MonetizeMore** | ~10K/mo | Global scaling, header bidding | Medium | +20–50% | Good international RPM |
| **Playwire** | ~50K–100K/mo | Enterprise, gaming/utility | Managed | +20–50% | Top-tier CPM, stricter entry |
| **Adsterra** | low | Popunders/interstitials/push | Easy | varies (often high RPM on clicks) | Easy approval; watch for intrusive formats |
| **PropellerAds** | low | Push + interstitials | Easy | varies | Easy; guard against redirect ads |
| **Infolinks** | low | Text-link ads on FAQ/guide copy | Easy | small | Complements AdSense, doesn't need big traffic |
| **Mediavine/Raptive** | 10K–50K sessions | Premium display | Medium-High | high | Needs real traffic; worth it later |
| **Affiliate / BuyMeACoffee** | any | Desktop SaaS links, donations | n/a | — | Add once you have an audience |


### 4.1 How competitors monetize — the "mass provider" model (from their ads.txt)

Competitors' `ads.txt` files are the tell: a top-tier site's file starts with `MANAGERDOMAIN=setupad.com` followed by
**hundreds of ad providers** — google.com, pubmatic.com, rubiconproject.com, appnexus.com, etc. They did **not** apply
to each company. The owner applied to **one ad-management network (a "mass provider")** which:

- Connects the site to 100+ ad exchanges/SSPs simultaneously using **Header Bidding** (all networks bid in real-time,
  driving up the price for the site's ad space — typically **+20–50% RPM** vs AdSense alone).
- Gives the publisher **one copy-paste script** + a **pre-made `ads.txt`** they upload as-is.
- Consolidates all earnings and pays **a single monthly payment**.

So a "huge ads.txt" is not a sign of manual work — it's a sign they use a mass provider.

### 4.2 The two ways to start earning

| | Option 1 — Mass provider (recommended) | Option 2 — Google AdSense (solo) |
|---|---|---|
| What you do | Apply to ONE network; paste their code + their ads.txt | Apply directly to AdSense; `ads.txt` has a single Google line |
| Earnings | Higher (header bidding across 100+ exchanges) | Lower (Google demand only) |
| Approval | Per-network review; some accept new/low-traffic sites | Easy-ish, but content review of whole site |
| Control | Managed placement (they keep ads off your tool buttons) | Full control via Auto Ads |
| Payment | Single consolidated monthly payout | Single monthly payout |

### 4.3 Provider tiers by traffic (who to apply to, when)

| Traffic tier | Provider | Notes |
|---|---|---|
| **Start / low traffic** (0–10K/mo) | **Google AdSense** first (baseline), or **Ezoic** / **Setupad** — both accept newer sites with lower traffic | AdSense = easiest approval with our content stack; Ezoic/Setupad add header bidding early |
| **Mid (10K+ views/mo)** | **Monumetric**, **Journey by Raptive**, **MonetizeMore** | Premium brokers, header bidding, +20–50% RPM |
| **Large (50K+ views/mo)** | **Mediavine**, **Raptive** | Highest CPM in the industry; strictest entry; best long-term payout |
| **Any** | **Adsterra / PropellerAds** (easy approval, interstitials/push) — as a supplement, not the main engine | Watch for intrusive/redirect formats (Google policy risk) |
| **Any** | **Infolinks** | Text-link ads on FAQ/guide copy; small but free money |

> **Rule of thumb:** one **mass provider** + AdSense together is the standard high-earning setup. Never run several
> overlay networks at once (aggressive-monetization flag).

### 4.4 The 5-step roadmap to get ads live

1. **Build content** — 20–30 original, high-quality pages (guides/blogs/FAQs). ✅ we have 314 pages; keep adding guides.
2. **Get traffic** — optimize for search + share; the P0 keyword pages are the engine. Get steady daily visitors.
3. **Apply to a network** — start with AdSense (setupad.com / ezoic.com are the mass-provider alternatives).
4. **Pass review** — they check for illegal content, gambling, scraped text. We're clean.
5. **Paste the code + upload their ads.txt** — their script in the `<head>`, their `ads.txt` at `/ads.txt`.

### 4.5 Recommended path for blankpane.com

| Phase | When | Action |
|---|---|---|
| **Now → approval** | When ~4–6 weeks of indexed traffic | Apply to **Google AdSense** (fastest approval, baseline RPM). Fill real pub ID in `ads.txt`, add script, enable Auto Ads (Min). |
| **~10K visits/mo** | After AdSense is live & steady | Apply to **Ezoic or Setupad** as the mass provider → header bidding +20–50% RPM, they supply a full `ads.txt`. Run alongside AdSense. |
| **~50K visits/mo** | If growth continues | Graduate to **Mediavine / Raptive** for the highest CPM. |

Keep `ads.txt` in sync at every step (each network you add must be listed there, or that network's revenue drops to $0).

### 4.6 Multi-network guardrails (from the research)
- Keep **`ads.txt` updated** with every network (missing entry = $0 from that network).
- **Don't overload**: 3 banners + a pop-up + an anchor drawer at once → Google flags "aggressive monetization".
- **No redirection/pop-under networks** that hijack the browser — that's a Google policy violation.
- Never let ads overlap the fullscreen / download buttons.

---

## 5. What's in place on the site (this change)

- `public/ads.txt` — placeholder AdSense line + instructions (deploy-ready, needs real pub ID after approval).
- `src/components/FeedbackModal.astro` — ★ Feedback button + modal (1–5 star rating, comment, optional email).
  Three states: **form → submitting → success/error**. On network failure it opens a prefilled `mailto:` so
  feedback is never lost. Also tracks `feedback_open` / `feedback_rating` / `feedback_submit` in GA4.
- `src/components/CookieBanner.astro` — EU/UK consent banner (accept/decline persisted in localStorage).
- `packages/web/app1/functions/api/feedback.ts` — Cloudflare Pages Function `POST /api/feedback`.
  Validates the modal payload and forwards it to the VaayaLabs leads API (fixed schema) using
  `LEADS_API_URL` (default `https://admin.vaayulab.com/api/leads`) + `LEADS_API_KEY` (sent as `x-api-key`).
  **To receive feedback, set both env vars** in Cloudflare Pages → Settings → Variables (see `.dev.vars.example`).
- Legal pages strengthened: GDPR/CCPA rights, log files, children under 13, effective dates, feedback section on `/contact/`.

---

## 6. Open / manual actions (track here)

- [ ] Replace `pub-XXXXXXXXXXXXXXXX` in `public/ads.txt` with the real AdSense Publisher ID after approval.
- [ ] Add the AdSense script + enable Auto Ads (Min load) after approval.
- [ ] Verify site ownership in Search Console (google-site-verification).
- [ ] Set `LEADS_API_URL` + `LEADS_API_KEY` in Cloudflare Pages → Settings → Variables so feedback reaches the VaayaLabs leads API. For local dev: `cp packages/web/app1/.dev.vars.example packages/web/app1/.dev.vars` and fill the real token.
- [ ] **At ~10K visits/mo:** apply to a mass provider (Ezoic or Setupad) for header bidding; replace `ads.txt` with their pre-made file (keep it in sync + keep the Google line).
- [ ] **At ~50K visits/mo:** re-evaluate Mediavine / Raptive for higher CPM.
- [ ] Re-check `ads.txt` each time a network is added (missing line = $0 from that network).
