# Scripts

## generate-wallpapers.mjs

Generates 15 desktop "broken screen" wallpapers via [fal.ai](https://fal.ai) (FLUX dev model) and saves them to `packages/web/app1/public/screens/`.

### Prerequisites

- Node >= 20
- A fal.ai API key: <https://fal.ai/dashboard/keys>

### Usage

```bash
export FAL_KEY=your-api-key
node scripts/generate-wallpapers.mjs            # generate all 15
node scripts/generate-wallpapers.mjs 1          # generate only #1
node scripts/generate-wallpapers.mjs 1,3,7      # specific set
node scripts/generate-wallpapers.mjs 2-5        # range
node scripts/generate-wallpapers.mjs all        # everything (default)
```

Also available as `pnpm screens:gen`.

### Options (env vars)

| Var         | Default           | Description                     |
|-------------|-------------------|---------------------------------|
| `FAL_KEY`   | — (required)      | fal.ai API key                  |
| `FAL_MODEL` | `fal-ai/flux/dev` | fal.ai model endpoint to use    |

### Output

Images are written as `NN-<slug>.png` (1344x768, 16:9) into
`packages/web/app1/public/screens/`. Each prompt retries up to 3 times on failure.

| # | File |
|---|------|
| 1 | `01-spiderweb-crack.png` |
| 2 | `02-full-shatter.png` |
| 3 | `03-dead-pixels.png` |
| 4 | `04-vertical-glitch.png` |
| 5 | `05-lcd-backlight-bleed.png` |
| 6 | `06-oled-ink-bleed.png` |
| 7 | `07-horizontal-line-failure.png` |
| 8 | `08-pressure-damage.png` |
| 9 | `09-tv-static.png` |
| 10 | `10-gpu-artifact-failure.png` |
| 11 | `11-cracked-corner-impact.png` |
| 12 | `12-burn-in-damage.png` |
| 13 | `13-water-damage.png` |
| 14 | `14-crushed-lcd.png` |
| 15 | `15-black-screen-of-death.png` |
| 16 | `16-radar.png` |
| 17 | `17-hacker-simulator.png` |
| 18 | `18-fake-video-call.png` |
| 19 | `19-fake-update-windows10.png` |
| 20 | `20-fake-update-windows-xp.png` |
| 21 | `21-fake-update-mac.png` |
| 22 | `22-fake-update-ubuntu.png` |
| 23 | `23-fake-update-chromeos.png` |
| 24 | `24-dvd-screensaver.png` |
| 25 | `25-flip-clock-screensaver.png` |
| 26 | `26-matrix-screensaver.png` |

Prompts are written as **pure flat screen effects or interfaces** (crack, glitch, static, terminal, update screen, screensaver, etc.) filling the frame edge-to-edge — no monitor, device, bezel, or frame, so images work as direct wallpapers for any laptop or screen.

To edit a prompt, open the `WALLPAPERS` array at the top of the script.
