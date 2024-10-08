// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  runtimeConfig: {
    // Need to explicitly set defaults to env value here. See: https://github.com/nuxt/nuxt/issues/26149
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
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
  // @nuxtjs/seo
  ogImage: {
    enabled: false,
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
  sitemap: {
    sitemaps: {
      pages: {
        includeAppSources: true,
      },
      blog: {
        sources: [
          '/api/__sitemap__/urls/blog',
        ],
      },
      projects: {
        sources: [
          '/api/__sitemap__/urls/projects',
        ],
      },
    },
  },
})
