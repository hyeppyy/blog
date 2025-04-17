'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface TagButtonProps {
  tag: string;
}

const TagButton: React.FC<TagButtonProps> = ({ tag }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tags', tag);
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      aria-label='태그 버튼'
      className='px-4 text-sm py-2 rounded-full text-[var(--primary)] dark:text-[var(--primary-dark)] bg-[var(--gray)] dark:bg-[rgba(var(--white-rgb),0.2)]'
    >
      {tag}
    </button>
  );
};

export default TagButton;
