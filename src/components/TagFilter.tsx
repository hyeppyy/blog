import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

const TagFilter = ({ tags, selectedTags, onTagClick }: TagFilterProps) => (
  <div className='flex flex-wrap gap-2  pt-[20px] pb-[40px] '>
    {tags.map((tag) => (
      <button
        key={tag}
        onClick={() => onTagClick(tag)}
        className={`px-4 text-sm py-2 rounded-full transition-colors ${
          selectedTags.includes(tag)
            ? 'bg-[var(--primary)] text-[var(--white)]'
            : 'bg-[var(--gray-01)] text-[var(--gray-02)] hover:bg-gray-200 hover:text-[var(--primary)]'
        }`}
      >
        #{tag}
      </button>
    ))}
  </div>
);

export default TagFilter;
