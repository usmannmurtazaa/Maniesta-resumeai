import { useEffect, useCallback, useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { UserTable } from './UserTable';
import { UserFilters } from './UserFilters';
import { Button } from '@/components/ui/Button';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/common/EmptyState';

export function UserManagement() {
  const { users, usersPagination, loading, error, setUsers, setLoading, setError } =
    useAdminStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');

  const fetchUsers = useCallback(
    async (reset = false) => {
      setLoading('users', true);
      try {
        const filters: any = { limit: 20 };
        if (search) filters.search = search;
        if (statusFilter !== 'all') filters.status = statusFilter;
        if (adminFilter !== 'all') filters.admin = adminFilter;
        if (reset) {
          filters.startAfter = undefined;
        } else if (usersPagination.lastVisible) {
          filters.startAfter = usersPagination.lastVisible;
        }
        const { users: newUsers, lastVisible } = await adminService.getUsers(filters);
        setUsers(newUsers, lastVisible, !!lastVisible);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading('users', false);
      }
    },
    [search, statusFilter, adminFilter, usersPagination.lastVisible, setUsers, setLoading, setError]
  );

  useEffect(() => {
    fetchUsers(true);
  }, [fetchUsers]);

  if (loading.users && users.length === 0) {
    return <TableSkeleton rows={8} columns={6} />;
  }

  if (error) {
    return (
      <div className="py-12">
        <EmptyState
          title="Error loading users"
          description={error}
          action={<Button onClick={() => fetchUsers(true)}>Retry</Button>}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={() => fetchUsers(true)}>Refresh</Button>
      </div>
      <UserFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        adminFilter={adminFilter}
        onAdminFilterChange={setAdminFilter}
      />
      {users.length === 0 ? (
        <EmptyState title="No users found" description="Try adjusting your search or filters." />
      ) : (
        <>
          <UserTable users={users} />
          {usersPagination.hasMore && (
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => fetchUsers(false)} disabled={loading.users}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
