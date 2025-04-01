import PostList from '@/components/PostList';
import { PostBaseProps } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  const allTagsSet = new Set<string>();

  allPosts.forEach((post: PostBaseProps) => {
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });

  const allTags = Array.from(allTagsSet);

  return allTags.map((tag) => ({
    tags: tag,
  }));
}

const Home = async () => {
  const allPosts = await getAllPosts();

  if (!allPosts || allPosts.length === 0) {
    return <p>데이터를 조회 중입니다..</p>;
  }

  const allTagsSet = new Set<string>();
  allPosts.forEach((post: PostBaseProps) => {
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  return <PostList allTags={allTags} allPosts={allPosts} />;
};

export default Home;
