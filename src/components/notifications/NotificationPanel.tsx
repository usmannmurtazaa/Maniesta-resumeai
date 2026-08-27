import { useNotificationStore } from '@/store/notificationStore';
import { useAuthStore } from '@/store/authStore';
import { notificationService } from '@/services/notifications/notificationService';
import { timeAgo } from '@/utils/dateUtils';
import type { AppNotification } from '@/types/notification.types';

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const user = useAuthStore((s) => s.user);
  const {
    notifications,
    newJobsCount,
    markAllAsRead,
    setNewJobsCount,
    markAsRead,
  } = useNotificationStore();

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

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-semibold">Notifications</h3>
        <button
          onClick={handleMarkAll}
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          Mark all as read
        </button>
      </div>

      {newJobsCount > 0 && (
        <div className="border-b bg-blue-50 px-4 py-3">
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
            className="text-xs text-blue-600 hover:text-blue-800 mt-1"
          >
            Mark as seen
          </button>
        </div>
      )}

      {notifications.length === 0 ? (
        <p className="p-4 text-center text-gray-500">No notifications</p>
      ) : (
        notifications.map((n: AppNotification) => (
          <div
            key={n.id}
            className={`border-b px-4 py-3 ${n.read ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between items-start">
              <p className="font-medium">{n.title}</p>
              {!n.read && (
                <button
                  onClick={() => handleMarkOne(n.id)}
                  className="text-xs text-primary-600 hover:text-primary-800"
                >
                  Mark read
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">{n.message}</p>
            <p className="text-xs text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
            {n.jobId && (
              <a
                href={`/jobs/${n.jobId}`}
                className="text-sm text-primary-600 hover:underline"
              >
                View job
              </a>
            )}
          </div>
        ))
      )}

      <div className="p-2">
        <button
          onClick={onClose}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}