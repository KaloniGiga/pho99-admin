/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       backgroundImage: {
          'mainBackground': "url('/assets/pho99admin/png')",
       },
       colors: {
        primary: '#0B1417',
        secondary: '#457D7E',
        primarylight: '#141B21',
        mainred: '#EC1C24',
      },

    },
  },
  plugins: [],
}