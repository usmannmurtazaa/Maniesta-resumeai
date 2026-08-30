import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ATSScoreBadge } from './ATSScoreBadge';
import { Button } from '@/components/ui/Button';
import { SparklesIcon, ArrowRightIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

interface ATSResult {
  score: number;
  breakdown: {
    contactInfo: number;
    sectionCompleteness: number;
    actionVerbs: number;
    quantification: number;
    keywords: number;
    readability: number;
    skills: number;
    jobMatch?: number;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  warnings: string[];
}

interface ATSReportProps {
  result: ATSResult;
  onOptimize?: () => void;
  loading?: boolean;
  className?: string;
}

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

const categoryLabels: { key: keyof ATSResult['breakdown']; label: string; color: string }[] = [
  { key: 'contactInfo', label: 'Contact Info', color: 'bg-primary-500' },
  { key: 'sectionCompleteness', label: 'Sections', color: 'bg-accent-500' },
  { key: 'actionVerbs', label: 'Action Verbs', color: 'bg-yellow-500' },
  { key: 'quantification', label: 'Quantification', color: 'bg-orange-500' },
  { key: 'keywords', label: 'Keywords', color: 'bg-blue-500' },
  { key: 'readability', label: 'Readability', color: 'bg-purple-500' },
  { key: 'skills', label: 'Skills', color: 'bg-pink-500' },
];

export function ATSReport({ result, onOptimize, loading = false, className }: ATSReportProps) {
  const prefersReducedMotion = useReducedMotion();

  if (loading) {
    return (
      <div className={cn('p-6', className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="show"
      className={cn('space-y-6', className)}
    >
      {/* Overall score and action */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <ATSScoreBadge score={result.score} size="lg" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-900">ATS Score</h3>
              <p className="mt-2 text-sm text-gray-600">
                Your resume scored <span className="font-semibold">{result.score}</span> out of 100.
                {result.breakdown.jobMatch !== undefined && (
                  <>
                    {' '}
                    Job match: <span className="font-semibold">{result.breakdown.jobMatch}%</span>
                  </>
                )}
              </p>
              {onOptimize && (
                <Button onClick={onOptimize} className="mt-4 group">
                  <SparklesIcon size={16} className="mr-2" />
                  Optimize with AI
                  <ArrowRightIcon
                    size={16}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Breakdown */}
      <motion.div variants={itemVariants}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryLabels.map((cat) => {
              const value = result.breakdown[cat.key] ?? 0;
              return (
                <div key={cat.key} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{cat.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <motion.div
                      className={cn('h-full rounded-full', cat.color)}
                      initial={prefersReducedMotion ? { width: `${value}%` } : { width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Matched & Missing Keywords */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Matched Keywords</h3>
          {result.matchedKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.matchedKeywords.map((kw) => (
                <Badge key={kw} variant="success">
                  {kw}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No matched keywords.</p>
          )}
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Keywords</h3>
          {result.missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.missingKeywords.map((kw) => (
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

      {/* Recommendations & Warnings */}
      <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h3>
          {result.recommendations.length > 0 ? (
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <SparklesIcon size={16} className="text-primary-500 mt-0.5 shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No recommendations.</p>
          )}
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Warnings</h3>
          {result.warnings.length > 0 ? (
            <ul className="space-y-2">
              {result.warnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-yellow-500 mt-0.5">!</span>
                  {warning}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No warnings.</p>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}
