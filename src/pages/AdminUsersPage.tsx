import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { UserManagement } from '@/components/admin/users/UserManagement';

export default function AdminUsersPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <UserManagement />
      </motion.div>
    </PageTransition>
  );
}
