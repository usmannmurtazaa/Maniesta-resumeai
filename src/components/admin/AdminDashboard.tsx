import { useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { UsersIcon, ResumeIcon, ATSIcon, JobsIcon, NotificationIcon } from '@/components/ui/icons';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminDashboard() {
  const { analytics, setAnalytics, setLoading, loading, error, setError } = useAdminStore();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading('analytics', true);
      try {
        const data = await adminService.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading('analytics', false);
      }
    };
    fetchAnalytics();
  }, [setAnalytics, setLoading, setError]);

  if (loading.analytics && !analytics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-24" />)}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!analytics) return null;

  const stats = [
    { label: 'Total Users', value: analytics.users.total, icon: UsersIcon },
    { label: 'Total Resumes', value: analytics.resumes.total, icon: ResumeIcon },
    { label: 'ATS Analyses', value: analytics.ats.totalAnalyses, icon: ATSIcon },
    { label: 'Published Jobs', value: analytics.jobs.published, icon: JobsIcon },
    { label: 'Scheduled Jobs', value: analytics.jobs.scheduled, icon: JobsIcon },
    { label: 'Featured Jobs', value: analytics.jobs.featured, icon: JobsIcon },
    { label: 'Saved Jobs', value: analytics.jobs.savedByUsers, icon: NotificationIcon },
    { label: 'Unread Notifications', value: 0, icon: NotificationIcon }, // placeholder, later
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 flex items-center">
            <stat.icon size={24} className="text-primary-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}