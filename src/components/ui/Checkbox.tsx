import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;
    const prefersReducedMotion = useReducedMotion();

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex h-5 items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white shadow-sm transition-all duration-200',
              'hover:border-primary-500',
              'focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2',
              'checked:border-primary-600 checked:bg-primary-600',
              'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50',
              error && 'border-red-500 hover:border-red-400 focus:ring-red-200',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {/* Check mark icon */}
          <motion.span
            initial={prefersReducedMotion ? false : { scale: 0 }}
            animate={{ scale: props.checked ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.span>
        </div>

        {label && (
          <div className="flex-1">
            <label htmlFor={inputId} className="cursor-pointer text-sm text-gray-700 select-none">
              {label}
            </label>
            {hint && !error && (
              <p id={`${inputId}-hint`} className="mt-0.5 text-xs text-gray-500">
                {hint}
              </p>
            )}
            {error && (
              <p id={`${inputId}-error`} className="mt-0.5 text-xs text-red-600">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
