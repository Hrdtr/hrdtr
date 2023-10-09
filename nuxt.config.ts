import { cp } from 'fs/promises'
const mergePublicAssets = async () => await cp('public', '.nuxt/content-assets/public', { recursive: true })

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@vueuse/nuxt', 'nuxt-security', '@nuxt/image', '@nuxtjs/google-fonts', 'nuxt-content-assets', '@nuxt/content', '@kevinmarrec/nuxt-pwa', '@nuxtseo/module'],
  nitro: {
    preset: 'vercel',
    // preset: 'vercel-edge',
    moduleSideEffects: ['lucia/polyfill/node'],
    compressPublicAssets: true,
    experimental: {
      openAPI: true,
    },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    ghClientId: process.env.GH_CLIENT_ID,
    ghClientSecret: process.env.GH_CLIENT_SECRET,
  },
  googleFonts: {
    families: {
      'Hanken Grotesk': true,
    },
    display: 'swap',
    useStylesheet: true
  },
  image: {
    dir: '.nuxt/content-assets/public',
    domains: ['github.com', 'upload.wikimedia.org', 'img.shields.io']
  },
  content: {
    highlight: {
      preload: ['go'],
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
    }
  },
  hooks: {
    'build:done': () => {
      mergePublicAssets()
    },
    // Workaround for https://github.com/nuxt/cli/issues/169
    close: () => {
      if (!process.env.CI) return
      process.exit(0)
    }
  },
  pwa: {
    workbox: {
      enabled: true
    }
  },
  site: {
    url: 'https://www.hrdtr.dev',
    name: 'Herdi Tr.',
    description: 'Software engineer with a deep love for crafting elegant and efficient solutions',
    defaultLocale: 'en',
    identity: {
      type: 'Person'
    },
    twitter: '@hrdtr_',
    trailingSlash: true,
  },
  linkChecker: {
    /* https://github.com/harlan-zw/nuxt-link-checker/issues/18 */
    failOnError: false,
  },
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'img-src': ["'self'", 'https:', 'data:'],
      }
    }
  }
});
