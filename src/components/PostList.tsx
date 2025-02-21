'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import Pagination from './Pagination';
import PostCard from './PostCard';
import TagFilter from './TagFilter';
import ViewFilter from './ViewFilter';

const PostList = ({
  allTags,
  filteredPosts,
}: {
  allTags: string[];
  filteredPosts: Post[];
}) => {
  const [viewType, setViewType] = useState<'list' | 'card'>('list');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 한 페이지당 보여줄 아이템 수

  // 현재 페이지에 표시될 게시물 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // 3. 페이지 변경 처리 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 현재 페이지 업데이트
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPosts]);

  return (
    <main className='pt-[72px] pb-[48px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
      <TagFilter tags={allTags} />
      <div className='flex justify-between pb-[16px]'>
        <span className='text-[var(--gray-02)]'>
          게시글 ({filteredPosts.length})
        </span>
        <ViewFilter viewType={viewType} setViewType={setViewType} />
      </div>
      <ul
        className={
          viewType === 'card'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[32px] pt-[32px]'
            : ''
        }
      >
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} options={viewType} />
        ))}
      </ul>
      {filteredPosts.length > 5 && (
        <Pagination
          totalItems={filteredPosts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default PostList;
