Here's the checklist organized by category, plus a copy-paste prompt at the end that gets your local model to actually implement the code-side items against your existing Astro project.

## On-page SEO checklist

- One unique H1 per page, keyword near the front, never duplicated as H2
- Title tag: 50–60 chars, primary keyword first, brand at the end (`White Screen — Full Screen Color Tool | FullScreenColor`)
- Meta description: 140–160 chars, includes keyword + a reason to click (free, instant, no download)
- URL slug matches the primary keyword exactly (`/white-screen/`, not `/tools/white-screen-page/`)
- First 100 words of body copy contain the primary keyword naturally
- Unique intro paragraph per page (no templated filler reused across color/tool pages — your biggest cannibalization risk given the near-duplicate keyword list from your sheet)
- FAQ block per page, 3–4 questions, each unique wording (not copy-pasted across pages)
- Image/SVG alt text where relevant (mostly N/A here since it's CSS-rendered color, but any illustrative graphics need it)
- Internal links: 3–4 to sibling pages in the same topical cluster + 1 bridge link to an adjacent cluster (per the architecture from earlier)
- Breadcrumb trail (Home → Cluster → Page) — helps both users and schema

## Schema (structured data) checklist

- `WebApplication` or `SoftwareApplication` schema on every tool page (already on your homepage)
- `FAQPage` schema matching the visible on-page FAQ exactly — mismatched schema vs. visible content is a Google spam-policy violation, not just a missed opportunity
- `BreadcrumbList` schema site-wide once breadcrumbs exist
- `Organization` schema on the homepage (name, logo, url, sameAs social profiles)
- `WebSite` schema with `SearchAction` if you ever add on-site search
- Validate every page through Google's Rich Results Test before shipping — silent schema errors are common with AI-generated JSON-LD

## Meta / head tag checklist

- `<link rel="canonical">` on every page, absolute URL, no trailing-slash mismatches
- `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (even a simple branded 1200×630 fallback image) on every page — affects link previews on WhatsApp/Slack/social, which matters for a shareable prank/utility tool
- `twitter:card` = `summary_large_image`
- `hreflang` tags once language folders exist (self-referencing + reciprocal, including an `x-default`)
- `<meta name="robots">` — `index, follow` everywhere except thin/duplicate pages, which should be `noindex, follow` instead of deleted
- Viewport tag present (already is) — verify no `maximum-scale=1` (blocks pinch-zoom, bad for accessibility and a minor UX ranking signal)
- Favicon + apple-touch-icon + manifest.json for PWA-lite polish

## Technical SEO checklist

- `sitemap.xml` auto-generated via `@astrojs/sitemap`, submitted to Google Search Console and Bing Webmaster Tools
- `robots.txt` allowing all crawl, pointing to sitemap
- Core Web Vitals: LCP < 2.5s, CLS near 0 (watch the fullscreen overlay transition and font loading — swap-in of Space Grotesk/Inter can cause layout shift if not preloaded)
- No render-blocking JS above the fold; the tool's interactive script can load with `defer`
- Mobile-first rendering check on every new page (you're already centered/responsive, but re-check after each new tool page)
- 404 page that's actually useful (links back to hub + search-style link list), not a dead end
- HTTPS via Cloudflare (default, just confirm no mixed-content warnings from any external asset)
- Redirect map ready before you touch any URL structure — Cloudflare Pages `_redirects` file for anything you rename later, so you never lose indexed URLs

## Off-page SEO checklist

- Submit the site to Google Search Console + Bing Webmaster Tools immediately at launch, request indexing on core pages
- Get listed in relevant tool directories (Product Hunt, AlternativeTo, free-tool listing sites like "TinyStartups," "SaaSHub," "There's An AI For That" if AI-adjacent framing applies) — cheap, legitimate backlinks for utility sites
- Publish 1–2 of the longer blog/guide pages (dead pixel testing guide, "how to light a Zoom call with your screen") on your own site, then share them where relevant communities exist (Reddit r/webdev, r/workfromhome, r/buildinpublic) — disclose you're the site owner, don't spam
- Reach out for a couple of genuine niche backlinks: photography forums (white-screen-as-lightbox use case), remote-work blogs (zoom lighting), prank/novelty roundup sites (broken screen)
- Social profiles with consistent branding (even minimal ones) for the `sameAs` schema field and basic brand-entity signal
- Avoid link farms / paid link schemes — for a small utility site, a handful of real, topically relevant links outperforms volume and won't risk a manual action

## AdSense / monetization-specific checklist

- Genuine, complete Privacy Policy disclosing Google's use of cookies/ads (not boilerplate lorem-ipsum)
- About, Contact, Terms, Cookie Policy, Disclaimer pages all live before you apply
- Cookie consent banner for EU/UK traffic (you have real Tier-1/Tier-2 mixed traffic per your keyword sheet)
- Enough original text per page to clear AdSense's thin-content bar — this is why the FAQ + intro + use-case blocks matter, not just decoration
- Ad placement never overlapping or disguised near the fullscreen trigger button (policy violation + bad UX, flagged earlier)

---

## Implementation prompt for Qwen/DeepSeek

```
You are auditing and fixing SEO on an existing Astro project (fullscreencolor) deployed on
Cloudflare Pages. Structure: src/layouts/BaseLayout.astro, src/data/colors.json +
src/pages/[color].astro, src/data/tools.json + src/pages/tools/{slug}.astro,
src/components/RelatedTools.astro.

Go through every page currently in src/pages/ (including generated [color].astro and
tools/{slug}.astro routes) and do the following, file by file. List every file you touch
before editing it.

1. HEAD / META — for each page, verify and fix:
   - Unique <title>, 50-60 characters, primary keyword first, "| FullScreenColor" suffix
   - Unique meta description, 140-160 characters, includes keyword + a reason to click
   - <link rel="canonical"> with the correct absolute URL for that page
   - og:title, og:description, og:type=website, og:url, og:image (use a single shared
     1200x630 fallback at /og-default.png if no per-page image exists yet)
   - twitter:card = summary_large_image
   - meta robots: "index, follow" by default; flag any page you think is too thin
     (near-duplicate content) and set it to "noindex, follow" instead of deleting it —
     list which pages you flagged and why.

2. SCHEMA — for each page:
   - Add or verify WebApplication/SoftwareApplication JSON-LD matching that page's real tool
   - Add FAQPage JSON-LD that EXACTLY matches the visible FAQ text on the page — do not let
     schema and visible copy drift out of sync
   - Add BreadcrumbList JSON-LD reflecting Home > Cluster > Page
   - Add Organization JSON-LD once on the homepage only (name, url, logo, sameAs array —
     leave sameAs as an empty array with a comment for me to fill in social URLs)

3. CONTENT DEDUPLICATION — compare the intro paragraphs, FAQ questions, and use-case blocks
   across all pages. Flag (in a short report, don't auto-rewrite silently) any two pages
   that share more than one full sentence of near-identical wording, since that's the
   biggest SEO risk in this niche given how many near-duplicate keyword variants exist.

4. INTERNAL LINKING — verify every page has: 3-4 links to sibling pages in its own cluster
   (via RelatedTools/color-links), 1 bridge link to an adjacent cluster, and 1 link back to
   the relevant hub page. Add whatever's missing using the existing RelatedTools component
   and tools.json / colors.json relationships — don't hardcode new link lists inline.

5. SITE-WIDE TECHNICAL FILES — set up or verify:
   - @astrojs/sitemap integration in astro.config.mjs, output covering all routes including
     dynamically generated [color] and tools/{slug} pages
   - public/robots.txt allowing full crawl and pointing to the sitemap
   - A custom 404 page at src/pages/404.astro linking back to the hub and listing the main
     tool clusters
   - hreflang tags in BaseLayout.astro IF language subfolders exist yet; otherwise skip and
     note it as a future step

6. PERFORMANCE — check BaseLayout.astro for font-loading strategy; if fonts aren't preloaded,
   add <link rel="preload"> for the primary font files to reduce layout shift. Confirm no
   script blocks rendering above the fold (defer or move to end of body where safe).

Output format: a markdown report per file listing (a) what was already correct, (b) what you
changed, (c) anything you flagged for manual review rather than auto-fixing (especially
content deduplication and thin-content noindex candidates).
```