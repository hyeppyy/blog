'use client';

import NextImage from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXContentClientProps {
  content: MDXRemoteSerializeResult;
}

const components = {
  Image: (props: any) => (
    <NextImage
      {...props}
      style={{
        width: 'auto',
        height: 'auto',
      }}
      alt={props.alt || ''}
      unoptimized
    />
  ),
};

const MDXContentClient = ({ content }: MDXContentClientProps) => (
  <div className='prose max-w-none pt-[64px] dark:prose-invert'>
    <MDXRemote {...content} components={components} />
  </div>
);

export default MDXContentClient;
