// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'trace', 'error'] }],
    'vue/multi-word-component-names': 'off',
    'nuxt/nuxt-config-keys-order': 'off',
  },
})
