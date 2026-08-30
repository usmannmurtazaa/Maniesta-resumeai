import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import { useToast } from '@/contexts/ToastContext';
import { PageTransition } from '@/components/common/PageTransition';
import { ResumeCard } from '@/components/dashboard/ResumeCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { PlusIcon, UploadIcon, ResumeIcon, ATSIcon, SparklesIcon } from '@/components/ui/icons';
import { ResumeUploadModal } from '@/components/dashboard/ResumeUploadModal';
import type { Resume } from '@/types/resume.types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (user) {
      resumeService
        .getUserResumes(user.uid)
        .then((res) => setResumes(res))
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load resumes'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
      setDeleteId(null); // <-- clear dialog
      showToast('success', 'Resume deleted');
    } catch (error) {
      setDeleteId(null); // <-- clear dialog even on error
      showToast('error', 'Failed to delete resume');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <ErrorState
            title="Error loading resumes"
            message={error}
            onRetry={() => window.location.reload()}
          />
        </div>
      </PageTransition>
    );
  }

  const animationProps = prefersReducedMotion
    ? {}
    : { variants: containerVariants, initial: 'hidden', animate: 'show' };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create, manage, and optimize your resumes.
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/builder')} className="relative group">
                <PlusIcon size={18} className="mr-2 transition-transform group-hover:rotate-90" />
                New Resume
              </Button>
              <Button variant="outline" onClick={() => setShowUpload(true)}>
                <UploadIcon size={18} className="mr-2" />
                Upload Resume
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: <ResumeIcon size={24} className="text-primary-600" />,
                bg: 'bg-primary-100',
                title: 'Resume Builder',
                desc: 'Create a professional resume with our editor.',
                action: () => navigate('/builder'),
                cta: 'Start Building',
              },
              {
                icon: <ATSIcon size={24} className="text-accent-600" />,
                bg: 'bg-accent-100',
                title: 'ATS Optimizer',
                desc: 'Analyze your resume against job descriptions.',
                action: () => navigate('/jobs'),
                cta: 'Try ATS',
              },
              {
                icon: <SparklesIcon size={24} className="text-yellow-600" />,
                bg: 'bg-yellow-100',
                title: 'AI Tools',
                desc: 'Improve your resume content with AI.',
                action: () => navigate('/builder'),
                cta: 'Open AI',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                <Card className="h-full p-6 hover:shadow-glass transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl ${item.bg} p-3`}>{item.icon}</div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                  <Button variant="ghost" size="sm" className="mt-4" onClick={item.action}>
                    {item.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            variants={itemVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="mt-10 text-xl font-semibold text-gray-900"
          >
            Recent Resumes
          </motion.h2>
          {resumes.length === 0 ? (
            <EmptyState
              title="No resumes yet"
              description="Create your first resume to see it here."
              icon={<ResumeIcon size={48} className="text-gray-300" />}
              action={
                <Button onClick={() => navigate('/builder')}>
                  <PlusIcon size={18} className="mr-2" /> Create Resume
                </Button>
              }
            />
          ) : (
            <motion.div
              variants={containerVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="show"
              className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {resumes.map((resume) => (
                <motion.div key={resume.id} variants={itemVariants}>
                  <ResumeCard resume={resume} onDelete={(id) => setDeleteId(id)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        open={!!deleteId}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? This action cannot be undone."
        onConfirm={() => deleteId && handleDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
      {showUpload && <ResumeUploadModal onClose={() => setShowUpload(false)} />}
    </PageTransition>
  );
}
