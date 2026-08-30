import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { useAuthStore } from '@/store/authStore';
import { useResumeStore } from '@/store/resumeStore';
import { resumeService } from '@/services/firebase/firestore';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Spinner } from '@/components/ui/Spinner';
import { Skeleton } from '@/components/ui/Skeleton';
import { ATSIcon } from '@/components/ui/icons';
import type { Resume } from '@/types/resume.types';

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

export default function ATSAnalyzerPage() {
  const user = useAuthStore((s) => s.user);
  const { currentResume } = useResumeStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (user) {
      setLoadingResumes(true);
      resumeService
        .getUserResumes(user.uid)
        .then((res) => setResumes(res))
        .catch(() => setError('Failed to load resumes.'))
        .finally(() => setLoadingResumes(false));
    }
  }, [user]);

  const handleAnalyze = () => {
    const selectedResume = resumes.find((r) => r.id === selectedResumeId) || currentResume;
    if (!selectedResume) {
      setError('Please select a resume.');
      return;
    }
    setAnalyzing(true);
    setError(null);
    // Simulate slight delay for UX; actual calculation is synchronous
    setTimeout(() => {
      const analysis = calculateAtsScore(selectedResume.content, jobDescription || undefined);
      setResult(analysis);
      setAnalyzing(false);
    }, 500);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Dashboard" to="/dashboard" />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <h1 className="text-3xl font-bold text-gray-900">ATS Analyzer</h1>
            <p className="mt-2 text-gray-600">Analyze your resume against a job description.</p>
          </motion.div>

          <Card className="mt-8 p-6 space-y-5 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Resume</label>
              {loadingResumes ? (
                <Skeleton className="h-10 w-full" />
              ) : resumes.length === 0 && !currentResume ? (
                <EmptyState
                  title="No resumes available"
                  description="Create a resume first to analyze it."
                  icon={<ATSIcon size={40} className="text-gray-300" />}
                />
              ) : (
                <Select
                  value={selectedResumeId || currentResume?.id || ''}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                >
                  <option value="">Choose a resume</option>
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </Select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={6}
                placeholder="Paste job description here..."
                className="bg-white/80"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={analyzing || loadingResumes}
              className="w-full sm:w-auto"
            >
              {analyzing ? <Spinner className="mr-2" /> : <ATSIcon size={18} className="mr-2" />}
              {analyzing ? 'Analyzing...' : 'Analyze ATS Score'}
            </Button>
          </Card>

          {error && <ErrorState title="Analysis failed" message={error} onRetry={handleAnalyze} />}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Card className="mt-6 p-6 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft">
                  <h2 className="text-xl font-semibold text-gray-900">Results</h2>

                  <motion.div
                    variants={containerVariants}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="show"
                    className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {[
                      { label: 'Overall Score', value: result.score, color: 'text-primary-600' },
                      {
                        label: 'Keyword Match',
                        value: result.breakdown.keywords,
                        color: 'text-accent-600',
                      },
                      {
                        label: 'Action Verbs',
                        value: result.breakdown.actionVerbs,
                        color: 'text-yellow-600',
                      },
                      {
                        label: 'Quantification',
                        value: result.breakdown.quantification,
                        color: 'text-green-600',
                      },
                    ].map((stat) => (
                      <motion.div key={stat.label} variants={itemVariants} className="text-center">
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="show"
                    className="mt-6 space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <h3 className="font-semibold text-gray-900">Matched Keywords</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.matchedKeywords.map((kw: string) => (
                          <span
                            key={kw}
                            className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="font-semibold text-gray-900">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.missingKeywords.map((kw: string) => (
                          <span
                            key={kw}
                            className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h3 className="font-semibold text-gray-900">Recommendations</h3>
                      <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
                        {result.recommendations.map((rec: string, i: number) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
