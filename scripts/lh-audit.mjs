#!/usr/bin/env node
/**
 * Lighthouse mobile + desktop performance/SEO audit for BlankPane.
 *
 * Runs real Lighthouse (via npx, auto-installs on first run) against either:
 *   - the local dist served on a temp port (default), or
 *   - the production site.
 *
 * Usage:
 *   node scripts/lh-audit.mjs                     # local dist, key pages, mobile+desktop
 *   node scripts/lh-audit.mjs --mode prod         # https://blankpane.com
 *   node scripts/lh-audit.mjs --mode local --port 3000
 *   node scripts/lh-audit.mjs --pages / --pages /tools/dead-pixel-test/
 *   node scripts/lh-audit.mjs --form-factor desktop-only   # skip mobile
 *   node scripts/lh-audit.mjs --out lh-report.json
 *
 * Flags:
 *   --mode         local|prod            (default: local)
 *   --dist         dist dir              (default: packages/web/app1/dist)
 *   --port         local serve port      (default: 4173)
 *   --url          production base       (default: https://blankpane.com)
 *   --pages        repeatable, page path to test (default: key pages)
 *   --form-factor  all|mobile|desktop    (default: all)
 *   --out          report path           (default: lh-report.json)
 *
 * Output: JSON with per-page {mobile, desktop} category scores. Requires
 * Google Chrome and downloads `lighthouse` via npx on first run (~2 min).
 */

import { createServer } from "node:http";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_DIST = path.join(ROOT, "packages", "web", "app1", "dist");

function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const mode = arg("--mode", "local");
const distDir = path.resolve(arg("--dist", DEFAULT_DIST));
const port = parseInt(arg("--port", "4173"), 10);
const prodUrl = arg("--url", "https://blankpane.com").replace(/\/$/, "");
const formFactor = arg("--form-factor", "all");
const outFile = path.resolve(arg("--out", path.join(ROOT, "lh-report.json")));
const defaultPages = ["/", "/tools/", "/tools/dead-pixel-test/", "/white-screen/", "/black-screen/", "/blog/"];
const pages = process.argv.includes("--pages")
  ? process.argv.map((v, i, a) => (a[i - 1] === "--pages" ? v : null)).filter(Boolean)
  : defaultPages;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".webp": "image/webp", ".xml": "application/xml",
  ".txt": "text/plain", ".ico": "image/x-icon", ".woff2": "font/woff2",
  ".woff": "font/woff", ".map": "application/json",
};

/* ------------------------------------------------------------------ */
/* Tiny static server for dist                                        */
/* ------------------------------------------------------------------ */
async function serveDist() {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      if (urlPath.endsWith("/")) urlPath += "index.html";
      let file = path.join(distDir, urlPath);
      const rel = path.relative(distDir, file);
      if (rel.startsWith("..")) { res.writeHead(403); res.end(); return; }
      let buf = await readFile(file);
      if (urlPath.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
      } else {
        res.setHeader("Content-Type", MIME[path.extname(file)] || "application/octet-stream");
      }
      res.writeHead(200);
      res.end(buf);
    } catch {
      try {
        const f404 = path.join(distDir, "404.html");
        const buf = await readFile(f404);
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(buf);
      } catch {
        res.writeHead(404); res.end("not found");
      }
    }
  });
  await new Promise((r) => server.listen(port, r));
  console.log(`serving ${distDir} → http://localhost:${port}`);
  return server;
}

/* ------------------------------------------------------------------ */
/* Lighthouse runner                                                  */
/* ------------------------------------------------------------------ */
async function runLighthouse(url, form) {
  const args = [
    "--yes",
    "lighthouse",
    url,
    "--quiet",
    "--chrome-path", CHROME,
    "--chrome-flags", "--headless=new --no-sandbox --disable-gpu",
    "--output", "json",
    "--output-path", "stdout",
    ...(form === "desktop" ? ["--preset", "desktop"] : ["--form-factor", form]),
    "--only-categories", "performance,seo,accessibility,best-practices",
    "--max-wait-for-load", "30000",
  ];
  const { stdout } = await execFileP("npx", args, { maxBuffer: 20 * 1024 * 1024 });
  return JSON.parse(stdout);
}

const pick = (r) => r && r.categories
  ? Object.fromEntries(Object.entries(r.categories).map(([k, v]) => [k, Math.round(v.score * 100)]))
  : null;

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */
let server = null;
const base = mode === "local" ? `http://localhost:${port}` : prodUrl;
if (mode === "local") server = await serveDist();

const report = {
  meta: {
    generatedAt: new Date().toISOString(),
    mode,
    base,
    distDir: mode === "local" ? distDir : undefined,
    pages: pages.length,
    formFactor,
    lighthouse: "npx lighthouse (auto-installed)",
  },
  pages: {},
};

for (const p of pages) {
  const url = base + p;
  report.pages[p] = { url, mobile: null, desktop: null };
  try {
    if (formFactor !== "desktop-only") {
      const r = await runLighthouse(url, "mobile");
      report.pages[p].mobile = pick(r);
    }
  } catch (e) {
    console.error(`  [mobile ${p}] failed: ${e.message}`);
  }
  try {
    if (formFactor !== "mobile-only") {
      const r = await runLighthouse(url, "desktop");
      report.pages[p].desktop = pick(r);
    }
  } catch (e) {
    console.error(`  [desktop ${p}] failed: ${e.message}`);
  }
  console.log(`done: ${p}`);
}

if (server) server.close();
await writeFile(outFile, JSON.stringify(report, null, 2));

console.log(`\n=== LIGHTHOUSE AUDIT (${mode} · ${base}) ===`);
const catKeys = ["performance", "seo", "accessibility", "best-practices"];
const label = (o) => catKeys.map((k) => (o && k in o ? `${k.slice(0, 3)}:${o[k]}` : "--")).join(" | ");
for (const [p, r] of Object.entries(report.pages)) {
  console.log(`  ${p}\n    mobile : ${label(r.mobile)}\n    desktop: ${label(r.desktop)}`);
}
console.log(`\nreport → ${outFile}`);
