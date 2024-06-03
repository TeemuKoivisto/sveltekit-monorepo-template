import { screens } from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,svelte}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out'
      },
      colors: {
        'primary-lighter': '#eff5ff',
        'primary-light': '#ccdffe',
        primary: '#2979fa',
        'primary-dark': '#9b0936', // dark red
        'primary-darker': '#2161c8',

        secondary: '#f2f7ff',

        'gray-custom': '#f7f9fc'
      },
      fontFamily: {
        cursive: 'Berkshire Swash, cursive',
        sans: 'Raleway, sans-serif',
        serif: 'Playfair Display, serif'
      }
    },
    screens: {
      xs: '480px',
      ...screens
    }
  }
}
