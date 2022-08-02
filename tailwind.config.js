/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#fd7300',
        'secondary-orange': '#FF4D01',
        'dark-primary-gray': '#23272E',
        'dark-brown': '#32201D'
      },
      spacing: {
        's-size': '0.8rem',
        'm-size': '1rem',
        'l-size': '1.5rem',
        'xl-size': '2.5rem'
      },
      fontFamily: {
        'display': ['Ubuntu', 'Open Sans', 'Roboto', 'sans-serif'],
        'body': ['Open Sans', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
