/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#111110",
        ink: "#3D3D3A",
        muted: "#6B7280",
        border: "#E5E4E0",
        surface: "#F9F8F6",
        accent: "#2D6A4F",
        "accent-light": "#EAF3EE",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
