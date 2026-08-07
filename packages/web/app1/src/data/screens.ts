export interface Screen {
  file: string;
  label: string;
  desc: string;
}

export const screens: Screen[] = [
  { file: "01-spiderweb-crack", label: "Spiderweb Crack", desc: "Radiating impact cracks across the panel." },
  { file: "02-full-shatter", label: "Full Shatter", desc: "A fully shattered glass mosaic." },
  { file: "03-dead-pixels", label: "Dead Pixels", desc: "Scattered dead and stuck pixel dots." },
  { file: "04-vertical-glitch", label: "Vertical Glitch", desc: "Chaotic vertical display glitch bands." },
  { file: "05-lcd-backlight-bleed", label: "LCD Bleed", desc: "Uneven backlight glow at the edges." },
  { file: "06-oled-ink-bleed", label: "OLED Ink Bleed", desc: "Dark inky blotches on an OLED panel." },
  { file: "07-horizontal-line-failure", label: "Line Failure", desc: "Persistent horizontal scan lines." },
  { file: "08-pressure-damage", label: "Pressure Damage", desc: "Pressure marks and color distortion." },
  { file: "09-tv-static", label: "TV Static", desc: "Classic analog TV noise." },
  { file: "10-gpu-artifact-failure", label: "GPU Artifacts", desc: "Glitchy GPU rendering artifacts." },
  { file: "11-cracked-corner-impact", label: "Cracked Corner", desc: "Impact crack radiating from a corner." },
  { file: "12-burn-in-damage", label: "Burn-In Damage", desc: "Ghosted image retention on the panel." },
  { file: "13-water-damage", label: "Water Damage", desc: "Moisture stains under the glass." },
  { file: "14-crushed-lcd", label: "Crushed LCD", desc: "Crushed liquid-crystal blotches." },
  { file: "15-black-screen-of-death", label: "Black Screen of Death", desc: "A completely dead, dark display." },
  { file: "16-radar", label: "Radar", desc: "Classic radar scope with sweeping beam." },
  { file: "17-hacker-simulator", label: "Hacker Simulator", desc: "Movie-style cascading code terminal." },
  { file: "19-fake-update-windows10", label: "Windows 10 Update", desc: "Realistic Windows 10 update screen." },
  { file: "20-fake-update-windows-xp", label: "Windows XP Update", desc: "Retro Windows XP update screen." },
  { file: "21-fake-update-mac", label: "macOS Update", desc: "Realistic macOS update screen." },
  { file: "23-fake-update-chromeos", label: "ChromeOS Update", desc: "Realistic ChromeOS update screen." },
  { file: "24-dvd-screensaver", label: "DVD Screensaver", desc: "The classic bouncing DVD logo." },
  { file: "26-matrix-screensaver", label: "Matrix Rain", desc: "Falling green Matrix character rain." },
];

export const screensByColor: Record<string, string[]> = {
  "white-screen": ["01-spiderweb-crack", "02-full-shatter", "03-dead-pixels", "24-dvd-screensaver"],
  "black-screen": ["15-black-screen-of-death", "09-tv-static", "04-vertical-glitch", "17-hacker-simulator", "26-matrix-screensaver"],
  "green-screen": ["17-hacker-simulator", "26-matrix-screensaver", "03-dead-pixels"],
  "zoom-background-screen": ["01-spiderweb-crack", "02-full-shatter", "03-dead-pixels", "24-dvd-screensaver"],
  "blue-screen": ["04-vertical-glitch", "23-fake-update-chromeos", "20-fake-update-windows-xp"],
  "red-screen": ["02-full-shatter", "11-cracked-corner-impact", "10-gpu-artifact-failure", "03-dead-pixels"],
  "pink-screen": ["05-lcd-backlight-bleed", "06-oled-ink-bleed"],
  "yellow-screen": ["03-dead-pixels", "07-horizontal-line-failure"],
  "gray-screen": ["09-tv-static", "07-horizontal-line-failure", "15-black-screen-of-death", "08-pressure-damage"],
  "purple-screen": ["05-lcd-backlight-bleed", "06-oled-ink-bleed", "04-vertical-glitch"],
  "orange-screen": ["03-dead-pixels", "08-pressure-damage", "10-gpu-artifact-failure"],
  "blank-screen": ["15-black-screen-of-death", "09-tv-static", "04-vertical-glitch", "17-hacker-simulator"],
};
