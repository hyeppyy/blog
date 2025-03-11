'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { HeadingProps } from '@/types/post';

interface ContentsNavProps {
  headings: HeadingProps[];
}

const ContentsNav: React.FC<ContentsNavProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [manualActiveId, setManualActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const headingElements = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ).filter((el) => el.id);

      const visibleHeadings = headingElements.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
      });

      const topHeading = visibleHeadings[0];
      if (topHeading) {
        setActiveId(topHeading.id);
        setManualActiveId(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, isScrolling]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);

      setActiveId(id);
      setManualActiveId(id);

      const currentScrollPos = window.scrollY;
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + currentScrollPos;
      const headerHeight = 56;
      const additionalMargin = 24;

      window.scrollTo({
        top: absoluteTop - headerHeight - additionalMargin,
        behavior: 'smooth',
      });

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  const getMinLevel = (headings: HeadingProps[]): number => {
    if (headings.length === 0) return 1;
    return Math.min(...headings.map((h) => h.level));
  };

  const renderNavItems = () => {
    if (headings.length === 0) return null;

    const minLevel = getMinLevel(headings);

    return (
      <ul className='space-y-2 text-sm'>
        {headings.map((heading, index) => {
          const indentLevel = heading.level - minLevel;
          const indentPixels = indentLevel * 16;

          const isActive =
            manualActiveId === heading.id ||
            (!manualActiveId && activeId === heading.id);

          return (
            <li
              key={index}
              style={{ paddingLeft: `${indentPixels}px` }}
              className='transition-colors duration-200'
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full ${
                  isActive
                    ? 'text-[var(--primary)] dark:text-[var(--primary-dark)]'
                    : 'text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--black)] dark:hover:text-[var(--white)]'
                }`}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className='w-[200px] fixed top-[130px] right-[20px] max-h-[calc(100vh-8rem)] overflow-y-auto p-4 rounded-lg  hidden xl:block'>
      <h2 className='text-lg font-semibold mb-4 dark:text-[var(--white)]'>
        목차
      </h2>
      {renderNavItems()}
    </nav>
  );
};

export default ContentsNav;
