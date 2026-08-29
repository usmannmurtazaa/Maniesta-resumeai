import { PageTransition } from '@/components/common/PageTransition';
import { NotificationManagement } from '@/components/admin/notifications/NotificationManagement';

export default function AdminNotificationsPage() {
  return (
    <PageTransition>
      <NotificationManagement />
    </PageTransition>
  );
}