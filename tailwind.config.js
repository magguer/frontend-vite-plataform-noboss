/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobilM': '376px',
      'mobilL': '424px',
      'mobilXL': '555px',
      'tablet': '769px',
      'semilaptop': '900px',
      'laptop': '1023px',
      'laptopL': '1439px'
    },
    extend: {
      colors: {
        'secondarycolor': '#02997d',
        'secondaryhovercolor': '#03a789',

        'textprimary': 'white',
        'textsecondary': '#02997d',
        'textterceary': '#bababa',

        'darksubbgprimary': '#131313',

        'darkbgprimary': '#1a1a1a',
        'darkbgsecondary': '#242424',
        'darkbgunder': '#212121',
        'darkbuttonprimary': '#242424',
        'darkbuttonhoverprimary': '#1c1c1c',
        'darkbuttonringprimary': '#2d2d2d',
        'darkbuttonsecondary': '#1a1a1a',

        'lightbgprimary': '#94a3b8',
        'lightbgsecondary': '#475569',
        'lightbgunder': '#e2e8f0',
        'lightbuttonprimary': '#64748b',
        'lightbuttonhoverprimary': '#475569',
        'lightbuttonhoversecodnary': '#94a3b8',
        'lightbuttonringprimary': '#334155',
        'lightbuttonsecondary': '#94a3b8',
      }

    },
  },
  plugins: [require('tailwind-scrollbar'),]
}