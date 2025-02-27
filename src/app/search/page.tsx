import PostList from '@/components/PostList';
import { PostProps } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query?.toLowerCase() || '';
  const allPosts = await getAllPosts();

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
    (post: PostProps) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  );

  const allTags = [
    ...new Set(searchResults.flatMap((post) => post.tags || [])),
  ];

  if (searchResults.length === 0) {
    return (
      <div className='pt-[32px] pb-[40px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <p>'{resolvedParams.query}'에 대한 검색 결과가 없습니다.</p>
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
      <PostList
        allTags={allTags}
        filteredPosts={searchResults}
        showTags={false}
      />
    </>
  );
};

export default SearchPage;
