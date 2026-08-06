export interface Locale {
  code: string;
  label: string;
  native: string;
  href: string;
}

export const locales: Locale[] = [
  { code: "en", label: "English", native: "English", href: "/" },
  { code: "de", label: "German", native: "Deutsch", href: "/de/" },
  { code: "fr", label: "French", native: "Français", href: "/fr/" },
  { code: "es", label: "Spanish", native: "Español", href: "/es/" },
  { code: "uk", label: "Ukrainian", native: "Українська", href: "/uk/" },
  { code: "pl", label: "Polish", native: "Polski", href: "/pl/" },
  { code: "it", label: "Italian", native: "Italiano", href: "/it/" },
  { code: "tr", label: "Turkish", native: "Türkçe", href: "/tr/" },
  { code: "pt", label: "Portuguese", native: "Português", href: "/pt/" },
  { code: "se", label: "Swedish", native: "Svenska", href: "/se/" },
  { code: "ja", label: "Japanese", native: "日本語", href: "/ja/" },
  { code: "ms", label: "Malay", native: "Melayu", href: "/ms/" },
  { code: "ko", label: "Korean", native: "한국어", href: "/ko/" },
];

export interface ColorPageStrings {
  metaTitle: string;
  h1: string;
  intro: string;
  whyTitle: string;
  uses: { title: string; body: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  linksTitle: string;
}

export interface UI {
  brandA: string;
  brandB: string;
  eyebrow: string;
  heroTitle: string;
  heroLede: string;
  customColor: string;
  goFullScreen: string;
  downloadPng: string;
  hint: string;
  sizePreset: string;
  presetFHD: string;
  preset4K: string;
  presetSquare: string;
  presetStory: string;
  presetA4: string;
  presetCustom: string;
  customSize: string;
  width: string;
  height: string;
  px: string;
  popularTitle: string;
  popularLede: string;
  usesTitle: string;
  uses: { title: string; body: string }[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  footerNote: string;
  exitHint: string;
  previewLabel: string;
  openFull: string;
  navColors: string;
  navBlog: string;
  footerAbout: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  footerDisclaimer: string;
  footerContact: string;
  langLabel: string;
  colorName: Record<string, string>;
  colorPage: (c: { name: string; hex: string; intent: string }) => ColorPageStrings;
  contact: {
    title: string;
    lede: string;
    emailLabel: string;
  };
}
