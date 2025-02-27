'use client';

import { useEffect } from 'react';
import { X, Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggleButton from './ThemeToggleButton';

interface SidebarProps {
  allTags: string[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ allTags, isOpen, onClose }: SidebarProps) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/?tags=${tag}`);
    onClose();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onClose]);

  return (
    <aside
      className={`
        fixed sm:hidden top-[56px] right-0 h-[calc(100vh-56px)] w-[240px] bg-white dark:bg-[var(--background-dark)] z-50 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:top-0 lg:translate-x-0 lg:h-auto lg:z-auto
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        border-l border-[var(--gray)] dark:border-[var(--gray-03-dark)]
      `}
    >
      <div className='p-4 h-full'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 lg:hidden text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'
        >
          <X size={20} />
        </button>

        <h2 className='text-lg font-medium mb-4 dark:text-[var(--gray-01-dark)]'>
          태그 목록
        </h2>
        <ul
          className='space-y-2 pb-[12px] overflow-y-auto h-[calc(100vh-166px)]'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {allTags.map((tag) => (
            <li key={tag}>
              <button
                onClick={() => handleTagClick(tag)}
                className='w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--gray-01)] hover:dark:bg-[rgba(var(--white-rgb),0.15)] transition-colors'
              >
                <span className='text-[var(--gray-02)] dark:text-[var(--gray-01-dark)]'>
                  {tag}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className='flex items-center justify-center gap-[16px] pt-[6px] w-full border-t border-t-[var(--gray-01)] dark:border-t-[var(--gray-03-dark)]'>
          <ThemeToggleButton />
          <Link
            className='flex items-center justify-center p-[4px] hover:text-[var(--primary)] dark:text-[var(--gray-01-dark)] dark:hover:text-[var(--primary-dark)] transition-all duration-300'
            href='https://github.com/hyeppyy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Github size={20} />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
