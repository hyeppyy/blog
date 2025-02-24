'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface LayoutClientProps {
  children: React.ReactNode;
  allTags: string[];
}

const LayoutClient = ({ children, allTags }: LayoutClientProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바가 열려있을 때 스크롤 방지
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
      <main className='pt-[72px]'>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutClient;
