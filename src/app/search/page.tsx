import SearchPostList from '@/components/SearchPostList';
import { getAllPostsForSearch } from '@/utils/posts';

const SearchPage = async () => {
  const allPosts = await getAllPostsForSearch();

  if (!allPosts || allPosts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  return <SearchPostList allPosts={allPosts} />;
};

export default SearchPage;
