// src/components/ai/AIActionButton.tsx
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@/components/ui/Dropdown';
import { Spinner } from '@/components/ui/Spinner';
import { SparklesIcon, ChevronIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

export interface AIAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface AIActionButtonProps {
  actions?: AIAction[];
  onSelectAction?: (actionKey: string) => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function AIActionButton({
  actions = [{ key: 'improve', label: 'Improve' }],
  onSelectAction,
  loading = false,
  disabled = false,
  className,
  label = 'AI',
}: AIActionButtonProps) {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleSelect = (key: string) => {
    onSelectAction?.(key);
    setOpen(false);
  };

  if (actions.length === 1) {
    const singleAction = actions[0];
    return (
      <motion.button
        type="button"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        onClick={() => onSelectAction?.(singleAction.key)}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border border-white/40 bg-gradient-to-r from-primary-500/10 to-accent-500/10 px-3 py-1.5 text-xs font-medium text-primary-700 shadow-soft backdrop-blur-sm transition-all duration-200',
          'hover:from-primary-500/20 hover:to-accent-500/20 hover:shadow-glass',
          'focus:outline-none focus:ring-2 focus:ring-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        aria-label={`${singleAction.label} with AI`}
      >
        {loading ? <Spinner size="sm" /> : <SparklesIcon size={14} />}
        <span>{label}</span>
      </motion.button>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        {loading ? <Spinner size="sm" /> : <SparklesIcon size={14} />}
        <span>{label}</span>
        <ChevronIcon size={14} />
      </DropdownTrigger>
      <DropdownMenu align="right">
        {actions.map((action) => (
          <DropdownItem
            key={action.key}
            onSelect={() => handleSelect(action.key)}
            icon={action.icon || <SparklesIcon size={16} />}
          >
            {action.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
