/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'school-blue': '#004AAD',
        'school-orange': '#F97316',
      },
    },
  },
  plugins: [],
}

