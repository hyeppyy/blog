import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export async function getAllPosts() {
  // const fileNames = fs.readdirSync(postsDirectory);
  const postFolders = fs.readdirSync(postsDirectory);
  const allPosts = postFolders
    .filter((folderName) => {
      const filePath = path.join(postsDirectory, folderName, 'index.md');
      return fs.existsSync(filePath);
    })
    .map((folderName) => {
      const filePath = path.join(postsDirectory, folderName, 'index.md');
      const fileContents = fs.readFileSync(filePath, 'utf8');
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

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  const postDir = path.join(postsDirectory, slug);
  const filePath = path.join(postDir, 'index.md');

  const fileContents = await fs.promises.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const contentHtml = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
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
}
