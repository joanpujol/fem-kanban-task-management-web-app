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
        main: 'rgba(var(--main), 1)',
        red: 'var(--red)',
        'red-hover': 'var(--red-hover)',
        'hover-primary': 'var(--hover-primary)',
        'hover-secondary': 'rgba(var(--hover-secondary))',
        'medium-gray': 'rgba(var(--medium-gray), 1)',
        'new-column-color': 'rgba(var(--new-column-color), 1)',
        'background-soft': 'var(--background-soft)',
        'background-pure': 'var(--background-pure)',
        'background-secondary': 'var(--background-secondary)',
        'contrast-pure': 'rgba(var(--contrast-pure), 1)',
        'secondary-button-color': 'rgba(var(--secondary-button-color))',
        'secondary-button-hover': 'rgba(var(--secondary-button-hover))',
        'border-primary': 'var(--border-primary)',
        subheader: 'var(--subheader)',
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
