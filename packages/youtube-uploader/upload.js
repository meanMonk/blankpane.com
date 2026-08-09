/**
 * upload.js
 * ============================================================
 * Bulk-uploads local videos to YouTube, pulling title/description/
 * tags from a markdown file that sits next to each video.
 *
 * FOLDER / FILE CONVENTION
 * ---------------
 * Put a video and a markdown file with the SAME base name in your
 * VIDEOS_DIR (set in .env, defaults to ./videos):
 *
 *   videos/
 *     my-first-video.mp4
 *     my-first-video.md
 *     another-clip.mov
 *     another-clip.md
 *
 * Supported video extensions: .mp4 .mov .mkv .avi .webm
 *
 * MARKDOWN FORMAT (my-first-video.md)
 * ---------------
 *   ---
 *   title: "How I Automated My YouTube Uploads"
 *   tags: [automation, nodejs, youtube-api, indiehacker]
 *   privacyStatus: public        # public | unlisted | private
 *   categoryId: "28"             # optional, YouTube category id, default "22" (People & Blogs)
 *   playlistId: PLxxxxxxxxxxxx   # optional, adds video to this playlist after upload
 *   publishAt: 2026-08-10T09:00:00Z  # optional, ISO date to schedule (forces privacyStatus=private until then)
 *   ---
 *   Everything below the --- frontmatter is used as the video DESCRIPTION.
 *
 *   You can write multiple paragraphs, links, hashtags, etc. here,
 *   exactly like a normal YouTube description.
 *
 * HOW TO USE
 * ---------------
 *   1. Run "npm run auth" once (see get-token.js / README.md) to create token.json.
 *   2. Drop your video + .md pairs into VIDEOS_DIR.
 *   3. npm run upload
 *   4. Uploaded pairs are moved into VIDEOS_DIR/uploaded/ so re-running
 *      the script never re-uploads the same video.
 *   5. Progress and video IDs are printed to the console and appended
 *      to upload-log.json.
 *
 * SAFE TO RE-RUN: only files still sitting in VIDEOS_DIR (not yet
 * moved to uploaded/) are processed.
 * ============================================================
 */

import 'dotenv/config';
import {google} from 'googleapis';
import matter from 'gray-matter';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  VIDEOS_DIR = './videos',
  DONE_DIR = './videos/uploaded',
  PLAYLIST_ID,
} = process.env;

const VIDEO_EXTENSIONS = ['.mp4', '.mov', '.mkv', '.avi', '.webm'];
const LOG_FILE = 'upload-log.json';

// Canonical order so "npm run upload -- 1,2" is predictable (matches
// docs/archive/README-videos.md numbering: 1=white, 2=black, ...).
const SLUG_ORDER = [
  'white-screen',
  'black-screen',
  'green-screen',
  'zoom-background-screen',
  'blue-screen',
  'red-screen',
  'pink-screen',
  'yellow-screen',
  'gray-screen',
  'purple-screen',
  'orange-screen',
  'blank-screen',
];

