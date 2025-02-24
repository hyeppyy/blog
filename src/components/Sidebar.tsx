'use client';

import { X, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  allTags: string[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ allTags, isOpen, onClose }: SidebarProps) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    // 태그 선택 시 태그 파라미터를 가진 URL로 이동
    router.push(`/?tags=${tag}`);
    // 모바일에서는 사이드바 닫기
    onClose();
  };

  return (
    <aside
      className={`
        fixed sm:hidden top-[56px] right-0 h-[calc(100vh-56px)] w-[240px] bg-white z-50 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:top-0 lg:translate-x-0 lg:h-auto lg:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        border-l border-[var(--gray)]
      `}
    >
      <div className='p-4 h-full'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 lg:hidden text-[var(--gray-02)] hover:text-[var(--primary)]'
        >
          <X size={20} />
        </button>

        <h2 className='text-lg font-bold mb-4'>태그 목록</h2>
        <ul
          className='space-y-2 overflow-y-auto h-[calc(100vh-200px)]'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {allTags.map((tag) => (
            <li key={tag}>
              <button
                onClick={() => handleTagClick(tag)}
                className='w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--gray-01)] transition-colors'
              >
                <span className='text-[var(--gray-02)]'>{tag}</span>
              </button>
            </li>
          ))}
        </ul>
        <Link
          className='flex items-center justify-center p-[4px] pt-[12px] border-t border-t-[var(--gray-01)] hover:text-[var(--primary)] transition-all duration-300'
          href='https://github.com/hyeppyy'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Github size={20} />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
