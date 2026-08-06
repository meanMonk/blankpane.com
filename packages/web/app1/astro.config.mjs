import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://blank-screen.pages.dev",
  server: { host: true, port: 3000 },
});
