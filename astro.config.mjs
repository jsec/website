import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  site: "https://jsec.online",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: "css-variables", wrap: false },
  },
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
})
