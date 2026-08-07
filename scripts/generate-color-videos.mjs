import {readFile, mkdir} from "node:fs/promises";
import {spawn} from "node:child_process";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const COLORS_FILE = resolve(__dirname, "../packages/web/app1/src/data/colors.json");
const OUT_DIR = resolve(__dirname, "../packages/web/app1/public/videos");
const SITE = "https://blankpane.com";

const WIDTH = Number(process.env.VIDEO_WIDTH || 1920);
const HEIGHT = Number(process.env.VIDEO_HEIGHT || 1080);
const FPS = Number(process.env.VIDEO_FPS || 1);
const DURATION = Number(process.env.VIDEO_DURATION || 36000);
const CRF = Number(process.env.VIDEO_CRF || 30);
const PRESET = process.env.VIDEO_PRESET || "veryslow";
const CODEC = process.env.VIDEO_CODEC || "libx264";

function run(cmd, args) {
  return new Promise((resolveRun, rejectRun) => {
    const p = spawn(cmd, args, { stdio: ["ignore", "inherit", "inherit"] });
    p.on("error", rejectRun);
    p.on("close", (code) => (code === 0 ? resolveRun() : rejectRun(new Error(`${cmd} exited ${code}`))));
  });
}

async function generate(color) {
  const hex = color.hex.replace("#", "");
  const out = resolve(OUT_DIR, `${color.slug}.mp4`);
  const args = [
    "-f", "lavfi",
    "-i", `color=c=0x${hex}:s=${WIDTH}x${HEIGHT}:r=${FPS}`,
    "-t", String(DURATION),
    "-c:v", CODEC,
    "-preset", PRESET,
    "-crf", String(CRF),
    "-pix_fmt", "yuv420p",
    "-an",
    "-y", out,
  ];
  try {
    await run("ffmpeg", args);
    const { stat } = await import("node:fs/promises");
    const size = (await stat(out)).size;
    console.log(`${color.name} (${color.hex}) -> ${out} (${(size / 1024 / 1024).toFixed(1)} MB)`);
    return out;
  } catch (err) {
    console.error(`Failed ${color.slug}: ${err.message}`);
    return null;
  }
}

async function main() {
  const colors = JSON.parse(await readFile(COLORS_FILE, "utf8"));
  const select = parseSelection(colors, process.argv.slice(2));
  if (!select) return;

  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Generating ${select.length} video(s) from ${COLORS_FILE}`);
  console.log(`${WIDTH}x${HEIGHT} @ ${FPS}fps, ${DURATION}s, ${CODEC} crf ${CRF} preset ${PRESET}`);
  console.log(`Output: ${OUT_DIR}\n`);

  for (const c of select) {
    const out = await generate(c);
    if (out) console.log(`  -> ${SITE}/videos/${c.slug}.mp4`);
  }
  console.log("Done.");
}

function parseSelection(colors, args) {
  if (args.length === 0) return colors;
  const arg = args[args.length - 1].toLowerCase();
  if (arg === "all") return colors;

  const bySlug = (s) => colors.find((c) => c.slug === s);
  const selected = [];
  for (const part of arg.split(",")) {
    const p = part.trim();
    const m = p.match(/^(\d+)(?:-(\d+))?$/);
    if (m) {
      const a = Number(m[1]) - 1;
      const b = m[2] ? Number(m[2]) - 1 : a;
      if (a < 0 || b >= colors.length || a > b) {
        console.error(`Range ${m[1]}-${m[2] || m[1]} is out of bounds (1-${colors.length}).`);
        process.exit(1);
      }
      for (let i = a; i <= b; i++) selected.push(colors[i]);
    } else {
      const c = bySlug(p);
      if (!c) {
        console.error(`Unknown slug "${p}". Known: ${colors.map((x) => x.slug).join(", ")}`);
        process.exit(1);
      }
      selected.push(c);
    }
  }
  return [...new Set(selected)];
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
