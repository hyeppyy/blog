import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: "hyeppyy's blog",
  description: '개인 기술 블로그',
  verification: {
    google: 'OvzGB4zMpuRthBwtQZ4ZbQje4B-myZ7BvFLUWnNLe7E',
  },
  openGraph: {
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '섬네일 이미지',
      },
    ],
  },
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  weight: '100 900',
  variable: '--font-pretendard',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko'>
    <body className={`${pretendard.variable} font-pretendard`}>
      <ThemeProvider>
        <LayoutClient>{children}</LayoutClient>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
