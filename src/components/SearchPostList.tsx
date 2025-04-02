'use client';

import { useSearchParams } from 'next/navigation';
import { SearchPostProps } from '@/types/post';
import PostList from './PostList';

const SearchPostList = ({ allPosts }: { allPosts: SearchPostProps[] }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';

  const searchResults = allPosts.filter(
    (post: SearchPostProps) =>
      post.title.toLowerCase().includes(query) ||
      post.rawContent.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
  );

  const allTags = [
    ...new Set(searchResults.flatMap((post) => post.tags || [])),
  ];

  if (searchResults.length === 0 && query) {
    return (
      <div className='text-2xl pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <span className='text-[var(--primary)] dark:text-[var(--primary-dark)]'>
          '{query}'
        </span>
        <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
          에 대한 검색 결과가 없습니다.
        </span>
      </div>
    );
  }

  if (!query) {
    return (
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  return (
    <>
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] text-2xl'>
          <span className='text-[var(--primary)] dark:text-[var(--primary-dark)]'>
            '{query}'
          </span>
          에 대한 검색 결과 ({searchResults.length}건)
        </span>
      </div>
      <PostList allTags={allTags} allPosts={searchResults} />
    </>
  );
};

export default SearchPostList;
