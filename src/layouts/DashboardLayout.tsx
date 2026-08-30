import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { UserMenu } from '@/components/common/UserMenu';
import { Logo } from '@/components/common/Logo';
import { MobileNav } from '@/components/common/MobileNav';
import { PageTransition } from '@/components/common/PageTransition';
import { DashboardFooter } from '@/components/common/DashboardFooter';
import {
  MenuIcon,
  DashboardIcon,
  JobsIcon,
  BookmarkIcon,
  SettingsIcon,
} from '@/components/ui/icons';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon size={18} /> },
  { to: '/jobs', label: 'Daily Jobs', icon: <JobsIcon size={18} /> },
  { to: '/jobs/saved', label: 'Saved Jobs', icon: <BookmarkIcon size={18} /> },
  { to: '/settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
];

export function DashboardLayout() {
  const { user, loading } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const prefersReducedMotion = useReducedMotion();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated background orbs */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-yellow-200/10 blur-3xl"
        animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-soft">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <motion.button
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  onClick={toggleSidebar}
                  className="mr-2 rounded-lg p-2 text-gray-500 hover:bg-white/60 hover:text-gray-700 md:hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Open menu"
                >
                  <MenuIcon size={24} />
                </motion.button>
                <Logo />
                <nav className="ml-8 hidden items-center space-x-1 md:flex">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <motion.span
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          className={`flex items-center gap-2 ${isActive ? 'text-primary-700' : ''}`}
                        >
                          {item.icon}
                          {item.label}
                        </motion.span>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <NotificationBell />
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>

        <DashboardFooter />
      </div>

      <MobileNav items={navItems} />
    </div>
  );
}
