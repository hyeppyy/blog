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
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              '@screen md': {
                fontSize: '2.5rem',
              },
            },
            h2: {
              fontSize: '1.6rem',
              fontWeight: '600',
              marginBottom: '1rem',
              '@screen md': {
                fontSize: '2rem',
              },
            },
            h3: {
              fontSize: '1.3rem',
              fontWeight: '600',
              '@screen md': {
                fontSize: '1.5rem',
              },
            },
            p: {
              fontSize: '1.1rem',
              fontWeight: '300',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
