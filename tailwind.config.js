/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e50914", // Netflix Red
        darkBg: "#141414", // Netflix Dark Background
        lightText: "#e5e5e5", // Light Text
      },
    },
  },
  plugins: [require("daisyui")],
};
