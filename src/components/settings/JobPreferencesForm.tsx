import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/user/userService';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import type { JobPreferences } from '@/types/job.types';

const preferencesSchema = z.object({
  categories: z.array(z.string()).default([]),
  locations: z.array(z.string()).default([]),
  workModes: z.array(z.enum(['remote', 'hybrid', 'onsite'])).default([]),
  experienceLevels: z.array(z.enum(['entry', 'mid', 'senior', 'lead', 'executive'])).default([]),
  employmentTypes: z.array(z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance'])).default([]),
  skills: z.array(z.string()).default([]),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

// Static option lists – these should eventually be replaced by dynamic data from Firestore.
const CATEGORY_OPTIONS = ['Engineering', 'Design', 'Marketing', 'Sales', 'Product', 'Data', 'Customer Support', 'Finance'];
const LOCATION_OPTIONS = ['Remote', 'Hybrid', 'New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago', 'London', 'Berlin'];
const WORK_MODE_OPTIONS = ['remote', 'hybrid', 'onsite'] as const;
const EXPERIENCE_LEVEL_OPTIONS = ['entry', 'mid', 'senior', 'lead', 'executive'] as const;
const EMPLOYMENT_TYPE_OPTIONS = ['full-time', 'part-time', 'contract', 'internship', 'freelance'] as const;

export function JobPreferencesForm() {
  const user = useAuthStore((s) => s.user);
  const { register, handleSubmit, formState: { isSubmitting, isDirty }, setValue } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      categories: [],
      locations: [],
      workModes: [],
      experienceLevels: [],
      employmentTypes: [],
      skills: [],
    },
  });

  useEffect(() => {
    if (user) {
      userService.getUserData(user.uid).then((data) => {
        if (data?.jobPreferences) {
          const prefs = data.jobPreferences as JobPreferences;
          setValue('categories', prefs.categories || []);
          setValue('locations', prefs.locations || []);
          setValue('workModes', prefs.workModes || []);
          setValue('experienceLevels', prefs.experienceLevels || []);
          setValue('employmentTypes', prefs.employmentTypes || []);
          setValue('skills', prefs.skills || []);
        }
      });
    }
  }, [user, setValue]);

  const onSubmit = async (data: PreferencesFormData) => {
    if (!user) return;
    await userService.updateJobPreferences(user.uid, data);
    // Optionally show a toast notification.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium text-gray-900">Categories</h3>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
          {CATEGORY_OPTIONS.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <Checkbox {...register('categories')} value={category} />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div>
        <h3 className="font-medium text-gray-900">Locations</h3>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
          {LOCATION_OPTIONS.map((location) => (
            <label key={location} className="flex items-center space-x-2">
              <Checkbox {...register('locations')} value={location} />
              <span>{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Modes */}
      <div>
        <h3 className="font-medium text-gray-900">Work Mode</h3>
        <div className="mt-2 flex flex-wrap gap-4">
          {WORK_MODE_OPTIONS.map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <Checkbox {...register('workModes')} value={mode} />
              <span>{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Levels */}
      <div>
        <h3 className="font-medium text-gray-900">Experience Level</h3>
        <div className="mt-2 flex flex-wrap gap-4">
          {EXPERIENCE_LEVEL_OPTIONS.map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <Checkbox {...register('experienceLevels')} value={level} />
              <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employment Types */}
      <div>
        <h3 className="font-medium text-gray-900">Employment Type</h3>
        <div className="mt-2 flex flex-wrap gap-4">
          {EMPLOYMENT_TYPE_OPTIONS.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <Checkbox {...register('employmentTypes')} value={type} />
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-medium text-gray-900">Skills</h3>
        <p className="text-sm text-gray-500 mt-1">Enter comma-separated skills you want alerts for.</p>
        <input
          {...register('skills')}
          placeholder="React, TypeScript, Node.js"
          className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </form>
  );
}