import { motion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { UserDetail } from '@/components/admin/users/UserDetail';
import { DashboardFooter } from '@/components/common/DashboardFooter';

export default function AdminUserDetailPage() {
  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="min-h-screen flex flex-col"
      >
        <div className="flex-1">
          <BackButton label="Back to Users" to="/admin/users" />
          <UserDetail />
        </div>
        <DashboardFooter />
      </motion.div>
    </PageTransition>
  );
}
