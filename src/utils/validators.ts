import { z } from 'zod';

// ... existing resume validation schemas would remain here (not shown for brevity) ...

export const jobCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyLogo: z.string().url().optional(),
  location: z.string().min(1, 'Location is required'),
  workMode: z.enum(['remote', 'hybrid', 'onsite']),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance']),
  experienceLevel: z.enum(['entry', 'mid', 'senior', 'lead', 'executive']),
  salary: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  requiredSkills: z.array(z.string().min(1)).default([]),
  preferredSkills: z.array(z.string().min(1)).default([]),
  qualifications: z.array(z.string().min(1)).default([]),
  applicationUrl: z.string().url('Application URL must be a valid URL'),
  deadline: z.string().datetime().optional().nullable(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string().min(1)).default([]),
  status: z.enum(['draft', 'published', 'scheduled']),
  featured: z.boolean().default(false),
  scheduledAt: z.string().datetime().optional().nullable(),
});

export const jobUpdateSchema = jobCreateSchema.partial();

export const jobPreferencesSchema = z.object({
  categories: z.array(z.string().min(1)).default([]),
  locations: z.array(z.string().min(1)).default([]),
  workModes: z.array(z.enum(['remote', 'hybrid', 'onsite'])).default([]),
  experienceLevels: z.array(z.enum(['entry', 'mid', 'senior', 'lead', 'executive'])).default([]),
  employmentTypes: z.array(z.enum(['full-time', 'part-time', 'contract', 'internship', 'freelance'])).default([]),
  skills: z.array(z.string().min(1)).default([]),
});