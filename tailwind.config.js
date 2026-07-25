/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1d1b4b',
          pink: '#e85d75',
          cyan: '#38b6ff',
          yellow: '#f7b731',
          purple: '#9c8dc7',
          bg: '#e5dfd7'
        }
      },
      fontFamily: {
        khmer: ['Kantumruy Pro', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        cursive: ['Kalam', 'cursive']
      }
    },
  },
  plugins: [],
}
