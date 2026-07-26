import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1c1710",
          light: "#2a2118",
          lighter: "#3a2f22",
        },
        amber: {
          DEFAULT: "#c8860a",
          bright: "#e2a530",
          dim: "#8a5f08",
        },
        canvas: {
          DEFAULT: "#e8d5a3",
          dim: "#a4906b",
          dark: "#8a7a5c",
        },
        rust: {
          DEFAULT: "#a33b2b",
          bright: "#c04a37",
        },
        moss: {
          DEFAULT: "#5a6b45",
          bright: "#748a5a",
        },
        border: "#3a2f22",
        background: "#1c1710",
        foreground: "#e8d5a3",
        destructive: "#a33b2b",
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        stamp: ["'Special Elite'", "monospace"],
        body: ["'Oswald'", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
      },
      letterSpacing: {
        wide2: "0.15em",
        wide3: "0.25em",
      },
    },
  },
  plugins: [animate],
};
