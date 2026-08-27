import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function JobFilters({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input placeholder="Search jobs..." onChange={(e) => onFilterChange({ search: e.target.value })} />
      <Select onChange={(e) => onFilterChange({ status: e.target.value })} defaultValue="">
        <option value="">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="scheduled">Scheduled</option>
      </Select>
      <Select onChange={(e) => onFilterChange({ featured: e.target.value })} defaultValue="">
        <option value="">All Featured</option>
        <option value="true">Featured</option>
        <option value="false">Not Featured</option>
      </Select>
    </div>
  );
}