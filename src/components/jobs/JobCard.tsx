import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobs/jobService';
import { Badge } from '@/components/ui/Badge';
import { BookmarkIcon } from '@/components/ui/icons';
import type { Job } from '@/types/job.types';
import { formatDate } from '@/utils/dateUtils';
import { cn } from '@/utils/cn';

interface JobCardProps {
  job: Job;
  showSaveButton?: boolean;
  isSaved?: boolean;
  onUnsave?: (jobId: string) => void;
}

export function JobCard({ job, showSaveButton = true, isSaved = false, onUnsave }: JobCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [saving, setSaving] = useState(false);
  const user = useAuthStore((s) => s.user);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setSaving(true);
    try {
      if (saved) {
        await jobService.unsaveJob(user.uid, job.id);
        setSaved(false);
        onUnsave?.(job.id);
      } else {
        await jobService.saveJob(user.uid, job.id);
        setSaved(true);
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative h-full"
    >
      <div className="relative flex h-full flex-col rounded-2xl border border-white/40 bg-white/70 p-5 shadow-soft backdrop-blur-md transition-all duration-300 hover:shadow-glass">
        {/* Save button */}
        {showSaveButton && user && (
          <motion.button
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            onClick={handleSave}
            disabled={saving}
            className={cn(
              'absolute right-4 top-4 z-20 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
              saved
                ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600'
                : 'bg-gray-50 text-gray-300 hover:bg-yellow-50 hover:text-yellow-500'
            )}
            aria-label={saved ? 'Unsave job' : 'Save job'}
          >
            <BookmarkIcon size={18} />
          </motion.button>
        )}

        <div className="flex items-start gap-4 pr-10">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={`${job.companyName} logo`}
              className="h-14 w-14 shrink-0 rounded-xl object-cover ring-1 ring-black/5 shadow-soft"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 text-lg font-bold text-primary-600">
              {job.companyName.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                {job.title}
              </h3>
              {job.featured && <Badge variant="warning">Featured</Badge>}
            </div>
            <p className="mt-0.5 text-sm text-gray-500">{job.companyName}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-600">
          <span>{job.location}</span>
          <span className="text-gray-300">•</span>
          <span>{job.workMode}</span>
          <span className="text-gray-300">•</span>
          <span>{job.employmentType}</span>
          <span className="text-gray-300">•</span>
          <span>{job.experienceLevel}</span>
          {job.salary && <span className="font-medium text-gray-700">{job.salary}</span>}
        </div>

        {job.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-white/40 pt-3">
          <p className="text-xs text-gray-400">
            {job.publishedAt ? `Published ${formatDate(job.publishedAt)}` : ''}
          </p>
          <span className="text-xs font-medium text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            View Details
          </span>
        </div>

        {/* Clickable overlay for details – kept below buttons */}
        <Link
          to={`/jobs/${job.id}`}
          className="absolute inset-0 z-0"
          aria-label={`View ${job.title}`}
        />
      </div>
    </motion.div>
  );
}
