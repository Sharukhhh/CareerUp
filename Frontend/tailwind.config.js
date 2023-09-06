/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'mobile' : '375px',
        'tablet' : '768px',
        'laptop' : '1024px',
        'desktop' : '1440px'
      },
    },
  },
  plugins: [

  ]
}

