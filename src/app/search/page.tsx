// app/search/page.tsx
import PostList from '@/components/PostList';
import { Post } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

interface SearchPageProps {
  searchParams: { query?: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = searchParams.query?.toLowerCase() || '';
  const allPosts = await getAllPosts();

  // 검색어로 게시물 필터링
  const searchResults = allPosts.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );

  // 모든 태그 추출
  const allTagsSet = new Set<string>();
  searchResults.forEach((post: Post) => {
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  return (
    <>
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <span className='text-[var(--gray-02)] text-2xl'>
          <span className='text-[var(--primary)]'>'{searchParams.query}'</span>
          에 대한 검색 결과 ({searchResults.length}건)
        </span>
      </div>

      <PostList
        allTags={allTags}
        filteredPosts={searchResults}
        showTags={false}
      />
    </>
  );
};

export default SearchPage;
