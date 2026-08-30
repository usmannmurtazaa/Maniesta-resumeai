import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { JobManagement } from '@/components/admin/jobs/JobManagement';

export default function AdminJobsPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <JobManagement />
      </motion.div>
    </PageTransition>
  );
}
