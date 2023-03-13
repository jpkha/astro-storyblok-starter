import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import { loadEnv } from "vite";
const { PUBLIC_ENV, STORYBLOK_TOKEN_ACCESS} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  output: PUBLIC_ENV === 'preview' ? 'server' : 'static',
  adapter: PUBLIC_ENV === 'preview' ? netlify() : undefined,
  integrations: [
    storyblok({
      accessToken: STORYBLOK_TOKEN_ACCESS,
      bridge: PUBLIC_ENV !== 'production',
      components: {
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        teaser: "storyblok/Teaser",
      },
    }),
    tailwind(),
  ],
  vite: {
    server: {
      https: true,
    },
    plugins: [basicSsl()],
  },
});
