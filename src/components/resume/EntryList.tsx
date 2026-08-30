import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface EntryListProps<T> {
  entries: T[];
  renderItem: (entry: T, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  itemClassName?: string;
}

export function EntryList<T>({
  entries,
  renderItem,
  emptyState,
  className,
  itemClassName,
}: EntryListProps<T>) {
  const prefersReducedMotion = useReducedMotion();

  if (!entries || entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center text-sm text-gray-500">
        {emptyState || 'No entries.'}
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      <AnimatePresence initial={false}>
        {entries.map((entry, index) => (
          <motion.div
            key={(entry as any).id || index}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'rounded-xl border border-white/40 bg-white/70 p-4 shadow-soft backdrop-blur-sm transition-shadow hover:shadow-medium',
              itemClassName
            )}
          >
            {renderItem(entry, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
