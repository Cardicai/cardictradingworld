
import type { Config } from 'tailwindcss'
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cardic: {
          blue: '#0ea5e9',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(56,189,248,0.35), 0 0 60px rgba(139,92,246,0.25)'
      },
      backgroundImage: {
        nebula: 'radial-gradient(closest-side, rgba(56,189,248,0.12), transparent 60%), radial-gradient(farthest-side, rgba(139,92,246,0.10), transparent 60%)'
      }
    },
  },
  plugins: [],
} satisfies Config
