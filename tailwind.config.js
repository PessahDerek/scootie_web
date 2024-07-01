/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#F4F4F8',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#F4F4F4',
          600: '#DBDBDB',
          700: '#C2C2C2',
          800: '#A9A9A9',
          900: '#909090',
          950: '#848484'
        },
        'accent': {
          DEFAULT: '#FA4B05',
          50: '#FECDB9',
          100: '#FDBEA5',
          200: '#FCA17D',
          300: '#FC8555',
          400: '#FB682D',
          500: '#FA4B05',
          600: '#C33B04',
          700: '#8C2A03',
          800: '#551A02',
          900: '#1E0901',
          950: '#020100'
        },
      }
    },
  },
  plugins: [],
}

