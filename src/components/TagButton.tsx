'use client';

import { useRouter } from 'next/navigation';

interface TagButtonProps {
  tag: string;
}

const TagButton: React.FC<TagButtonProps> = ({ tag }) => {
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('tags', tag);
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className='px-4 text-sm py-2 rounded-full text-[var(--primary)] dark:text-[var(--primary-dark)] bg-[var(--gray)] dark:bg-[rgba(var(--white-rgb),0.2)]'
    >
      {tag}
    </button>
  );
};

export default TagButton;
