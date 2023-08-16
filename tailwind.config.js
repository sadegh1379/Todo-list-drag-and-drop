module.exports = {
  content: ["./dist/**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    // app colors
    colors: {
      "light-red": "#FEF4F3",
      "red": "#D4AFB4",
      "dark-red": "#6E1E29",
      "light-pink": "#FFFBF2",
      "pink": "#DECCA4",
      "dark-pink": "#795B19",
      "light-green": "#F4F9F3",
      "green": "#BCD7B6",
      "dark-green": "#286C1A",
      "dark-black": "#3A3A3A",
      "white": '#FFFFFF',
      "transparent": "transparent",
      "gray": {
        100: '#F3E1DF',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
