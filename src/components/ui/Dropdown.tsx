import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown');
  }
  return context;
}

/* ---------------------------------- Root ---------------------------------- */

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, toggle, close }}>
      <div ref={containerRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

/* -------------------------------- Trigger --------------------------------- */

interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { toggle, open } = useDropdownContext();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-haspopup="menu"
      aria-expanded={open}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 shadow-soft backdrop-blur-md transition-colors hover:bg-white/90 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500',
        className
      )}
    >
      {children}
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
        className={cn('transition-transform duration-200', open && 'rotate-180')}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.button>
  );
}

/* ---------------------------------- Menu ---------------------------------- */

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

export function DropdownMenu({ children, className, align = 'left' }: DropdownMenuProps) {
  const { open } = useDropdownContext();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-white/40 bg-white/80 p-1.5 shadow-glass backdrop-blur-xl',
            align === 'left' ? 'left-0' : 'right-0',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------- Item ----------------------------------- */

interface DropdownItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: 'default' | 'danger';
  className?: string;
}

export function DropdownItem({
  children,
  onSelect,
  icon,
  disabled = false,
  variant = 'default',
  className,
}: DropdownItemProps) {
  const { close } = useDropdownContext();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    close();
  };

  return (
    <motion.button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      whileHover={prefersReducedMotion || disabled ? {} : { x: 4 }}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary-500',
        variant === 'default' && 'text-gray-700 hover:bg-primary-50 hover:text-primary-700',
        variant === 'danger' && 'text-red-600 hover:bg-red-50 hover:text-red-700',
        disabled && 'cursor-not-allowed opacity-50 hover:bg-transparent',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}

/* -------------------------------- Separator -------------------------------- */

export function DropdownSeparator() {
  return <div className="my-1 border-t border-gray-200" role="separator" />;
}
