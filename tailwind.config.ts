import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          start: "rgb(var(--background-start-rgb))",
          end: "rgb(var(--background-end-rgb))",
        },
        foreground: "rgb(var(--foreground-rgb))",
        accent: {
          purple: "rgb(var(--accent-purple))",
          purpleLight: "rgb(var(--accent-purple-light))",
        },
      },
    },
  },
  plugins: [],
};
export default config;
