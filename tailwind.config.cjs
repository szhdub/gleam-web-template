/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,gleam}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lexend Deca', 'sans-serif']
    }
  },
  plugins: [ // https://tailwindcss.com/docs/plugins#official-plugins
    require('daisyui'), // https://daisyui.com/docs/install/
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: [{
      cyberpunk: {
        ...require("daisyui/src/theming/themes")["[data-theme=cyberpunk]"],
        "base-100": "#F7F7F8",
        "primary": "#48bc25",
        "info": "#5486E8",
        "error": "#FC645F"
      },
    }],
  },


}
