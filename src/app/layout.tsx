import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';
import ThemeProvider from '@/components/ThemeProvider';
import { getAllPosts } from '@/utils/posts';

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
      <body
        className={`${pretendard.variable} font-pretendard overflow-scroll`}
      >
        <ThemeProvider>
          <LayoutClient allTags={allTags}>{children} </LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
