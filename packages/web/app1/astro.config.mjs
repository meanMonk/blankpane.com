import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://blankpane.com",
  server: { host: true, port: 3000 },
  build: { format: "directory" },
  integrations: [
    sitemap({
      serialize(item) {
        let priority = 0.5;
        let changefreq = "monthly";

        if (item.url === "https://blankpane.com/") {
          priority = 1.0;
          changefreq = "weekly";
        } else if (item.url.includes("/tools/")) {
          priority = 0.8;
          changefreq = "weekly";
        } else if (item.url.includes("/blog/")) {
          priority = 0.7;
          changefreq = "monthly";
        } else if (item.url.includes("/colors/")) {
          priority = 0.7;
          changefreq = "monthly";
        } else if (/\/white-screen\/|\/black-screen\/|\/green-screen\/|\/blue-screen\/|\/red-screen\/|\/pink-screen\/|\/yellow-screen\/|\/gray-screen\/|\/purple-screen\/|\/orange-screen\/|\/blank-screen\/|\/zoom-background-screen\//.test(item.url)) {
          priority = 0.9;
          changefreq = "monthly";
        }

        return {
          ...item,
          lastmod: "2026-03-13T00:00:00.000Z",
          changefreq,
          priority,
        };
      },
    }),
  ],
});
