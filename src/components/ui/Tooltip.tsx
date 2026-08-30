import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      ref={tooltipRef}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.9,
                    y: side === 'top' ? 4 : side === 'bottom' ? -4 : 0,
                    x: side === 'left' ? 4 : side === 'right' ? -4 : 0,
                  }
            }
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="tooltip"
            className={cn(
              'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-white/20 bg-gray-900/90 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm',
              sideClasses[side]
            )}
          >
            {content}
            {/* Arrow */}
            <span
              className={cn(
                'absolute h-2 w-2 rotate-45 bg-gray-900/90',
                side === 'top' && 'left-1/2 -bottom-1 -translate-x-1/2',
                side === 'bottom' && 'left-1/2 -top-1 -translate-x-1/2',
                side === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                side === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
