import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import { useToast } from '@/contexts/ToastContext';
import { PageTransition } from '@/components/common/PageTransition';
import { ResumeCard } from '@/components/dashboard/ResumeCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { PlusIcon, UploadIcon, ResumeIcon, ATSIcon, SparklesIcon, TemplateIcon } from '@/components/ui/icons';
import { ResumeUploadModal } from '@/components/dashboard/ResumeUploadModal';
import type { Resume } from '@/types/resume.types';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
            <p className="mt-1 text-sm text-gray-500">Create, manage, and optimize your resumes.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/builder')}>
              <PlusIcon size={18} className="mr-2" /> New Resume
            </Button>
            <Button variant="outline" onClick={() => setShowUpload(true)}>
              <UploadIcon size={18} className="mr-2" /> Upload Resume
            </Button>
          </div>
        </div>

        {/* Quick actions / onboarding */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary-100 p-3 text-primary-600">
                <ResumeIcon size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">Resume Builder</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">Create a professional resume with our editor.</p>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => navigate('/builder')}>
              Start Building
            </Button>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-accent-100 p-3 text-accent-600">
                <ATSIcon size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">ATS Optimizer</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">Analyze your resume against job descriptions.</p>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => navigate('/jobs')}>
              Try ATS
            </Button>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600">
                <SparklesIcon size={24} />
              </div>
              <h3 className="font-semibold text-gray-900">AI Tools</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">Improve your resume content with AI.</p>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => navigate('/builder')}>
              Open AI
            </Button>
          </Card>
        </div>

        {/* Recent resumes */}
        <h2 className="mt-10 text-xl font-semibold text-gray-900">Recent Resumes</h2>
        {resumes.length === 0 ? (
          <EmptyState
            title="No resumes yet"
            description="Create your first resume to see it here."
            icon={<ResumeIcon size={48} className="text-gray-300" />}
            action={
              <Button onClick={() => navigate('/builder')}>
                <PlusIcon size={18} className="mr-2" /> Create Resume
              </Button>
            }
          />
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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