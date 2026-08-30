import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

// Omit event handlers that conflict with Framer Motion's motion props
interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDragStart'
  | 'onDrop'
  | 'onAnimationStart'
> {
  variant?: 'primary' | 'outline' | 'danger' | 'ghost' | 'glass' | 'soft' | 'link' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const base =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97]';

    const variants = {
      primary:
        'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 focus:ring-primary-500 shadow-soft hover:shadow-medium',
      outline:
        'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-primary-500 shadow-sm',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-soft hover:shadow-medium',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
      glass:
        'glass-card text-gray-800 hover:bg-white/80 focus:ring-primary-300 shadow-glass hover:shadow-glass-hover backdrop-blur-md',
      soft: 'bg-primary-50 text-primary-700 hover:bg-primary-100 focus:ring-primary-300',
      link: 'text-primary-600 hover:text-primary-700 underline-offset-2 hover:underline focus:ring-primary-500 px-0',
      white:
        'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300 shadow-soft',
    };

    const sizes = {
      xs: 'px-2.5 py-1.5 text-xs rounded-lg',
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97 },
        };

    return (
      <motion.button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...motionProps}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" className="mr-2" />
        ) : (
          leftIcon && <span className="mr-2 shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && <span className="ml-2 shrink-0">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
