/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins, sans-serif'],
      inter: ['Inter', 'sans-serif'],

    },
    extend: {
      gridTemplateColumns: {
        31: "repeat(31, minmax(0, 1fr))",
      },
      // animation: {
      //   'spin-slow': 'spin 8s linear infinite',
      // },
      // animation: {
      //   'spin-slow': 'spin 4s linear infinite',
      // },
      // animation: {
      //   'spin-slow': 'spin 6s linear infinite',
      // },
    },
  },
  plugins: [],
}