import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { AdminAnalytics } from '@/components/admin/analytics/AdminAnalytics';

export default function AdminAnalyticsPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <AdminAnalytics />
      </motion.div>
    </PageTransition>
  );
}
