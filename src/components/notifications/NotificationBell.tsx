import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { notificationService } from '@/services/notifications/notificationService';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationPanel } from './NotificationPanel';
import { NotificationIcon } from '@/components/ui/icons';

export function NotificationBell() {
  const user = useAuthStore((s) => s.user);
  const { notifications, setNotifications, unreadCount, newJobsCount, setNewJobsCount } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [notifs, count] = await Promise.all([
          notificationService.getUserNotifications(user.uid),
          notificationService.getNewJobsCount(user.uid),
        ]);
        if (isMounted) {
          setNotifications(notifs);
          setNewJobsCount(count);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [user, setNotifications, setNewJobsCount]);

  const totalBadge = unreadCount + newJobsCount;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Notifications"
      >
        <NotificationIcon size={24} />
        {totalBadge > 0 && (
          <motion.span
            key={totalBadge}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white"
          >
            {totalBadge > 9 ? '9+' : totalBadge}
          </motion.span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] sm:w-96 rounded-xl border bg-white shadow-lg overflow-hidden"
          >
            <NotificationPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}