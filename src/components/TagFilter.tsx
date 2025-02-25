'use client';

import { X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
  selectedTags?: string[];
}

const TagFilter = ({ tags = [] }: TagFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL에서 tags 파라미터 가져오기
  const selectedTags = searchParams.get('tags')?.split(',') || [];

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    const newQueryString =
      newSelectedTags.length > 0 ? `?tags=${newSelectedTags.join(',')}` : '';

    router.push(`${pathname}${newQueryString}`);
  };

  return (
    <div className='hidden sm:flex flex-wrap gap-2 pt-[20px] pb-[40px]'>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`flex py-2 px-4 text-sm rounded-full transition-colors items-center gap-[4px] border-[1px] dark:border-transparent ${
            selectedTags.includes(tag)
              ? 'bg-[rgba(var(--primary-rgb),0.1)] text-[var(--primary)] dark:text-[var(--primary-dark)] font-semibold border-[var(--primary)]'
              : 'bg-[var(--gray)] dark:bg-[rgba(var(--white-rgb),0.15)] text-[var(--black)] dark:text-[var(--black-dark)] border-[var(--gray)] hover:bg-[var(--gray-01)] hover:text-[var(--primary)]'
          }`}
        >
          #{tag}
          <div
            className={`
              transition-all duration-200 ease-in-out
              ${
                selectedTags.includes(tag)
                  ? 'opacity-100 scale-100 ml-1'
                  : 'opacity-0 scale-0 w-0 ml-0'
              }
            `}
          >
            <X size={16} />
          </div>
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
