import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { PostProps } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export const getAllPosts = async (): Promise<PostProps[]> => {
  try {
    const postFolders = await fs.promises.readdir(postsDirectory);

    const postsPromises = postFolders.map(async (folderName) => {
      const filePath = path.join(postsDirectory, folderName, 'index.md');

      const fileExists = await fs.promises
        .access(filePath)
        .then(() => true)
        .catch(() => false);

      if (!fileExists) {
        return null;
      }

      const fileContents = await fs.promises.readFile(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: folderName,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        content: fileContents,
        thumbnail: data.thumbnail || null,
      };
    });

    const allPostsWithNull = await Promise.all(postsPromises);

    const allPosts = allPostsWithNull.filter(
      (post): post is PostProps => post !== null
    );

    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('❌ getAllPosts: 게시물 불러오기 중 오류 발생', error);
    return [];
  }
};

export const getPost = async (slug: string): Promise<PostProps | null> => {
  const postDir = path.join(postsDirectory, slug);
  const filePath = path.join(postDir, 'index.md');

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const rehypePrettyCodeOptions: Options = {
      theme: 'material-theme-palenight',
      defaultLang: 'javascript',
      keepBackground: true,
    };

    const contentHtml = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypePrettyCode, rehypePrettyCodeOptions)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content)
      .then((file) => String(file));

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      content: contentHtml,
      thumbnail: data.thumbnail || null,
    };
  } catch (error) {
    console.error(`❌ getPost: 파일 읽기 중 오류 발생 (slug: ${slug})`, error);
    return null;
  }
};
