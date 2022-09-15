const { screens } = require('tailwindcss/defaultTheme')

module.exports = {
  // mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cursive: 'Berkshire Swash, cursive',
        sans: 'Raleway, sans-serif;',
        serif: 'Playfair Display, serif'
      }
    },
    screens: {
      xs: '480px',
      ...screens
    }
  },
  plugins: []
}
