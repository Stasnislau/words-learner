/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "text-glow": {
          "0%": {
            textShadow: "0 0 0px #fff",
          },
          "100%": {
            textShadow: "0 0 10px #fff",
          },
        },
        gleam: {
          "0%": { color: "#ff0000" },
          "14%": { color: "#ff7f00" },
          "28%": { color: "#ffff00" },
          "42%": { color: "#00ff00" },
          "57%": { color: "#0000ff" },
          "71%": { color: "#4b0082" },
          "85%": { color: "#9400d3" },
          "100%": { color: "#ff0000" },
        },
      },
    },
    animation: {
      "fade-in-down": "fade-in-down 0.5s ease-out",
      "fade-in-up": "fade-in-up 0.5s ease-out",
      "text-glow": "text-glow 1s ease-out infinite alternate",
      "text-gleam": "gleam 5s ease-out infinite alternate",
    },
  },
  plugins: [],
};
