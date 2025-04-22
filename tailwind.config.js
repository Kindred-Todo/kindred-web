/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        text: {
          light: '#13121F',
          dark: '#fff',
        },
        header: {
          light: '#13121F',
          dark: '#F9EAFF',
        },
        background: {
          light: '#FFF',
          dark: '#13121F',
        },
        disabled: '#66666633',
        input: '#66666633',
        foreground: {
          light: '#F5f5f5',
          dark: '#171626',
        },
        primary: '#854DFF',
        'primary-pressed': '#2D1E52',
        success: '#5CFF95',
        error: '#FF5C5F',
        warning: '#FFFF5C',
        caption: '#9D9D9D',
        tertiary: {
          light: '#E5E5E5',
          dark: '#1C1B2A',
        },
        'modal-top': '#696969',
        'button-text': '#fff',
      },
    },
  },
  plugins: [],
}
