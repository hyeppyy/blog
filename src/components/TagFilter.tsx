'use client';

import { useRouter, usePathname } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
}

const TagFilter = ({ tags, selectedTags }: TagFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (newSelectedTags.length > 0) {
      router.push(`${pathname}?tags=${newSelectedTags.join(',')}`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <div className='flex flex-wrap gap-2 pt-[20px] pb-[40px]'>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-4 text-sm py-2 rounded-full transition-colors ${
            selectedTags.includes(tag)
              ? 'bg-[var(--primary)] text-[var(--white)]'
              : 'bg-[var(--gray)] text-[var(--gray-02)] hover:bg-gray-200 hover:text-[var(--primary)]'
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
