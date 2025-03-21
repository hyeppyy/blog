'use client';

import { useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Callout from '@/components/Callout';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutClientProps {
  children: React.ReactNode;
  allTags: string[];
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children, allTags }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const components = {
    Callout,
  };

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      {isSidebarOpen && (
        <div className='fixed inset-0 z-40 lg:hidden' onClick={toggleSidebar} />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        allTags={allTags}
        onClose={toggleSidebar}
      />
      <MDXProvider components={components}>
        <main className='pt-[72px] min-h-screen dark:bg-[var(--background-dark)] overflow-x-hidden'>
          {children}
        </main>
      </MDXProvider>

      <Footer />
    </>
  );
};

export default LayoutClient;
