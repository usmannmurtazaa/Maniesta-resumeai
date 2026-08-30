import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { UsersIcon, ResumeIcon, ATSIcon, JobsIcon, ArrowRightIcon } from '@/components/ui/icons';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export default function AdminDashboardPage() {
  const { analytics, setAnalytics, loading, setLoading } = useAdminStore();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setLoading('analytics', true);
    adminService
      .getAnalytics()
      .then(setAnalytics)
      .finally(() => setLoading('analytics', false));
  }, [setAnalytics, setLoading]);

  if (loading.analytics && !analytics) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-56" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Users',
      value: analytics?.users.total ?? 0,
      icon: <UsersIcon size={24} className="text-primary-600" />,
      bg: 'bg-primary-100',
      path: '/admin/users',
    },
    {
      label: 'Active Users',
      value: analytics?.users.activeUsers ?? 0,
      icon: <UsersIcon size={24} className="text-green-600" />,
      bg: 'bg-green-100',
      path: '/admin/users',
    },
    {
      label: 'Total Resumes',
      value: analytics?.resumes.total ?? 0,
      icon: <ResumeIcon size={24} className="text-accent-600" />,
      bg: 'bg-accent-100',
      path: '/admin/resumes',
    },
    {
      label: 'ATS Analyses',
      value: analytics?.ats.totalAnalyses ?? 0,
      icon: <ATSIcon size={24} className="text-yellow-600" />,
      bg: 'bg-yellow-100',
      path: '/admin/ats',
    },
    {
      label: 'Published Jobs',
      value: analytics?.jobs.published ?? 0,
      icon: <JobsIcon size={24} className="text-blue-600" />,
      bg: 'bg-blue-100',
      path: '/admin/jobs',
    },
    {
      label: 'Scheduled Jobs',
      value: analytics?.jobs.scheduled ?? 0,
      icon: <JobsIcon size={24} className="text-purple-600" />,
      bg: 'bg-purple-100',
      path: '/admin/jobs',
    },
  ];

  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Platform overview and key metrics.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Refresh
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                <Card className="h-full p-5 border border-white/40 bg-white/70 backdrop-blur-md shadow-soft transition-shadow hover:shadow-glass">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-xl ${stat.bg} p-3`}>{stat.icon}</div>
                    <ArrowRightIcon
                      size={18}
                      className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600"
                    />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                  <div className="mt-4">
                    <a
                      href={stat.path}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      View details
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { label: 'Manage Users', path: '/admin/users', icon: <UsersIcon size={18} /> },
              { label: 'View Resumes', path: '/admin/resumes', icon: <ResumeIcon size={18} /> },
              { label: 'ATS Analytics', path: '/admin/ats', icon: <ATSIcon size={18} /> },
              { label: 'Manage Jobs', path: '/admin/jobs', icon: <JobsIcon size={18} /> },
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => (window.location.href = action.path)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
