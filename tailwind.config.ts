import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f172a',
        card: '#111827',
        brand: '#3b82f6'
      },
      boxShadow: {
        soft: '0 20px 50px rgba(0,0,0,0.45)'
      }
    },
  },
  plugins: [],
}
export default config