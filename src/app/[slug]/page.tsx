import Image from 'next/image';
import Link from 'next/link';
import ContentsNav from '@/components/ContentsNav';
import Giscus from '@/components/Giscus';
import extractTableOfContents from '@/utils/contents';
import { getPost } from '@/utils/posts';

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const toc = await extractTableOfContents(post.content);

  // 계층 구조를 평면 배열로 변환
  const flattenedHeadings = toc.flatMap((item) => {
    const result = [item];
    if (item.children) {
      result.push(...item.children);

      // 3단계 헤딩이 있는 경우
      item.children.forEach((child) => {
        if (child.children) {
          result.push(...child.children);
        }
      });
    }
    return result;
  });

  if (!post) {
    return <div>포스트를 찾을 수 없습니다</div>;
  }

  return (
    <>
      <main className='flex flex-col pb-[20px] w-full lg:w-[1200px] max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[180px]'>
        <span className='text-5xl font-semibold pb-[48px] text-[var(--black)]'>
          {post.title}
        </span>
        <span className='pb-[12px] text-[var(--gray-02)]'>{post.date}</span>
        <div className='flex pb-[48px] gap-[12px]'>
          {post.tags.map((tag: any) => (
            <button
              key={tag}
              className=' px-4 text-sm py-2 rounded-full text-[var(--primary)] bg-[var(--gray)]'
            >
              {tag}
            </button>
          ))}
        </div>
        {post.thumbnail && (
          <div className='relative w-full h-[300px] sm:h-[300px] md:h-[400px]'>
            <Image
              src={post.thumbnail}
              alt='썸네일 이미지'
              className='rounded-3xl object-cover'
              fill
            />
          </div>
        )}
        <div
          className='prose max-w-none pt-[64px] dark:prose-invert'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className='w-full flex justify-end mt-[32px]'>
          <Link href='/'>
            <button className='w-fit px-[12px] py-[8px] rounded-lg border border-[var(--gray-02)] text-[var(--gray-02)] hover:text-[var(--primary)]'>
              목록으로
            </button>
          </Link>
        </div>
        <Giscus />
      </main>
      <ContentsNav
        headings={flattenedHeadings}
        className='fixed max-w-[300px] min-w-[230px] top-[80px] right-[20px] z-10 hidden xl:block'
      />
    </>
  );
};

export default page;
