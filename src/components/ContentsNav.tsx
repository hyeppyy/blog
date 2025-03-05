'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface HeadingProps {
  id: string;
  text: string;
  level: number;
}

interface ContentsNavProps {
  html: string;
}

// HTML 문자열에서 헤딩 추출
const extractHeadingsFromHtml = (html: string): HeadingProps[] => {
  const headings: HeadingProps[] = [];

  // h1-h6 태그를 찾는 정규식
  const headingRegex = /<h([1-6])[^>]*id=["']([^"']+)["'][^>]*>(.*?)<\/h\1>/g;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, '');

    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
};

const ContentsNav: React.FC<ContentsNavProps> = ({ html }) => {
  const [headings, setHeadings] = useState<HeadingProps[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    if (html) {
      const extractedHeadings = extractHeadingsFromHtml(html);
      setHeadings(extractedHeadings);
    }
  }, [html]);

  useEffect(() => {
    // 스크롤 시 현재 보이는 헤딩 ID 확인하는 함수
    const handleScroll = () => {
      const headingElements = Array.from(
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      ).filter((el) => el.id);

      // 화면에 보이는 헤딩 찾기
      const visibleHeadings = headingElements.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight / 2;
      });

      // 가장 위에 있는 헤딩 선택
      const topHeading = visibleHeadings[0];
      if (topHeading) {
        setActiveId(topHeading.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const currentScrollPos = window.scrollY;

      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + currentScrollPos;

      const headerHeight = 56;

      const additionalMargin = 24;

      window.scrollTo({
        top: absoluteTop - headerHeight - additionalMargin,
        behavior: 'smooth',
      });

      setActiveId(id);
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

          return (
            <li
              key={index}
              style={{ paddingLeft: `${indentPixels}px` }}
              className='transition-colors duration-200'
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full ${
                  activeId === heading.id
                    ? 'text-[var(--primary)] dark:text-[var(--primary-dark)] font-semibold'
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
    <nav className='w-[200px] fixed top-[120px] right-[20px] max-h-[calc(100vh-8rem)] overflow-y-auto p-4 rounded-lg hidden xl:block'>
      <h2 className='text-lg font-semibold mb-4 dark:text-[var(--white)]'>
        목차
      </h2>
      {renderNavItems()}
    </nav>
  );
};

export default ContentsNav;
