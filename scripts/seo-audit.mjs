#!/usr/bin/env node
/**
 * SEO audit for BlankPane static build (dist) and production site.
 *
 * Usage:
 *   node scripts/seo-audit.mjs --mode local                 # audit ./dist files directly (fast, no server)
 *   node scripts/seo-audit.mjs --mode prod                  # crawl https://blankpane.com
 *   node scripts/seo-audit.mjs --mode local --dist <path> --base <origin> --out <file.json>
 *   node scripts/seo-audit.mjs --mode prod  --url <base>    --out <file.json>
 *
 * Flags:
 *   --mode   local|prod            (default: local)
 *   --dist   dist directory        (default: packages/web/app1/dist)
 *   --base   canonical origin      (default: https://blankpane.com)
 *   --url    production base       (default: https://blankpane.com)
 *   --out    report path           (default: seo-report.json)
 *   --max-pages                    cap on crawled pages (prod, default 500)
 *
 * Output: JSON report with per-page scores, category scores, internal-linking
 * graph analysis (dead links, orphans, depth, hreflang reciprocity) and
 * site-wide issues. Prints a concise summary to stdout.
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_DIST = path.join(ROOT, "packages", "web", "app1", "dist");
const DEFAULT_BASE = "https://blankpane.com";

/* ------------------------------------------------------------------ */
/* CLI args                                                           */
/* ------------------------------------------------------------------ */
function arg(name, dflt) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

const mode = arg("--mode", "local");
const distDir = path.resolve(arg("--dist", DEFAULT_DIST));
const baseUrl = arg("--base", DEFAULT_BASE).replace(/\/$/, "");
const prodUrl = arg("--url", DEFAULT_BASE).replace(/\/$/, "");
const outFile = path.resolve(arg("--out", path.join(ROOT, "seo-report.json")));
const maxPages = parseInt(arg("--max-pages", "500"), 10);
const CONCURRENCY = 8;

/* ------------------------------------------------------------------ */
/* HTML helpers                                                       */
/* ------------------------------------------------------------------ */
function parseAttrs(tag) {
  const attrs = {};
  const re = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  let m;
  while ((m = re.exec(tag))) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  for (const b of tag.matchAll(/(?:^|\s)(async|defer|crossorigin|nomodule|hidden|inert)\s*(?=[\s>/])/gi)) attrs[b[1].toLowerCase()] = "";
  return attrs;
}

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decode(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-z]+);/g, (m, code) => {
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return n ? String.fromCodePoint(n) : m;
    }
    return ENT[code] ?? m;
  });
}

