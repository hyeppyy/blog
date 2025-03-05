'use client';

import { LayoutGrid, List } from 'lucide-react';

interface ViewFilterProps {
  viewType: 'list' | 'card';
  setViewType: (type: 'list' | 'card') => void;
}

const ViewFilter: React.FC<ViewFilterProps> = ({ viewType, setViewType }) => (
  <div className='flex gap-[16px]'>
    <List
      className={`cursor-pointer ${viewType === 'list' ? 'text-[var(--primary)] dark:text-[var(--primary-dark)]' : 'dark:text-[var(--gray-01-dark)]'}`}
      onClick={() => setViewType('list')}
    />
    <LayoutGrid
      className={`cursor-pointer ${viewType === 'card' ? 'text-[var(--primary)] dark:text-[var(--primary-dark)]' : 'dark:text-[var(--gray-01-dark)]'}`}
      onClick={() => setViewType('card')}
    />
  </div>
);

export default ViewFilter;
