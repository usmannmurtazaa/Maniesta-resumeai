import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { useNavigate } from 'react-router-dom';
import {
  UsersIcon,
  ResumeIcon,
  ATSIcon,
  JobsIcon,
  NotificationIcon,
  ArrowRightIcon,
} from '@/components/ui/icons';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export default function AdminDashboard() {
  const { analytics, setAnalytics, setLoading, loading, error, setError } = useAdminStore();
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading('analytics', true);
      try {
        const data = await adminService.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading('analytics', false);
      }
    };
    fetchAnalytics();
  }, [setAnalytics, setLoading, setError]);

  if (loading.analytics && !analytics) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-56 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-600 font-medium">Error: {error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!analytics) return null;

  const stats = [
    {
      label: 'Total Users',
      value: analytics.users.total,
      icon: <UsersIcon size={24} className="text-primary-600" />,
      bg: 'bg-primary-100',
      path: '/admin/users',
    },
    {
      label: 'Active Users',
      value: analytics.users.activeUsers,
      icon: <UsersIcon size={24} className="text-green-600" />,
      bg: 'bg-green-100',
      path: '/admin/users',
    },
    {
      label: 'Total Resumes',
      value: analytics.resumes.total,
      icon: <ResumeIcon size={24} className="text-accent-600" />,
      bg: 'bg-accent-100',
      path: '/admin/resumes',
    },
    {
      label: 'ATS Analyses',
      value: analytics.ats.totalAnalyses,
      icon: <ATSIcon size={24} className="text-yellow-600" />,
      bg: 'bg-yellow-100',
      path: '/admin/ats',
    },
    {
      label: 'Published Jobs',
      value: analytics.jobs.published,
      icon: <JobsIcon size={24} className="text-blue-600" />,
      bg: 'bg-blue-100',
      path: '/admin/jobs',
    },
    {
      label: 'Scheduled Jobs',
      value: analytics.jobs.scheduled,
      icon: <JobsIcon size={24} className="text-purple-600" />,
      bg: 'bg-purple-100',
      path: '/admin/jobs',
    },
    {
      label: 'Featured Jobs',
      value: analytics.jobs.featured,
      icon: <JobsIcon size={24} className="text-orange-600" />,
      bg: 'bg-orange-100',
      path: '/admin/jobs',
    },
    {
      label: 'Saved Jobs',
      value: analytics.jobs.savedByUsers,
      icon: <NotificationIcon size={24} className="text-pink-600" />,
      bg: 'bg-pink-100',
      path: '/admin/jobs',
    },
  ];

  const quickActions = [
    { label: 'Manage Users', path: '/admin/users', icon: <UsersIcon size={18} /> },
    { label: 'View Resumes', path: '/admin/resumes', icon: <ResumeIcon size={18} /> },
    { label: 'ATS Analytics', path: '/admin/ats', icon: <ATSIcon size={18} /> },
    { label: 'Manage Jobs', path: '/admin/jobs', icon: <JobsIcon size={18} /> },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Platform overview and key metrics.</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            aria-label="Refresh dashboard"
          >
            Refresh
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`${stat.label}-${index}`}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative"
            >
              <Card
                className={cn(
                  'h-full p-5 border-white/40 bg-white/70 backdrop-blur-md shadow-soft transition-shadow hover:shadow-glass cursor-pointer'
                )}
                onClick={() => navigate(stat.path)}
              >
                <div className="flex items-start justify-between">
                  <div className={cn('rounded-xl p-3', stat.bg)}>{stat.icon}</div>
                  <ArrowRightIcon
                    size={18}
                    className="text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary-600"
                  />
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => navigate(action.path)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
