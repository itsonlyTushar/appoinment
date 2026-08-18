import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 select-none py-6 ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* PREVIOUS BUTTON */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg border border-body/20 bg-surface text-heading hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous Page"
      >
        <IoChevronBackOutline size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white shadow-sm font-semibold'
                  : 'bg-surface text-heading border border-body/20 hover:bg-background'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg border border-body/20 bg-surface text-heading hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next Page"
      >
        <span className="hidden sm:inline">Next</span>
        <IoChevronForwardOutline size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
