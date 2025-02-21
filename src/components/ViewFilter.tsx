'use client';

import { LayoutGrid, List } from 'lucide-react';

const ViewFilter = ({
  viewType,
  setViewType,
}: {
  viewType: 'list' | 'card';
  setViewType: (type: 'list' | 'card') => void;
}) => (
  <div className='flex gap-[16px]'>
    <List
      className={`cursor-pointer ${viewType === 'list' ? 'text-[var(--primary)]' : ''}`}
      onClick={() => setViewType('list')}
    />
    <LayoutGrid
      className={`cursor-pointer ${viewType === 'card' ? 'text-[var(--primary)]' : ''}`}
      onClick={() => setViewType('card')}
    />
  </div>
);

export default ViewFilter;
