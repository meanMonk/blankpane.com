import {mkdir} from "node:fs/promises";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../packages/web/app1/public/screens");
const MODEL_ID = process.env.FAL_MODEL || "fal-ai/flux/dev";
const WIDTH = 1344;
const HEIGHT = 768;

const WALLPAPERS = [
  ["01-spiderweb-crack", "A pure flat screen glass effect as a wallpaper. A massive spiderweb crack originates from the upper-right corner, with hundreds of tiny glass fractures spreading edge-to-edge across the entire frame. The cracks resemble shattered tempered glass with realistic reflections, depth, and fine fracture detail. The entire background is completely black so only the broken glass effect is visible. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["02-full-shatter", "A pure flat screen glass effect as a wallpaper. The entire frame is destroyed with multiple impact points, dense fracture networks, broken glass shards, micro cracks, and realistic reflective surfaces. The whole background remains completely black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no desktop icons, no taskbar, no text. Full-bleed, edge-to-edge, ultra photorealistic, 8K, 16:9 landscape wallpaper."],
  ["03-dead-pixels", "A pure flat screen panel effect as a wallpaper. Thousands of randomly distributed dead pixels cover the frame alongside bright red, green, blue, and white stuck pixels, with several large black dead zones and subtle pixel corruption. Most of the background is completely black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["04-vertical-glitch", "A pure flat screen panel effect as a wallpaper. Hundreds of vertical colored lines cover the entire frame: thin magenta, cyan, green, yellow, purple, white, and blue stripes of varying widths with subtle flickering digital artifacts. The background is black beneath the lines. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["05-lcd-backlight-bleed", "A pure flat screen panel effect as a wallpaper. Severe backlight bleeding: bright white, blue, purple, and yellow light leaks spread inward from every edge with cloudy gradients, pressure marks, and uneven illumination. The rest of the frame is deep black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no icons, no text. Full-bleed, edge-to-edge, ultra detailed, 8K, 16:9 landscape wallpaper."],
  ["06-oled-ink-bleed", "A pure flat screen panel effect as a wallpaper. Thick black ink spreads organically from the lower-left corner across the frame, surrounded by purple, blue, and dark gradient halos typical of broken OLED panels, like real AMOLED internal leakage beneath glass. The rest of the frame is black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["07-horizontal-line-failure", "A pure flat screen panel effect as a wallpaper. Hundreds of horizontal RGB scan lines run across the entire frame with random white flashes, black gaps, color shifts, and digital tearing. The background is completely black beneath the lines. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no desktop icons, no taskbar, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["08-pressure-damage", "A pure flat screen panel effect as a wallpaper. Heavy pressure damage radiates from the center: large rainbow interference patterns, oil-like color rings, pressure spots, dark patches, and distorted pixels. The rest of the frame is black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["09-tv-static", "A pure flat screen effect as a wallpaper. Realistic television static fills the entire frame: millions of monochrome noise pixels mixed with RGB digital interference, subtle scanlines, and occasional horizontal tearing. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no icons, no cursor, no text. Full-bleed, edge-to-edge, ultra realistic CRT and LCD static, 8K, 16:9 landscape wallpaper."],
  ["10-gpu-artifact-failure", "A pure flat screen panel effect as a wallpaper. Catastrophic GPU artifact failure: fragmented rendering blocks, corrupted textures, random colored rectangles, broken pixel matrices, RGB glitches, scanlines, and digital corruption over a mostly black background. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["11-cracked-corner-impact", "A pure flat screen glass effect as a wallpaper. A single heavy impact point sits in one corner with dense spiderweb fractures radiating outward across the frame, with realistic glass reflections, tiny fracture branches, and subtle depth. The rest of the frame is black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra photorealistic, 8K, 16:9 landscape wallpaper."],
  ["12-burn-in-damage", "A pure flat screen panel effect as a wallpaper. Severe OLED burn-in: faint ghost images of browser windows, taskbars, application menus, and interface elements permanently etched into the black frame, subtle yet convincing, like years of heavy use. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no active UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["13-water-damage", "A pure flat screen panel effect as a wallpaper. Internal liquid damage: large irregular dark stains, cloudy moisture patterns, vertical streaks, and subtle rainbow discoloration beneath the display glass, mostly black background. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no UI, no icons, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
  ["14-crushed-lcd", "A pure flat screen panel effect as a wallpaper. Catastrophic LCD crush damage: multiple black liquid crystal blotches across the frame with rainbow fracture patterns, pressure marks, and broken pixel regions. The rest of the frame is black. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no icons, no cursor, no text. Full-bleed, edge-to-edge, ultra photorealistic, 8K, 16:9 landscape wallpaper."],
  ["15-black-screen-of-death", "A pure flat screen panel effect as a wallpaper. A dead display: almost completely black with only an extremely faint gray glow around the edges, subtle panel illumination, and barely visible electronic noise. Direct-on, no perspective, no device, no monitor, no bezel, no frame, no cursor, no logo, no icons, no taskbar, no text. Full-bleed, edge-to-edge, ultra realistic, 8K, 16:9 landscape wallpaper."],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate(prompt, name, index) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 300000);
  try {
    const res = await fetch(`https://fal.run/${MODEL_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_size: { width: WIDTH, height: HEIGHT },
        num_images: 1,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`fal.ai ${res.status}: ${err}`);
    }
    const data = await res.json();
    const url = data.images?.[0]?.url || data.image?.url;
    if (!url) throw new Error(`no image URL in response: ${JSON.stringify(data).slice(0, 300)}`);
    const img = await fetch(url);
    if (!img.ok) throw new Error(`download failed: ${img.status}`);
    const buf = Buffer.from(await img.arrayBuffer());
    const file = resolve(OUT_DIR, `${name}.png`);
    const { writeFile } = await import("node:fs/promises");
    await writeFile(file, buf);
    console.log(`[${index}/${WALLPAPERS.length}] done ${name}.png (${(buf.length / 1024).toFixed(0)} KB)`);
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  if (!process.env.FAL_KEY) {
    console.error("FAL_KEY is not set. Run: export FAL_KEY=your-key");
    process.exit(1);
  }
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Output: ${OUT_DIR}`);
  console.log(`Model: ${MODEL_ID} (${WIDTH}x${HEIGHT})`);

  const select = parseSelection(process.argv.slice(2));
  if (!select) return;

  for (const i of select) {
    const [name, prompt] = WALLPAPERS[i];
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await generate(prompt, name, i + 1);
        break;
      } catch (err) {
        console.error(`[${i + 1}/${WALLPAPERS.length}] ${name} attempt ${attempt} failed: ${err.message}`);
        if (attempt === 3) {
          console.error(`  giving up on ${name}`);
        } else {
          await sleep(5000 * attempt);
        }
      }
    }
  }
  console.log("Done.");
}

function parseSelection(args) {
  const all = WALLPAPERS.map((_, i) => i);
  if (args.length === 0) return all;

  const arg = args[args.length - 1].toLowerCase();
  if (arg === "all") return all;

  const indices = [];
  for (const part of arg.split(",")) {
    part.trim();
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) {
      console.error(`Invalid argument "${arg}". Use a number (1-15), range (2-5), comma list (1,3,7), or "all".`);
      process.exit(1);
    }
    const a = Number(m[1]) - 1;
    const b = m[2] ? Number(m[2]) - 1 : a;
    if (a < 0 || b >= WALLPAPERS.length || a > b) {
      console.error(`Range ${m[1]}-${m[2] || m[1]} is out of bounds (1-${WALLPAPERS.length}).`);
      process.exit(1);
    }
    for (let i = a; i <= b; i++) indices.push(i);
  }
  return [...new Set(indices)];
}

main();
