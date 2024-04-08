/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          1: "#FFFCF5",
        },
        dark: {
          1: "#473A3F",
          2: "#6B3C4E",
        },
        gold: {
          1: "#EABD4D",
          2: "#CA9B31",
          3: "#9D7318",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
