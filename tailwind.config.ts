import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .25s ease-in-out"
      },

      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        }
      },
      colors: {
        inherit: "inherit",
        transparent: "transparent",
        current: "currentColor",
        black: "#080808",
        white: "rgb(255 255 255)"
      }
    }
  }
};
export default config;
