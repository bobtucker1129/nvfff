import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Warm stone palette — tinted toward green, never pure gray
        stone: {
          50: '#faf9f7',
          100: '#f0eeea',
          200: '#e2ded8',
          300: '#c9c3ba',
          400: '#a8a094',
          500: '#8a8174',
          600: '#6b6359',
          700: '#4a4540',
          800: '#2d2a26',
          900: '#1a1917',
          950: '#121110',
        },
      },
    },
  },
  plugins: [],
}
export default config
