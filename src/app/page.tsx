import { LayoutGrid, List } from 'lucide-react';
import PostCard from '@/components/PostCard';
import TagFilter from '@/components/TagFilter';
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

  const filteredPosts = allPosts.filter((post) =>
    selectedTags.length === 0
      ? true
      : selectedTags.every((tag) => post.tags.includes(tag))
  );

  return (
    <div>
      <main className='pt-[72px] pb-[20px] w-full max-w-[1200px] mx-auto px-[20px] sm:px-[20px] md:px-[90px]'>
        <TagFilter tags={allTags} selectedTags={selectedTags} />
        <div className='flex justify-between'>
          <span>posts(11)</span>
          <div className='flex gap-[16px]'>
            <List />
            <LayoutGrid />
          </div>
        </div>
        <ul>
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
