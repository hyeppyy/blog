import PostList from '@/components/PostList';
import { PostProps } from '@/types/post';
import { getAllPosts } from '@/utils/posts';

type tSearchParams = Promise<{ tags?: string }>;

const Home = async ({ searchParams }: { searchParams: tSearchParams }) => {
  const resolvedSearchParams = await searchParams;
  const allPosts = await getAllPosts();

  const allTagsSet = new Set<string>();
  allPosts.forEach((post: PostProps) => {
    post.tags.forEach((tag) => allTagsSet.add(tag));
  });
  const allTags = Array.from(allTagsSet);

  const selectedTags = resolvedSearchParams.tags
    ? resolvedSearchParams.tags.split(',')
    : [];

  const filteredPosts =
    selectedTags.length === 0
      ? allPosts
      : allPosts.filter((post) =>
          post.tags?.some((tag: string) => selectedTags.includes(tag))
        );

  return (
    <PostList allTags={allTags} filteredPosts={filteredPosts} showTags={true} />
  );
};

export default Home;
