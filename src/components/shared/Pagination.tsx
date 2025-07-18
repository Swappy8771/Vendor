import { cn } from '../../utils/cn';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const visiblePages = 5;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start < visiblePages - 1) {
      if (start === 1) {
        end = Math.min(totalPages, start + visiblePages - 1);
      } else {
        start = Math.max(1, end - visiblePages + 1);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Previous */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-3 py-1.5 rounded hover:bg-gray-100 text-sm",
          currentPage === 1 ? "text-gray-300" : "text-gray-600"
        )}
      >
        &lt;
      </button>

      {/* Pages */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={cn(
            "px-3 py-1.5 rounded text-sm font-medium transition-colors",
            page === currentPage
              ? "bg-indigo-500 text-white"
              : "text-gray-700 hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-1.5 rounded hover:bg-gray-100 text-sm",
          currentPage === totalPages ? "text-gray-300" : "text-gray-600"
        )}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
