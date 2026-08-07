# Color Videos — YouTube Content

Generates solid-color screen videos (10h, 1fps, ~tens of MB) with
`scripts/generate-color-videos.mjs`. Each video is uploaded to YouTube to rank for
`<color> screen` / `<color> background` search terms and drive traffic back to
[blankpane.com](https://blankpane.com).

## Usage

```bash
node scripts/generate-color-videos.mjs            # all 12 colors (default)
node scripts/generate-color-videos.mjs 1          # only #1 (white-screen)
node scripts/generate-color-videos.mjs 1,3,7      # specific set
node scripts/generate-color-videos.mjs green-screen,blue-screen  # by slug
node scripts/generate-color-videos.mjs all        # everything
```

Also available as `pnpm videos:gen`.

### Options (env vars)

| Var            | Default       | Description                                |
|----------------|---------------|--------------------------------------------|
| `VIDEO_WIDTH`  | `1920`        | Frame width (1080p; 3840 for 4K)           |
| `VIDEO_HEIGHT` | `1080`        | Frame height                               |
| `VIDEO_FPS`    | `1`           | Frames/sec — keep low, content is static   |
| `VIDEO_DURATION`| `36000`      | Duration in seconds (36000 = 10h)          |
| `VIDEO_CRF`    | `30`          | Quality — flat color stays clean up to ~35 |
| `VIDEO_PRESET` | `veryslow`    | Best compression for static content        |
| `VIDEO_CODEC`  | `libx264`     | Use `libx265` for ~2x smaller files        |

### Output

Written to `packages/web/app1/public/videos/<slug>.mp4` (1920x1080, 1fps, CRF 30,
H.264, no audio). Static content needs no bitrate — every frame is identical, so
files stay in the tens of MB range even at 10 hours.

---

## YouTube content (per video)

Pattern for each video:

- **Title:** `<Color> Screen 10 Hours — <intent keyword> | BlankPane`
- **Description:** 2-3 lines on the use case + a link back to the matching color page
  on blankpane.com (e.g. `https://blankpane.com/green-screen/`).
- **Tags:** `[color] screen, [color] background, [color] [intent]` + brand tags.
- **Card/end screen:** point to the site.
- **Filename on site:** `/videos/<slug>.mp4` — reference from the color page's
  "Watch our video" section, so the video doubles as on-page media.

### 1. white-screen (#ffffff)
- **Title:** `White Screen 10 Hours — Lighting & Photography Background | BlankPane`
- **Description:** Full-screen white light for lighting, product photography, plain
  video-call backgrounds and screen brightness tests. Open it in a browser at
  https://blankpane.com/white-screen/
- **Tags:** white screen, white background, white screen light, photography background,
  video call background, plain white screen, blankpane

### 2. black-screen (#000000)
- **Title:** `Black Screen 10 Hours — Battery Saver, Focus & OLED Test | BlankPane`
- **Description:** True black screen for battery saving on OLED, deep-focus work
  backgrounds, and checking for dead pixels or screen uniformity. Open it at
  https://blankpane.com/black-screen/
- **Tags:** black screen, black background, oled test, dead pixel test, battery saver,
  black screen 10 hours, focus screen, blankpane

### 3. green-screen (#00b140)
- **Title:** `Green Screen 10 Hours — Chroma Key for Streaming & Zoom | BlankPane`
- **Description:** Solid chroma-key green for Twitch/YouTube streaming, Zoom virtual
  backgrounds, and VFX keying. Works as a light source to find dirty spots or test
  for dead pixels on your screen. Open it at https://blankpane.com/green-screen/
- **Tags:** green screen, chroma key, green background, streaming background,
  green screen video, zoom background, vfx, blankpane

### 4. zoom-background-screen (#ffffff)
- **Title:** `Plain White Background 10 Hours — Zoom Video Call Backdrop | BlankPane`
- **Description:** Clean, distraction-free white backdrop for video calls, meetings
  and screen testing. Use it on https://blankpane.com/zoom-background-screen/
- **Tags:** zoom background, white background, video call background, plain background,
  zoom virtual background, blankpane

### 5. blue-screen (#1656ff)
- **Title:** `Blue Screen 10 Hours — Calm Light & Chroma Key | BlankPane`
- **Description:** Calming blue light for focus, mood lighting, and chroma keying.
  Try the live version at https://blankpane.com/blue-screen/
- **Tags:** blue screen, blue background, blue screen light, calming light, chroma key,
  mood lighting, blankpane

### 6. red-screen (#e11d2e)
- **Title:** `Red Screen 10 Hours — Night Light, Alerts & Screen Test | BlankPane`
- **Description:** Red screen for night-time eye comfort, alert backgrounds, and screen
  testing. Full-screen at https://blankpane.com/red-screen/
- **Tags:** red screen, red background, night light, red screen light, screen test,
  alert screen, blankpane

### 7. pink-screen (#ff5fa2)
- **Title:** `Pink Screen 10 Hours — Aesthetic & Streaming Overlay | BlankPane`
- **Description:** Soft pink full-screen light for aesthetic setups and streaming
  overlays. Use it live at https://blankpane.com/pink-screen/
- **Tags:** pink screen, pink background, pink light, aesthetic background,
  streaming overlay, blankpane

### 8. yellow-screen (#ffd400)
- **Title:** `Yellow Screen 10 Hours — Warm Light & Screen Test | BlankPane`
- **Description:** Bright yellow light for warm lighting, screen testing, and alert
  screens. Open at https://blankpane.com/yellow-screen/
- **Tags:** yellow screen, yellow background, warm light, yellow screen light,
  screen test, blankpane

### 9. gray-screen (#808080)
- **Title:** `Gray Screen 10 Hours — Monitor Calibration | BlankPane`
- **Description:** Neutral mid-gray for display calibration, contrast testing and
  photography. Calibrate with https://blankpane.com/gray-screen/
- **Tags:** gray screen, grey screen, monitor calibration, gray background,
  contrast test, neutral background, blankpane

### 10. purple-screen (#7a3ff2)
- **Title:** `Purple Screen 10 Hours — Mood Lighting & Aesthetics | BlankPane`
- **Description:** Vibrant purple light for mood lighting, accent backdrops, and
  aesthetic screens. Live at https://blankpane.com/purple-screen/
- **Tags:** purple screen, purple background, mood lighting, purple light,
  aesthetic background, blankpane

### 11. orange-screen (#ff7a1a)
- **Title:** `Orange Screen 10 Hours — Warm Light & Alerts | BlankPane`
- **Description:** Warm orange light for cozy ambience, alert screens, and testing.
  Open at https://blankpane.com/orange-screen/
- **Tags:** orange screen, orange background, orange light, warm light,
  alert screen, blankpane

### 12. blank-screen (#ffffff)
- **Title:** `Blank Screen 10 Hours — Distraction-Free Focus Backdrop | BlankPane`
- **Description:** Pure blank screen for distraction-free focus, recording backdrops,
  and plain backgrounds. Use it at https://blankpane.com/blank-screen/
- **Tags:** blank screen, blank background, focus screen, distraction free,
  plain screen, blankpane

---

## Tips

- **n8n / bulk upload:** loop the script once, then use a YouTube Data API job to
  upload each MP4 with the title/description above. Filename is `<slug>.mp4`.
- **YouTube re-encodes anyway** — H.264 at CRF 30 is a good balance; H.265
  (`VIDEO_CODEC=libx265`) only shrinks your own storage/upload bandwidth.
- **If YouTube complains about 1fps**, bump `VIDEO_FPS` to `2` or `5` — still tiny.
- Upload each video as **10h** for maximum watch-time surface on loop playlists.

### On-site embed

Videos live at `https://blankpane.com/videos/<slug>.mp4`. Add a "Watch our video"
button on the homepage and each color page that lazy-loads the `<video>` in a
section below it — the MP4 is a few MB so it streams instantly, no YouTube embed
iframe needed, and keeps the session on blankpane.com.
