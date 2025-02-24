import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import LayoutClient from '@/components/LayoutClient';
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
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} font-pretendard`}>
        <LayoutClient allTags={allTags}>{children} </LayoutClient>
      </body>
    </html>
  );
};

export default RootLayout;
