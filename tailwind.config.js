/** @type {import('tailwindcss').Config} */
export default {
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
    },
  },
  plugins: [],
}