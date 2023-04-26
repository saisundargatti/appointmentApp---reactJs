/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gradientColorStops: {
        customColor1: '#fbc7d4',
        customColor2: '#9796f0',
      },
    },
  },
  plugins: [],
}
