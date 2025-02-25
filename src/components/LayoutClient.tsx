'use client';

import { useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutClientProps {
  children: React.ReactNode;
  allTags: string[];
}

const LayoutClient = ({ children, allTags }: LayoutClientProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={toggleSidebar}
        />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        allTags={allTags}
        onClose={toggleSidebar}
      />
      <main className='pt-[72px] min-h-screen dark:bg-[var(--background-dark)]'>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
