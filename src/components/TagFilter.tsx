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
      ? selectedTags.filter((t) => t !== tag) // 선택 해제
      : [...selectedTags, tag]; // 새 태그 추가

    const newQueryString =
      newSelectedTags.length > 0 ? `?tags=${newSelectedTags.join(',')}` : '';

    router.push(`${pathname}${newQueryString}`);
  };

  return (
    <div className='flex flex-wrap gap-2 pt-[20px] pb-[40px]'>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`flex py-2 px-4 text-sm rounded-full transition-colors items-center gap-[4px] border-[1px] ${
            selectedTags.includes(tag)
              ? 'bg-[rgba(var(--primary-rgb),0.1)] text-[var(--primary)] font-semibold border-[var(--primary)]'
              : 'bg-[var(--gray)] text-[var(--black)] border-[var(--gray)] hover:bg-[var(--gray-01)] hover:text-[var(--primary)]'
          }`}
        >
          #{tag}
          <X size={16} />
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
