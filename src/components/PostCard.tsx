import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/post';

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => (
  <Link href={`/${post.slug}`}>
    <li className='flex justify-between pt-[20px] pb-[20px] gap-[48px]'>
      <section className='flex flex-col'>
        <span className='text-3xl font-semibold pb-[20px] text-[var(--black)]'>
          {post.title}
        </span>
        <span className='text-md pb-[24px] font-regular text-[var(--gray-02)]'>
          {post.description}
        </span>
        <span className='text-sm font-regular text-[var(--gray-02)]'>
          {post.date}
        </span>
      </section>
      <Image
        src={post.thumbnail || '/images/default-thumbnail.png'} // thumbnail 필드 추가 필요
        alt='썸네일 이미지'
        className='rounded-3xl'
        width={230}
        height={80}
      />
    </li>
  </Link>
);

export default PostCard;
