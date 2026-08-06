You are extending an existing Astro static site (fullscreencolor project) deployed on Cloudflare
Pages. It already has:
- src/layouts/BaseLayout.astro
- src/data/colors.json + src/pages/[color].astro (generic solid-color template)

Do NOT force the new pages below into the [color].astro template — they need bespoke
interaction (sliders, ring shapes, crack overlays, timers), so build each as its own file
under src/pages/tools/{slug}.astro, importing BaseLayout.

1. Create src/data/tools.json with one entry per tool:
   { slug, name, cluster, description, relatedSlugs: [3-4 slugs] }

   Clusters and slugs to include:
   - "lighting": zoom-light-screen, ring-light-screen, screen-flashlight
   - "prank": broken-screen-dummy, fake-update-screen, no-signal-screen
   - "utility": dead-pixel-test, screen-cleaner, countdown-timer-fullscreen

2. Create a shared src/components/RelatedTools.astro that takes a `slugs` prop, looks each up
   in tools.json, and renders a small link grid — reuse this component at the bottom of every
   page in step 3 and also add it to the bottom of src/pages/[color].astro so color pages link
   out to relevant tools (e.g. white-screen → zoom-light-screen, screen-flashlight).

3. Build each tool page at src/pages/tools/{slug}.astro with UNIQUE interaction per page —
   do not copy-paste one script across pages:

   - zoom-light-screen.astro: full solid-color fill, a Kelvin slider (2700-6500K) with labeled
     ticks (Warm/Office, Neutral, Daylight, Cool/Stream) that maps to an actual hex value shown
     full screen, brightness slider, fullscreen button, PNG download at custom size (reuse the
     canvas-download logic already in index.html).

   - ring-light-screen.astro: renders a lit border/ring (adjustable width, thickness, corner
     radius, color temperature, intensity) around a dark center — NOT a solid fill. Include a
     short instructional line: "shrink your call window to the center of the ring."

   - screen-flashlight.astro: single max-brightness white fullscreen toggle, large touch target,
     mobile-first layout, brief on-screen brightness/eye-distance caution text.

   - broken-screen-dummy.astro: a style picker (spiderweb crack, full shatter, dead-pixel lines,
     LCD bleed, vertical glitch) rendered as SVG/CSS overlays, fullscreen button, PNG export of
     the current style, Esc-to-exit, and a short "harmless prank" disclaimer line.

   - fake-update-screen.astro: 3 selectable full-screen styles (Windows-style update spinner,
     macOS-style update screen, Linux-style terminal panic text scroll), fullscreen button,
     same disclaimer pattern as broken-screen-dummy, and mutual RelatedTools links between the two.

   - no-signal-screen.astro: animated canvas static/noise loop with "NO SIGNAL" text overlay,
     fullscreen button.

   - dead-pixel-test.astro: auto-cycles through white/black/red/green/blue/gradient/checkerboard
     at an adjustable interval, plus a manual "next/previous" control and a rapid-flash
     "stuck pixel fix" mode.

   - screen-cleaner.astro: solid white/black fill toggle, disables click/tap/keydown default
     behavior while active (input-lock), on-screen "safe to wipe — tap here or press Esc to
     unlock" message, auto-unlock timer option.

   - countdown-timer-fullscreen.astro: large centered digit timer over a selectable solid
     background color, preset buttons (1/5/10/25 min) + custom minutes input, fullscreen button.

4. Each page needs: unique <title>/meta description targeting its own keyword (do not reuse
   phrasing across pages), one H1, a 100-150 word intro paragraph, a "how to use" 3-step list,
   a 3-question FAQ block with FAQPage JSON-LD unique to that tool, and <RelatedTools
   slugs={...} /> pulling from its tools.json relatedSlugs.

5. Add a new hub page src/pages/tools/index.astro that groups all tools by cluster
   (Lighting / Prank & Fun / Testing & Utility) with short 1-line descriptions, and link to
   it from the main nav in BaseLayout.astro.

6. Update src/pages/sitemap or the sitemap integration config so all new /tools/{slug}/ routes
   are included.

Output: list every file created/modified with its path before writing any code. Keep all
copy specific to each tool's real use case — no templated filler paragraphs repeated across
pages, since near-duplicate content across pages is the main SEO risk in this niche.