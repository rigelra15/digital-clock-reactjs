/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jersey: ["Jersey10", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      }
    },
  },
  plugins: [],
}