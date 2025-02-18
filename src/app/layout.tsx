import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

export const metadata: Metadata = {
  title: "heyppyy's blog",
  description: "heyppyy's frontend blog project",
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko'>
    <body className={`${pretendard.variable} font-pretendard`}>{children}</body>
  </html>
);

export default RootLayout;
