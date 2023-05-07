/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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

        'textlightprimary': '#292929',
        'textlightsecondary': '#02997d',
        'textlightterceary': '#4e4e4e',

        'textdarkprimary': 'white',
        'textdarksecondary': '#02997d',
        'textdarkterceary': '#bababa',


        'lightbgprimary': '#ededed',
        'lightbgsecondary': '#bfbfbf',
        'lightbgunder': '#dfdfdf',
        'lightbuttonprimary': '#bfbfbf',
        'lightbuttonhoverprimary': '#bfbfbf',
        'lightbuttonhoversecodnary': '#94a3b8',
        'lightbuttonringprimary': '#334155',
        'lightbuttonsecondary': '#94a3b8',

        'darksubbgprimary': '#131313',
        'darkbgprimary': '#1a1a1a',
        'darkbgsecondary': '#242424',
        'darkbgunder': '#212121',
        'darkbuttonprimary': '#242424',
        'darkbuttonhoverprimary': '#1c1c1c',
        'darkbuttonringprimary': '#2d2d2d',
        'darkbuttonsecondary': '#1a1a1a',


      }

    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }),]
}