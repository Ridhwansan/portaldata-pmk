import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 sm:gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) => {
        if (typeof p === 'string') {
          return (
            <span
              key={`dots-${idx}`}
              className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm font-medium"
            >
              ...
            </span>
          );
        }

        const isActive = p === currentPage;

        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-[#A32A29] text-white font-bold shadow-md shadow-[#A32A29]/20'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
