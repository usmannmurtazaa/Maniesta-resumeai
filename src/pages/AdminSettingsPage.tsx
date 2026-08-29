import { PageTransition } from '@/components/common/PageTransition';
import { AdminSettings } from '@/components/admin/settings/AdminSettings';

export default function AdminSettingsPage() {
  return (
    <PageTransition>
      <AdminSettings />
    </PageTransition>
  );
}