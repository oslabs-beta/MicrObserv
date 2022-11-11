/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: ['luxury'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
  variants: {
    scrollbar: ['rounded']
  },
};
