import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { SearchIcon } from '@/components/ui/icons';

interface UserFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  adminFilter: string;
  onAdminFilterChange: (val: string) => void;
}

export function UserFilters({ search, onSearchChange, statusFilter, onStatusFilterChange, adminFilter, onAdminFilterChange }: UserFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="relative">
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email"
          className="pl-10 w-64"
        />
        <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Select value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value)}>
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="disabled">Disabled</option>
      </Select>
      <Select value={adminFilter} onChange={(e) => onAdminFilterChange(e.target.value)}>
        <option value="all">All Admins</option>
        <option value="true">Admin</option>
        <option value="false">Not Admin</option>
      </Select>
    </div>
  );
}