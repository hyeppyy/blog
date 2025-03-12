import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import {
  PostDataProps,
  PostBaseProps,
  SearchPostProps,
  HeadingProps,
} from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export const getAllPosts = async (): Promise<PostBaseProps[]> => {
  try {
    const postFolders = await fs.promises.readdir(postsDirectory);

    const postsPromises = postFolders.map(async (folderName) => {
      const filePath = path.join(postsDirectory, folderName, 'index.mdx');

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
        thumbnail: data.thumbnail || null,
      };
    });

    const allPostsWithNull = await Promise.all(postsPromises);

    const allPosts = allPostsWithNull.filter(
      (post): post is PostDataProps => post !== null
    );

    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('❌ getAllPosts: 게시물 불러오기 중 오류 발생', error);
    return [];
  }
};

export const getAllPostsForSearch = async (): Promise<SearchPostProps[]> => {
  try {
    const postFolders = await fs.promises.readdir(postsDirectory);

    const postsPromises = postFolders.map(async (folderName) => {
      const filePath = path.join(postsDirectory, folderName, 'index.mdx');

      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = await fs.promises.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: folderName,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        thumbnail: data.thumbnail || null,
        rawContent: content,
      };
    });

    const allPostsWithNull = await Promise.all(postsPromises);
    const allPosts = allPostsWithNull.filter(
      (post): post is SearchPostProps => post !== null
    );

    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error(
      '❌ getAllPostsForSearch: 게시물 불러오기 중 오류 발생',
      error
    );
    return [];
  }
};

export const getPost = async (slug: string): Promise<PostDataProps | null> => {
  const postDir = path.join(postsDirectory, slug);
  const filePath = path.join(postDir, 'index.mdx');

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const headings = extractHeadings(content);

    const rehypePrettyCodeOptions: Options = {
      theme: 'material-theme-palenight',
      defaultLang: 'javascript',
      keepBackground: true,
    };

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
      parseFrontmatter: false,
    });

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      tags: data.tags || [],
      content: mdxSource,
      thumbnail: data.thumbnail || null,
      headings,
    };
  } catch (error) {
    console.error(`❌ getPost: 파일 읽기 중 오류 발생 (slug: ${slug})`, error);
    return null;
  }
};

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

//마크다운 텍스트에서 헤딩을 추출하고 ID 생성하는 함수
export const extractHeadings = (mdxContent: string): HeadingProps[] => {
  const headings: HeadingProps[] = [];
  const usedSlugs: { [key: string]: number } = {};

  // 헤딩 패턴 찾기 (1~3 레벨만 추출)
  const headingRegex = /^(#{1,3})\s+(.*?)$/gm;
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    let id = createSlug(text);

    if (!id) {
      id = 'heading';
    }

    // 중복 slug 처리
    if (usedSlugs[id]) {
      usedSlugs[id]++;
      id = `${id}-${usedSlugs[id]}`;
    } else {
      usedSlugs[id] = 1;
    }

    headings.push({ id, text, level });
  }

  return headings;
};
