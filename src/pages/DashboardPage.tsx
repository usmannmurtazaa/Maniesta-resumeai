import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import { useToast } from '@/contexts/ToastContext';
import { PageTransition } from '@/components/common/PageTransition';
import { ResumeCard } from '@/components/dashboard/ResumeCard';
import { Button } from '@/components/ui/Button';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { PlusIcon, UploadIcon } from '@/components/ui/icons';
import { ResumeUploadModal } from '@/components/dashboard/ResumeUploadModal';
import type { Resume } from '@/types/resume.types';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const { showToast } = useToast();

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
    await resumeService.deleteResume(id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
    setDeleteId(null);
    showToast('success', 'Resume deleted');
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <ErrorState title="Error loading resumes" message={error} onRetry={() => window.location.reload()} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <div className="flex space-x-2">
            <Button onClick={() => window.location.href = '/builder'}>
              <PlusIcon size={18} className="mr-2" /> New Resume
            </Button>
            <Button variant="outline" onClick={() => setShowUpload(true)}>
              <UploadIcon size={18} className="mr-2" /> Upload Resume
            </Button>
          </div>
        </div>
        {resumes.length === 0 ? (
          <EmptyState title="No resumes yet" description="Create your first resume or upload an existing one." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} onDelete={(id) => setDeleteId(id)} />
            ))}
          </div>
        )}
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