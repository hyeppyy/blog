import PostList from '@/components/PostList';
import { PostBaseProps } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

const Home = async () => {
  const allPosts = await getAllPosts();

  if (!allPosts || allPosts.length === 0) {
    return <p>게시글이 없습니다.</p>;
  }

  const allTagsSet = new Set<string>();
  allPosts.forEach((post: PostBaseProps) => {
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  return <PostList allTags={allTags} allPosts={allPosts} />;
};

export default Home;
