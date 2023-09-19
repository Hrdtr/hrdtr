// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: "vercel-edge",
    moduleSideEffects: ["lucia/polyfill/node"],
    experimental: {
      openAPI: true,
    },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    ghClientId: process.env.GH_CLIENT_ID,
    ghClientSecret: process.env.GH_CLIENT_SECRET,
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
});
