import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This covers everything in your src folder
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          400: "#34d399",
          500: "#10b981",
        },
      },
    },
  },
  plugins: [],
};
export default config;