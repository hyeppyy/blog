'use client';

import { useRouter } from 'next/navigation';

const TagButton = ({ tag }: { tag: string }) => {
  const router = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('tags', tag);
    router.push(`/?${params.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className='px-4 text-sm py-2 rounded-full text-[var(--primary)] bg-[var(--gray)]'
    >
      {tag}
    </button>
  );
};

export default TagButton;
