import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/firebase/auth';
import { UserIcon, SettingsIcon, LogoutIcon, ChevronIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

export function UserMenu() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    setOpen(false);
    await authService.logout();
    navigate('/login');
  };

  const initials =
    user?.displayName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    'U';

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-white/40 bg-white/60 p-1 pr-2 shadow-soft backdrop-blur-md transition-colors hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user?.displayName || 'Profile'}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-white/50"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-400 text-sm font-semibold text-white">
            {initials}
          </span>
        )}
        <ChevronIcon
          size={14}
          className={cn('text-gray-500 transition-transform duration-200', open && 'rotate-180')}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-white/40 bg-white/80 shadow-glass backdrop-blur-xl"
            role="menu"
            aria-orientation="vertical"
          >
            {/* User info */}
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="truncate text-sm font-medium text-gray-900">
                {user?.displayName || 'User'}
              </p>
              <p className="truncate text-xs text-gray-500">{user?.email}</p>
            </div>

            <div className="p-1.5">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/profile')
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                role="menuitem"
              >
                <UserIcon size={18} className="text-gray-400" />
                Profile
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/settings')
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                role="menuitem"
              >
                <SettingsIcon size={18} className="text-gray-400" />
                Settings
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                role="menuitem"
              >
                <LogoutIcon size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
