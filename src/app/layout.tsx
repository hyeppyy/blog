import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: "heyppyy's blog",
  description: "heyppyy's frontend blog project",
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang='ko'>
    <body className={`${pretendard.variable} pt-[72px] font-pretendard`}>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
);

export default RootLayout;
