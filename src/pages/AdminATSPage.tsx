import { PageTransition } from '@/components/common/PageTransition';
import { ATSManagement } from '@/components/admin/ats/ATSManagement';

export default function AdminATSPage() {
  return (
    <PageTransition>
      <ATSManagement />
    </PageTransition>
  );
}