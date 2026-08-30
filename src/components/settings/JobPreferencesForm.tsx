import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/user/userService';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useToast } from '@/contexts/ToastContext';
import { SaveIcon, SparklesIcon } from '@/components/ui/icons';
import type { JobPreferences } from '@/types/job.types';
import { cn } from '@/utils/cn';

const preferencesSchema = z.object({
  categories: z.array(z.string()).default([]),
  locations: z.array(z.string()).default([]),
  workModes: z.array(z.enum(['remote', 'hybrid', 'onsite'])).default([]),
  experienceLevels: z.array(z.enum(['entry', 'mid', 'senior', 'lead', 'executive'])).default([]),
  employmentTypes: z
    .array(z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']))
    .default([]),
  skills: z.array(z.string()).default([]),
});

type PreferencesFormData = z.infer<typeof preferencesSchema>;

const CATEGORY_OPTIONS = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Product',
  'Data',
  'Customer Support',
  'Finance',
];

const LOCATION_OPTIONS = [
  'Remote',
  'Hybrid',
  'New York',
  'San Francisco',
  'Austin',
  'Seattle',
  'Chicago',
  'London',
  'Berlin',
];

const WORK_MODE_OPTIONS = ['remote', 'hybrid', 'onsite'] as const;
const EXPERIENCE_LEVEL_OPTIONS = ['entry', 'mid', 'senior', 'lead', 'executive'] as const;
const EMPLOYMENT_TYPE_OPTIONS = [
  'full-time',
  'part-time',
  'contract',
  'internship',
  'freelance',
] as const;

export function JobPreferencesForm() {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    setValue,
    watch,
  } = useForm<PreferencesFormData>({
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

  const skillsValue = watch('skills');

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
    setSaving(true);
    try {
      await userService.updateJobPreferences(user.uid, data);
      showToast('success', 'Job preferences saved');
    } catch (error) {
      showToast('error', 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const renderCheckboxGroup = (
    title: string,
    options: readonly string[],
    fieldName: any,
    selectedValues: string[]
  ) => (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-white/40 bg-white/50 p-4 shadow-soft backdrop-blur-sm"
    >
      <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
        <SparklesIcon size={16} className="text-primary-500" />
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <label
            key={option}
            className="group flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-colors hover:bg-primary-50/50"
          >
            <Checkbox
              {...register(fieldName)}
              value={option}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-primary-700">
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {renderCheckboxGroup('Categories', CATEGORY_OPTIONS, 'categories', watch('categories'))}
        {renderCheckboxGroup('Locations', LOCATION_OPTIONS, 'locations', watch('locations'))}
        {renderCheckboxGroup('Work Mode', WORK_MODE_OPTIONS, 'workModes', watch('workModes'))}
        {renderCheckboxGroup(
          'Experience Level',
          EXPERIENCE_LEVEL_OPTIONS,
          'experienceLevels',
          watch('experienceLevels')
        )}
        {renderCheckboxGroup(
          'Employment Type',
          EMPLOYMENT_TYPE_OPTIONS,
          'employmentTypes',
          watch('employmentTypes')
        )}
      </div>

      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Skills</label>
        <Input
          placeholder="React, TypeScript, Node.js"
          value={skillsValue.join(', ')}
          onChange={(e) => {
            const skills = e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean);
            setValue('skills', skills, { shouldDirty: true });
          }}
          className="bg-white/60"
        />
        <p className="mt-1 text-xs text-gray-500">
          Enter comma-separated skills to receive relevant job alerts.
        </p>
      </motion.div>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving || !isDirty} loading={saving}>
          {!saving && <SaveIcon size={16} className="mr-2" />}
          {saving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </form>
  );
}
