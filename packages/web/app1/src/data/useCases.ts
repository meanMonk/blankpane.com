export interface UseCase {
  title: string;
  body: string;
  keyword: string;
  href?: string;
  hrefLabel?: string;
}

// Per-color long-tail use-case content. Wording is original (written in-house),
// but each item intentionally targets a keyword-planner long-tail query that
// competitors rank for (e.g. "green screen for zoom", "blue screen for photography").
// The `keyword` field is the target query for tracking; it is not rendered on-page.
export const useCasesByColor: Record<string, UseCase[]> = {
  "white-screen": [
    {
      title: "Trace or copy drawings onto paper",
      body: "Fills your screen with maximum brightness so you can lay a sheet of paper over it and trace drawings or line art, or backlight a flipbook. No lightbox or tracing table required.",
      keyword: "white screen to copy drawings",
    },
    {
      title: "Spot dust and smudges while cleaning",
      body: "A full-white display reveals physical dirt, lint, and oil marks on the surface, so you can see exactly where to wipe and check that the panel is clean afterward.",
      keyword: "white screen to clean monitor",
      href: "/tools/screen-cleaner/",
      hrefLabel: "Use the Screen Cleaner tool",
    },
    {
      title: "Soft ambient or reading light",
      body: "Acts as a diffuser or reading light in dark rooms — bright enough to read or photograph by, without the harsh glare of a bare bulb.",
      keyword: "white screen as light source",
      href: "/blog/use-white-screen-as-light-source/",
      hrefLabel: "Turn your phone into a light source",
    },
    {
      title: "Backdrop or fill for photos",
      body: "A pure white screen doubles as a clean backdrop or soft fill light for product photos, portraits, and flat-lays. Download it as a PNG at 4K when you need a print-ready background.",
      keyword: "white screen for photography",
    },
    {
      title: "White accent for a gaming setup",
      body: "A white full-screen on a secondary monitor adds a clean, bright accent to a white gaming battlestation — perfect for photo-ready setups and streaming backgrounds.",
      keyword: "white monitors for gaming",
    },
    {
      title: "Even webcam fill light for calls",
      body: "Place a white screen on a second display or window just off-camera to bounce soft, even light onto your face — a free stand-in for a ring light.",
      keyword: "white screen for zoom lighting",
    },
    {
      title: "Check your monitor for dead pixels",
      body: "White (plus black, red, green, blue) full screens make stuck or dead pixels obvious. Cycle each color and scan for dots that don't change.",
      keyword: "white screen for dead pixel test",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
    {
      title: "Makeup and selfie light",
      body: "Hold a white screen near your face for shadow-free selfies and makeup application — instant beauty light with no setup.",
      keyword: "white screen for makeup",
    },
  ],
  "black-screen": [
    {
      title: "Save battery on OLED & AMOLED displays",
      body: "Black pixels are physically turned off on OLED and AMOLED panels, so a full-black screen can noticeably cut power draw on a laptop, phone, or tablet running low.",
      keyword: "black screen to save battery",
      href: "/blog/black-screen-for-focus-and-battery/",
      hrefLabel: "Why a black screen helps you focus",
    },
    {
      title: "Test for backlight bleed and uniformity",
      body: "A pure black screen is the standard test for backlight bleed and clouding on IPS and VA panels — look for uneven glow, especially around the edges.",
      keyword: "black screen for backlight bleed",
    },
    {
      title: "Focus without visual noise",
      body: "A solid black screen hides cluttered icons, tabs, and flashing alerts so you can concentrate on a single task, write, or think.",
      keyword: "black screen for focus",
    },
    {
      title: "Darken a room for sleep",
      body: "Use a black screen as a soft, dark ambient glow or a screensaver at night, without the harsh light of a bright wallpaper.",
      keyword: "black screen for sleep",
    },
    {
      title: "Hide your screen instantly",
      body: "Blank your display in one tap when someone walks by — a black screen looks like an idle or off monitor.",
      keyword: "black screen screensaver",
    },
    {
      title: "Calm backdrop for meditation",
      body: "A dark, quiet screen is a distraction-free backdrop for meditation, breathing exercises, or a short break from bright UI.",
      keyword: "black screen for meditation",
    },
  ],
  "green-screen": [
    {
      title: "Green screen for Zoom calls",
      body: "Open a full green screen on a second display behind you and Zoom's virtual background keys it out — no fabric, no stands, no setup.",
      keyword: "green screen for zoom",
    },
    {
      title: "Chroma-key for streams and gaming",
      body: "Use a full-screen green backdrop on a spare monitor for game streams and face-cam overlays, then chroma-key it in OBS or Streamlabs.",
      keyword: "green screen for gaming",
    },
    {
      title: "Assess color spill from digital backdrops",
      body: "Lighting techs use a single-tone green or blue screen to see how reflected color bounces onto a subject's skin or clothes before committing to a physical setup.",
      keyword: "green screen for chroma key",
    },
    {
      title: "Green screen behind your desk chair",
      body: "Position a green screen on the monitor directly behind your desk chair to frame your upper body for calls and streams without hanging fabric.",
      keyword: "green screen for desk chair",
    },
    {
      title: "Portable green screen on any device",
      body: "Your laptop, tablet, or even phone can show a green screen — a portable chroma-key solution when you're away from your desk.",
      keyword: "portable green screen for zoom",
    },
    {
      title: "Green screen for YouTube videos",
      body: "Record with a green full-screen behind you and key it out in editing for clean, professional-looking video backgrounds.",
      keyword: "green screen for youtube",
    },
    {
      title: "Free alternative to buying a green screen",
      body: "Skip the e-commerce order — a free full-screen green display is the cheapest way to test whether chroma keying fits your setup.",
      keyword: "cheap green screen for zoom",
    },
    {
      title: "Green backdrop for photo compositing",
      body: "Shoot with a green full-screen as a backdrop and replace it later in editing to drop in any background around your subject.",
      keyword: "green screen for photography",
    },
  ],
  "zoom-background-screen": [
    {
      title: "Plain white Zoom background",
      body: "A clean white full-screen behind you keeps meetings minimal and professional — no pattern to distract and no compression artifacts from busy photos.",
      keyword: "zoom white background",
    },
    {
      title: "Zoom background without a green screen",
      body: "Solid colors are the simplest way to add a professional backdrop: no green screen, no keying — just a clean frame behind you.",
      keyword: "zoom background without green screen",
    },
    {
      title: "Bounce light for calls",
      body: "A bright screen angled slightly toward you acts as fill light for video calls, improving how your face looks without extra hardware.",
      keyword: "video call lighting",
    },
    {
      title: "Kind to low-bandwidth connections",
      body: "A solid color compresses far better than a photo background, keeping your video smooth on slower connections.",
      keyword: "zoom background low bandwidth",
    },
  ],
  "blue-screen": [
    {
      title: "Blue backdrop for photos",
      body: "A blue full-screen works as a backdrop or chroma-key surface for product and portrait photography when green doesn't fit the subject.",
      keyword: "blue screen for photography",
    },
    {
      title: "Blue screen for film compositing",
      body: "Before digital keying, film used blue screens — and blue still works where green would clash with the subject's colors.",
      keyword: "blue screen for chroma key",
    },
    {
      title: "Check color spill and lighting",
      body: "A solid blue screen helps lighting teams judge how reflected color falls on a subject, and verifies an even keyable tone edge-to-edge.",
      keyword: "blue screen for lighting",
    },
    {
      title: "Calm blue for video calls",
      body: "A muted blue full-screen behind you reads as calm and professional on camera, a solid alternative to busy virtual backgrounds.",
      keyword: "blue screen for zoom",
    },
    {
      title: "Blue to check color output",
      body: "Display pure blue to verify color accuracy, check for stuck blue subpixels, and compare against green and red during tests.",
      keyword: "blue screen for testing",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
  ],
  "red-screen": [
    {
      title: "Check for stuck red subpixels",
      body: "A pure red channel reveals permanently stuck or failing red subpixels that other colors can hide — one of the first screens to run in a diagnostic pass.",
      keyword: "red screen for pixel test",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
    {
      title: "Warm fill light that flatters on camera",
      body: "A warm red fill neutralizes cool, unflattering room illumination on webcam sessions and adds a cozy glow to evening streaming.",
      keyword: "red screen for color temperature",
    },
    {
      title: "Protect night vision",
      body: "Red light doesn't ruin your eyes' dark adaptation. A red full-screen is ideal for dark rooms, astronomy, and late-night work.",
      keyword: "red screen for night vision",
    },
    {
      title: "Safe light for photography",
      body: "Red is a classic darkroom safe light — use a red full-screen when handling light-sensitive materials.",
      keyword: "red screen for darkroom",
    },
  ],
  "pink-screen": [
    {
      title: "Pink overlay for streams",
      body: "A pink full-screen is a vibrant backdrop or overlay color for streams, thumbnails, and aesthetic setups.",
      keyword: "pink screen for streaming",
    },
    {
      title: "Check pink/red subpixel response",
      body: "Pink stresses the red and green channels together, making it useful for spotting tint shifts and stuck subpixels during diagnostics.",
      keyword: "pink screen for pixel test",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
    {
      title: "Soft flattering fill for selfies",
      body: "Pink light is flattering on camera — hold a pink screen nearby for a warm, pretty glow in photos and videos.",
      keyword: "pink screen for lighting",
    },
    {
      title: "Aesthetic room lighting",
      body: "Turn a screen pink for a playful, on-brand glow in a bedroom, studio, or content backdrop.",
      keyword: "pink screen for aesthetic",
    },
  ],
  "yellow-screen": [
    {
      title: "Check yellow/mixed subpixel output",
      body: "Yellow combines red and green subpixels, making it a good diagnostic screen for color response and tint issues across the panel.",
      keyword: "yellow screen for testing",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
    {
      title: "Warm fill light for evening calls",
      body: "A warm yellow fill neutralizes harsh cool lighting on webcam sessions and creates a calm, golden ambiance in a room.",
      keyword: "yellow screen for color temperature",
    },
    {
      title: "Bright, cheerful background",
      body: "A yellow full-screen is a bright, high-energy backdrop for content, or a warm attention-grabber for alerts.",
      keyword: "yellow screen for focus",
    },
  ],
  "gray-screen": [
    {
      title: "Calibrate brightness and color",
      body: "Neutral gray is the standard backdrop for calibrating brightness and color, because it is easier on the eye than pure white or black.",
      keyword: "gray screen for calibration",
    },
    {
      title: "Neutral photo backdrop",
      body: "A mid-gray full-screen is a neutral, color-true backdrop for product photography and color-critical viewing.",
      keyword: "gray screen for photography",
    },
    {
      title: "Easier on the eyes",
      body: "Gray at low brightness is less harsh than white for reading and late-night work while still lighting the screen area.",
      keyword: "gray screen for eye strain",
    },
    {
      title: "Check uniformity and banding",
      body: "Gray reveals uneven backlight, clouding, and banding that white or black can hide — great for a quick panel inspection.",
      keyword: "gray screen for monitor test",
    },
  ],
  "purple-screen": [
    {
      title: "Purple mood lighting",
      body: "A purple full-screen adds a calm, creative glow to a room — popular for streams, gaming setups, and evening ambiance.",
      keyword: "purple screen for mood lighting",
    },
    {
      title: "Check red+blue subpixel response",
      body: "Purple stresses the red and blue channels together, making it a useful diagnostic screen for tint and subpixel issues.",
      keyword: "purple screen for pixel test",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
    {
      title: "Purple backdrop for content",
      body: "Purple is a strong brand color for overlays and backdrops. Fill a screen with it behind you or beside your content.",
      keyword: "purple screen for streaming",
    },
  ],
  "orange-screen": [
    {
      title: "Warm amber lighting",
      body: "Orange light is warm and easy on the eyes at night — use a full-screen orange glow instead of harsh white when winding down.",
      keyword: "orange screen for warm light",
    },
    {
      title: "Check red+green subpixel response",
      body: "Orange stresses the red-green range of a panel, useful for spotting tint or banding issues during tests.",
      keyword: "orange screen for testing",
      href: "/tools/dead-pixel-test/",
      hrefLabel: "Use the dead pixel test tool",
    },
    {
      title: "Warm fill for calls and streams",
      body: "A warm orange fill neutralizes cool room lighting on webcam sessions and adds a cozy, golden glow to evening streams.",
      keyword: "orange screen for color temperature",
    },
  ],
  "blank-screen": [
    {
      title: "Hide your screen in one tap",
      body: "Show a blank screen to look like your monitor is idle or off — handy before a presentation or when you step away.",
      keyword: "blank screen to hide screen",
    },
    {
      title: "Blank space to think",
      body: "A completely blank screen removes every visual distraction so you can focus on a single task or clear your head.",
      keyword: "blank screen for focus",
    },
    {
      title: "Clean slate for presenting",
      body: "Use a blank screen as a quiet pause between presentation slides or as a clean canvas while you set up.",
      keyword: "blank screen for presentation",
    },
  ],
};
