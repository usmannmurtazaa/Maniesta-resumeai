import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/50 bg-white/50 px-6 py-16 text-center backdrop-blur-sm',
        className
      )}
    >
      {icon && (
        <motion.div
          initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="mb-5 text-gray-300"
        >
          {icon}
        </motion.div>
      )}

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">{description}</p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </motion.div>
  );
}
