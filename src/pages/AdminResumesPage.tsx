import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { ResumeManagement } from '@/components/admin/resumes/ResumeManagement';

export default function AdminResumesPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <ResumeManagement />
      </motion.div>
    </PageTransition>
  );
}
