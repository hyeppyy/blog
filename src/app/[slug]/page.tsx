import Image from 'next/image';
import Link from 'next/link';
import ContentsNav from '@/components/ContentsNav';
import Giscus from '@/components/Giscus';
import TagButton from '@/components/TagButton';
import extractTableOfContents from '@/utils/contents';
import { getPost } from '@/utils/posts';

const DetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const toc = await extractTableOfContents(post.content);

  const flattenedHeadings = toc.flatMap((item) => {
    const result = [item];
    if (item.children) {
      result.push(...item.children);

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
      <div className='flex flex-col pt-[64px] pb-[20px] w-full lg:w-[1200px] max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[180px]'>
        <span className='text-4xl md:text-5xl leading-[2.8rem] md:leading-[4rem] font-semibold pb-[48px] text-[var(--black)] dark:text-[var(--gray-dark)]'>
          {post.title}
        </span>
        <span className='pb-[12px] text-[var(--gray-02)] dark:text-[var(--gray-02-dark)]'>
          {post.date}
        </span>
        <div className='flex pb-[48px] gap-[12px]'>
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
            />
          </figure>
        )}
        <div
          className='prose max-w-none pt-[64px] dark:prose-invert'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className='w-full flex justify-end mt-[32px]'>
          <Link href='/'>
            <button className='text-sm w-fit px-[12px] py-[8px] rounded-lg border border-[var(--gray-02)] dark:border-[var(--gray-03-dark)] text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'>
              목록으로
            </button>
          </Link>
        </div>
        <Giscus />
      </div>
      <ContentsNav
        headings={flattenedHeadings}
        className='fixed max-w-[300px] min-w-[230px] top-[80px] right-[20px] z-10 hidden xl:block'
      />
    </>
  );
};

export default DetailPage;
