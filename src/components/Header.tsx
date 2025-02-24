'use client';
import React, { useEffect, useState } from 'react';
import { Github, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    // 검색 페이지로 이동
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery(''); // 검색 후 입력창 초기화
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
      className={`z-50 flex items-center pt-[0px] pr-[20px] pb-[0px] pl-[20px] h-[56px] fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-md z-50 transition-shadow ${
        hasScrolled ? 'shadow-md' : ''
      }`}
    >
      <section className='max-w-[1200px] w-full m-0 mx-auto flex items-center justify-between'>
        <div className='relative'>
          <Link href={'/'}>
            <Image
              src='/images/hyeppyLog.png'
              alt='logo'
              width={110}
              height={33}
              priority
            />
          </Link>
        </div>
        <div className='flex gap-[8px]'>
          {/* TODO: 추후 추가 예정 */}
          {/* <span className='p-[4px] hover:text-[var(--primary)] transition-all duration-300 cursor-pointer'>
            portfolio
          </span> */}
          <Link
            className='flex items-center p-[4px] hover:text-[var(--primary)] transition-all duration-300'
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
                className='w-full px-4 py-2 pr-10 rounded-full border-[1.5px] border-[var(--gray-01)] 
                      focus:outline-none focus:border-[var(--primary)] transition-colors
                      text-sm'
              />
              <button
                type='submit'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-03)] 
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
