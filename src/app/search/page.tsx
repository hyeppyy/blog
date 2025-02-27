import PostList from '@/components/PostList';
import { PostProps } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query?.toLowerCase() || '';
  const allPosts = await getAllPosts();

  const searchResults = allPosts.filter(
    (post: PostProps) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );

  const allTagsSet = new Set<string>();
  searchResults.forEach((post: PostProps) => {
    post.tags.forEach((tag: string) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  return (
    <>
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] text-2xl'>
          <span className='text-[var(--primary)] dark:text-[var(--primary-dark)]'>
            '{resolvedSearchParams.query}'
          </span>
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
