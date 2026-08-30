import { motion, useReducedMotion } from 'framer-motion';
import { Modal } from './Modal';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmationDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
  variant = 'danger',
}: ConfirmationDialogProps) {
  const prefersReducedMotion = useReducedMotion();

  const iconColor = {
    danger: 'text-red-600 bg-red-100',
    warning: 'text-yellow-600 bg-yellow-100',
    info: 'text-blue-600 bg-blue-100',
  }[variant];

  const confirmVariant =
    variant === 'danger' ? 'danger' : variant === 'warning' ? 'outline' : 'primary';

  return (
    <Modal onClose={onCancel} open={open}>
      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
          <motion.div
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
              iconColor
            )}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </motion.div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            fullWidth
            className="sm:w-auto"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={isLoading}
            fullWidth
            className="sm:w-auto"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
