import { useEffect, useState, useCallback } from 'react';
import { useJobStore } from '@/store/jobStore';
import { adminService } from '@/services/admin/adminService';
import { JobTable } from './JobTable';
import { JobForm } from './JobForm';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PlusIcon } from '@/components/ui/icons';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';

export function JobManagement() {
  const { jobs, setJobs, loading, setLoading } = useJobStore();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const allJobs = await adminService.getJobs();
      setJobs(allJobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (jobId: string) => {
    try {
      await adminService.deleteJob(jobId);
      fetchJobs();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading && jobs.length === 0) {
    return <TableSkeleton rows={8} columns={7} />;
  }

  if (error) {
    return <ErrorState title="Error loading jobs" message={error} onRetry={fetchJobs} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Job Management</h2>
        <Button
          onClick={() => {
            setEditingJob(null);
            setShowForm(true);
          }}
        >
          <PlusIcon size={18} className="mr-2" /> Create Job
        </Button>
      </div>
      {jobs.length === 0 ? (
        <EmptyState
          title="No jobs yet"
          description="Create your first job post to get started."
          action={
            <Button
              onClick={() => {
                setEditingJob(null);
                setShowForm(true);
              }}
            >
              Create Job
            </Button>
          }
        />
      ) : (
        <JobTable
          jobs={jobs}
          onEdit={(job) => {
            setEditingJob(job);
            setShowForm(true);
          }}
          onDelete={(id) => setDeleteConfirm(id)}
        />
      )}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <JobForm
            initialData={editingJob}
            onSuccess={() => {
              setShowForm(false);
              fetchJobs();
            }}
          />
        </Modal>
      )}
      {deleteConfirm && (
        <Modal onClose={() => setDeleteConfirm(null)}>
          <div className="p-4">
            <p>Are you sure you want to delete this job?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
