import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

type PostViewType = 'list' | 'card';
interface PostCardProps {
  post: Post;
  options?: PostViewType;
}

const PostCard = ({ post, options = 'list' }: PostCardProps) => (
  <Link className='group' href={`/${post.slug}`}>
    {options === 'list' ? (
      <li className='flex justify-between pt-[32px] pb-[32px] gap-[48px] border-b border-b-[var(--gray-01)] inline-block'>
        <section className='flex flex-col'>
          <span className='text-xl md:text-3xl font-semibold pb-[20px] text-[var(--black)] group-hover:text-[var(--primary)] transition-colors duration-200'>
            {post.title}
          </span>
          <span className='text-sm md:text-md pb-[24px] font-regular text-[var(--gray-02)]'>
            {post.description}
          </span>
          <span className='text-xs md:text-sm font-regular text-[var(--gray-02)]'>
            {post.date}
          </span>
        </section>
        <Image
          src={post.thumbnail || '/images/default-thumbnail.png'}
          alt='썸네일 이미지'
          className='rounded-3xl w-[124px] h-[86px] sm:h-[150px] md:w-[264px]'
          width={264}
          height={150}
        />
      </li>
    ) : (
      <div className='flex flex-col max-h-[350px] min-h-[350px] border rounded-lg shadow-md overflow-hidden transition hover:shadow-lg'>
        <Image
          src={post.thumbnail || '/images/default-thumbnail.png'}
          alt='썸네일 이미지'
          className='w-full h-48 object-cover'
          width={400}
          height={200}
        />
        <div className='p-4'>
          <span className='text-xl font-semibold text-[var(--black)] group-hover:text-[var(--primary)] transition'>
            {post.title}
          </span>
          <p className='text-sm text-gray-500 mt-2'>{post.description}</p>
          <span className='text-xs text-gray-400 block mt-4'>{post.date}</span>
        </div>
      </div>
    )}
  </Link>
);

export default PostCard;
