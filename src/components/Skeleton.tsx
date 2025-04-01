'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
}

interface TagSkeletonProps {
  tagsLength: number;
}

// 기본 스켈레톤 컴포넌트
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={`animate-pulse bg-[var(--gray-01-dark)] dark:bg-[var(--gray-03-dark)] ${className || ''}`}
  />
);

// 리스트형 포스트 스켈레톤
export const ListPostSkeleton: React.FC = () => (
  <li className='w-full inline-block py-8 flex justify-between gap-4 sm:gap-6 md:gap-8 border-b border-b-[var(--gray-01)] dark:border-b-[var(--gray-03-dark)]'>
    <section className='mt-[16px] flex flex-col flex-1 min-w-0 w-full'>
      {/* 제목 영역 */}
      <Skeleton className='h-6 w-4/5 mb-4 rounded' />

      {/* 설명 영역 */}
      <Skeleton className='h-4 w-3/5 mb-2 rounded' />
      <Skeleton className='h-4 w-4/5 mb-4 rounded' />

      {/* 날짜 영역 */}
      <Skeleton className='h-4 w-24 rounded' />
    </section>

    {/* 썸네일 영역 */}
    <Skeleton className='rounded-2xl md:rounded-3xl w-[124px] h-[86px] md:w-[264px] md:h-[150px] shrink-0' />
  </li>
);

// 카드형 포스트 스켈레톤
export const CardPostSkeleton: React.FC = () => (
  <li className='relative flex flex-col gap-2'>
    {/* 썸네일 영역 */}
    <Skeleton className='w-full aspect-video rounded-lg mb-2' />

    {/* 태그 영역 */}
    <div className='flex gap-2 mb-1'>
      <Skeleton className='h-6 w-16 rounded-full' />
      <Skeleton className='h-6 w-12 rounded-full' />
    </div>

    {/* 제목 영역 */}
    <Skeleton className='h-6 w-full mb-1' />

    {/* 설명 영역 */}
    <Skeleton className='h-4 w-full mb-1' />
    <Skeleton className='h-4 w-2/3 mb-1' />

    {/* 날짜 영역 */}
    <Skeleton className='h-4 w-24 mt-auto' />
  </li>
);

// 태그 스켈레톤
export const TagSkeleton: React.FC<TagSkeletonProps> = ({ tagsLength }) => (
  <div className='flex flex-wrap gap-[8px] pt-[32px] pb-[64px]'>
    {Array.from({ length: tagsLength }).map((_, index) => (
      <Skeleton key={index} className='h-10 w-16 sm:w-20 rounded-full' />
    ))}
  </div>
);

export default Skeleton;
