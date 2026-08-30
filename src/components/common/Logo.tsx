import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  textClassName?: string;
  withGlow?: boolean;
}

const sizeMap = {
  sm: {
    mark: 'h-8 w-8 rounded-lg',
    text: 'text-lg',
  },
  md: {
    mark: 'h-9 w-9 rounded-xl',
    text: 'text-xl',
  },
  lg: {
    mark: 'h-12 w-12 rounded-2xl',
    text: 'text-2xl',
  },
};

export function Logo({
  className,
  showText = true,
  size = 'md',
  textClassName,
  withGlow = false,
}: LogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const sizes = sizeMap[size];

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('inline-flex items-center gap-2', className)}
    >
      <Link
        to="/"
        className="group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
        aria-label="Maniesta ResumeAI Home"
      >
        <span
          className={cn(
            'relative flex shrink-0 items-center justify-center bg-gradient-to-br from-primary-500 to-accent-400 font-display font-bold text-white shadow-lg transition-shadow duration-300 group-hover:shadow-glass',
            sizes.mark,
            withGlow && 'shadow-glass'
          )}
        >
          <span className="relative z-10">M</span>
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent-400 ring-2 ring-white" />
          {withGlow && (
            <span className="absolute inset-0 rounded-full bg-primary-400/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
          )}
        </span>

        {showText && (
          <span
            className={cn(
              'font-display font-bold leading-none text-gray-900',
              sizes.text,
              textClassName
            )}
          >
            Maniesta <span className="text-primary-600">ResumeAI</span>
          </span>
        )}
      </Link>
    </motion.div>
  );
}
