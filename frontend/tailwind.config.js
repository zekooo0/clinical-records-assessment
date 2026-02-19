/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0153ff",
        secondary: "#282eba",
        accent: "#1c1735",
        error: "#ef4444",
        success: "#22c55e",
        warning: "#fbbf24",
      },
    },
  },
  plugins: [],
};
