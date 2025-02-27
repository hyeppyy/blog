'use client';

import { useEffect, useState } from 'react';
import { PostProps } from '@/types/post';
import Pagination from './Pagination';
import PostCard from './PostCard';
import TagFilter from './TagFilter';
import ViewFilter from './ViewFilter';

const PostList = ({
  allTags,
  filteredPosts,
  showTags,
}: {
  allTags: string[];
  filteredPosts: PostProps[];
  showTags: boolean;
}) => {
  const [viewType, setViewType] = useState<'list' | 'card'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPosts]);

  return (
    <div className='pb-[48px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
      {showTags && <TagFilter tags={allTags} />}
      {showTags && (
        <div className='flex justify-between pb-[16px]'>
          <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
            게시글 ({filteredPosts.length})
          </span>
          <ViewFilter viewType={viewType} setViewType={setViewType} />
        </div>
      )}
      {filteredPosts.length > 0 ? (
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
