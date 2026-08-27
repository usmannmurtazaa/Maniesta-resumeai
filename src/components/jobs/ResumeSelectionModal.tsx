import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import type { Resume } from '@/types/resume.types';
import type { Job } from '@/types/job.types';

interface Props {
  job: Job;
  onClose: () => void;
}

export function ResumeSelectionModal({ job, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      resumeService.getUserResumes(user.uid).then((res) => {
        setResumes(res);
        setLoading(false);
      });
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
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Select Resume for Optimization</h3>
        {loading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : resumes.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">You do not have any resumes yet.</p>
            <Button onClick={handleCreateNew}>Create New Resume</Button>
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {resumes.map((resume) => (
              <button
                key={resume.id}
                onClick={() => handleSelect(resume.id)}
                className="block w-full text-left p-3 rounded-lg border hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <p className="font-medium">{resume.title}</p>
                <p className="text-sm text-gray-500">ATS Score: {resume.atsScore ?? 'N/A'}</p>
              </button>
            ))}
            <Button variant="outline" onClick={handleCreateNew} className="w-full mt-2">
              Create New Resume
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}