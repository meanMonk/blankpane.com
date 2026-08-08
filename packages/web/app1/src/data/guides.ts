export interface GuideSection {
  h2: string;
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  cluster: "monitor-testing" | "cleaning" | "lighting" | "focus" | "pranks";
  intro: string;
  sections: GuideSection[];
  relatedColors: string[];
  relatedTools: string[];
  relatedGuides: string[];
  keyword: string;
}

// Guide content is written in-house. Each guide targets a question-type long-tail
// query that competitors rank for, but with original wording and structure.
// `relatedColors` / `relatedTools` / `relatedGuides` power the internal-link graph
// (guides ↔ colors ↔ tools ↔ other guides) for topical authority.
export const guides: Guide[] = [
  {
    slug: "how-to-check-for-dead-pixels",
    title: "How to Check for Dead Pixels (and Stuck Pixels) on Any Monitor",
    excerpt: "A full-screen color test is the fastest way to find dead and stuck pixels. Here's how to run it properly, which colors to use, and what to do if you find one.",
    cluster: "monitor-testing",
    intro:
      "Dead and stuck pixels are small display defects that show up as a dot that stays dark, or a dot that stays one color no matter what is on screen. The quickest way to find them is to fill your entire display with a series of solid colors and look for anything that doesn't change.",
    sections: [
      {
        h2: "What is the difference between a dead pixel and a stuck pixel?",
        paragraphs: [
          "A dead pixel is a pixel that no longer lights up at all. It shows as a tiny black dot that stays black on every background color.",
          "A stuck pixel is a pixel that is permanently stuck on one color — red, green, or blue — because one of its subpixels stopped responding. It still emits light, so it looks like a bright colored dot on certain backgrounds.",
        ],
      },
      {
        h2: "How to run a dead pixel test",
        paragraphs: [
          "Open a full-screen color tool and set the display to the brightest color available. Then scan the whole screen slowly from one corner to the other, moving your eyes a few centimetres at a time rather than staring at the middle.",
          "Switch to black next. Black makes stuck and glowing pixels stand out clearly, because any dot that is brighter than the background is easy to spot.",
          "Repeat the pass on red, green, and blue. The primary colors isolate each subpixel channel, which reveals problems that a mixed color like white or yellow would hide.",
          "Doing all five passes takes two or three minutes and is worth it whenever you buy a new display, receive a repair, or notice a strange dot on screen.",
        ],
      },
      {
        h2: "Which screen colors work best for the test?",
        paragraphs: [
          "White reveals dark or dead pixels. Black reveals bright, glowing, or stuck pixels. Red, green, and blue each test one color channel on its own, which is how you confirm exactly which subpixel is affected.",
        ],
      },
      {
        h2: "How to confirm it's a dead pixel, not dust",
        paragraphs: [
          "If the dot changes with the color of the screen, it is a pixel problem. If it stays in exactly the same physical place no matter what is displayed, it is more likely a speck of dust or dirt on the surface.",
          "Try cleaning the screen first. Many 'dead pixels' turn out to be a fleck of dust or a hair stuck to the glass.",
        ],
      },
      {
        h2: "What to do if you find a dead or stuck pixel",
        paragraphs: [
          "A stuck pixel can sometimes be revived with a rapid color-flash routine that cycles the subpixels quickly. It doesn't always work, but it is free and takes under a minute.",
          "If the pixel is genuinely dead, check your display's warranty window. Most manufacturers accept returns or replacements for panels with a small number of dead pixels, and that window is time-limited — so test early.",
        ],
      },
    ],
    relatedColors: ["white-screen", "black-screen", "red-screen", "green-screen", "blue-screen"],
    relatedTools: ["dead-pixel-test", "screen-cleaner"],
    relatedGuides: ["how-to-remove-stuck-pixels", "how-to-test-screen-uniformity-and-backlight-bleed"],
    keyword: "how to check for dead pixels",
  },
  {
    slug: "how-to-remove-stuck-pixels",
    title: "How to Fix a Stuck Pixel with a Color Flash (and When It Won't Work)",
    excerpt: "A stuck pixel is often fixable with a rapid red/green/blue flash. Learn the method that sometimes revives a stuck subpixel — and when to give up and claim warranty instead.",
    cluster: "monitor-testing",
    intro:
      "A stuck pixel stays permanently lit in one color. Unlike a dead pixel, it may still be recoverable: rapidly cycling red, green, and blue on that region of the screen can 'wake up' the stuck subpixel. It is not a guarantee, but it costs nothing to try.",
    sections: [
      {
        h2: "Why color-flashing can fix a stuck pixel",
        paragraphs: [
          "A stuck pixel is usually a subpixel that has frozen mid-state. Rapidly flashing the three primary colors forces that subpixel to switch on and off at high speed, which can shake it loose and restore normal response.",
        ],
      },
      {
        h2: "How to run a stuck-pixel fix",
        paragraphs: [
          "Open a full-screen color tool and switch to a rapid-flash mode if one is available — this automatically cycles red, green, and blue every fraction of a second.",
          "If your tool doesn't have a flash mode, switch manually between red, green, and blue full screens as fast as you can, keeping the flashing area over the stuck pixel.",
          "Keep the flash running for 5 to 10 minutes. Many stuck pixels respond in the first few minutes, but some need a longer session.",
          "Afterwards, switch to a black screen and check whether the pixel now changes color with the background. If it does, it's fixed.",
        ],
      },
      {
        h2: "When the method won't work",
        paragraphs: [
          "If the pixel stays dark on every color, it is a dead pixel — the subpixel has physically failed and no amount of flashing will revive it.",
          "If the pixel changes color slightly but never fully corrects, it may be a partially stuck subpixel. Run the flash again once or twice, then stop: repeated stressing can cause new defects on some panels.",
        ],
      },
      {
        h2: "If it's truly dead: warranty is your friend",
        paragraphs: [
          "Dead pixels are a common reason displays get returned in their warranty window. Test early and document the defect with a photo so you have evidence for the manufacturer.",
        ],
      },
    ],
    relatedColors: ["red-screen", "green-screen", "blue-screen", "black-screen"],
    relatedTools: ["dead-pixel-test"],
    relatedGuides: ["how-to-check-for-dead-pixels", "how-to-test-screen-uniformity-and-backlight-bleed"],
    keyword: "how to fix stuck pixels",
  },
  {
    slug: "how-to-test-screen-uniformity-and-backlight-bleed",
    title: "How to Test Screen Uniformity and Backlight Bleed",
    excerpt: "Uneven brightness, cloudy corners, and glowing edges are all signs of backlight bleed or poor uniformity. Here's how to check your panel like a reviewer.",
    cluster: "monitor-testing",
    intro:
      "Two common panel complaints are backlight bleed — glow bleeding in from the edges of an LCD — and poor uniformity, where one part of the screen is visibly brighter than the rest. Both are easy to spot with the right full-screen test.",
    sections: [
      {
        h2: "Backlight bleed vs. uniformity: what you're looking for",
        paragraphs: [
          "Backlight bleed appears as bright patches or glow, usually around the edges or corners, when the screen shows a dark color. Uniformity issues are broader: one half of the panel may look washed out or dimmer than the other.",
        ],
      },
      {
        h2: "Run the black-screen test for bleed",
        paragraphs: [
          "Fill the screen with pure black in a darkened room — ambient light hides the very bleed you're trying to see. Let your eyes adapt for a minute, then look at the corners and edges for uneven glow or bright spots.",
          "A little edge glow on IPS panels is normal, especially in a dark room. What matters is whether the bleed is symmetric, subtle, and doesn't distract during normal use.",
        ],
      },
      {
        h2: "Run the gray-screen test for uniformity",
        paragraphs: [
          "Display a mid-gray full screen at roughly 50% brightness. Gray shows clouding and uneven backlight better than white or black, because the eye is extremely sensitive to brightness differences in neutral tones.",
          "Scan the full panel. Look for any region that reads darker, brighter, or warmer than the rest — that's a uniformity defect.",
        ],
      },
      {
        h2: "Should you return a display over bleed?",
        paragraphs: [
          "Slight edge bleed is common and often acceptable. Return or exchange the display when bleed is severe, asymmetric, or visible during regular work in a normally lit room — that's a real defect, not a panel characteristic.",
        ],
      },
    ],
    relatedColors: ["black-screen", "gray-screen", "white-screen"],
    relatedTools: ["dead-pixel-test", "screen-cleaner"],
    relatedGuides: ["how-to-check-for-dead-pixels", "how-to-remove-stuck-pixels"],
    keyword: "how to test screen uniformity",
  },
  {
    slug: "how-to-clean-your-monitor-with-a-white-screen",
    title: "How to Clean Your Monitor Safely with a White Screen",
    excerpt: "A white full-screen makes dust, smudges, and streaks obvious so you clean exactly where you need to. Here's the streak-free method — plus why to lock the screen first.",
    cluster: "cleaning",
    intro:
      "Dust and fingerprints are much easier to see against a bright, even background. A white full-screen turns your display into a free inspection light, showing every speck so you can clean precisely and check your work afterward.",
    sections: [
      {
        h2: "Why a white screen helps you clean",
        paragraphs: [
          "A solid white fill gives your eye a uniform reference, so dust motes, oil smudges, and dried streaks jump out. Wiping on a dark desktop, you can easily miss spots you simply can't see.",
        ],
      },
      {
        h2: "The safe cleaning routine",
        paragraphs: [
          "Lock the screen to a solid white fill first — a screen-cleaning tool that blocks input prevents accidental clicks and taps while you wipe.",
          "Use a dry microfiber cloth for dust. For smudges, slightly dampen the cloth with distilled water or a screen-safe cleaner — never spray directly onto the display, and never use paper towels.",
          "Wipe in one direction or in slow circles, applying light pressure. Then switch the screen to black to check for streaks and oily residue you might have missed on white.",
        ],
      },
      {
        h2: "What to use (and what to avoid)",
        paragraphs: [
          "Microfiber is gentle and lint-free. Avoid paper towels, tissue, and household glass cleaners with ammonia or alcohol, which can strip the display's anti-reflective coating.",
        ],
      },
      {
        h2: "When cleaning won't fix the mark",
        paragraphs: [
          "If a mark remains after cleaning and stays in the same place across colors, it's inside the panel — that could be a stuck pixel or pressure damage, not dirt. Run a dead-pixel test to check.",
        ],
      },
    ],
    relatedColors: ["white-screen", "black-screen"],
    relatedTools: ["screen-cleaner"],
    relatedGuides: ["how-to-check-for-dead-pixels", "how-to-test-screen-uniformity-and-backlight-bleed"],
    keyword: "how to clean your monitor with a white screen",
  },
  {
    slug: "how-to-use-a-white-screen-as-a-ring-light",
    title: "How to Use Your Phone or Laptop as a Free Ring Light",
    excerpt: "No ring light handy? A full white screen on your phone or laptop gives you soft, even lighting for video calls, selfies, and product photos in seconds.",
    cluster: "lighting",
    intro:
      "A bright white screen is a passable softbox in a pinch. Because it's large and diffused, it produces softer, more flattering light than a harsh desk lamp — and you already own one.",
    sections: [
      {
        h2: "The best position for flattering light",
        paragraphs: [
          "Hold your phone or laptop screen at eye level, slightly off to the side of the camera, angled toward your face. Downward, front-facing light fills shadows and softens features; light from directly below looks harsh and unflattering.",
          "For product photos, place the screen behind or beside the object to fill shadows rather than lighting the front, which would glare.",
        ],
      },
      {
        h2: "Tune the brightness for a warm or cool look",
        paragraphs: [
          "Set the screen to a soft white and adjust the display brightness. At high brightness it's a bright daylight fill; dimmed, it warms up and becomes a gentler, more subtle light.",
        ],
      },
      {
        h2: "For video calls, bounce it instead of pointing it",
        paragraphs: [
          "A second monitor showing white, angled just off-camera, bounces soft even light onto your face — a free stand-in for a ring light that won't blow out your webcam.",
        ],
      },
      {
        h2: "When to reach for a dedicated tool",
        paragraphs: [
          "If you call, stream, or shoot regularly, a purpose-built lighting tool with color temperature control gives you a consistent result. But for an occasional call or photo, a full white screen is genuinely enough.",
        ],
      },
    ],
    relatedColors: ["white-screen", "zoom-background-screen"],
    relatedTools: ["zoom-light-screen", "ring-light-screen", "screen-flashlight"],
    relatedGuides: ["how-to-set-up-a-green-screen-for-zoom", "how-to-focus-with-a-blank-screen"],
    keyword: "how to use a white screen as a ring light",
  },
  {
    slug: "how-to-set-up-a-green-screen-for-zoom",
    title: "How to Set Up a Green Screen for Zoom Without Buying One",
    excerpt: "You don't need fabric or a stand: a full-screen green display behind you is a working green screen for Zoom's virtual backgrounds. Here's how to make it key cleanly.",
    cluster: "lighting",
    intro:
      "Zoom's virtual backgrounds work best when there's a solid, evenly lit color behind you to key out. A full-screen green display on a second monitor or a tablet placed behind you gives you exactly that — no shopping, no setup.",
    sections: [
      {
        h2: "Why green is the right color",
        paragraphs: [
          "Green is the standard chroma-key color because it's furthest from skin tones, so the background removal software can separate you from the backdrop without eating your face or clothes.",
        ],
      },
      {
        h2: "Setting up the screen green-screen",
        paragraphs: [
          "Open a full-screen green color on the display behind you. Position it so it fills the frame behind your upper body — you want as little of your room visible in the shot as possible.",
          "Even, soft light on the green surface matters more than brightness. A white screen or soft lamp pointing at the backdrop reduces shadows and helps Zoom key it out cleanly.",
          "In Zoom, open Settings → Backgrounds & Effects → Virtual Backgrounds and pick any background. Zoom detects the green and replaces it live.",
        ],
      },
      {
        h2: "Troubleshooting green spill",
        paragraphs: [
          "If green light bounces onto your skin or clothing, the key can look messy. Move the screen slightly further back, soften its light, and keep bright green away from your shirt.",
          "Solid white backgrounds are the fallback when chroma keying fights your lighting — plain colors read as clean and professional without any keying at all.",
        ],
      },
    ],
    relatedColors: ["green-screen", "zoom-background-screen", "blue-screen"],
    relatedTools: ["zoom-light-screen"],
    relatedGuides: ["how-to-use-a-white-screen-as-a-ring-light", "how-to-focus-with-a-blank-screen"],
    keyword: "how to set up a green screen for zoom",
  },
  {
    slug: "how-to-use-a-black-screen-to-save-battery",
    title: "How a Black Screen Saves Battery (and Helps You Focus)",
    excerpt: "On OLED and AMOLED displays, black pixels are off — so a full black screen genuinely reduces power draw. Here's when it helps and how to use it as a focus tool too.",
    cluster: "focus",
    intro:
      "A black screen pulls double duty: it cuts power consumption on OLED and AMOLED panels, and it removes visual noise so you can concentrate. Both uses are free and take one tap.",
    sections: [
      {
        h2: "Does a black screen really save battery?",
        paragraphs: [
          "On OLED and AMOLED screens, black pixels are physically switched off. A full black image means large parts of the panel draw no power at all, so a black screen can noticeably reduce battery drain compared to bright content.",
          "On older LCD panels the backlight stays on regardless, so the saving is minimal — but black still works as a focus tool on any display.",
        ],
      },
      {
        h2: "Use black for focus, not just battery",
        paragraphs: [
          "A solid black screen hides tabs, icons, and notification flashes that compete for attention. Fill the display with black while you think, write, or record, and only the task in front of you remains.",
        ],
      },
      {
        h2: "Use black to calm a room at night",
        paragraphs: [
          "A black screen makes a soft, dark ambient glow — or a completely dark panel on OLED — that's far less harsh than a bright wallpaper when you're winding down for sleep.",
        ],
      },
      {
        h2: "Pair it with a timer for deep work",
        paragraphs: [
          "Combine a black screen with a full-screen countdown timer for distraction-free work sessions: the black removes the noise, the timer keeps you accountable.",
        ],
      },
    ],
    relatedColors: ["black-screen", "blank-screen"],
    relatedTools: ["countdown-timer-fullscreen", "screen-cleaner"],
    relatedGuides: ["how-to-focus-with-a-blank-screen", "how-to-test-screen-uniformity-and-backlight-bleed"],
    keyword: "how to use a black screen to save battery",
  },
  {
    slug: "how-to-focus-with-a-blank-screen",
    title: "How to Focus with a Blank Screen (Distraction-Free Work)",
    excerpt: "A blank, uncluttered screen removes every visual distraction so you can lock into deep work. Here's the setup, plus how to time it.",
    cluster: "focus",
    intro:
      "Every open tab and flashing notification is a small bid for your attention. A blank full screen takes that competition away, leaving you with the one thing you actually opened your computer for.",
    sections: [
      {
        h2: "Why a blank screen helps",
        paragraphs: [
          "Attention is a limited resource, and visual clutter spends it. A plain, featureless screen gives your brain nothing to react to, which makes it far easier to sink into a single task.",
        ],
      },
      {
        h2: "The setup",
        paragraphs: [
          "Fill your screen with a blank color — white for a bright, clean feel or black for a calmer, darker workspace. Then open only the app or document you need, in front of the fill.",
        ],
      },
      {
        h2: "Add a timer to structure the session",
        paragraphs: [
          "Run a full-screen countdown timer alongside your blank fill and work in short, focused bursts. A visible countdown turns 'sometime later' into 'the session ends when the timer does'.",
        ],
      },
      {
        h2: "Make it a habit, not a novelty",
        paragraphs: [
          "Use a blank screen at the start of every deep-work session — before you open email or social media. The habit of clearing the screen first is what compounds into real focus.",
        ],
      },
    ],
    relatedColors: ["blank-screen", "black-screen", "white-screen"],
    relatedTools: ["countdown-timer-fullscreen"],
    relatedGuides: ["how-to-use-a-black-screen-to-save-battery", "how-to-use-a-white-screen-as-a-ring-light"],
    keyword: "how to focus with a blank screen",
  },
  {
    slug: "how-to-prank-someone-with-a-broken-screen",
    title: "How to Prank a Friend with a Broken Screen (Convincingly)",
    excerpt: "Cracked glass, a fake update, or a 'no signal' screen — the classic harmless screen pranks. Here's how each one works and how to exit before the panic gets real.",
    cluster: "pranks",
    intro:
      "A convincing broken screen or fake update is a perfect harmless prank for a shared computer. The trick is in the setup: get the prank running before your victim sits down, then make sure you can end it fast.",
    sections: [
      {
        h2: "The cracked-screen prank",
        paragraphs: [
          "A full-screen crack overlay makes a working display look shattered. Pick a realistic crack style, set it to fill the whole screen, and walk away — the moment your friend sits down is the money shot.",
          "It looks most convincing on a bright background, so pair the crack with a white or light fill behind it.",
        ],
      },
      {
        h2: "The fake update prank",
        paragraphs: [
          "A full-screen Windows, macOS, or Linux-style update screen makes it look like the computer is stuck updating. Lock the screen so the victim can't click anything, and let them believe progress is stalled.",
        ],
      },
      {
        h2: "The 'no signal' prank",
        paragraphs: [
          "An animated static screen with a bouncing 'NO SIGNAL' message convinces people the cable has died. The movement makes it feel like a real hardware failure rather than a wallpaper.",
        ],
      },
      {
        h2: "Always have a clean exit",
        paragraphs: [
          "Before the prank, know how to close it instantly — press Escape to exit a prank screen and return to normal. Set a time limit in your head, because 'it'll be funny for a second' can become 'I'm actually worried' fast.",
        ],
      },
    ],
    relatedColors: ["black-screen", "white-screen"],
    relatedTools: ["broken-screen-dummy", "fake-update-screen", "no-signal-screen"],
    relatedGuides: [],
    keyword: "how to prank someone with a broken screen",
  },
  {
    slug: "how-to-download-a-color-screen-as-an-image",
    title: "How to Download a Color Screen as a High-Quality Image",
    excerpt: "Need a solid-color background for a thumbnail, banner, or mockup? Here's how to export any color as a lossless PNG at the exact size you need.",
    cluster: "monitor-testing",
    intro:
      "Whether you need a clean color background for a design mockup, a YouTube thumbnail, or a print-ready backdrop, the fastest way to get a perfect solid-color image is to render it directly from a color tool.",
    sections: [
      {
        h2: "Why render it instead of screenshotting",
        paragraphs: [
          "A screenshot captures whatever your screen happens to be showing — including compression and your current display's color profile. Rendering a color directly to a canvas gives you an exact, lossless PNG at the precise dimensions you choose.",
        ],
      },
      {
        h2: "How to export a solid-color PNG",
        paragraphs: [
          "Open a full-screen color tool and pick the color you want. Choose a size preset — Full HD, 4K, square, or story — or type a custom width and height in pixels.",
          "Press download. Your browser renders the color to a canvas and saves a lossless PNG at exactly that size. Nothing is uploaded; it all happens locally in the browser.",
        ],
      },
      {
        h2: "Common sizes and when to use them",
        paragraphs: [
          "1920×1080 suits video backgrounds and widescreen wallpapers. 3840×2160 (4K) is for print-quality or high-res backdrops. A square 1080×1080 works for social posts and avatars, while 1080×1920 matches Stories and Reels.",
        ],
      },
      {
        h2: "Troubleshooting an unexpected color",
        paragraphs: [
          "If the downloaded color looks different from on screen, your display's color profile or night-shift setting is the usual culprit. The PNG itself is exact — check it on a calibrated or unmanaged display.",
        ],
      },
    ],
    relatedColors: ["white-screen", "green-screen", "blue-screen", "yellow-screen"],
    relatedTools: ["dead-pixel-test"],
    relatedGuides: ["how-to-check-for-dead-pixels", "how-to-set-up-a-green-screen-for-zoom"],
    keyword: "how to download a color screen as an image",
  },
];
