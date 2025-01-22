/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors :{
        blackCoal : '#2E3A42',
        cyan : '#00D2FF',
        snowWhite : '#F9FAFB',
        coldBlue : '#4A90E2',
        darkBlue : '#1A2930',
        lightGray : '#E3E8ED',
      },
    },
  },
  plugins: [],
}

