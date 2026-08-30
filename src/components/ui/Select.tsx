import React, { forwardRef, SelectHTMLAttributes, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, required, leftIcon, className, id, children, ...props }, ref) => {
    const autoId = useId();
    const selectId = id || autoId;
    const prefersReducedMotion = useReducedMotion();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-gray-700 transition-colors"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}

          <select
            ref={ref}
            id={selectId}
            required={required}
            className={cn(
              'block w-full appearance-none rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-sm text-gray-900 shadow-sm backdrop-blur-sm transition-all duration-200',
              'hover:border-gray-400',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:shadow-md',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200',
              leftIcon ? 'pl-10' : undefined,
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-200 hover:border-red-400',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...props}
          >
            {children}
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              id={`${selectId}-error`}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              id={`${selectId}-hint`}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-xs text-gray-500"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = 'Select';
