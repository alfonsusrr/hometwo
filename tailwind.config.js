/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("flowbite/plugin"),
    require('@tailwindcss/forms'),
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#fd7300',
        'secondary-orange': '#FF4D01',
        'pastel-orange':'#ffc3a1',
        'dark-primary-gray': '#23272E',
        'dark-brown': '#32201D',
        'alert': '#FF5D62',
        'secondary-alert': '#ffd4d4',
        'pastel-red': '#ffcfcc',
        'pastel-blue': '#cceaff',
        'pastel-green': '#cdffcc',
        'pastel-yellow': '#fffad4'
      },
      spacing: {
        's-size': '0.8rem',
        'm-size': '1rem',
        'l-size': '1.5rem',
        'xl-size': '2.5rem',
        'header': '4rem',
        'footer': '2rem',
        'sidebar-expand': '15rem',
        'sidebar': '4rem'
      },
      fontFamily: {
        'display': ['Ubuntu', 'Open Sans', 'Roboto', 'sans-serif'],
        'body': ['Open Sans', 'Roboto', 'sans-serif']
      }
    },
  },
}
