/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./style/main.css -o ./style/output.css --watch