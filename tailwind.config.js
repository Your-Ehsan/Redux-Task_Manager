/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar-hide")],
};
