import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContentsNav from '@/components/ContentsNav';
import Giscus from '@/components/Giscus';
import MDXContentClient from '@/components/MDXContentClient';
import TagButton from '@/components/TagButton';
import { getAllPosts, getPost } from '@/utils/posts';

interface ParamsProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "hyeppyy's blog",
      description: '개인 기술 블로그',
    };
  }

  const ogImageUrl = post.thumbnail || '/images/og-image.png';

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const DetailPage = async ({ params }: ParamsProps) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = Number(slug.match(/\d+$/)?.[0]);
  const prevIndex = currentIndex > 1 ? currentIndex - 1 : null;
  const nextIndex = currentIndex + 1;

  const prevPostSlug = prevIndex ? `post-${prevIndex}` : null;
  const nextPostSlug = `post-${nextIndex}`;

  const prevPost = prevPostSlug
    ? await getPost(prevPostSlug).catch(() => null)
    : null;
  const nextPost = await getPost(nextPostSlug).catch(() => null);

  return (
    <>
      <div className='flex flex-col pt-[64px] pb-[20px] w-full lg:w-[1200px] lg:max-w-[1200px] mx-auto px-[20px] sm:px-[20px] lg:px-[200px]'>
        <span className='text-4xl md:text-5xl leading-[2.8rem] md:leading-[4rem] font-semibold pb-[48px] text-[var(--black)] dark:text-[var(--gray-dark)]'>
          {post.title}
        </span>
        <span className='pb-[24px] text-[var(--gray-02)] dark:text-[var(--gray-02-dark)]'>
          {post.date}
        </span>
        <div className='flex pb-[48px] gap-[8px] flex-wrap'>
          {post.tags.map((tag: string) => (
            <TagButton key={tag} tag={tag} />
          ))}
        </div>
        {post.thumbnail && (
          <figure className='relative w-full aspect-[16/9]'>
            <Image
              src={post.thumbnail}
              alt='썸네일 이미지'
              className='rounded-3xl object-cover'
              fill
              priority
            />
          </figure>
        )}
        <MDXContentClient content={post.content} />
        <div className='w-full flex justify-end mt-[32px]'>
          <Link href='/'>
            <button className='text-sm w-fit px-[12px] py-[8px] rounded-lg border border-[var(--gray-01-dark)] dark:border-[var(--gray-03-dark)] text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'>
              목록으로
            </button>
          </Link>
        </div>
        <div className='grid grid-cols-2 mt-[48px] gap-[24px]'>
          {prevPost && (
            <Link href={`/${prevPost.slug}`} className='w-full'>
              <button className='min-h-full flex flex-col gap-[6px] items-start w-full px-[14px] py-[16px] rounded-lg border border-[var(--gray-01-dark)] dark:border-[var(--gray-03-dark)] hover:border-[var(--primary)] dark:hover:border-[var(--primary-dark)] transition-all duration-300'>
                <span className='text-sm text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
                  이전
                </span>
                <div className='text-md flex text-left text-[var(--primary)] dark:text-[var(--primary-dark)]'>
                  <span className='mr-1'>{'≪'}</span>
                  <span>{prevPost.title}</span>
                </div>
              </button>
            </Link>
          )}

          {nextPost && (
            <Link href={`/${nextPost.slug}`} className='w-full'>
              <button className='min-h-full flex flex-col gap-[6px] items-end w-full px-[14px] py-[16px] rounded-lg border border-[var(--gray-01-dark)] dark:border-[var(--gray-03-dark)] hover:border-[var(--primary)] dark:hover:border-[var(--primary-dark)] transition-all duration-300'>
                <span className='text-sm text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
                  다음
                </span>
                <div className='text-md min-h-full flex gap-[4px] text-right text-[var(--primary)] dark:text-[var(--primary-dark)]'>
                  <span>{nextPost.title}</span>
                  <span className='ml-1'>{'≫'}</span>
                </div>
              </button>
            </Link>
          )}
        </div>
        <Giscus />
      </div>
      <ContentsNav headings={post.headings} />
    </>
  );
};

export default DetailPage;
