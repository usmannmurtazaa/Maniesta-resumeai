import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const prefersReducedMotion = useReducedMotion();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-white/40 bg-white/70 px-4 py-3 shadow-soft backdrop-blur-md sm:px-6 ${className || ''}`}
    >
      {/* Mobile navigation */}
      <div className="flex flex-1 items-center justify-between sm:hidden">
        <motion.button
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeftIcon size={16} />
          Previous
        </motion.button>
        <motion.button
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ArrowRightIcon size={16} />
        </motion.button>
      </div>

      {/* Desktop pagination */}
      <div className="hidden flex-1 items-center justify-between sm:flex">
        <p className="text-sm text-gray-600">
          Page <span className="font-semibold text-gray-900">{page}</span> of{' '}
          <span className="font-semibold text-gray-900">{totalPages}</span>
        </p>

        <nav className="flex items-center gap-1" aria-label="Pagination">
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeftIcon size={16} />
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <motion.button
              key={p}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              onClick={() => handlePageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`h-9 min-w-9 px-3 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                p === page
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-soft'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {p}
            </motion.button>
          ))}

          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRightIcon size={16} />
          </motion.button>
        </nav>
      </div>
    </div>
  );
}
