/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,tsx,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F35815',
        transBlack: '#00000078',
        brandGray: '#80808021',
        lightRed: 'hsl(11deg 80% 45% / 13%)'
      }
    },
  },
  plugins: [],
}

