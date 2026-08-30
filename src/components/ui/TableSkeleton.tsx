import { Skeleton } from './Skeleton';
import { cn } from '@/utils/cn';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
}: TableSkeletonProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-xl border border-white/40 bg-white/60 backdrop-blur-md shadow-soft',
        className
      )}
    >
      {/* Header */}
      {showHeader && (
        <div className="flex gap-4 border-b border-gray-100 bg-gray-50/80 px-5 py-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={`header-${colIndex}`} className="h-4 flex-1 rounded-md" />
          ))}
        </div>
      )}

      {/* Rows */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 px-5 py-4">
            {Array.from({ length: columns }).map((__, colIndex) => (
              <Skeleton
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  'h-5 flex-1 rounded-md',
                  colIndex === 0 ? 'w-1/3' : '',
                  colIndex === columns - 1 ? 'w-1/4' : ''
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
