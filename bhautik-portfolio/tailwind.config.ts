import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream:        "#F5F0EB",
        "cream-dark": "#EDE8E1",
        sage:         "#3B6B4F",
        "sage-light": "#E8F0EB",
        ink:          "#1A1A1A",
        secondary:    "#6B6560",
        muted:        "#9B9590",
        border:       "#DDD8D2",
        surface:      "#FFFFFF",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        sans:    ['"DM Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
