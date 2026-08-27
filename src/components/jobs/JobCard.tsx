import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobs/jobService';
import { Badge } from '@/components/ui/Badge';
import { BookmarkIcon } from '@/components/ui/icons';
import type { Job } from '@/types/job.types';
import { formatDate } from '@/utils/dateUtils';

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

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = async () => {
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
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        {job.companyLogo ? (
          <img src={job.companyLogo} alt={`${job.companyName} logo`} className="h-12 w-12 rounded-lg object-cover" />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            {job.companyName.charAt(0)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500">{job.companyName}</p>
            </div>
            {job.featured && <Badge variant="warning">Featured</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
            <span>{job.location}</span>
            <span>{job.workMode}</span>
            <span>{job.employmentType}</span>
            <span>{job.experienceLevel}</span>
            {job.salary && <span>{job.salary}</span>}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {job.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          {job.publishedAt && (
            <p className="mt-2 text-xs text-gray-400">Published {formatDate(job.publishedAt)}</p>
          )}
        </div>
        {showSaveButton && user && (
          <button
            onClick={handleSave}
            disabled={saving}
            className={`ml-2 rounded-full p-2 transition-colors ${
              saved ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-300 hover:text-yellow-500'
            }`}
            aria-label={saved ? 'Unsave job' : 'Save job'}
          >
            <BookmarkIcon size={20} />
          </button>
        )}
      </div>
      <Link to={`/jobs/${job.id}`} className="absolute inset-0" aria-label={`View ${job.title}`} />
    </motion.div>
  );
}