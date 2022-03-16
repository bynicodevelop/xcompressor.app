module.exports = {
  content: [
    "./pages/**/*.{vue,html,js}",
    "./components/**/*.{vue,js}",
    "./plugins/**/*.{js,ts}",
    // "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
