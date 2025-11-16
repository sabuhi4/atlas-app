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
        primary: {
          DEFAULT: '#5D9BFC',
          50: '#EEF5FF',
          100: '#DCE9FF',
          200: '#B9D4FF',
          300: '#96BEFF',
          400: '#73A9FF',
          500: '#5D9BFC',
          600: '#4A7CCA',
          700: '#375D97',
          800: '#243E65',
          900: '#121F32',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}