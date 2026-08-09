export const prerender = true;

export async function GET() {
  const body = `# BlankPane

> Updated: 2026-08-09

> Free full-screen color tool — instant solid-color fills, canvas-based PNG downloads, and screen utilities for lighting, monitor testing, pranks, and more. No install, no signup, all in-browser.

## Capabilities
- Runs 100% client-side in the browser — no account, no signup, no install, free forever.
- No image upload or data leaves your device; tools work offline once the page loads.
- Download any solid color as a lossless PNG up to 8K resolution.
- Full-screen mode (tap the stage or press F) for every color and tool.
- 12 solid colors + 9 screen utilities (dead-pixel test, screen cleaner, ring light, fake update, broken screen, no signal, countdown, flashlight, zoom light).
- 13 languages: English, German, Spanish, French, Italian, Japanese, Korean, Malay, Polish, Portuguese, Swedish, Turkish, Ukrainian.
- YouTube channel with 10-hour fullscreen color videos: https://www.youtube.com/@blankpane

## Quick Start
- [Home](https://blankpane.com/): Pick a color, preview it, go full screen, or download as PNG at any resolution.
- [Tools Hub](https://blankpane.com/tools/): All screen utilities grouped by cluster.
- [Guides](https://blankpane.com/guides/): Step-by-step guides for monitor testing, cleaning, lighting, focus, and pranks.
- [White Background Editor](https://blankpane.com/white-background-editor/): Make a solid white background, preview full screen, and download as PNG at any size.
- [White Wallpaper](https://blankpane.com/white-wallpaper/): Download free white wallpapers in 1080p, 1440p, 4K, and 8K.

## Guides

### Monitor Testing
- [How to Check for Dead Pixels](https://blankpane.com/guides/how-to-check-for-dead-pixels/): Full-screen color test for dead and stuck pixels, plus which colors to use.
- [How to Fix a Stuck Pixel](https://blankpane.com/guides/how-to-remove-stuck-pixels/): Rapid red/green/blue flash routine to revive a stuck subpixel.
- [How to Test Screen Uniformity and Backlight Bleed](https://blankpane.com/guides/how-to-test-screen-uniformity-and-backlight-bleed/): Black and gray screen tests for bleed, clouding, and uneven brightness.
- [How to Download a Color Screen as an Image](https://blankpane.com/guides/how-to-download-a-color-screen-as-an-image/): Export any color as a lossless PNG at the exact size you need.

### Cleaning
- [How to Clean Your Monitor with a White Screen](https://blankpane.com/guides/how-to-clean-your-monitor-with-a-white-screen/): Safe, streak-free cleaning using a white full-screen inspection light.

### Lighting
- [How to Use a White Screen as a Ring Light](https://blankpane.com/guides/how-to-use-a-white-screen-as-a-ring-light/): Free ring-light and softbox lighting from your phone or laptop screen.
- [How to Set Up a Green Screen for Zoom](https://blankpane.com/guides/how-to-set-up-a-green-screen-for-zoom/): Use a full-screen green display as a working chroma-key without buying fabric.

### Focus & Battery
- [How a Black Screen Saves Battery](https://blankpane.com/guides/how-to-use-a-black-screen-to-save-battery/): OLED power savings and black-screen focus techniques.
- [How to Focus with a Blank Screen](https://blankpane.com/guides/how-to-focus-with-a-blank-screen/): Distraction-free deep work with a blank full-screen and a timer.

### Pranks
- [How to Prank with a Broken Screen](https://blankpane.com/guides/how-to-prank-someone-with-a-broken-screen/): Cracked screen, fake update, and no-signal pranks with a clean exit.

### Design & Backgrounds
- [How to Make a White Background](https://blankpane.com/guides/how-to-make-a-white-background/): Make a white background in any photo, product shot, or design — online, Photoshop, Canva, and GIMP.
- [Black and White Backgrounds](https://blankpane.com/guides/how-to-use-black-and-white-backgrounds/): Minimal, aesthetic monochrome looks — white, black, and gray backgrounds and when to choose each.

## Screen Tools

### Lighting
- [Zoom Light Screen](https://blankpane.com/tools/zoom-light-screen/): Adjustable Kelvin slider (2700–6500K) full-screen fill light for video calls.
- [Ring Light Screen](https://blankpane.com/tools/ring-light-screen/): Custom glow ring with width, thickness, corner radius, color temperature, and intensity controls.
- [Screen Flashlight](https://blankpane.com/tools/screen-flashlight/): One-tap full-brightness white screen — turn your display into a flashlight.

### Prank & Fun
- [Broken Screen Dummy](https://blankpane.com/tools/broken-screen-dummy/): 5 realistic crack styles (spiderweb, shatter, glitch, LCD bleed, dead-pixel lines). Esc to exit.
- [Fake Update Screen](https://blankpane.com/tools/fake-update-screen/): Windows spinner, macOS progress bar, and Linux terminal scroll — full-screen fake updates.
- [No Signal Screen](https://blankpane.com/tools/no-signal-screen/): Animated canvas TV static with bouncing "NO SIGNAL" text.

### Testing & Utility
- [Dead Pixel Test](https://blankpane.com/tools/dead-pixel-test/): Auto-cycle through 7 test patterns plus rapid-flash stuck-pixel fix mode.
- [Screen Cleaner](https://blankpane.com/tools/screen-cleaner/): Input-locked white/black screen for safe display wiping. Auto-unlock timer.
- [Countdown Timer Fullscreen](https://blankpane.com/tools/countdown-timer-fullscreen/): Large digit countdown on solid background with 1/5/10/25 min presets.

## Solid Colors
- [White Screen](https://blankpane.com/white-screen/): Pure white (#FFFFFF) — lighting, photography, plain backgrounds.
- [Black Screen](https://blankpane.com/black-screen/): Pure black (#000000) — battery saving, focus, screensaver.
- [Green Screen](https://blankpane.com/green-screen/): Chroma-key green (#00B140) for streaming and video.
- [Blue Screen](https://blankpane.com/blue-screen/): Chroma-key blue (#1656FF) and calming light.
- [Red Screen](https://blankpane.com/red-screen/): Alert red (#E11D2E) for testing and night use.
- [Pink Screen](https://blankpane.com/pink-screen/): Aesthetic pink (#FF5FA2) for overlays and streaming.
- [Yellow Screen](https://blankpane.com/yellow-screen/): Warm yellow (#FFD400) for alerts and testing.
- [Gray Screen](https://blankpane.com/gray-screen/): Neutral gray (#808080) for calibration.
- [Purple Screen](https://blankpane.com/purple-screen/): Purple (#7A3FF2) for mood lighting and aesthetics.
- [Orange Screen](https://blankpane.com/orange-screen/): Warm orange (#FF7A1A) for alerts.
- [Blank Screen](https://blankpane.com/blank-screen/): Generic blank white — distraction-free background.
- [Zoom Background Screen](https://blankpane.com/zoom-background-screen/): Plain white for video call backgrounds. (Same #FFFFFF as White Screen but targets the "zoom background" search intent.)
- [All Colors](https://blankpane.com/colors/): Complete color index.

## Blog
- [Best Zoom Background Colors](https://blankpane.com/blog/best-zoom-background-colors/): How color temperature and brightness affect your on-camera appearance.
- [Black Screen for Focus and Battery](https://blankpane.com/blog/black-screen-for-focus-and-battery/): OLED power savings and distraction-free focus.
- [How to Test for Dead Pixels](https://blankpane.com/blog/how-to-test-for-dead-pixels/): Step-by-step dead/stuck pixel detection and fix guide.
- [Use White Screen as Light Source](https://blankpane.com/blog/use-white-screen-as-light-source/): DIY softbox and photography fill light using your display.

## Info
- [About](https://blankpane.com/about/): What BlankPane is and who it's for.
- [Privacy Policy](https://blankpane.com/privacy-policy/): Data collection, cookies, and analytics.
- [Terms of Service](https://blankpane.com/terms-of-service/): Usage terms.
- [Cookie Policy](https://blankpane.com/cookie-policy/): Cookie usage details.
- [Disclaimer](https://blankpane.com/disclaimer/): General disclaimer.
- [Contact](https://blankpane.com/contact/): hello@blankpane.com
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
