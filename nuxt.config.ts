// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || "@nuxt/ui-pro"],
  runtimeConfig: {
    slackWebhookUrl: process.env.NUXT_SLACK_WEBHOOK_URL,
    openAI: process.env.OPENAI_API_KEY,
    plausibleDomain: process.env.NUXT_PLAUSIBLE_DOMAIN,
  },
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxthq/studio",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "@nuxthq/studio",
    "nuxt-jsonld",
    "@nuxt/scripts",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],
  site: {
    url: "https://stakoprichten.nl",
  },
  sitemap: {
    exclude: ["/blog/**"],
  },
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    "components:extend": (components) => {
      const globals = components.filter((c) => ["UButton"].includes(c.pascalName));

      globals.forEach((c) => (c.global = true));
    },
  },
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  colorMode: {
    preference: "light",
    disableTransition: true,
  },
  routeRules: {
    "/api/search.json": { prerender: true },
    "/docs": { redirect: "/docs/getting-started", prerender: false },
  },
  devtools: {
    enabled: true,
  },
  typescript: {
    strict: false,
  },
  features: {
    inlineStyles: false,
  },
  future: {
    compatibilityVersion: 4,
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
});
