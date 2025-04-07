'use client';

import NextImage from 'next/image';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Callout from './Callout';

interface MDXContentClientProps {
  content: MDXRemoteSerializeResult;
}

const components = {
  Image: (props: React.ComponentProps<typeof NextImage>) => (
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
  Callout,
};

const MDXContentClient = ({ content }: MDXContentClientProps) => (
  <div className='prose max-w-none pt-[64px] dark:prose-invert'>
    <MDXRemote {...content} components={components} />
  </div>
);

export default MDXContentClient;
