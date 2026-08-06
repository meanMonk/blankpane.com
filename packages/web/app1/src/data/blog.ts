export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-test-for-dead-pixels",
    title: "How to Test Your Monitor for Dead Pixels in Under a Minute",
    date: "2026-03-12",
    excerpt: "A quick, free way to check for stuck and dead pixels using solid color screens.",
    body: [
      "Dead or stuck pixels are the most common reason a brand-new monitor gets returned. A dead pixel is permanently black; a stuck pixel shows one fixed color. Both are easy to spot when you know how.",
      "The simplest test is to fill your screen with each primary color — white, black, red, green, blue — and look closely. Any dot that doesn't change with the background is a defect.",
      "BlankPane makes this easy: open the tool, tap each color tile to go full screen, and scan the display. Repeat for red, green, and blue to catch every kind of stuck subpixel.",
      "What to do next: most manufacturers replace panels with a few dead pixels within the warranty window. If the pixel is stuck rather than dead, a quick pixel-exercise animation sometimes revives it.",
    ],
  },
  {
    slug: "best-zoom-background-colors",
    title: "Best Solid-Color Zoom Backgrounds (and When to Use Them)",
    date: "2026-04-02",
    excerpt: "Plain color backgrounds are underrated for video calls. Here's how to pick one that looks great on camera.",
    body: [
      "Most people reach for a photo or a blurred room for their video-call background. A solid color is simpler, cleaner, and often looks more professional — no busy patterns, no clutter, no freezes.",
      "White reads as bright and minimal but can blow out on camera. Light gray is softer and flatters most skin tones. A muted blue or green gives a studio feel and works well for chroma-key setups.",
      "To use one: open BlankPane, pick your color, and go full screen on a second display or window positioned behind you. For lighting, bounce a white screen onto your face instead of relying on a ceiling light.",
      "Avoid saturated colors directly behind your face — they can tint your skin. Stick to soft neutrals or a calm blue/green for the best on-camera result.",
    ],
  },
  {
    slug: "use-white-screen-as-light-source",
    title: "Turn Your Phone Into a White Light Source for Photos",
    date: "2026-05-18",
    excerpt: "Need even, soft lighting fast? Your phone's full white screen is a free light panel.",
    body: [
      "Ring lights are great, but you don't always have one at hand. Almost everyone has a phone, and a phone at full brightness showing a white screen is a passable softbox in a pinch.",
      "For selfies, hold the phone slightly above and to the side of the camera — this gives flattering downward light. For product photos, place it behind or beside the object to fill shadows.",
      "Use BlankPane to show pure white (#FFFFFF) at full brightness, then adjust your phone's brightness up. Dim the screen to create a warmer, softer fill when needed.",
      "Bonus: a white screen works as an improvised light panel for video calls, small interviews, and stop-motion shots where you need even, shadowless light.",
    ],
  },
  {
    slug: "black-screen-for-focus-and-battery",
    title: "Why a Black Screen Helps You Focus (and Saves Battery)",
    date: "2026-06-09",
    excerpt: "A pure black screen is more than a screensaver — it's a focus tool and a battery saver.",
    body: [
      "Visual noise is a silent productivity killer. Tabs, wallpapers, and notifications all compete for attention. A solid black screen removes everything except the task in front of you.",
      "On OLED and AMOLED displays, black pixels are physically turned off. Showing a black screen can noticeably reduce power draw — useful when your laptop is near 5% and you still need it alive.",
      "Use a black screen as a screensaver, as a distraction-free backdrop while you think or record, or overnight as an ambient-light-free sleep aid.",
      "BlankPane makes it one tap: open the tool and hit the black tile, or use the custom picker for any shade from #000000 to a softer near-black.",
    ],
  },
];
