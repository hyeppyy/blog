import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        primary: {
          light: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        background: {
          light: 'var(--white)',
          dark: 'var(--background-dark)',
        },
        text: {
          light: 'var(--black)',
          dark: 'var(--white)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
