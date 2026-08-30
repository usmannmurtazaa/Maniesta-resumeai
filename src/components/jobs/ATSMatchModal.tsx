import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { ATSScoreBadge } from '@/components/ats/ATSScoreBadge';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import { ResumeIcon, ArrowRightIcon, SparklesIcon } from '@/components/ui/icons';
import type { Job } from '@/types/job.types';
import type { Resume } from '@/types/resume.types';
import { cn } from '@/utils/cn';

interface Props {
  job: Job;
  onClose: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export function ATSMatchModal({ job, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (user) {
      resumeService.getUserResumes(user.uid).then((res) => {
        setResumes(res);
        setLoading(false);
        if (res.length > 0) setSelectedResume(res[0]);
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedResume && job) {
      setCalculating(true);
      // Simulate slight async for UX; actual calc is sync
      const timer = setTimeout(() => {
        const result = calculateAtsScore(selectedResume.content, job.description);
        setMatchResult(result);
        setCalculating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedResume, job]);

  if (loading) {
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center justify-center p-8">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-gray-500">Loading your resumes...</p>
        </div>
      </Modal>
    );
  }

  if (resumes.length === 0) {
    return (
      <Modal onClose={onClose}>
        <div className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            <ResumeIcon size={32} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No resume yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            You need a resume to check ATS match for this job.
          </p>
          <Link to={`/builder?jobId=${job.id}`} className="mt-6 inline-block">
            <Button className="group">
              Create Resume
              <ArrowRightIcon
                size={16}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-6 sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600 shadow-soft">
            <SparklesIcon size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">ATS Match</h3>
            <p className="mt-1 text-sm text-gray-500">
              Check your resume against{' '}
              <span className="font-medium text-gray-700">{job.title}</span>.
            </p>
          </div>
        </div>

        {/* Resume selector */}
        <div className="mb-6">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Select Resume</label>
          <Select
            value={selectedResume?.id}
            onChange={(e) =>
              setSelectedResume(resumes.find((r) => r.id === e.target.value) || null)
            }
            className="bg-white/60"
          >
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.title}
              </option>
            ))}
          </Select>
        </div>

        {/* Result */}
        {calculating ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Spinner size="lg" />
            <p className="mt-4 text-sm text-gray-500">Calculating ATS match...</p>
          </div>
        ) : matchResult ? (
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="space-y-6"
          >
            {/* Overall score */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <ATSScoreBadge score={matchResult.score} size="lg" />
            </motion.div>

            {/* Keyword matches */}
            <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Matched Keywords</h4>
                {matchResult.matchedKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matchedKeywords.map((kw: string) => (
                      <Badge key={kw} variant="success">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No matched keywords.</p>
                )}
              </Card>
              <Card className="p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Missing Keywords</h4>
                {matchResult.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.missingKeywords.map((kw: string) => (
                      <Badge key={kw} variant="danger">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No missing keywords.</p>
                )}
              </Card>
            </motion.div>

            {/* Recommendations */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Recommendations</h4>
              <Card className="p-4">
                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {matchResult.recommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Action */}
            <motion.div variants={itemVariants} className="flex justify-end">
              {selectedResume && (
                <Link
                  to={`/builder/${selectedResume.id}?jobId=${job.id}`}
                  className="group inline-flex items-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:shadow-glass focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <SparklesIcon size={16} className="mr-2" />
                  Optimize This Resume
                  <ArrowRightIcon
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </motion.div>
    </Modal>
  );
}
