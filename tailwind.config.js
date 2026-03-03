/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#00A3FF", // Electric Blue
          secondary: "#050505", // Absolute Dark
          card: "#121212", // Clean Greyish Black
          border: "#252525", // Subtle Border
        },
        text: {
          main: "#F8F9FA",
          muted: "#9CA3AF",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}