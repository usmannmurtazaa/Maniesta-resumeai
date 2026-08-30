import { HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

// Omit event handlers that conflict with Framer Motion
interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'onDrop'
  | 'onAnimationStart'
> {
  hover?: 'lift' | 'tilt' | 'none';
  glass?: boolean;
  padding?: boolean;
  interactive?: boolean;
}

export function Card({
  className,
  children,
  hover = 'lift',
  glass = true,
  padding = true,
  interactive = false,
  ...props
}: CardProps) {
  const prefersReducedMotion = useReducedMotion();

  const base = cn(
    'rounded-2xl border transition-all duration-300',
    padding && 'p-5',
    glass
      ? 'border-white/40 bg-white/70 backdrop-blur-xl shadow-soft hover:shadow-glass'
      : 'border-gray-200 bg-white shadow-soft hover:shadow-medium',
    className
  );

  const motionProps = prefersReducedMotion
    ? {}
    : interactive
      ? {
          whileHover:
            hover === 'tilt'
              ? { rotateX: 2, rotateY: -2, scale: 1.01 }
              : hover === 'lift'
                ? { y: -6, scale: 1.01 }
                : {},
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }
      : {};

  if (!interactive) {
    return (
      <div className={base} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={base} {...motionProps} {...props}>
      {children}
    </motion.div>
  );
}
