import { PageTransition } from '@/components/common/PageTransition';
import { UserManagement } from '@/components/admin/users/UserManagement';

export default function AdminUsersPage() {
  return (
    <PageTransition>
      <UserManagement />
    </PageTransition>
  );
}