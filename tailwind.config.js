/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './app/*.{js,jsx,ts,tsx}',
    './app/**/*.{tsx,jsx,ts,js}',
    './app/(**)/*.{js, jsx, ts, tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
}
