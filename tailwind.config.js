/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        headerBg: "#333333",
        headerText: "#ffffff",
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(to right, #4f46e5, #7e22ce)",
      },
    },
  },
  plugins: [],
};
