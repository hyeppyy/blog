'use client';

import React, { useEffect, useState } from 'react';

interface TocItemSimple {
  id: string;
  text: string;
  level: number;
}

interface SimpleTocProps {
  headings: TocItemSimple[];
  className?: string;
}

const ContentsNav = ({ headings, className = '' }: SimpleTocProps) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    // IntersectionObserver로 화면에 보이는 헤딩을 감지
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length) setActiveId(visibleHeadings[0]);
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    elements.forEach((el) => el && observer.observe(el));

    return () => elements.forEach((el) => el && observer.unobserve(el));
  }, [headings]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  if (!headings.length) return null;

  return (
    <nav className={`px-[20px] rounded-lg  ${className}`}>
      <h2 className='text-base font-semibold mb-3 text-[var(--black)]'>목차</h2>
      <ul className='space-y-1 text-sm'>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <a
              href={`${heading.id}`}
              onClick={handleClick(heading.id)}
              className={`block py-1 transition-colors 
                ${activeId === heading.id ? 'text-[var(--primary)] font-medium' : 'text-[var(--gray-02)] hover:text-[var(--black)] hover:font-semibold '}
                ${heading.level > 1 ? 'text-[0.9em]' : 'font-medium'}
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ContentsNav;
