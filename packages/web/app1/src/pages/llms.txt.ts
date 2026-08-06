export const prerender = true;

export async function GET() {
  const body = `# BlankPane

> Free full-screen color tool — instant solid-color fills, canvas-based PNG downloads, and screen utilities for lighting, monitor testing, pranks, and more. No install, no signup, all in-browser.

## Quick Start
- [Home](https://blankpane.com/): Pick a color, preview it, go full screen, or download as PNG at any resolution.
- [Tools Hub](https://blankpane.com/tools/): All screen utilities grouped by cluster.

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
- [Zoom Background Screen](https://blankpane.com/zoom-background-screen/): Plain white for video call backgrounds.
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
