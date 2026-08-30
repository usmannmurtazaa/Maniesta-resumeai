import { Link } from 'react-router-dom';
import type { AdminUser } from '@/types/admin.types';
import { formatDate } from '@/utils/dateUtils';

interface UserTableProps {
  users: AdminUser[];
}

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-[800px] w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Registered
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Last Activity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Resumes
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ATS</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Saved Jobs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Admin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full mr-2" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {user.displayName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                  )}
                  <span>{user.displayName || 'N/A'}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.resumeCount ?? 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.atsAnalysisCount ?? 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.savedJobsCount ?? 0}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${user.disabled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                >
                  {user.disabled ? 'Disabled' : 'Active'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{user.admin ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link
                  to={`/admin/users/${user.id}`}
                  className="text-primary-600 hover:text-primary-800"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
