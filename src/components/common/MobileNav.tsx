import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseIcon, DashboardIcon, UsersIcon, ResumeIcon, ATSIcon, JobsIcon, NotificationIcon, AnalyticsIcon, SettingsIcon } from '@/components/ui/icons';
import { useUIStore } from '@/store/uiStore';

interface MobileNavProps {
  items: { to: string; label: string; icon?: React.ReactNode }[];
}

export function MobileNav({ items }: MobileNavProps) {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    toggleSidebar();
    navigate(to);
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={toggleSidebar}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-xl md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-semibold">Maniesta ResumeAI</span>
              <button onClick={toggleSidebar} aria-label="Close menu">
                <CloseIcon size={20} />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {items.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleNavigate(item.to)}
                  className="flex w-full items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}