import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const posts = allPosts.map((post) => ({
    url: `https://www.hyeppyy.com/${post.slug}`,
    priority: 1,
  }));

  const routes = ['', '/search'].map((route) => ({
    url: `https://www.hyeppyy.com${route}`,
    priority: 1,
  }));

  return [...routes, ...posts];
}
