import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e4e4e7",
        foreground: "#18181b",
        muted: "#71717a",
        accent: "#dc2626",
      },
      boxShadow: {
        lift: "0 12px 32px rgba(24, 24, 27, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
