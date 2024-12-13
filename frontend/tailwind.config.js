/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          100:"#f9fafb",

          600:"#969ba4",  //text
        },
        purple:{
          100:"#eef2ff", //tags
          200:"#e0e7ff",
          500:"#483dcc",  //text
          600:"#5046e4",
        }
      }
    },
  },
  plugins: [],
}

