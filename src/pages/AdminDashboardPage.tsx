import { PageTransition } from '@/components/common/PageTransition';
import { useAdminStore } from '@/store/adminStore';
import { useEffect } from 'react';
import { adminService } from '@/services/admin/adminService';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboardPage() {
  const { analytics, setAnalytics, loading, setLoading } = useAdminStore();

  useEffect(() => {
    setLoading('analytics', true);
    adminService.getAnalytics()
      .then(setAnalytics)
      .finally(() => setLoading('analytics', false));
  }, [setAnalytics, setLoading]);

  if (loading.analytics && !analytics) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-5">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics?.users.total ?? 0}</p>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-medium text-gray-500">Total Resumes</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics?.resumes.total ?? 0}</p>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-medium text-gray-500">Published Jobs</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{analytics?.jobs.published ?? 0}</p>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}