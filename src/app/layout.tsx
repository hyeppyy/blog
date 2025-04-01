import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';
import ThemeProvider from '@/components/ThemeProvider';
import { getAllPosts } from '@/utils/posts';

export const dynamic = 'force-static';

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
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const allPosts = await getAllPosts();

  const allTagsSet = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag: string) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} font-pretendard`}>
        <ThemeProvider>
          <LayoutClient allTags={allTags}>{children} </LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
