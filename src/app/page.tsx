'use client';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import TagFilter from '@/components/TagFilter';
import { Post } from '@/types/post';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);

      const tags = new Set<string>();
      data.forEach((post: Post) => {
        post.tags.forEach((tag) => tags.add(tag));
      });
      setAllTags(Array.from(tags));
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredPosts = posts.filter((post) =>
    selectedTags.length === 0
      ? true
      : selectedTags.every((tag) => post.tags.includes(tag))
  );

  return (
    <div>
      <main className='pt-[72px] pr-[20px] pb-[20px] pl-[20px] max-w-[1200px] m-0 mx-auto'>
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
        />
        <ul>
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
