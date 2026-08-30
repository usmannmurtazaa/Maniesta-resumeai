import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import { ResumeIcon, PlusIcon, ArrowRightIcon, ATSIcon } from '@/components/ui/icons';
import type { Resume } from '@/types/resume.types';
import type { Job } from '@/types/job.types';
import { cn } from '@/utils/cn';

interface Props {
  job: Job;
  onClose: () => void;
}

export function ResumeSelectionModal({ job, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (user) {
      resumeService
        .getUserResumes(user.uid)
        .then((res) => setResumes(res))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleSelect = (resumeId: string) => {
    navigate(`/builder/${resumeId}?jobId=${job.id}`);
    onClose();
  };

  const handleCreateNew = () => {
    navigate(`/builder?jobId=${job.id}`);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 shadow-soft">
            <ResumeIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Select Resume</h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a resume to optimize for{' '}
              <span className="font-medium text-gray-700">{job.title}</span> at{' '}
              <span className="font-medium text-gray-700">{job.companyName}</span>.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" />
            <p className="mt-4 text-sm text-gray-500">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center"
          >
            <ResumeIcon size={48} className="mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No resumes yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create your first resume to start optimizing for this job.
            </p>
            <Button onClick={handleCreateNew} className="mt-6 group">
              <PlusIcon size={16} className="mr-2 transition-transform group-hover:rotate-90" />
              Create New Resume
            </Button>
          </motion.div>
        ) : (
          <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
            <AnimatePresence>
              {resumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleSelect(resume.id)}
                    className={cn(
                      'group flex w-full items-center justify-between rounded-xl border border-white/40 bg-white/70 p-4 text-left shadow-soft backdrop-blur-sm transition-all duration-200',
                      'hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-glass',
                      'focus:outline-none focus:ring-2 focus:ring-primary-500'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary-50 p-2 text-primary-600">
                        <ResumeIcon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{resume.title}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            variant={
                              resume.atsScore && resume.atsScore >= 70
                                ? 'success'
                                : resume.atsScore
                                  ? 'warning'
                                  : 'neutral'
                            }
                            size="sm"
                          >
                            <ATSIcon size={12} />
                            {resume.atsScore ?? 'N/A'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <ArrowRightIcon
                      size={18}
                      className="text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600"
                    />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button variant="outline" onClick={handleCreateNew} className="w-full group">
              <PlusIcon size={16} className="mr-2 transition-transform group-hover:rotate-90" />
              Create New Resume
            </Button>
          </div>
        )}
      </motion.div>
    </Modal>
  );
}
