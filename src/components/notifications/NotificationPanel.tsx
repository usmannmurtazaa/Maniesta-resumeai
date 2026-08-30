import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuthStore } from '@/store/authStore';
import { notificationService } from '@/services/notifications/notificationService';
import { timeAgo } from '@/utils/dateUtils';
import {
  CheckIcon,
  BellIcon,
  BriefcaseIcon,
  CalendarIcon,
  SparklesIcon,
} from '@/components/ui/icons';
import { cn } from '@/utils/cn';
import type { AppNotification } from '@/types/notification.types';

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const user = useAuthStore((s) => s.user);
  const { notifications, newJobsCount, markAllAsRead, setNewJobsCount, markAsRead } =
    useNotificationStore();
  const prefersReducedMotion = useReducedMotion();

  const handleMarkAll = async () => {
    if (!user) return;
    await notificationService.markAllNotificationsAsRead(user.uid);
    await notificationService.markJobsAsSeen(user.uid);
    markAllAsRead();
    setNewJobsCount(0);
  };

  const handleMarkOne = async (id: string) => {
    if (!user) return;
    await notificationService.markNotificationAsRead(id);
    markAsRead(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job-match':
        return <BriefcaseIcon size={16} className="text-blue-500" />;
      case 'deadline-reminder':
        return <CalendarIcon size={16} className="text-yellow-500" />;
      case 'featured-match':
        return <SparklesIcon size={16} className="text-purple-500" />;
      default:
        return <BellIcon size={16} className="text-primary-500" />;
    }
  };

  return (
    <div className="flex max-h-[420px] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/40 px-4 py-3">
        <h3 className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="rounded-lg bg-primary-100 p-1.5 text-primary-600">
            <BellIcon size={16} />
          </span>
          Notifications
        </h3>
        <button
          onClick={handleMarkAll}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <CheckIcon size={14} />
          Mark all as read
        </button>
      </div>

      {/* New jobs alert */}
      <AnimatePresence>
        {newJobsCount > 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-blue-100 bg-blue-50/80 px-4 py-3"
          >
            <p className="text-sm font-medium text-blue-800">
              {newJobsCount} new job{newJobsCount > 1 ? 's' : ''} available
            </p>
            <button
              onClick={async () => {
                if (user) {
                  await notificationService.markJobsAsSeen(user.uid);
                  setNewJobsCount(0);
                }
              }}
              className="mt-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              Mark as seen
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center px-4 py-12 text-center"
          >
            <BellIcon size={48} className="text-gray-200 mb-4" />
            <p className="text-sm font-medium text-gray-500">No notifications</p>
            <p className="mt-1 text-xs text-gray-400">You&apos;re all caught up!</p>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            {notifications.map((n: AppNotification, index: number) => (
              <motion.div
                key={n.id}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={cn(
                  'border-b border-gray-100 px-4 py-3 transition-colors',
                  n.read ? 'bg-white' : 'bg-primary-50/40'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">{getNotificationIcon(n.type)}</span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{n.title}</p>
                      <p className="mt-0.5 text-sm text-gray-600">{n.message}</p>
                      <p className="mt-1 text-xs text-gray-400">{timeAgo(n.createdAt)}</p>
                      {n.jobId && (
                        <Link
                          to={`/jobs/${n.jobId}`}
                          onClick={onClose}
                          className="mt-1 inline-block text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          View job
                        </Link>
                      )}
                    </div>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => handleMarkOne(n.id)}
                      className="shrink-0 rounded-md p-1 text-xs font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Mark as read"
                    >
                      <CheckIcon size={14} />
                    </button>
                  )}
                </div>
                {!n.read && (
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary-500" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-white/40 p-2">
        <button
          onClick={onClose}
          className="w-full rounded-lg py-2 text-center text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