function stripTags(s) {
  return decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function normalizePagePath(p) {
  let q = p;
  const h = q.indexOf("#"); if (h >= 0) q = q.slice(0, h);
  const qq = q.indexOf("?"); if (qq >= 0) q = q.slice(0, qq);
  if (q.endsWith("/index.html")) q = q.slice(0, -"index.html".length);
  if (q.endsWith(".html")) q = q.slice(0, -5);
  if (!q.startsWith("/")) q = "/" + q;
  if (q !== "/" && !q.endsWith("/")) q += "/";
  return q;
}

function resolvePath(fromPath, target) {
  const last = target.split("/").pop() || "";
  const isAsset = /\.[a-z0-9]{2,10}$/i.test(last);
  const base = fromPath === "/" ? "/" : fromPath.slice(0, fromPath.lastIndexOf("/") + 1);
  const merged = target.startsWith("/") ? target : base + target;
  const parts = [];
  for (const seg of merged.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  let out = "/" + parts.join("/");
  if (out === "/") return out;
  if (!isAsset) out += "/";
  return out;
}

function resolveLink(href, fromPath) {
  if (!href) return null;
  href = href.trim();
  const target = href.split("#")[0].split("?")[0];
  if (!target) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//")) return { kind: "external", url: target };
  if (/^(mailto|tel|javascript|data):/i.test(target)) return { kind: "special", url: target };
  if (target.startsWith("/cdn-cgi/")) return { kind: "special", url: target };
  return { kind: "internal", path: resolvePath(fromPath, target) };
}

function analyzeHtml(html) {
  const title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1]);
  const metaTags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => parseAttrs(m[0]));
  const getMeta = (k) => {
    for (const t of metaTags) if (t.name === k || t.property === k) return t.content;
    return undefined;
  };
  const linkTags = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => parseAttrs(m[0]));
  const canonical = (linkTags.find((l) => (l.rel || "").split(/\s+/).includes("canonical")) || {}).href;
  const hreflang = linkTags
    .filter((l) => (l.rel || "").split(/\s+/).includes("alternate") && l.hreflang)
    .map((l) => ({ lang: l.hreflang, href: l.href }));
  const og = {
    title: getMeta("og:title"),
    description: getMeta("og:description"),
    image: getMeta("og:image"),
    url: getMeta("og:url"),
    type: getMeta("og:type"),
  };
  const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map((m) => parseAttrs(m[0]));
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => parseAttrs(m[0]));
  const htmlTag = (html.match(/<html[^>]*>/i) || [""])[0];
  const jsonLdBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1].trim()).filter(Boolean);
  const clean = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ");
  const wordCount = stripTags(clean).split(" ").filter(Boolean).length;
  return {
    title,
    description: getMeta("description"),
    viewport: getMeta("viewport"),
    robots: getMeta("robots"),
    canonical,
    htmlLang: (htmlTag.match(/\blang=["']([^"']*)["']/i) || [, ""])[1],
    hreflang,
    og,
    twitterCard: getMeta("twitter:card"),
    h1s: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => stripTags(m[1])),
    links: [...html.matchAll(/<a\b[^>]*>/gi)].map((m) => parseAttrs(m[0]).href).filter(Boolean),
    jsonLd: jsonLdBlocks.map((b) => {
      try { return { valid: true, data: JSON.parse(b) }; }
      catch (e) { return { valid: false, error: e.message }; }
    }),
    scripts,
    imgs,
    sizeKB: Math.round(Buffer.byteLength(html) / 1024),
    wordCount,
  };
}

/* ------------------------------------------------------------------ */
/* Score computation                                                  */
/* ------------------------------------------------------------------ */
function clamp01(v) { return Math.max(0, Math.min(1, v)); }

