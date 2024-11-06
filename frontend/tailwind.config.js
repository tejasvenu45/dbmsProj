/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f1f4e', // Dark blue/purple
        accentPink: '#d9528c', // Pink
        accentBlue: '#52a8dc', // Blue
        white: '#ffffff',
        black: '#000000',
      },
      
    },
  },
  plugins: [],
}