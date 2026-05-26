/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A12",
        panel: "#101522",
        line: "#222A3A",
        mint: "#43E6A4",
        coral: "#FF7A64",
        gold: "#FFD166"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(67, 230, 164, 0.14)"
      }
    },
  },
  plugins: [],
};
