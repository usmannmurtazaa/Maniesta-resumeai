import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { AdminSettings } from '@/components/admin/settings/AdminSettings';

export default function AdminSettingsPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <AdminSettings />
      </motion.div>
    </PageTransition>
  );
}
