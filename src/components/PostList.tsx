'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostBaseProps } from '@/types/post';
import Pagination from './Pagination';
import PostCard from './PostCard';
import TagFilter from './TagFilter';

interface PostListProps {
  allTags: string[];
  allPosts: PostBaseProps[];
}

const PostList: React.FC<PostListProps> = ({ allTags, allPosts }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const selectedTags = useMemo(() => {
    const tagsParam = searchParams.get('tags');
    return tagsParam ? tagsParam.split(',') : [];
  }, [searchParams]);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return allPosts;
    }

    return allPosts.filter((post) =>
      post.tags?.some((tag: string) => selectedTags.includes(tag))
    );
  }, [allPosts, selectedTags]);

  const itemsPerPage = 5;
  const currentPosts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPosts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags]);

  return (
    <div className='pb-[48px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
      <TagFilter tags={allTags} />
      <div className='flex justify-between pb-[16px]'>
        <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
          게시글 ({filteredPosts.length})
        </span>
      </div>
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
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
export default PostList;
