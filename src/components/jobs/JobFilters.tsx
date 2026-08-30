import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { SearchIcon, FilterIcon, XIcon, ChevronIcon } from '@/components/ui/icons';
import type { JobFilters as Filters } from '@/types/job.types';
import { cn } from '@/utils/cn';

interface JobFiltersProps {
  onFilterChange: (filters: Filters) => void;
  className?: string;
}

export function JobFilters({ onFilterChange, className }: JobFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const hasActiveFilters =
    search || category || location || workMode || employmentType || experienceLevel;

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

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setLocation('');
    setWorkMode('');
    setEmploymentType('');
    setExperienceLevel('');
    onFilterChange({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFilters();
    }
  };

  return (
    <Card
      className={cn(
        'overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-5">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-900 focus:outline-none"
          aria-expanded={isExpanded}
        >
          <span className="rounded-lg bg-primary-100 p-2 text-primary-600">
            <FilterIcon size={16} />
          </span>
          Filters
          <ChevronIcon
            size={16}
            className={cn(
              'text-gray-400 transition-transform duration-200',
              isExpanded ? 'rotate-90' : ''
            )}
          />
        </button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <XIcon size={14} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      <motion.div
        initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="border-t border-gray-100 px-4 pb-5 pt-4 sm:px-5">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
            onKeyDown={handleKeyDown}
          >
            <div className="relative sm:col-span-2">
              <SearchIcon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white/60"
                aria-label="Search jobs"
              />
            </div>

            <Input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white/60"
              aria-label="Filter by category"
            />

            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/60"
              aria-label="Filter by location"
            />

            <Select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="bg-white/60"
              aria-label="Filter by work mode"
            >
              <option value="">Work Mode</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-site</option>
            </Select>

            <Select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="bg-white/60"
              aria-label="Filter by employment type"
            >
              <option value="">Employment Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </Select>

            <Select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="bg-white/60"
              aria-label="Filter by experience level"
            >
              <option value="">Experience Level</option>
              <option value="entry">Entry</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="executive">Executive</option>
            </Select>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button onClick={applyFilters} className="group">
              <SearchIcon size={16} className="mr-2 transition-transform group-hover:scale-110" />
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                <XIcon size={16} className="mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
