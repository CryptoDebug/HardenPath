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
        ink: "#0b1118",
        panel: "#121a22",
        field: "#18222b",
        line: "#2a3642",
        paper: "#d9d1bd",
        mint: "#6ee7d8",
        amber: "#f0b35a",
        coral: "#e86f5c",
        steel: "#8fa3b7"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.24)",
        panel: "0 20px 80px rgba(2, 8, 16, 0.34)"
      }
    }
  },
  plugins: []
};

export default config;
