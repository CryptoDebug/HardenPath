import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#070b10",
        panel: "#0e141b",
        field: "#121a23",
        line: "#253241",
        paper: "#d7dde5",
        mint: "#67d8bd",
        amber: "#c8a45f",
        coral: "#c76d63",
        steel: "#8d9aaa"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.24)",
        panel: "0 24px 70px rgba(0, 0, 0, 0.38)"
      }
    }
  },
  plugins: []
};

export default config;
