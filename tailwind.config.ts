import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        light: {
          background: 'var(--white)',
          text: 'var(--black)',
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          gray01: 'var(--gray-01)',
        },
        dark: {
          background: 'var(--background-dark)',
          text: 'var(--white)',
          primary: 'var(--primary-dark)',
          secondary: 'var(--secondary)',
          gray01: 'var(--gray-01)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
