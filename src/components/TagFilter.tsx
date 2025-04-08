import { X } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface TagFilterProps {
  tags: string[];
}

const TagFilter: React.FC<TagFilterProps> = ({ tags = [] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTags = searchParams.getAll('tag');

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedTags.includes(tag)) {
      params.delete('tag');

      selectedTags.forEach((selectedTag) => {
        if (selectedTag !== tag) {
          params.append('tag', selectedTag);
        }
      });
    } else {
      params.append('tag', tag);
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='flex flex-wrap gap-[8px] pt-[16px] md:pt-[32px] pb-[24px] md:pb-[64px]'>
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