function scorePage(data, pageUrl, inboundCount) {
  const issues = [];
  const add = (level, msg) => issues.push({ level, msg });
  const noindex = /noindex/i.test(data.robots || "");

  let on = 0;
  if (data.title) {
    on += 14;
    const tlen = data.title.length;
    if (tlen >= 30 && tlen <= 65) on += 8;
    else if (!noindex) add("warning", `Title length ${tlen} (target 30–65): "${data.title.slice(0, 60)}"`);
  } else add("critical", "Missing <title>");
  if (data.description) {
    on += 14;
    const dlen = data.description.length;
    if (dlen >= 70 && dlen <= 165) on += 8;
    else if (!noindex) add("warning", `Meta description length ${dlen} (target 70–165)`);
  } else add("critical", "Missing meta description");
  if (data.canonical) {
    on += 8;
    if (data.canonical === pageUrl) on += 4;
    else add("warning", `Canonical mismatch: ${data.canonical} != ${pageUrl}`);
  } else add("critical", "Missing canonical link");
  const h1 = data.h1s.length;
  if (h1 === 1) on += 10;
  else if (h1 === 0) add("critical", "No H1 found");
  else { on += 3; add("warning", `${h1} H1 tags found (want exactly 1)`); }
  if (data.robots && /index,\s*follow/i.test(data.robots)) on += 5;
  else if (!data.robots) add("warning", "No <meta name=robots>");
  if (data.htmlLang) on += 4;
  else add("warning", "Missing <html lang>");
  const ogComplete = [data.og.title, data.og.description, data.og.image, data.og.url].filter(Boolean).length;
  on += ogComplete * 1.5;
  if (data.twitterCard) on += 3;
  else add("warning", "Missing twitter:card meta");
  const validLd = data.jsonLd.filter((b) => b.valid);
  if (validLd.length) {
    on += 5;
    data.jsonLd.filter((b) => !b.valid).forEach((b) => add("critical", `Invalid JSON-LD: ${b.error}`));
  } else add("warning", "No JSON-LD schema found");
  if (data.wordCount >= 150) on += 5;
  else if (!noindex) add("warning", `Thin content — ${data.wordCount} words`);
  const uniqueHreflangTargets = new Set(data.hreflang.map((h) => h.href)).size;
  const selfOnlyHreflang = uniqueHreflangTargets === 1 && data.hreflang.some((h) => h.href === pageUrl || h.href === new URL(pageUrl).pathname);
  if (data.hreflang.length >= 3) on += 6;
  else if (selfOnlyHreflang) on += 6;
  else if (data.hreflang.length === 0) add("warning", "No hreflang alternates");
  else add("warning", `Only ${data.hreflang.length} hreflang alternates`);

  let il = 0;
  const linkCt = data.internalPageTargets.length;
  il += 40 * clamp01(linkCt / 3);
  if (linkCt < 3) add("warning", `Only ${linkCt} internal links (want ≥ 3)`);
  if (data.deadTargets.length === 0) il += 35;
  else { il += 35 * clamp01(1 - data.deadTargets.length / 5); data.deadTargets.forEach((d) => add("critical", `Dead internal link → ${d}`)); }
  if (inboundCount > 0) il += 25;
  else add("warning", "Orphan — no inbound internal links");

  let mob = 0;
  if (data.viewport) {
    mob += 40;
    if (/width\s*=\s*device-width/i.test(data.viewport)) mob += 30;
    else add("warning", `Viewport missing width=device-width: "${data.viewport}"`);
    if (!/maximum-scale\s*=\s*1/i.test(data.viewport)) mob += 30;
    else add("warning", "Viewport sets maximum-scale=1 (blocks pinch-zoom)");
  } else add("critical", "Missing viewport meta");

  let perf = 0;
  if (data.sizeKB <= 40) perf += 30;
  else perf += 30 * clamp01(40 / data.sizeKB);
  if (data.sizeKB > 100) add("warning", `Large page (${data.sizeKB} KB)`);
  const blocking = data.scripts.filter((s) => s.src && !("async" in s) && !("defer" in s) && s.type !== "module").length;
  perf += 30 * clamp01(1 - blocking / 3);
  if (blocking > 0) add("info", `${blocking} render-blocking script(s)`);
  const httpRes = data.httpResources ?? [];
  if (httpRes.length === 0) perf += 20;
  else httpRes.forEach((r) => add("warning", `Mixed content (http://): ${r}`));
  perf += 20 * clamp01(4 / ((data.externalResources?.length ?? 0) + 1));

  return {
    score: Math.round(0.45 * on + 0.25 * il + 0.15 * mob + 0.15 * perf),
    categories: { onPage: Math.round(on), internalLinking: Math.round(il), mobile: Math.round(mob), perf: Math.round(perf) },
    issues,
    checks: {
      title: data.title,
      titleLen: data.title?.length ?? 0,
      description: data.description,
      descriptionLen: data.description?.length ?? 0,
      canonical: data.canonical,
      h1s: data.h1s,
      wordCount: data.wordCount,
      sizeKB: data.sizeKB,
      internalLinks: linkCt,
      inbound: inboundCount,
      jsonLd: validLd.map((b) => b.data["@type"] ?? b.data["@graph"]?.map((g) => g["@type"]).join(",") ?? "?"),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Local mode                                                         */
/* ------------------------------------------------------------------ */
async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

async function readSitemapPages(dir) {
  const out = new Set();
  const locRe = /<loc>([^<]+)<\/loc>/g;
  try {
    const idx = await readFile(path.join(dir, "sitemap-index.xml"), "utf8");
    const files = [...idx.matchAll(locRe)].map((m) => m[1].split("/").pop());
    for (const f of files) {
      try {
        const t = await readFile(path.join(dir, f), "utf8");
        for (const m of t.matchAll(locRe)) out.add(normalizePagePath(m[1].replace(/^https?:\/\/[^/]+/, "")));
      } catch { /* ignore */ }
    }
  } catch { /* no sitemap */ }
  return out;
}

async function collectLocal() {
  const all = await walk(distDir);
  const pages = {};
  const assetSet = new Set();
  for (const f of all) {
    const rel = path.relative(distDir, f).split(path.sep).join("/");
    if (rel === "index.html" || rel.endsWith("/index.html")) pages[normalizePagePath("/" + rel)] = f;
    else assetSet.add("/" + rel);
  }
  const sitemapPages = await readSitemapPages(distDir);

  const pageData = {};
  for (const [pagePath, file] of Object.entries(pages)) {
    if (pagePath.startsWith("/cdn-cgi/")) continue;
    const html = await readFile(file, "utf8");
    const data = analyzeHtml(html);
    data.internalTargets = [...new Set(data.links.map((h) => resolveLink(h, pagePath)).filter((l) => l && l.kind === "internal").map((l) => l.path))];
    data.internalPageTargets = data.internalTargets.filter((p) => p in pages);
    data.deadTargets = data.internalTargets.filter((p) => !(p in pages) && !assetSet.has(p));
    data.externalResources = [...new Set(data.links.map((h) => resolveLink(h, pagePath)).filter((l) => l && l.kind === "external").map((l) => l.url))];
    data.httpResources = data.externalResources.filter((u) => u.startsWith("http://"));
    pageData[pagePath] = data;
  }
  return { pageData, sitemapPages, base: baseUrl };
}

/* ------------------------------------------------------------------ */
/* Production mode                                                    */
/* ------------------------------------------------------------------ */
async function crawlProd() {
  const statuses = new Map();
  const htmls = new Map();
  const seen = new Set();
  const queue = [];

  /* seed: homepage + all page URLs found in the sitemap (resolve index → sitemap files) */
  const seed = [prodUrl + "/"];
  const sysPath = (p) => p.startsWith("/cdn-cgi/") || /\.(xml|txt|png|jpg|svg|ico|webp|css|js|woff2?)$/i.test(p) || p.startsWith("/sitemap");
  try {
    const idxRes = await fetch(prodUrl + "/sitemap-index.xml", { redirect: "follow" });
    const idxTxt = await idxRes.text();
    const sitemaps = [...idxTxt.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const sm of sitemaps) {
      try {
        const smRes = await fetch(sm, { redirect: "follow" });
        const smTxt = await smRes.text();
        for (const m of smTxt.matchAll(/<loc>([^<]+)<\/loc>/g)) seed.push(m[1]);
      } catch { /* ignore */ }
    }
  } catch { /* no sitemap */ }

  const toPath = (u) => normalizePagePath(new URL(u).pathname);
  for (const u of seed) {
    const p = toPath(u);
    if (sysPath(p)) continue;
    if (!seen.has(p)) { seen.add(p); queue.push(u); }
  }

  const fetchOne = async (u) => {
    try {
      const res = await fetch(u, { redirect: "follow", headers: { "user-agent": "seo-audit/1.0" } });
      const status = res.status;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("html")) {
        const html = await res.text();
        htmls.set(toPath(u), html);
        for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
          try {
            const link = new URL(m[1], u);
            if (link.origin === new URL(prodUrl).origin && !/\.(css|js|png|jpg|svg|xml|txt|ico|webp|woff2?)$/i.test(link.pathname)) {
              const p = toPath(link.href);
              if (sysPath(p)) continue;
              if (!seen.has(p)) { seen.add(p); queue.push(link.href); }
            }
          } catch { /* skip */ }
        }
      }
      statuses.set(toPath(u), status);
    } catch {
      statuses.set(toPath(u), 0);
    }
  };

  let done = 0;
  while (queue.length && done < maxPages) {
    const batch = queue.splice(0, Math.min(CONCURRENCY, queue.length, maxPages - done));
    await Promise.all(batch.map(fetchOne));
    done += batch.length;
    process.stdout.write(`\r  crawled ${done} URLs ...`);
  }
  process.stdout.write("\n");

  const pageData = {};
  for (const [p, html] of htmls) {
    if (p.startsWith("/cdn-cgi/")) continue;
    pageData[p] = analyzeHtml(html);
  }
  for (const p of Object.keys(pageData)) {
    const d = pageData[p];
    d.internalTargets = [...new Set(d.links.map((h) => resolveLink(h, p)).filter((l) => l && l.kind === "internal").map((l) => l.path))];
    d.internalPageTargets = d.internalTargets.filter((t) => t in pageData);
    d.deadTargets = d.internalTargets.filter((t) => {
      if (t in pageData) return false;
      const st = statuses.get(t);
      return st !== undefined && st !== 0 && st >= 400;
    });
    d.externalResources = [...new Set(d.links.map((h) => resolveLink(h, p)).filter((l) => l && l.kind === "external").map((l) => l.url))];
    d.httpResources = d.externalResources.filter((u) => u.startsWith("http://"));
  }
  const sitemapPages = new Set([...seen]);
  return { pageData, sitemapPages, base: prodUrl };
}

/* ------------------------------------------------------------------ */
/* Aggregation                                                        */
/* ------------------------------------------------------------------ */
function buildReport(core) {
  const { pageData, sitemapPages, base } = core;
  const pageList = Object.entries(pageData);

  const inbound = {};
  for (const [p, d] of Object.entries(pageData))
    for (const t of d.internalPageTargets) inbound[t] = (inbound[t] || 0) + 1;

  const results = {};
  for (const [p, d] of Object.entries(pageData)) {
    const url = base + (p === "/" ? "/" : p);
    results[p] = scorePage(d, url, inbound[p] || 0);
    results[p].url = url;
  }

  const isIndexable = (p) => {
    const d = pageData[p];
    const robots = d?.robots || "";
    return !/noindex/i.test(robots);
  };

  const titles = new Map();
  const descriptions = new Map();
  for (const [p, r] of Object.entries(results)) {
    if (!isIndexable(p)) continue;
    const t = (r.checks.title || "").toLowerCase();
    if (t) titles.set(t, [...(titles.get(t) || []), p]);
    const d = (r.checks.description || "").toLowerCase();
    if (d) descriptions.set(d, [...(descriptions.get(d) || []), p]);
  }
  const dupTitles = [...titles.entries()].filter(([, ps]) => ps.length > 1).map(([t, ps]) => ({ title: t, pages: ps }));
  const dupDescriptions = [...descriptions.entries()].filter(([, ps]) => ps.length > 1).map(([d, ps]) => ({ description: d, pages: ps }));

  const pageSet = new Set(Object.keys(pageData));
  const orphanPages = Object.keys(pageData).filter((p) => isIndexable(p) && !(inbound[p] > 0));
  const noOutboundPages = Object.entries(pageData).filter(([p, d]) => isIndexable(p) && d.internalPageTargets.length === 0).map(([p]) => p);
  const deadTargets = [];
  for (const [p, d] of Object.entries(pageData)) for (const t of d.deadTargets) deadTargets.push({ from: p, to: t });

  const sitemapList = [...sitemapPages];
  const inSitemapNotBuilt = sitemapList.filter((p) => !pageSet.has(p));
  const builtNotInSitemap = pageList.filter(([p]) => !sitemapPages.has(p)).map(([p]) => p);

  /* BFS depth from homepage */
  const depth = { "/": 0 };
  const q = ["/"];
  while (q.length) {
    const cur = q.shift();
    const next = pageData[cur]?.internalPageTargets || [];
    for (const n of next) {
      if (pageSet.has(n) && !(n in depth)) { depth[n] = depth[cur] + 1; q.push(n); }
    }
  }
  const unreachable = pageList.filter(([p]) => isIndexable(p) && !(p in depth)).map(([p]) => p);

  /* hreflang reciprocity: for each pair (a→b) ensure b declares a */
  const hreflangRecip = [];
  for (const [p, d] of Object.entries(pageData)) {
    for (const h of d.hreflang) {
      if (h.lang === "x-default") continue;
      const targetPath = normalizePagePath(h.href.replace(/^https?:\/\/[^/]+/, ""));
      const target = pageData[targetPath];
      if (!target) { hreflangRecip.push({ from: p, to: h.href, issue: "target page not found in build" }); continue; }
      const back = target.hreflang.find((x) => x.lang === (p.startsWith(`/${h.lang}/`) ? h.lang : defaultLangFor(p, h.lang)));
      if (!back) hreflangRecip.push({ from: p, to: h.href, issue: `reciprocal missing for ${h.lang}` });
    }
  }

  const allIssues = [];
  for (const [p, r] of Object.entries(results)) for (const i of r.issues) allIssues.push({ path: r.url, ...i });

  const bySeverity = (lv) => allIssues.filter((i) => i.level === lv).length;
  const topIssues = groupIssues(allIssues);
  const worst = [...pageList].sort((a, b) => results[a[0]].score - results[b[0]].score).slice(0, 10)
    .map(([p]) => ({ path: p, score: results[p].score }));

  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const catAvg = (k) => Math.round(avg(pageList.map(([p]) => results[p].categories[k])));

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      mode,
      base,
      distDir: mode === "local" ? distDir : undefined,
      prodUrl: mode === "prod" ? prodUrl : undefined,
      totalPages: pageList.length,
      sitemapPages: sitemapList.length,
    },
    summary: {
      overallScore: Math.round(avg(pageList.map(([p]) => results[p].score))),
      categories: { onPage: catAvg("onPage"), internalLinking: catAvg("internalLinking"), mobile: catAvg("mobile"), perf: catAvg("perf") },
      criticalIssues: bySeverity("critical"),
      warningIssues: bySeverity("warning"),
      infoIssues: bySeverity("info"),
      topIssues,
      duplicateTitles: dupTitles,
      duplicateDescriptions: dupDescriptions,
      orphanPages,
      noOutboundPages,
      deadLinks: deadTargets,
      hreflangReciprocityIssues: hreflangRecip,
      sitemapMissing: inSitemapNotBuilt,
      pagesNotInSitemap: builtNotInSitemap,
      unreachableFromHome: unreachable,
      worstPages: worst,
    },
    pages: results,
  };
}

