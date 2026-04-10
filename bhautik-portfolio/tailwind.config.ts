import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── New design system ── */
        cream:    "#F7F5F0",
        sage:     "#4A6D5C",
        "sage-light": "#5C8A72",
        "sage-dark":  "#3B5A4A",
        clay:     "#C4956A",
        "clay-light": "#D4AA82",
        charcoal: "#2B2B2B",
        ink:      "#1A1A1A",
        divider:  "#E0DDD5",
        muted:    "#7A7A72",
        surface:  "#FFFFFF",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans:    ['"Inter"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
