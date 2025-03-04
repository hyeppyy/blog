import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/utils/posts';

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = getAllPosts().map((post) => ({
    url: `https://www.hyeppyy.com/${post.slug}`,
    priority: 1,
  }));

  const routes = ['', '/search'].map((route) => ({
    url: `https://www.hyeppyy.com${route}`,
    priority: 1,
  }));

  return [...routes, ...posts];
};

export default sitemap;
