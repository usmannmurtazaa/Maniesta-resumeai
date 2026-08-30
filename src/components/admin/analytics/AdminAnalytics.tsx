import { useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { Card } from '@/components/ui/Card';

export function AdminAnalytics() {
  const { analytics, setAnalytics, loading, setLoading } = useAdminStore();

  useEffect(() => {
    setLoading('analytics', true);
    adminService
      .getAnalytics()
      .then((data) => setAnalytics(data))
      .finally(() => setLoading('analytics', false));
  }, [setAnalytics, setLoading]);

  if (loading.analytics) return <div>Loading analytics...</div>;
  if (!analytics) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-medium">Users</h3>
          <p>Total: {analytics.users.total}</p>
          <p>New Today: {analytics.users.newToday}</p>
          <p>New This Week: {analytics.users.newThisWeek}</p>
          <p>New This Month: {analytics.users.newThisMonth}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium">Resumes</h3>
          <p>Total: {analytics.resumes.total}</p>
          <p>Created Today: {analytics.resumes.createdToday}</p>
          <p>Created This Week: {analytics.resumes.createdThisWeek}</p>
          <p>Created This Month: {analytics.resumes.createdThisMonth}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium">ATS</h3>
          <p>Analyses: {analytics.ats.totalAnalyses}</p>
          <p>Average Score: {analytics.ats.averageScore}</p>
          <p>Job Matches: {analytics.ats.jobMatches}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-medium">Jobs</h3>
          <p>Total: {analytics.jobs.total}</p>
          <p>Published: {analytics.jobs.published}</p>
          <p>Scheduled: {analytics.jobs.scheduled}</p>
          <p>Featured: {analytics.jobs.featured}</p>
          <p>Saved by Users: {analytics.jobs.savedByUsers}</p>
        </Card>
      </div>
    </div>
  );
}
