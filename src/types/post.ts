import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export interface HeadingProps {
  id: string;
  text: string;
  level: number;
}

export interface PostBaseProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail: string | null;
}

// 상세 페이지용
export interface PostDataProps extends PostBaseProps {
  content: MDXRemoteSerializeResult;
  headings: HeadingProps[];
}

// 검색용
export interface SearchPostProps extends PostBaseProps {
  rawContent: string;
}
