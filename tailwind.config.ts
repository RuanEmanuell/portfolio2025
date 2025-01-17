import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '196': '48rem',
      },
      height: {
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '196': '48rem',
      },
      maxWidth: {
        '8xl': '96rem',
        '9xl': '112rem',
        '10xl': '128rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
