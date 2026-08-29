import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { UserDetail } from '@/components/admin/users/UserDetail';

export default function AdminUserDetailPage() {
  return (
    <PageTransition>
      <div>
        <BackButton label="Back to Users" to="/admin/users" />
        <UserDetail />
      </div>
    </PageTransition>
  );
}