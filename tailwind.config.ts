import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'rgba(var(--black), 1)',
        'medium-gray': 'rgba(var(--medium-gray), 1)',
        'light-gray': 'var(--light-gray)',
        purple: 'rgba(var(--purple), 1)',
        'purple-hover': 'var(--purple-hover)',
        red: 'var(--red)',
        'red-hover': 'var(--red-hover)',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)'],
      },
      fontSize: {
        xl: '24px',
        lg: '18px',
        md: '15px',
        sm: '13px',
        xs: '12px',
      },
      lineHeight: {
        xl: '30px',
        lg: '23px',
        md: '19px',
        sm: '15px',
      },
      letterSpacing: {
        widest: '2.4px',
      },
      borderRadius: {
        md: '20px',
        lg: '24px',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
};
export default config;
