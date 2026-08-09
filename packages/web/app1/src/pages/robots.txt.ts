export const prerender = true;

export async function GET() {
  const body = `# BlankPane — robots.txt
# Allow all crawlers (search + AI) — this is a public utility tool.

User-agent: *
Allow: /
Crawl-delay: 2

# Sitemap
Sitemap: https://blankpane.com/sitemap.xml

# Explicitly allow common AI crawlers (redundant with global allow, but signals intent)
User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
