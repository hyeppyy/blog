'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PostBaseProps } from '@/types/post';
import Pagination from './Pagination';
import PostCard from './PostCard';
import TagFilter from './TagFilter';

interface PostListProps {
  allTags: string[];
  allPosts: PostBaseProps[];
}

const PostList: React.FC<PostListProps> = ({ allTags, allPosts }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isValidating, setIsValidating] = useState(true);

  const pageParam = searchParams.get('page');
  const currentPage = Number(pageParam || '1');
  const itemsPerPage = 5;

  const selectedTags = searchParams.getAll('tag');

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return allPosts;
    }

    return allPosts.filter((post) =>
      post.tags?.some((tag: string) => selectedTags.includes(tag))
    );
  }, [allPosts, selectedTags]);

  const currentPosts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // 유효성 검사
  useEffect(() => {
    setIsValidating(true);

    // 1. 유효하지 않은 태그 확인
    if (selectedTags.length > 0) {
      const hasInvalidTags = selectedTags.some((tag) => !allTags.includes(tag));
      if (hasInvalidTags) {
        router.push('/not-found');
        return;
      }
    }

    // 2. 유효하지 않은 페이지 번호 확인
    const maxPage = Math.ceil(filteredPosts.length / itemsPerPage);
    const isInvalidPage =
      isNaN(currentPage) ||
      currentPage < 1 ||
      (currentPage > maxPage && maxPage > 0);

    if (isInvalidPage && pageParam !== null) {
      router.push('/not-found');
      return;
    }

    setIsValidating(false);
  }, [
    selectedTags,
    allTags,
    currentPage,
    filteredPosts.length,
    itemsPerPage,
    router,
    pageParam,
  ]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isValidating) {
    return null;
  }

  return (
    <div className='pb-[48px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
      <TagFilter tags={allTags} />
      <span className='md:pb-[24px] text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
        게시글 ({filteredPosts.length})
      </span>
      {filteredPosts.length > 0 ? (
        <ul>
          {currentPosts.map((post) => (
            <PostCard key={post.slug} post={post} options={'list'} />
          ))}
        </ul>
      ) : (
        <span className='flex justify-center py-[64px] w-full dark:text-[var(--gray-01-dark)]'>
          등록된 게시글이 없습니다.
        </span>
      )}
      {filteredPosts.length > 5 && (
        <Pagination
          totalItems={filteredPosts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default PostList;
