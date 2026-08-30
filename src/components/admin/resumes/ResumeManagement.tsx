import { useEffect, useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { ResumeTable } from './ResumeTable';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';

export function ResumeManagement() {
  const { userResumes, setUserResumes, loading, setLoading } = useAdminStore();
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('userId');
    setUserId(uid);
    if (uid) {
      setLoading('resumes', true);
      adminService
        .getUserResumes(uid)
        .then(({ resumes }) => setUserResumes(resumes))
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load resumes'))
        .finally(() => setLoading('resumes', false));
    }
  }, [setLoading, setUserResumes]);

  if (loading.resumes) {
    return <TableSkeleton rows={5} columns={5} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error loading resumes"
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!userId) {
    return (
      <EmptyState
        title="Select a user"
        description="Choose a user from the Users page to view their resumes."
      />
    );
  }

  if (userResumes.length === 0) {
    return (
      <EmptyState
        title="No resumes found"
        description="This user has not created any resumes yet."
      />
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resumes for User</h2>
      <ResumeTable resumes={userResumes} />
    </div>
  );
}
