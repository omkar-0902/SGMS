/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Vibrant Emerald
          dark: '#064E3B',
          light: '#34D399',
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        // Semantic Theme Colors
        base: 'var(--bg-color)',
        surface: 'var(--card-bg)',
        border: 'var(--border-color)',
        content: {
          main: 'var(--text-main)',
          muted: 'var(--text-muted)',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
