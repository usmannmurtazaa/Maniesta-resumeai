import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { ATSManagement } from '@/components/admin/ats/ATSManagement';

export default function AdminATSPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <ATSManagement />
      </motion.div>
    </PageTransition>
  );
}
