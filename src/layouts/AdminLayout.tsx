import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { MobileNav } from '@/components/common/MobileNav';
import { PageTransition } from '@/components/common/PageTransition';
import {
  DashboardIcon,
  UsersIcon,
  ResumeIcon,
  ATSIcon,
  JobsIcon,
  NotificationIcon,
  AnalyticsIcon,
  SettingsIcon,
  MenuIcon,
  ChevronIcon,
} from '@/components/ui/icons';

const adminNavItems = [
  { to: '/admin', label: 'Dashboard', icon: <DashboardIcon size={18} /> },
  { to: '/admin/users', label: 'Users', icon: <UsersIcon size={18} /> },
  { to: '/admin/resumes', label: 'Resumes', icon: <ResumeIcon size={18} /> },
  { to: '/admin/ats', label: 'ATS Analysis', icon: <ATSIcon size={18} /> },
  { to: '/admin/jobs', label: 'Jobs', icon: <JobsIcon size={18} /> },
  { to: '/admin/notifications', label: 'Notifications', icon: <NotificationIcon size={18} /> },
  { to: '/admin/analytics', label: 'Analytics', icon: <AnalyticsIcon size={18} /> },
  { to: '/admin/settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
];

export function AdminLayout() {
  const { isAdmin, loading } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />

      <div className="relative z-10 flex">
        {/* Desktop sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-white/40 bg-white/70 backdrop-blur-xl transition-all duration-300 ${
            collapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/40 p-4">
            {!collapsed && <span className="font-display text-lg font-semibold text-gray-900">Admin</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-lg p-1 text-gray-500 hover:bg-white/60 hover:text-gray-700"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronIcon size={20} className={`transform ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <nav className="flex-1 space-y-1 py-4">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <MobileNav items={adminNavItems} />

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/40 bg-white/70 p-4 backdrop-blur-xl md:hidden">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="rounded-lg p-2 text-gray-500 hover:bg-white/60 hover:text-gray-700"
                aria-label="Open menu"
              >
                <MenuIcon size={24} />
              </button>
              <span className="ml-4 font-display font-semibold text-gray-900">Admin Dashboard</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
        </div>
      </div>
    </div>
  );
}