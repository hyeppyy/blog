import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostProps } from '@/types/post';

type PostViewType = 'list' | 'card';
interface PostCardProps {
  post: PostProps;
  options?: PostViewType;
}

const PostCard = ({ post, options = 'list' }: PostCardProps) => (
  <Link className='group' href={`/${post.slug}`}>
    {options === 'list' ? (
      <li className='flex justify-between pt-[32px] pb-[32px] gap-[48px] border-b border-b-[var(--gray-01)] dark:border-b-[var(--gray-03-dark)] inline-block'>
        <section className='flex flex-col'>
          <span className='text-xl md:text-3xl font-semibold pb-[20px] dark:text-[var(--gray-dark)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--primary-dark)] transition-colors duration-200'>
            {post.title}
          </span>
          <span className='text-sm md:text-md pb-[24px] font-regular text-[var(--gray-02)] dark:text-[var(--gray-02-dark)]'>
            {post.description}
          </span>
          <span className='text-xs md:text-sm font-regular text-[var(--gray-02)] dark:text-[var(--gray-02-dark)]'>
            {post.date}
          </span>
        </section>
        <Image
          src={post.thumbnail || '/images/default-thumbnail.png'}
          alt='썸네일 이미지'
          className='rounded-3xl w-[124px] h-[86px] sm:w-[150px] sm:h-[100px] md:w-[264px] md:h-[150px]'
          width={264}
          height={150}
        />
      </li>
    ) : (
      <div className='flex flex-col max-h-[350px] min-h-[350px] border rounded-lg shadow-md overflow-hidden transition hover:shadow-lg dark:bg-[var(--gray-04-dark)] dark:border-transparent'>
        <Image
          src={post.thumbnail || '/images/default-thumbnail.png'}
          alt='썸네일 이미지'
          className='w-full h-48 object-cover'
          width={400}
          height={200}
        />
        <div className='p-4'>
          <span className='text-2xl font-semibold dark:text-[var(--black-dark)] dark:text-[var(--gray-dark)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--primary-dark)] transition'>
            {post.title}
          </span>
          <p className='text-sm text-[var(--gray-02)] dark:text-[var(--gray-02-dark)] mt-2'>
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
