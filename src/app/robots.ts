import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: 'https://www.hyeppyy.com/sitemap.xml',
  host: 'https://www.hyeppyy.com',
});

export default robots;
