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

Channel: **blankscreen**. Pattern for each video:

- **Title:** exact high-volume phrase up front (first 60 chars), then `10 Hours`, then a
  couple of intent words, then `| BlankPane`. Titles below cover both the "screen" and
  "fullscreen/full screen" phrasing since people search both.
- **Description:** first 2 lines (before the fold) repeat the keyword + link — that's
  all most viewers see. Then a short **Use cases** bullet list (adds keyword density
  naturally + gives viewers a reason to keep watching). Then the blankpane.com link
  again + 2-3 hashtags.
- **Tags:** exact-match phrase first, then long-tail variants, then brand tag.
- **Filename before upload:** rename the local file to match the query, e.g.
  `white-screen-white-full-screen-10-hours.mp4` — YouTube reads the filename as a
  ranking signal before you even fill in metadata.
- **Card/end screen + pinned comment:** link to the matching blankpane.com page.
- **Playlist:** put all color videos in one "Blank Screens — White, Black, Green &
  More" playlist. Session watch-time across a playlist helps every video in it rank.
- **Filename on site:** `/videos/<slug>.mp4` — reference from the color page's
  "Watch our video" section, so the video doubles as on-page media.

### 1. white-screen (#ffffff)
- **Title:** `White Screen 10 Hours — Full White Screen for Lighting, Calls & Screen Tests | BlankPane`
- **Description:**
  ```
  Full white screen (white full screen) running for 10 hours straight — bright,
  flicker-free white light. Free to use at https://blankpane.com/white-screen/

  Use cases:
  • Photography & product lighting backdrop
  • Video call / Zoom / Meet plain background
  • Screen brightness, dead-pixel & uniformity test
  • Reading or work light
  • Baby night-light companion

  More blank screens: https://blankpane.com
  #whitescreen #whitefullscreen #blankpane
  ```
- **Tags:** white screen, white full screen, full white screen, white screen white,
  white background, plain white screen, white screen light, white screen 10 hours,
  blank white screen, white screen test, blankpane

### 2. black-screen (#000000)
- **Title:** `Black Screen 10 Hours — Black Fullscreen for OLED, Focus & Sleep | BlankPane`
- **Description:**
  ```
  True black fullscreen for 10 hours — saves battery on OLED, blocks light for
  sleep/focus, and checks for dead pixels. Free at https://blankpane.com/black-screen/

  Use cases:
  • OLED battery saver / screensaver
  • Dead-pixel & screen uniformity test
  • Deep focus or "do not disturb" screen
  • Night light / sleep-aid backdrop
  • Projector or TV black-level check

  More blank screens: https://blankpane.com
  #blackscreen #blackfullscreen #blankpane
  ```
- **Tags:** black screen, black fullscreen, black screen black, black background,
  oled test, dead pixel test, battery saver screen, black screen 10 hours,
  focus screen, blankpane

### 3. green-screen (#00b140)
- **Title:** `Green Screen 10 Hours — Green Fullscreen for Chroma Key & Streaming | BlankPane`
- **Description:**
  ```
  Solid green fullscreen for 10 hours — clean chroma-key green for streaming, Zoom,
  and VFX keying. Free at https://blankpane.com/green-screen/

  Use cases:
  • Chroma key for Twitch/YouTube streaming
  • Zoom / Teams virtual background
  • VFX & video-editing green screen
  • Dead-pixel & screen dirt check

  More blank screens: https://blankpane.com
  #greenscreen #greenfullscreen #blankpane
  ```
- **Tags:** green screen, green fullscreen, chroma key, green background,
  green screen streaming, zoom background, vfx green screen, blankpane

### 4. zoom-background-screen (#ffffff)
- **Title:** `Zoom Background 10 Hours — Plain White Full Screen for Video Calls | BlankPane`
- **Description:**
  ```
  Plain white full screen for 10 hours — a clean, distraction-free backdrop for
  video calls and meetings. Free at https://blankpane.com/zoom-background-screen/

  Use cases:
  • Zoom / Meet / Teams virtual background
  • Remote interview or recording backdrop
  • Plain white fill light for calls
  • Screen brightness test

  More blank screens: https://blankpane.com
  #zoombackground #whitescreen #blankpane
  ```
- **Tags:** zoom background, white full screen, video call background, plain white
  background, zoom virtual background, meeting backdrop, blankpane

### 5. blue-screen (#1656ff)
- **Title:** `Blue Screen 10 Hours — Blue Fullscreen for Calm Light & Chroma Key | BlankPane`
- **Description:**
  ```
  Solid blue fullscreen for 10 hours — calming blue light for focus, mood lighting,
  and chroma keying. Free at https://blankpane.com/blue-screen/

  Use cases:
  • Calm/focus ambient lighting
  • Mood lighting for streams or rooms
  • Blue-screen chroma key alternative
  • Screen brightness & uniformity test

  More blank screens: https://blankpane.com
  #bluescreen #bluefullscreen #blankpane
  ```
- **Tags:** blue screen, blue fullscreen, blue background, calming light, chroma key,
  mood lighting, blue screen light, blankpane

### 6. red-screen (#e11d2e)
- **Title:** `Red Screen 10 Hours — Red Fullscreen for Night Light & Screen Test | BlankPane`
- **Description:**
  ```
  Red fullscreen for 10 hours — easy on the eyes at night, good for alerts and
  screen tests. Free at https://blankpane.com/red-screen/

  Use cases:
  • Night-time red light (easier on eyes/melatonin)
  • Alert / warning screen
  • Screen uniformity & dead-pixel test
  • Aesthetic recording backdrop

  More blank screens: https://blankpane.com
  #redscreen #redfullscreen #blankpane
  ```
