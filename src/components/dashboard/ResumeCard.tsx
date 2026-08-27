import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/contexts/ToastContext';
import { resumeService } from '@/services/firebase/firestore';
import type { Resume } from '@/types/resume.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EditIcon, TrashIcon, CopyIcon } from '@/components/ui/icons';
import { formatDate } from '@/utils/dateUtils';

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleDuplicate = async () => {
    try {
      const newResume = await resumeService.duplicateResume(resume.id);
      showToast('success', 'Resume duplicated');
      navigate(`/builder/${newResume.id}`);
    } catch (error) {
      showToast('error', 'Failed to duplicate resume');
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{resume.title}</h3>
          <p className="text-sm text-gray-500">Updated {formatDate(resume.updatedAt)}</p>
          <p className="text-sm text-gray-500">ATS Score: {resume.atsScore ?? 'N/A'}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => navigate(`/builder/${resume.id}`)} aria-label="Edit resume">
            <EditIcon size={18} />
          </button>
          <button onClick={handleDuplicate} aria-label="Duplicate resume">
            <CopyIcon size={18} />
          </button>
          <button onClick={() => onDelete(resume.id)} aria-label="Delete resume">
            <TrashIcon size={18} className="text-red-500" />
          </button>
        </div>
      </div>
      <Link to={`/builder/${resume.id}`} className="absolute inset-0" aria-label={`Open ${resume.title}`} />
    </Card>
  );
}