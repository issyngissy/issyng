import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const githubUsername = "issyngissy";
const repositoryName = "issyng";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), react()],
  site: `https://${githubUsername}.github.io`,
  base: `/${repositoryName}`,
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: "monokai", // change this to any Shiki theme
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
