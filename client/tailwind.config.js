/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': '#141415',
        'dark-mid': "#384747"
      },

      height: {
        '10': '10%',
      }
    },
  },
  plugins: [],
}

