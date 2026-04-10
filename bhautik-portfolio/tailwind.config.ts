import type { Config } from "tailwindcss";

const config: Config = {
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
        /* Board-game design system */
        "board-base": "#F9F7F3",
        "board-ink": "#1A1A18",
        "board-accent": "#3B6D11",
        "board-border": "#E5E2D9",
        "board-surface": "#FFFFFF",
        "board-muted": "#6B7280",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', '"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
