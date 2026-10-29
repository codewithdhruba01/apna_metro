/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', '-apple-system', 'BlinkMacSystemFont', 'Roboto', '"Helvetica Neue"', 'sans-serif'],
      },
      colors: {
        metro: {
          blue: '#1E40AF',
          yellow: '#EAB308',
          red: '#DC2626',
          green: '#16A34A',
          violet: '#7C3AED',
          pink: '#EC4899',
          magenta: '#BE185D',
          orange: '#EA580C',
          purple: '#9333EA',
          cyan: '#06B6D4',
          gray: '#4B5563',
          airport: '#D97706',
          rapid: '#2563EB',
          aqua: '#0D9488',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-primary': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

