import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CloseIcon, ArrowRightIcon } from '@/components/ui/icons';
import { useUIStore } from '@/store/uiStore';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/utils/cn';

interface MobileNavProps {
  items: { to: string; label: string; icon?: React.ReactNode }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '-100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/30 bg-white/80 shadow-glass backdrop-blur-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/40 px-5 py-4">
              <Logo size="sm" />
              <motion.button
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 90 }}
                onClick={toggleSidebar}
                className="rounded-lg p-2 text-gray-500 hover:bg-white/60 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Close menu"
              >
                <CloseIcon size={20} />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 + index * 0.05 }}
                >
                  <NavLink
                    to={item.to}
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-primary-500',
                        isActive
                          ? 'bg-primary-50 text-primary-700 shadow-sm'
                          : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'shrink-0 transition-colors',
                            isActive
                              ? 'text-primary-600'
                              : 'text-gray-400 group-hover:text-gray-500'
                          )}
                        >
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ArrowRightIcon size={16} className="text-primary-600" />}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-white/40 px-5 py-4">
              <p className="text-xs text-gray-400">© 2026 Maniesta ResumeAI</p>
              <p className="mt-1 text-xs text-gray-400">
                Built by{' '}
                <a
                  href="https://usmanmurtaza.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Usman Murtaza
                </a>
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}