- **Tags:** red screen, red fullscreen, red background, night light, red screen light,
  screen test, alert screen, blankpane

### 7. pink-screen (#ff5fa2)
- **Title:** `Pink Screen 10 Hours — Pink Fullscreen for Aesthetic & Streaming | BlankPane`
- **Description:**
  ```
  Soft pink fullscreen for 10 hours — aesthetic lighting and a clean streaming
  overlay backdrop. Free at https://blankpane.com/pink-screen/

  Use cases:
  • Aesthetic room / desk lighting
  • Streaming overlay or backdrop
  • Photography lighting backdrop
  • Mood lighting

  More blank screens: https://blankpane.com
  #pinkscreen #pinkfullscreen #blankpane
  ```
- **Tags:** pink screen, pink fullscreen, pink background, pink light, aesthetic
  background, streaming overlay, blankpane

### 8. yellow-screen (#ffd400)
- **Title:** `Yellow Screen 10 Hours — Yellow Fullscreen Warm Light & Screen Test | BlankPane`
- **Description:**
  ```
  Bright yellow fullscreen for 10 hours — warm light for the room and a solid
  screen test surface. Free at https://blankpane.com/yellow-screen/

  Use cases:
  • Warm ambient lighting
  • Alert / caution screen
  • Screen uniformity & dead-pixel test
  • Photography backdrop

  More blank screens: https://blankpane.com
  #yellowscreen #yellowfullscreen #blankpane
  ```
- **Tags:** yellow screen, yellow fullscreen, yellow background, warm light,
  yellow screen light, screen test, blankpane

### 9. gray-screen (#808080)
- **Title:** `Gray Screen 10 Hours — Gray Fullscreen for Monitor Calibration | BlankPane`
- **Description:**
  ```
  Neutral mid-gray fullscreen for 10 hours — for display calibration and contrast
  testing. Free at https://blankpane.com/gray-screen/

  Use cases:
  • Monitor / TV calibration
  • Contrast & backlight-bleed test
  • Neutral photography backdrop
  • Projector screen check

  More blank screens: https://blankpane.com
  #grayscreen #greyscreen #blankpane
  ```
- **Tags:** gray screen, grey screen, gray fullscreen, monitor calibration,
  gray background, contrast test, neutral background, blankpane

### 10. purple-screen (#7a3ff2)
- **Title:** `Purple Screen 10 Hours — Purple Fullscreen Mood Lighting & Aesthetic | BlankPane`
- **Description:**
  ```
  Vibrant purple fullscreen for 10 hours — mood lighting and an aesthetic backdrop.
  Free at https://blankpane.com/purple-screen/

  Use cases:
  • Mood / ambient room lighting
  • Streaming or aesthetic backdrop
  • Accent lighting for photos/video
  • Screen uniformity test

  More blank screens: https://blankpane.com
  #purplescreen #purplefullscreen #blankpane
  ```
- **Tags:** purple screen, purple fullscreen, purple background, mood lighting,
  purple light, aesthetic background, blankpane

### 11. orange-screen (#ff7a1a)
- **Title:** `Orange Screen 10 Hours — Orange Fullscreen Warm Light & Alerts | BlankPane`
- **Description:**
  ```
  Warm orange fullscreen for 10 hours — cozy ambient light and an alert-screen
  backdrop. Free at https://blankpane.com/orange-screen/

  Use cases:
  • Warm/cozy ambient lighting
  • Alert / warning screen
  • Sunset-style mood lighting
  • Screen uniformity test

  More blank screens: https://blankpane.com
  #orangescreen #orangefullscreen #blankpane
  ```
- **Tags:** orange screen, orange fullscreen, orange background, orange light,
  warm light, alert screen, blankpane

### 12. blank-screen (#ffffff)
- **Title:** `Blank Screen 10 Hours — Plain White Full Screen for Focus & Recording | BlankPane`
- **Description:**
  ```
  Plain blank white screen for 10 hours — distraction-free full screen for focus,
  recording backdrops, and screen tests. Free at https://blankpane.com/blank-screen/

  Use cases:
  • Distraction-free focus / study screen
  • Recording or streaming plain backdrop
  • Screen test / uniformity check
  • Presentation filler screen

  More blank screens: https://blankpane.com
  #blankscreen #whitescreen #blankpane
  ```
- **Tags:** blank screen, blank full screen, plain screen, blank white screen,
  distraction free screen, focus screen, blankpane

---

## Channel setup (blankscreen)

One-time setup — this helps every video rank, not just one:

- **Channel name:** keep it `blankscreen` (matches "blank screen" search intent directly).
- **Channel description** (first 2-3 lines matter most, shown in search too):
  ```
  Free full-screen color videos — white screen, black screen, green screen and
  more — for lighting, screen tests, streaming, focus, and video calls. Free
  browser version + downloads at https://blankpane.com

  New color screens added regularly. Subscribe for white/black/green fullscreen,
  Zoom backgrounds, chroma key, and monitor test videos.
  ```
- **Channel keywords** (Studio → Settings → Channel → Basic info → Keywords):
  `white screen, black screen, green screen, blank screen, fullscreen, full screen,
  chroma key, zoom background, screen test, blankpane`
- **Channel links:** add blankpane.com as the first channel link (shows on your
  banner and about page).
- **Channel banner/avatar:** simple, high-contrast — a quick "White / Black / Green
  Screens" line on the banner reinforces the exact queries you're targeting.
- **Playlist:** one playlist, "Blank Screens — White, Black, Green & More", with all
  12 videos in it, playlist title/description also mentioning blankpane.com.
- **Every video:** end screen + pinned comment linking to the matching
  `blankpane.com/<slug>/` page (see per-video sections above).

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
