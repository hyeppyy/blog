// src/app/api/posts/route.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function GET() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      content,
      thumbnail: data.thumbnail || null,
    };
  });

  const sortedPosts = allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return NextResponse.json(sortedPosts);
}
