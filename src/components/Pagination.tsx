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

const Pagination: React.FC<PaginationProps> = ({
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
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          aria-label='첫 페이지로 이동하는 버튼'
          className='px-3 py-1 rounded-full text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'
        >
          <ChevronsLeft />
        </button>
      )}

      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          aria-label='이전 페이지로 이동하는 버튼'
          className='w-8 h-8 flex items-center justify-center rounded-full text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'
        >
          <ChevronLeft />
        </button>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          aria-label='페이지 이동 버튼'
          className={`w-[32px] h-[32px] px-3 py-1 rounded-full ${currentPage === number ? 'bg-[var(--primary)] dark:bg-[var(--primary-dark)] text-white dark:text-[var(--black-dark)]' : 'dark:text-[var(--gray-01-dark)] hover:bg-[var(--gray-01)] hover:dark:bg-[rgba(var(--white-rgb),0.15)]'}`}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          aria-label='다음 페이지로 이동하는 버튼'
          className='w-8 h-8 flex items-center justify-center rounded-full text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'
        >
          <ChevronRight />
        </button>
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          aria-label='마지막 페이지로 이동하는 버튼'
          className='px-3 py-1 rounded-full text-[var(--gray-02)] dark:text-[var(--gray-01-dark)] hover:text-[var(--primary)] dark:hover:text-[var(--primary-dark)]'
        >
          <ChevronsRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
