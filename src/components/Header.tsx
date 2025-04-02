'use client';
import React, { useEffect, useState } from 'react';
import { Github, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || ''
  );
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`z-50 flex items-center pt-[0px] pr-[20px] pb-[0px] pl-[20px] h-[56px] fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md z-50 transition-shadow dark:bg-[var(--background-dark)] ${
        hasScrolled ? 'shadow-md' : ''
      }`}
    >
      <section className='max-w-[1200px] w-full m-0 mx-auto flex items-center justify-between gap-[8px]'>
        <div className='relative'>
          <Link href={'/'}>
            <Image
              src={
                isDarkMode
                  ? '/images/hyeppyLog_dark.png'
                  : '/images/hyeppyLog.png'
              }
              alt='logo'
              className='w-[80px] h-auto md:w-[110px] md:h-[33px]'
              width={110}
              height={33}
              priority
            />
          </Link>
        </div>
        <div className='flex gap-[8px] items-center'>
          {/* TODO: 추후 추가 예정 */}
          {/* <span className='p-[4px] hover:text-[var(--primary)] transition-all duration-300 cursor-pointer'>
            portfolio
          </span> */}
          <ThemeToggleButton className='hidden sm:flex' />
          <Link
            className='hidden sm:flex items-center p-[4px] text-sm text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] hover:dark:text-[var(--primary-dark)] transition-all duration-300'
            href='https://github.com/hyeppyy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Github size={20} />
          </Link>
          <form
            onSubmit={handleSearch}
            className='flex items-center max-w-[240px] w-full ml-auto'
          >
            <div className='relative flex-1'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='제목, 내용'
                className='w-full px-4 py-2 pr-10 dark:bg-transparent rounded-full border-[1.5px] border-[var(--gray-01)] dark:border-[var(--gray-03-dark)] dark:text-[var(--gray-02-dark)]
                      focus:outline-none focus:border-[var(--primary)] dark:focus:border-[var(--primary-dark)] transition-colors
                      text-sm'
              />
              <button
                type='submit'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-03)] dark:text-[var(--gray-02-dark)] 
                      hover:text-[var(--primary)] transition-colors'
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </header>
  );
};
export default Header;
