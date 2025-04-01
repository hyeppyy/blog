import PostList from '@/components/PostList';
import { SearchPostProps } from '@/types/post';
import { getAllPostsForSearch } from '@/utils/posts';

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsForSearch();

  const searchTerms = new Set<string>();
  allPosts.forEach((post: SearchPostProps) => {
    searchTerms.add(post.title.toLowerCase());
    searchTerms.add(post.description.toLowerCase());
    searchTerms.add(post.rawContent.toLowerCase());
  });

  return Array.from(searchTerms).map((term) => ({
    query: term,
  }));
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query?.toLowerCase() || '';
  const allPosts = await getAllPostsForSearch();

  if (!allPosts || allPosts.length === 0) {
    return <p>데이터를 조회중입니다..</p>;
  }

  if (!query) {
    return (
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  const searchResults = allPosts.filter(
    (post: SearchPostProps) =>
      post.title.toLowerCase().includes(query) ||
      post.rawContent.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
  );

  const allTags = [
    ...new Set(searchResults.flatMap((post) => post.tags || [])),
  ];

  if (searchResults.length === 0) {
    return (
      <div className='text-2xl pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <span className='text-[var(--primary)] dark:text-[var(--primary-dark)]'>
          '{resolvedParams.query}'
        </span>
        <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
          에 대한 검색 결과가 없습니다.
        </span>
      </div>
    );
  }

  return (
    <>
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] text-2xl'>
          <span className='text-[var(--primary)] dark:text-[var(--primary-dark)]'>
            '{resolvedParams.query}'
          </span>
          에 대한 검색 결과 ({searchResults.length}건)
        </span>
      </div>
      <PostList allTags={allTags} allPosts={searchResults} />
    </>
  );
};

export default SearchPage;
