import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='text-center pr-[20px] pl-[20px] pt-[48px] pb-[52px] w-full dark:bg-[var(--background-dark)]'>
      <span className='text-sm font-light max-w-[1200px] w-full dark:text-[var(--gray-01-dark)]'>
        © {currentYear} hyeppyy. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
