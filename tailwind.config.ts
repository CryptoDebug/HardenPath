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
        ink: "#111827",
        panel: "#161b22",
        line: "#2b3340",
        mint: "#5eead4",
        amber: "#f8c66d",
        coral: "#f87171"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
