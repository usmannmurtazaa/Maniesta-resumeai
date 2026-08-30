import { motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { DashboardFooter } from '@/components/common/DashboardFooter';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { formatDate } from '@/utils/dateUtils';
import {
  MailIcon,
  ShieldCheckIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
} from '@/components/ui/icons';

export default function ProfilePage() {
  const { user, isAdmin } = useAuthStore();
  const prefersReducedMotion = useReducedMotion();

  const infoItems = [
    {
      icon: <MailIcon size={18} className="text-primary-600" />,
      label: 'Email',
      value: user?.email || 'N/A',
    },
    {
      icon: <UserIcon size={18} className="text-primary-600" />,
      label: 'Display Name',
      value: user?.displayName || 'User',
    },
    {
      icon: <CalendarIcon size={18} className="text-accent-600" />,
      label: 'Account Created',
      value: user?.metadata?.creationTime
        ? formatDate(new Date(user.metadata.creationTime))
        : 'N/A',
    },
    {
      icon: <ClockIcon size={18} className="text-yellow-600" />,
      label: 'Last Sign In',
      value: user?.metadata?.lastSignInTime
        ? formatDate(new Date(user.metadata.lastSignInTime))
        : 'N/A',
    },
    {
      icon: <ShieldCheckIcon size={18} className="text-green-600" />,
      label: 'Role',
      value: isAdmin ? 'Administrator' : 'Standard User',
    },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Decorative blurred orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Dashboard" to="/dashboard" />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-4"
          >
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-1 text-sm text-gray-500">Your account information and role.</p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 120, damping: 15 }}
            whileHover={prefersReducedMotion ? {} : { rotateX: 1, rotateY: -1, scale: 1.01 }}
            className="mt-6"
          >
            <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-glass">
              <div className="relative h-24 bg-gradient-to-r from-primary-500 to-accent-400" />
              <div className="relative px-6 pb-6">
                <div className="flex items-end gap-4 -mt-10">
                  <Avatar
                    src={user?.photoURL}
                    alt={user?.displayName || user?.email || undefined}
                    size="lg"
                    className="ring-4 ring-white shadow-lg"
                  />
                  <div className="pb-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user?.displayName || 'User'}
                    </h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {infoItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-3 border border-white/40"
                    >
                      {item.icon}
                      <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-medium text-gray-900">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
