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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'medium-gray': 'var(--medium-gray)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)'],
      },
      fontSize: {
        'xl': '24px',
        'lg': '18px',
        'md': '15px',
        'sm': '13px',
        'xs': '12px',
      },
      lineHeight: {
        'xl': '30px',
        'lg': '23px',
        'md': '19px',
        'sm': '15px',
      },
      letterSpacing: {
        'widest': '2.4px',
      },
    },
  },
  plugins: [],
};
export default config;
