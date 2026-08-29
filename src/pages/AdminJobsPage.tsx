import { PageTransition } from '@/components/common/PageTransition';
import { JobManagement } from '@/components/admin/jobs/JobManagement';

export default function AdminJobsPage() {
  return (
    <PageTransition>
      <JobManagement />
    </PageTransition>
  );
}