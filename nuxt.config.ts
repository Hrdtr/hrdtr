// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-03-30',
  experimental: {
    asyncContext: true,
  },

  runtimeConfig: {
    public: {
      app: {
        baseUrl: process.env.NUXT_PUBLIC_APP_BASE_URL,
      },
    },
    // Need to explicitly set defaults to env value here. See: https://github.com/nuxt/nuxt/issues/26149
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
      },
    },
  },

  app: {
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  routeRules: {
    '/': { prerender: true },
  },

  nitro: {
    // See: https://hub.nuxt.com/docs/recipes/pre-rendering
    prerender: {
      routes: ['/blog', '/projects'],
      crawlLinks: true,
    },
    cloudflare: {
      pages: {
        routes: {
          // See: https://hub.nuxt.com/docs/recipes/pre-rendering#cloudflare-100-routes-limit
          exclude: [
            '/blog/*',
            '/projects/*',
          ],
        },
      },
    },
    experimental: {
      openAPI: true,
    },
  },

  modules: [
    '@nuxtjs/seo', // Need to be registered first in order to make content module work properly
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

  content: {
    database: {
      type: 'd1',
      bindingName: 'DB',
    },
  },

  eslint: {
    config: {
      stylistic: true,
      formatters: true,
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
