import PostList from '@/components/PostList';
import { Post } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

const Home = async ({ searchParams }: { searchParams: { tags?: string } }) => {
  const allPosts = await getAllPosts();

  const allTagsSet = new Set<string>();
  allPosts.forEach((post: Post) => {
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  const selectedTags = searchParams.tags ? searchParams.tags.split(',') : [];

  const filteredPosts =
    selectedTags.length === 0
      ? allPosts
      : allPosts.filter((post) =>
          post.tags?.some((tag) => selectedTags.includes(tag))
        );

  return (
    <PostList allTags={allTags} filteredPosts={filteredPosts} showTags={true} />
  );
};

export default Home;
