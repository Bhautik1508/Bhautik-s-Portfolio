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
        display: ['"DM Sans"', "system-ui", "sans-serif"],
        sans:    ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
