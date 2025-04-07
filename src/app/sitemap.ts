import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const posts = allPosts.map((post) => ({
    url: `https://www.hyeppyy.com/${post.slug}`,
    priority: 1,
  }));

  const routes = [
    { url: 'https://www.hyeppyy.com/', priority: 0.8 },
    { url: 'https://www.hyeppyy.com/search', priority: 0.5 },
  ];

  return [...routes, ...posts];
}