function loadTokens() {
  if (!fs.existsSync('token.json')) {
    console.error('✖ token.json not found. Run "npm run auth" first.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync('token.json', 'utf8'));
}

function getYoutubeClient() {
  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oauth2Client.setCredentials(loadTokens());

  // Auto-persist refreshed access tokens so token.json stays valid.
  oauth2Client.on('tokens', (tokens) => {
    const current = loadTokens();
    fs.writeFileSync('token.json', JSON.stringify({ ...current, ...tokens }, null, 2));
  });

  return google.youtube({ version: 'v3', auth: oauth2Client });
}

function appendLog(entry) {
  const log = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) : [];
  log.push({ ...entry, timestamp: new Date().toISOString() });
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
}

/** Find video+markdown pairs sitting directly in VIDEOS_DIR. */
function findPairs() {
  const files = fs.readdirSync(VIDEOS_DIR, { withFileTypes: true })
    .filter((f) => f.isFile())
    .map((f) => f.name);

  const videos = files.filter((f) => VIDEO_EXTENSIONS.includes(path.extname(f).toLowerCase()));

  const pairs = [];
  for (const videoFile of videos) {
    const base = path.basename(videoFile, path.extname(videoFile));
    const mdFile = `${base}.md`;
    if (!files.includes(mdFile)) {
      console.warn(`⚠ Skipping "${videoFile}" — no matching "${mdFile}" found.`);
      continue;
    }
    pairs.push({
      videoPath: path.join(VIDEOS_DIR, videoFile),
      mdPath: path.join(VIDEOS_DIR, mdFile),
      base,
    });
  }
  // Sort by canonical color order so number-based selection is intuitive.
  pairs.sort((a, b) => {
    const ia = SLUG_ORDER.indexOf(a.base);
    const ib = SLUG_ORDER.indexOf(b.base);
    return (ia === -1 ? SLUG_ORDER.length : ia) - (ib === -1 ? SLUG_ORDER.length : ib) ||
      a.base.localeCompare(b.base);
  });
  return pairs;
}

function parseMetadata(mdPath) {
  const raw = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(raw);

  if (!data.title) {
    throw new Error(`"${mdPath}" is missing "title" in its frontmatter.`);
  }

  return {
    title: String(data.title).slice(0, 100), // YouTube title limit
    description: content.trim().slice(0, 5000), // YouTube description limit
    tags: Array.isArray(data.tags) ? data.tags : [],
    privacyStatus: data.privacyStatus || 'public',
    categoryId: String(data.categoryId || '22'),
    playlistId: data.playlistId || PLAYLIST_ID || null,
    publishAt: data.publishAt || null,
    // Optional: filename YouTube sees during upload — a ranking signal.
    filename: data.filename || null,
  };
}

/** Select which pairs to upload based on CLI args (default: all). */
function parseSelection(pairs, args) {
  if (args.length === 0 || args[args.length - 1].toLowerCase() === 'all') return pairs;

  const bySlug = (s) => pairs.find((p) => p.base === s);
  const selected = [];
  for (const part of args[args.length - 1].split(',')) {
    const p = part.trim();
    const m = p.match(/^(\d+)(?:-(\d+))?$/);
    if (m) {
      const a = Number(m[1]) - 1;
      const b = m[2] ? Number(m[2]) - 1 : a;
      if (a < 0 || b >= pairs.length || a > b) {
        console.error(`✖ Range ${m[1]}-${m[2] || m[1]} is out of bounds (1-${pairs.length}).`);
        process.exit(1);
      }
      for (let i = a; i <= b; i++) selected.push(pairs[i]);
    } else {
      const pair = bySlug(p);
      if (!pair) {
        console.error(`✖ Unknown slug "${p}". Available: ${pairs.map((x) => x.base).join(', ')}`);
        process.exit(1);
      }
      selected.push(pair);
    }
  }
  return [...new Set(selected)];
}

async function uploadOne(youtube, pair) {
  const meta = parseMetadata(pair.mdPath);
  const fileSize = fs.statSync(pair.videoPath).size;

  console.log(`\n▶ Uploading "${meta.title}" (${(fileSize / 1e6).toFixed(1)} MB)...`);

  const status = { privacyStatus: meta.publishAt ? 'private' : meta.privacyStatus };
  if (meta.publishAt) status.publishAt = meta.publishAt;

  // If a keyword-rich `filename` is set, upload a temp copy under that name —
  // YouTube reads the upload filename as a ranking signal. Cleaned up after.
  let uploadPath = pair.videoPath;
  if (meta.filename) {
    const ext = path.extname(meta.filename) || path.extname(pair.videoPath);
    const safe = path.basename(meta.filename).replace(/[^a-z0-9.\-_]/gi, '_');
    uploadPath = path.join(os.tmpdir(), `${safe}${ext}`);
    fs.copyFileSync(pair.videoPath, uploadPath);
  }

  const res = await youtube.videos.insert(
    {
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: meta.title,
          description: meta.description,
          tags: meta.tags,
          categoryId: meta.categoryId,
        },
        status,
      },
      media: {
        body: fs.createReadStream(uploadPath),
      },
    },
    {
      // Basic upload progress logging.
      onUploadProgress: (evt) => {
        const pct = ((evt.bytesRead / fileSize) * 100).toFixed(1);
        process.stdout.write(`\r  progress: ${pct}%   `);
      },
    }
  );

  if (uploadPath !== pair.videoPath) {
    fs.rmSync(uploadPath, { force: true });
  }

  const videoId = res.data.id;
  console.log(`\n✔ Uploaded: https://youtu.be/${videoId}`);

  if (meta.playlistId) {
    await youtube.playlistItems.insert({
      part: ['snippet'],
      requestBody: {
        snippet: {
          playlistId: meta.playlistId,
          resourceId: { kind: 'youtube#video', videoId },
        },
      },
    });
    console.log(`✔ Added to playlist ${meta.playlistId}`);
  }

  appendLog({ base: pair.base, videoId, title: meta.title, status: 'success' });
  return videoId;
}

function moveToDone(pair) {
  fs.mkdirSync(DONE_DIR, { recursive: true });
  for (const p of [pair.videoPath, pair.mdPath]) {
    fs.renameSync(p, path.join(DONE_DIR, path.basename(p)));
  }
}

/** Move one video+md pair back from uploaded/ so it can be re-uploaded. */
function restoreFromDone(base) {
  if (!fs.existsSync(DONE_DIR)) return;
  let moved = false;
  for (const ext of [...VIDEO_EXTENSIONS, '.md']) {
    const src = path.join(DONE_DIR, base + ext);
    if (fs.existsSync(src)) {
      fs.renameSync(src, path.join(VIDEOS_DIR, base + ext));
      moved = true;
    }
  }
  if (moved) console.log(`↩ Restored "${base}" from uploaded/ for re-upload.`);
}

async function main() {
  if (!fs.existsSync(VIDEOS_DIR)) {
    console.error(`✖ VIDEOS_DIR "${VIDEOS_DIR}" does not exist.`);
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const retry = args.includes('--retry');
  const selArgs = args.filter((a) => !a.startsWith('--'));

  if (retry) {
    // Resolve selection against the canonical list so numbers/ranges/slugs
    // all restore the right pairs from uploaded/, even ones not yet present.
    const fullPairs = SLUG_ORDER.map((base) => ({ base }));
    const selected = parseSelection(fullPairs, selArgs);
    for (const p of selected) restoreFromDone(p.base);
  }

  const pairs = findPairs();
  if (pairs.length === 0) {
    console.log('No video+markdown pairs found to upload. Nothing to do.');
    return;
  }

  const selected = parseSelection(pairs, selArgs);
  console.log(`Found ${selected.length} video(s) to upload.`);
  const youtube = getYoutubeClient();

  for (const pair of selected) {
    try {
      await uploadOne(youtube, pair);
      moveToDone(pair);
    } catch (err) {
      const message = err?.response?.data || err.message;
      console.error(`\n✖ Failed to upload "${pair.base}":`, message);
      appendLog({ base: pair.base, status: 'failed', error: String(message) });
      // Continue with the next video instead of stopping the whole batch.
    }
  }

  console.log('\nAll done. See upload-log.json for a full record.');
}

main();
