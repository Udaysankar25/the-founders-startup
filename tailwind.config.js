/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#800080', // 🎯 Custom purple
      },
      borderRadius: {
        xl2: '18px', // 🎯 Custom rounded radius
      },
    },
  },
  plugins: [],
};
