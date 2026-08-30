import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, CloseIcon } from '@/components/ui/icons';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const ToastContext = createContext<{
  showToast: (type: ToastType, message: string) => void;
}>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

const toastConfig = {
  success: {
    icon: <CheckCircleIcon size={20} className="text-green-500" />,
    border: 'border-green-200',
    bg: 'bg-green-50/80',
    text: 'text-green-800',
  },
  error: {
    icon: <AlertCircleIcon size={20} className="text-red-500" />,
    border: 'border-red-200',
    bg: 'bg-red-50/80',
    text: 'text-red-800',
  },
  info: {
    icon: <InfoIcon size={20} className="text-blue-500" />,
    border: 'border-blue-200',
    bg: 'bg-blue-50/80',
    text: 'text-blue-800',
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3 sm:max-w-md">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const config = toastConfig[toast.type];
            return (
              <motion.div
                key={toast.id}
                layout
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`flex items-start gap-3 rounded-xl border ${config.border} ${config.bg} px-4 py-3 shadow-glass backdrop-blur-md`}
                role="status"
                aria-live="polite"
              >
                <span className="mt-0.5 shrink-0">{config.icon}</span>
                <p className={`flex-1 text-sm font-medium ${config.text}`}>{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-white/60 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Close notification"
                >
                  <CloseIcon size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
