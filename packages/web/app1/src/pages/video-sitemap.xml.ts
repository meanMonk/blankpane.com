import { youtubeVideos } from "../data/youtube";

export const prerender = true;

export async function GET() {
  const urls = youtubeVideos
    .map(
      (v) => `<url>
  <loc>https://blankpane.com/${v.slug}/</loc>
  <video:video>
    <video:thumbnail_loc>${v.thumbnailUrl}</video:thumbnail_loc>
    <video:title>${v.slug.replace(/-/g, " ")} 10 hours fullscreen video</video:title>
    <video:description>Full-screen ${v.slug.replace(/-/g, " ")} video. Free, no download, works in any browser.</video:description>
    <video:content_loc>${v.watchUrl}</video:content_loc>
    <video:player_loc allow_embed="yes">${v.embedUrl}</video:player_loc>
    <video:duration>36000</video:duration>
    <video:publication_date>2026-08-08</video:publication_date>
    <video:family_friendly>yes</video:family_friendly>
  </video:video>
</url>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
