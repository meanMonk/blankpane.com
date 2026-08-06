export interface LegalPage {
  slug: string;
  title: string;
  lede: string;
  sections: Array<{ h: string; body: string }>;
}

export const legalPages: LegalPage[] = [
  {
    slug: "about",
    title: "About BlankPane",
    lede: "BlankPane is a free, no-install browser tool for filling your screen with a solid color and downloading color swatches as high-quality PNG images.",
    sections: [
      { h: "What we do", body: "We make a dead-simple utility: pick a color, preview it large, go full screen in one tap, or download it as a lossless PNG at any size. Everything runs locally in your browser — no accounts, no uploads, no tracking of your color choices." },
      { h: "Who it's for", body: "Anyone who needs a plain background in a hurry — video-call users, streamers and chroma-key artists, photographers, monitor-testers, and anyone using a bright or dark screen for lighting, focus, or a screensaver." },
      { h: "Our approach", body: "No walls of text, no forced sign-ups, and no bloated JavaScript. The page is a static site that loads fast, works on any device, and respects your attention." },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    lede: "This Privacy Policy explains what data BlankPane collects and how it is used.",
    sections: [
      { h: "What we collect", body: "This tool works entirely in your browser. We do not collect, upload, or store the colors you view, the images you download, or any personal information. No account is required to use the tool." },
      { h: "Cookies & advertising", body: "We may display third-party advertising (such as Google AdSense). Google and its partners use cookies to serve ads based on your prior visits to this and other websites. You may opt out of personalized advertising via Ads Settings or www.aboutads.info." },
      { h: "Analytics", body: "We may use privacy-respecting, cookieless analytics to understand aggregate page usage. This data is used only to improve the site and is not used to identify individual visitors." },
      { h: "Contact", body: "Questions about this policy? Use the contact page and we'll reply promptly." },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    lede: "By using BlankPane you agree to these simple terms.",
    sections: [
      { h: "Free use", body: "The tool is free to use for personal and commercial purposes. You may use generated color images anywhere, without attribution." },
      { h: "Acceptable use", body: "You agree not to use the service for unlawful purposes or in a way that disrupts the service for others. The tool renders images locally and does not store anything on our servers." },
      { h: "No warranty", body: "The service is provided \"as is\" without warranties of any kind. While we aim for high-quality output, we are not liable for damages arising from its use." },
      { h: "Changes", body: "We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms." },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    lede: "How cookies are used on BlankPane.",
    sections: [
      { h: "What cookies are", body: "Cookies are small text files stored by your browser to remember preferences and enable features." },
      { h: "Cookies we use", body: "The core tool does not set cookies. Third-party advertising partners may set cookies to measure ad performance and personalize ads where permitted." },
      { h: "Managing cookies", body: "You can block or delete cookies through your browser settings. Blocking advertising cookies will not break the core full-screen tool." },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    lede: "General information and disclaimers about BlankPane.",
    sections: [
      { h: "Educational use", body: "Color images generated here are provided for general informational and utility purposes. They are not a substitute for professional monitor calibration or medical advice." },
      { h: "External links", body: "Pages may contain links to external sites. We are not responsible for the content or practices of those sites." },
      { h: "Accuracy", body: "While we keep the tool current, we make no guarantees about the completeness or accuracy of displayed color values on every device (screen calibration varies)." },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    lede: "Questions, feedback, or a color you'd like to see? Get in touch.",
    sections: [
      { h: "Email", body: "hello@blankpane.com — we reply as soon as we can." },
      { h: "Feature requests", body: "Want a new color, a resolution preset, or a format like JPG/WebP? Tell us and we'll consider it for the next update." },
      { h: "Report an issue", body: "If something isn't working on your device, include your browser and OS so we can fix it faster." },
    ],
  },
];
