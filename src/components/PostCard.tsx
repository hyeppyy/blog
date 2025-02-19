import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => (
  <Link className='group' href={`/${post.slug}`}>
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
        className='rounded-3xl w-[124px] h-[86px] md:w-[264px] md:h-[150px]'
        width={90}
        height={64}
      />
    </li>
  </Link>
);

export default PostCard;
