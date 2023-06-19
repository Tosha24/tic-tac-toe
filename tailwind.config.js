/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyColor: "#1a202c",
      },
      fontFamily:{
        titleFont: ['Cherry Bomb One','cursive'],
        bodyFont: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [],
}

