import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useToast } from '@/contexts/ToastContext';
import { resumeService } from '@/services/firebase/firestore';
import type { Resume } from '@/types/resume.types';
import { Badge } from '@/components/ui/Badge';
import { EditIcon, TrashIcon, CopyIcon, ArrowRightIcon, ATSIcon } from '@/components/ui/icons';
import { formatDate } from '@/utils/dateUtils';

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const handleDuplicate = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const newResume = await resumeService.duplicateResume(resume.id);
      showToast('success', 'Resume duplicated');
      navigate(`/builder/${newResume.id}`);
    } catch (error) {
      showToast('error', 'Failed to duplicate resume');
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/builder/${resume.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(resume.id);
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
        {/* ATS score badge */}
        <div className="absolute right-4 top-4 z-20">
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

        {/* Main content */}
        <div className="flex flex-1 flex-col pr-10">
          <h3 className="truncate text-lg font-semibold text-gray-900">{resume.title}</h3>
          <p className="mt-1 text-sm text-gray-500">Updated {formatDate(resume.updatedAt)}</p>
        </div>

        {/* Mock mini preview bars */}
        <div className="mt-5 space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-gray-200/70" />
          <div className="h-2 w-full rounded-full bg-gray-200/70" />
          <div className="h-2 w-5/6 rounded-full bg-gray-200/70" />
          <div className="h-2 w-2/3 rounded-full bg-gray-200/70" />
        </div>

        {/* Footer actions - add relative z-10 to ensure above overlay */}
        <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/40 pt-4">
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
            aria-label="Edit resume"
          >
            Edit
            <ArrowRightIcon size={14} />
          </button>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={handleDuplicate}
              className="rounded-lg p-2 text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Duplicate resume"
            >
              <CopyIcon size={18} />
            </motion.button>
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              onClick={handleDelete}
              className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Delete resume"
            >
              <TrashIcon size={18} />
            </motion.button>
          </div>
        </div>

        {/* Overlay only behind the buttons */}
        <Link
          to={`/builder/${resume.id}`}
          className="absolute inset-0 z-0 rounded-2xl"
          aria-label={`Open ${resume.title}`}
        />
      </div>
    </motion.div>
  );
}
