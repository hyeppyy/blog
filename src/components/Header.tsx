'use client';
import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

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
          <span className='p-[4px] hover:text-[var(--primary)] transition-all duration-300 cursor-pointer'>
            portfolio
          </span>
          <Link
            className='p-[4px] hover:text-[var(--primary)] transition-all duration-300'
            href='https://github.com/hyeppyy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Github />
          </Link>
        </div>
      </section>
    </header>
  );
};
export default Header;
