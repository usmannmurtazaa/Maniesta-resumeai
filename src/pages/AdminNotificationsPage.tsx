import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { NotificationManagement } from '@/components/admin/notifications/NotificationManagement';

export default function AdminNotificationsPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <NotificationManagement />
      </motion.div>
    </PageTransition>
  );
}
