/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' or 'class'
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
      shadows:{
        titleShadow : '[0px 8px 8px rgba(0, 0, 0, 0.5)]',
      },
    },
  },
  plugins: [],
}

