import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentGroup = Math.floor((currentPage - 1) / 5);
  const startPage = currentGroup * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex items-center justify-center gap-2 mt-4 pt-[32px]'>
      {startPage !== currentPage && (
        <button
          onClick={() => onPageChange(1)}
          className='px-3 py-1 rounded-full text-[var(--gray-02)] hover:text-[var(--primary)]'
        >
          <ChevronsLeft />
        </button>
      )}

      {startPage !== currentPage && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className='w-8 h-8 flex items-center justify-center rounded-full text-[var(--gray-02)] hover:text-[var(--primary)]'
        >
          <ChevronLeft />
        </button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-[32px] h-[32px] px-3 py-1 rounded-full ${currentPage === number ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--gray-01)]'}`}
        >
          {number}
        </button>
      ))}

      {endPage !== currentPage && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className='w-8 h-8 flex items-center justify-center rounded-full text-[var(--gray-02)] hover:text-[var(--primary)]'
        >
          <ChevronRight />
        </button>
      )}

      {endPage !== currentPage && (
        <button
          onClick={() => onPageChange(totalPages)}
          className='px-3 py-1 rounded-full text-[var(--gray-02)] hover:text-[var(--primary)]'
        >
          <ChevronsRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
