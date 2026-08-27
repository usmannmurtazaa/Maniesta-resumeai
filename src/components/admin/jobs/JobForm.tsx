import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { storageService } from '@/services/firebase/storage';
import { adminService } from '@/services/admin/adminService';
import { useToast } from '@/contexts/ToastContext';
import type { Job } from '@/types/job.types';

// Form-specific schema: arrays are entered as comma-separated strings
const jobFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyLogo: z.string().url().optional(),
  location: z.string().min(1, 'Location is required'),
  workMode: z.enum(['remote', 'hybrid', 'onsite']),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']),
  salary: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  requiredSkills: z.string().default(''),
  preferredSkills: z.string().default(''),
  qualifications: z.string().default(''),
  applicationUrl: z.string().url('Application URL must be a valid URL'),
  deadline: z.string().optional().nullable(),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().default(''),
  status: z.enum(['draft', 'published', 'scheduled']),
  featured: z.boolean().default(false),
  scheduledAt: z.string().optional().nullable(),
});

type JobFormInput = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  initialData?: Job | null;
  onSuccess?: () => void;
}

export function JobForm({ initialData, onSuccess }: JobFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormInput>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          companyName: initialData.companyName,
          companyLogo: initialData.companyLogo || '',
          location: initialData.location,
          workMode: initialData.workMode,
          employmentType: initialData.employmentType,
          experienceLevel: initialData.experienceLevel,
          salary: initialData.salary || '',
          description: initialData.description,
          requiredSkills: initialData.requiredSkills.join(', '),
          preferredSkills: initialData.preferredSkills.join(', '),
          qualifications: initialData.qualifications.join(', '),
          applicationUrl: initialData.applicationUrl,
          deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
          category: initialData.category,
          tags: initialData.tags.join(', '),
          status: initialData.status,
          featured: initialData.featured,
          scheduledAt: initialData.scheduledAt ? new Date(initialData.scheduledAt).toISOString().split('T')[0] : '',
        }
      : {
          workMode: 'onsite',
          employmentType: 'full-time',
          experienceLevel: 'mid',
          status: 'draft',
          featured: false,
          requiredSkills: '',
          preferredSkills: '',
          qualifications: '',
          tags: '',
        },
  });

  const onSubmit = async (data: JobFormInput) => {
    setUploading(true);
    try {
      let logoUrl = data.companyLogo || '';
      if (logoFile) {
        logoUrl = await storageService.uploadJobLogo(logoFile);
      }

      const jobData = {
        title: data.title,
        companyName: data.companyName,
        companyLogo: logoUrl,
        location: data.location,
        workMode: data.workMode,
        employmentType: data.employmentType,
        experienceLevel: data.experienceLevel,
        salary: data.salary,
        description: data.description,
        requiredSkills: data.requiredSkills.split(',').map((s) => s.trim()).filter(Boolean),
        preferredSkills: data.preferredSkills.split(',').map((s) => s.trim()).filter(Boolean),
        qualifications: data.qualifications.split(',').map((s) => s.trim()).filter(Boolean),
        applicationUrl: data.applicationUrl,
        deadline: data.deadline ? new Date(data.deadline) : null,
        category: data.category,
        tags: data.tags.split(',').map((s) => s.trim()).filter(Boolean),
        status: data.status,
        featured: data.featured,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      };

      if (initialData?.id) {
        await adminService.updateJob(initialData.id, jobData);
        showToast('success', 'Job updated successfully');
      } else {
        await adminService.createJob(jobData);
        showToast('success', 'Job created successfully');
      }
      onSuccess?.();
    } catch (error) {
      console.error('Job save error:', error);
      showToast('error', 'Failed to save job. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
      <h3 className="text-lg font-semibold">{initialData ? 'Edit Job' : 'Create Job'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <Input {...register('title')} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Company Name</label>
          <Input {...register('companyName')} />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Company Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <Input {...register('location')} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Work Mode</label>
          <Select {...register('workMode')}>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Employment Type</label>
          <Select {...register('employmentType')}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Experience Level</label>
          <Select {...register('experienceLevel')}>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="executive">Executive</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Salary (optional)</label>
          <Input {...register('salary')} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Description</label>
          <Textarea {...register('description')} rows={5} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Required Skills (comma-separated)</label>
          <Input {...register('requiredSkills')} placeholder="React, TypeScript, ..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Preferred Skills (comma-separated)</label>
          <Input {...register('preferredSkills')} placeholder="Node.js, GraphQL, ..." />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium">Qualifications (comma-separated)</label>
          <Input {...register('qualifications')} placeholder="Bachelor's degree, 5+ years experience, ..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Application URL</label>
          <Input {...register('applicationUrl')} placeholder="https://..." />
          {errors.applicationUrl && <p className="text-red-500 text-sm">{errors.applicationUrl.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Deadline</label>
          <Input type="date" {...register('deadline')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <Input {...register('category')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma-separated)</label>
          <Input {...register('tags')} placeholder="remote, startup, ..." />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <Select {...register('status')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium">Scheduled At (if scheduled)</label>
          <Input type="datetime-local" {...register('scheduledAt')} />
        </div>
        <div className="flex items-center">
          <Checkbox {...register('featured')} />
          <label className="ml-2 text-sm">Featured</label>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Saving...' : 'Save Job'}
        </Button>
      </div>
    </form>
  );
}