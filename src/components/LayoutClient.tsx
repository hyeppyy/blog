'use client';

import { MDXProvider } from '@mdx-js/react';
import Footer from './Footer';
import Header from './Header';

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => (
  <>
    <Header />
    <MDXProvider>
      <main className='pt-[72px] min-h-screen dark:bg-[var(--background-dark)] overflow-x-hidden'>
        {children}
      </main>
    </MDXProvider>
    <Footer />
  </>
);

export default LayoutClient;
