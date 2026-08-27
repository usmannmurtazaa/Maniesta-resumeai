import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type { JobFilters as Filters } from '@/types/job.types';

interface JobFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const applyFilters = () => {
    onFilterChange({
      search: search || undefined,
      category: category || undefined,
      location: location || undefined,
      workMode: (workMode as Filters['workMode']) || undefined,
      employmentType: (employmentType as Filters['employmentType']) || undefined,
      experienceLevel: (experienceLevel as Filters['experienceLevel']) || undefined,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-1 sm:col-span-2"
        />
        <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Select value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
          <option value="">Work Mode</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">On-site</option>
        </Select>
        <Select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
          <option value="">Employment Type</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="freelance">Freelance</option>
        </Select>
        <Select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
          <option value="">Experience Level</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
          <option value="lead">Lead</option>
          <option value="executive">Executive</option>
        </Select>
      </div>
      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
}