function defaultLangFor(p, lang) {
  const m = p.match(/^\/([a-z]{2})\//);
  return m ? m[1] : "en";
}

function groupIssues(issues) {
  const counts = new Map();
  for (const i of issues) counts.set(i.msg, (counts.get(i.msg) || 0) + 1);
  return [...counts.entries()]
    .map(([msg, count]) => ({ msg, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */
export { collectLocal, crawlProd };

if (import.meta.url === `file://${process.argv[1]}`) {
  const core = mode === "prod" ? await crawlProd() : await collectLocal();
  const report = buildReport(core);

  await writeFile(outFile, JSON.stringify(report, null, 2));

  const s = report.summary;
  console.log(`\n=== SEO AUDIT (${mode} · ${core.base}) ===`);
  console.log(`pages: ${report.meta.totalPages}   overall: ${s.overallScore}/100`);
  console.log(`categories: onPage ${s.categories.onPage} | internal ${s.categories.internalLinking} | mobile ${s.categories.mobile} | perf ${s.categories.perf}`);
  console.log(`issues: ${s.criticalIssues} critical, ${s.warningIssues} warnings, ${s.infoIssues} info`);
  console.log(`dead links: ${s.deadLinks.length} | orphans: ${s.orphanPages.length} | dup titles: ${s.duplicateTitles.length} | dup desc: ${s.duplicateDescriptions.length}`);
  console.log(`not in sitemap: ${s.pagesNotInSitemap.length} | sitemap→missing: ${s.sitemapMissing.length} | unreachable from home: ${s.unreachableFromHome.length}`);
  console.log("worst pages:");
  for (const w of s.worstPages) console.log(`  ${String(w.score).padStart(3)}  ${w.path}`);
  console.log("\ntop issues:");
  for (const t of s.topIssues) console.log(`  x${String(t.count).padStart(3)}  ${t.msg}`);
  console.log(`\nreport → ${outFile}`);
}
