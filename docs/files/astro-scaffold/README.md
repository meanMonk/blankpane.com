# FullScreenColor — Astro scaffold

Drop this into a fresh `npm create astro@latest` project (choose "Empty" template),
replacing src/pages and src/layouts, then:

  npm install
  npm run dev

Deploy: connect the repo in Cloudflare Pages, build command `npm run build`,
output directory `dist`.

src/pages/[color].astro auto-generates one static page per entry in
src/data/colors.json — add more color/intent rows there to spin up new
pages without touching templates.
