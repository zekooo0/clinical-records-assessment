import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  const getPages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (page >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  const pages = getPages();

  return (
    <div className='flex items-center justify-between text-sm'>
      <p className='text-secondary'>
        Page <span className='font-medium text-accent'>{page}</span> of{' '}
        <span className='font-medium text-accent'>{totalPages}</span>
      </p>

      <div className='flex items-center gap-1'>
        {/* Prev */}
        <button
          onClick={() => onPageChange?.(page - 1)}
          disabled={page === 1}
          className='flex items-center gap-1 px-3 py-1.5 rounded-lg border border-secondary/40 text-accent disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary transition-colors'
        >
          <ChevronLeft className='w-4 h-4' />
          Prev
        </button>

        {/* Page numbers */}
        <div className='flex items-center gap-1'>
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className='px-2 py-1.5 text-secondary'>
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange?.(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  p === page
                    ? 'bg-primary text-white'
                    : 'text-accent hover:bg-primary/10 border border-secondary/40 hover:border-primary'
                }`}
              >
                {p}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange?.(page + 1)}
          disabled={page === totalPages}
          className='flex items-center gap-1 px-3 py-1.5 rounded-lg border border-secondary/40 text-accent disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:border-primary transition-colors'
        >
          Next
          <ChevronRight className='w-4 h-4' />
        </button>
      </div>
    </div>
  );
}
