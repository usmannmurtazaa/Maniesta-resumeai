import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/dateUtils';

export function AdminSettings() {
  const { user, isAdmin } = useAuthStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Display Name</p>
              <p className="font-medium text-gray-900">{user?.displayName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium text-gray-900 break-all">{user?.uid || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Sign In</p>
              <p className="font-medium text-gray-900">
                {user?.metadata?.lastSignInTime
                  ? formatDate(new Date(user.metadata.lastSignInTime))
                  : 'N/A'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Role & Permissions</h2>
          <div className="mt-4 flex items-center gap-3">
            <Badge variant={isAdmin ? 'success' : 'default'}>
              {isAdmin ? 'Administrator' : 'Standard User'}
            </Badge>
            {isAdmin && (
              <span className="text-sm text-gray-500">
                Full access to admin dashboard and management functions.
              </span>
            )}
          </div>
          <div className="mt-6">
            <h3 className="font-medium text-gray-900">Available Permissions</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>Manage users</li>
              <li>View all resumes</li>
              <li>Monitor ATS analyses</li>
              <li>Create and manage jobs</li>
              <li>View notifications</li>
              <li>Access analytics</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
