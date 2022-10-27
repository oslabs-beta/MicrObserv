/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
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
