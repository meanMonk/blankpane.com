#!/usr/bin/env node
// @astrojs/sitemap only emits sitemap-index.xml + sitemap-N.xml, so /sitemap.xml 404s.
// Post-build step: write a single inline sitemap.xml (all URLs) for crawlers/LLMs
// that fetch /sitemap.xml directly.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");

if (!existsSync(join(distDir, "sitemap-index.xml"))) {
  console.log("sitemap: no sitemap-index.xml found, skipping");
  process.exit(0);
}

const chunkFiles = readdirSync(distDir)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .sort((a, b) => parseInt(a.split("-")[1]) - parseInt(b.split("-")[1]));

if (chunkFiles.length === 0) {
  writeFileSync(join(distDir, "sitemap.xml"), readFileSync(join(distDir, "sitemap-index.xml")));
  console.log("sitemap: copied sitemap-index.xml -> sitemap.xml");
  process.exit(0);
}

const urls = [];
for (const f of chunkFiles) {
  const xml = readFileSync(join(distDir, f), "utf8");
  const m = xml.match(/<url>[\s\S]*?<\/url>/g);
  if (m) urls.push(...m);
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.join("\n") +
  "\n</urlset>\n";

writeFileSync(join(distDir, "sitemap.xml"), xml);
console.log(`sitemap: wrote sitemap.xml with ${urls.length} URLs`);
