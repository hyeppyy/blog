import Image from 'next/image';
import Link from 'next/link';
import { PostBaseProps } from '@/types/post';

type PostViewType = 'list' | 'card';
interface PostCardProps {
  post: PostBaseProps;
  options?: PostViewType;
}

const PostCard: React.FC<PostCardProps> = ({ post, options = 'list' }) => (
  <Link
    className='group'
    href={`/${post.slug}`}
    aria-label='포스트 상세 페이지로 이동하는 버튼'
  >
    {options === 'list' ? (
      <div className='flex justify-between pt-[24px] md:pt-[32px] pb-[24px] md:pb-[32px] gap-[16px] md:gap-[48px] border-b border-b-[var(--gray-01)] dark:border-b-[var(--gray-03-dark)] inline-block'>
        <section className='w-full flex flex-col'>
          <span className='break-keep break-words text-lg md:text-3xl leading-[2rem] md:leading-[1.5em] font-semibold pb-[20px] dark:text-[var(--gray-dark)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--primary-dark)] transition-colors duration-200'>
            {post.title}
          </span>
          <span className='break-keep break-words text-sm md:text-md leading-[1.5rem] md:leading-[1.4em] pb-[24px] font-regular text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
            {post.description}
          </span>
          <span className='text-xs md:text-sm font-regular text-[var(--gray-02)] dark:text-[var(--gray-02-dark)]'>
            {post.date}
          </span>
        </section>
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt='썸네일 이미지'
            className='rounded-2xl md:rounded-3xl w-[100px] h-[68px] sm:w-[200px] sm:h-[112px] md:w-[264px] md:h-[150px]'
            width={264}
            height={150}
            priority
          />
        )}
      </div>
    ) : (
      <div className='relative flex flex-col min-h-full border rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg dark:bg-[var(--gray-04-dark)] dark:border-transparent'>
        {post.thumbnail && (
          <Image
            src={post.thumbnail}
            alt='썸네일 이미지'
            className='w-full object-cover'
            width={400}
            height={200}
            priority
          />
        )}
        <div className='p-4'>
          <span className='text-2xl leading-[2rem] md:leading-[1.5em] font-semibold dark:text-[var(--black-dark)] dark:text-[var(--gray-dark)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--primary-dark)] transition'>
            {post.title}
          </span>
          <p className='text-sm leading-[1.5rem] md:leading-[1.7em] text-[var(--gray-02)] dark:text-[var(--gray-02-dark)] mt-2'>
            {post.description}
          </p>
          <span className='text-xs text-[var(--gray-02)] dark:text-[var(--gray-02-dark)] block mt-4'>
            {post.date}
          </span>
        </div>
      </div>
    )}
  </Link>
);

export default PostCard;
