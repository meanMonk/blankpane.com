import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://blank-screen.pages.dev",
  server: { host: true, port: 3000 },
  build: { format: "directory" },
  integrations: [sitemap()],
});
