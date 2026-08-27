import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { UserMenu } from '@/components/common/UserMenu';
import { Logo } from '@/components/common/Logo';
import { MobileNav } from '@/components/common/MobileNav';
import { PageTransition } from '@/components/common/PageTransition';
import { MenuIcon, DashboardIcon, JobsIcon, BookmarkIcon, SettingsIcon } from '@/components/ui/icons';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon size={18} /> },
  { to: '/jobs', label: 'Daily Jobs', icon: <JobsIcon size={18} /> },
  { to: '/jobs/saved', label: 'Saved Jobs', icon: <BookmarkIcon size={18} /> },
  { to: '/settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
];

export function DashboardLayout() {
  const { user, loading } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="mr-2 rounded-lg p-2 text-gray-500 hover:bg-white/60 hover:text-gray-700 md:hidden"
                  aria-label="Open menu"
                >
                  <MenuIcon size={24} />
                </button>
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
                      {item.icon}
                      {item.label}
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

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      <MobileNav items={navItems} />
    </div>
  );
}