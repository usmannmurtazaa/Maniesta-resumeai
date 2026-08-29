import { PageTransition } from '@/components/common/PageTransition';
import { ResumeManagement } from '@/components/admin/resumes/ResumeManagement';

export default function AdminResumesPage() {
  return (
    <PageTransition>
      <ResumeManagement />
    </PageTransition>
  );
}