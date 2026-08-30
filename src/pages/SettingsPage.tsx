import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { DashboardFooter } from '@/components/common/DashboardFooter';
import { JobPreferencesForm } from '@/components/settings/JobPreferencesForm';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SettingsIcon, BellIcon, UserIcon, ArrowRightIcon } from '@/components/ui/icons';

export default function SettingsPage() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Decorative blurred orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Dashboard" to="/dashboard" />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-4"
          >
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your preferences and notifications.</p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 120, damping: 15 }}
            className="mt-8 space-y-6"
          >
            <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft">
              <div className="flex items-center gap-3 border-b border-white/40 px-6 py-4">
                <div className="rounded-lg bg-primary-100 p-2 text-primary-600">
                  <BellIcon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Job Preferences</h2>
                  <p className="text-sm text-gray-500">
                    Receive relevant job alerts based on your preferences.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <JobPreferencesForm />
              </div>
            </Card>

            <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft">
              <div className="flex items-center gap-3 border-b border-white/40 px-6 py-4">
                <div className="rounded-lg bg-accent-100 p-2 text-accent-600">
                  <UserIcon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
                  <p className="text-sm text-gray-500">Profile and account management.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 gap-4">
                <p className="text-sm text-gray-500">
                  Visit your profile to view account details, role, and sign-in information.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/dashboard/profile')}
                  className="group shrink-0"
                >
                  View Profile
                  <ArrowRightIcon
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
