import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ChevronIcon } from '@/components/ui/icons';

interface SectionRendererProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  icon?: React.ReactNode;
  onToggle?: () => void;
}

export function SectionRenderer({
  title,
  children,
  defaultOpen = true,
  className,
  icon,
  onToggle,
}: SectionRendererProps) {
  const [open, setOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  const toggleOpen = () => {
    setOpen((prev) => !prev);
    onToggle?.();
  };

  return (
    <motion.section
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'overflow-hidden rounded-xl border border-white/40 bg-white/70 backdrop-blur-sm shadow-soft transition-shadow hover:shadow-medium',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <button
          onClick={toggleOpen}
          className="group flex flex-1 items-center gap-2 text-left"
          aria-expanded={open}
        >
          {icon && <span className="text-primary-600">{icon}</span>}
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <ChevronIcon
            size={18}
            className={cn(
              'text-gray-400 transition-transform duration-200 group-hover:text-primary-500',
              open ? 'rotate-90' : ''
            )}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="section-content"
            initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
