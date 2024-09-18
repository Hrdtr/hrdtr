// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  runtimeConfig: {
    oauth: {
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    domains: [
      'github.com',
      'upload.wikimedia.org',
      'img.shields.io',
    ],
  },
  hub: {
    analytics: true,
    cache: true,
    database: true,
  },
  colorMode: {
    classSuffix: '',
  },
  site: {
    url: 'https://www.hrdtr.dev',
    name: 'Herdi Tr.',
    description: 'Software engineer with a deep love for crafting elegant and efficient solutions',
    defaultLocale: 'en',
    identity: {
      type: 'Person',
    },
    twitter: '@hrdtr_',
    trailingSlash: true,
  },
})
