import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

function toRgbValue(hex: string) {
  if (hex.length === 4) hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  const red = Number.parseInt(hex[1]! + hex[2], 16)
  const green = Number.parseInt(hex[3]! + hex[4], 16)
  const blue = Number.parseInt(hex[5]! + hex[6], 16)
  return `${red} ${green} ${blue}`
}

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ...defaultTheme.screens,
      },
      colors: {
        background: {
          'DEFAULT': 'rgb(var(--color-background) / <alpha-value>)',
          'content': 'rgb(var(--color-background-content) / <alpha-value>)',
          'content-muted': 'rgb(var(--color-background-content-muted) / <alpha-value>)',
        },
      },
    },
  },

  plugins: [
    plugin(({ addBase }) => {
      const light: Record<string, string> = {
        'backgroundColor': 'rgb(var(--color-background) / 1)',
        'color': 'rgb(var(--color-background-content) / 1)',
        '--color-background': toRgbValue(colors.neutral[50]),
        '--color-background-content': toRgbValue(colors.neutral[800]),
        '--color-background-content-muted': toRgbValue(colors.neutral[500]),
      }

      const dark: Record<string, string> = {
        'backgroundColor': 'rgb(var(--color-background) / 1)',
        'color': 'rgb(var(--color-background-content) / 1)',
        '--color-background': toRgbValue(colors.black),
        '--color-background-content': toRgbValue(colors.neutral[200]),
        '--color-background-content-muted': toRgbValue(colors.neutral[500]),
      }

      addBase({
        ':root': light,
        '.dark': dark,
      })
    }),

    plugin(({ addUtilities }) => {
      addUtilities({
        '.min-h-dvh': dvh('minHeight'),
        '.h-dvh': dvh('height'),
      })
      function dvh(property: string) {
        return {
          [property]: [
            'calc(100vh - env(safe-area-inset-bottom, 0) - env(safe-area-inset-top, 0))',
            '100dvh',
          ],
          '@supports (-webkit-touch-callout: none)': {
            [property]: ['-webkit-fill-available', '100dvh'],
          },
        }
      }
    }),

    tailwindTypography,
  ],
}
