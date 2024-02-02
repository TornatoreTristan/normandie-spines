import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

// https://astro.build/config
// import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
  }),
  // adapter: node({
  //   mode: "standalone",
  // }),
  integrations: [vue()],
});
