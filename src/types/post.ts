import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface HeadingProps {
  id: string;
  text: string;
  level: number;
}

export interface PostContentsProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string | null;
}

export interface PostDataProps extends PostContentsProps {
  content: MDXRemoteSerializeResult;
  headings: HeadingProps[];
}
