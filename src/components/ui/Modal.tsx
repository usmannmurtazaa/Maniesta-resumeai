import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CloseIcon } from '@/components/ui/icons';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  open?: boolean;
  title?: string;
}

export function Modal({ onClose, children, open = true, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', handleEsc);
      // Focus first focusable element or close button
      const focusable = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      (focusable || modalRef.current?.querySelector('button[aria-label="Close dialog"]'))?.focus();
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20, rotateX: 2 }
            }
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20, rotateX: 2 }
            }
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden rounded-2xl border border-white/30 bg-white/90 shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Dialog'}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-3 top-3 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <CloseIcon size={18} />
            </button>

            {title && (
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              </div>
            )}

            <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
