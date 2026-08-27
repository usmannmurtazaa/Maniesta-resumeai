import { describe, it, expect } from 'vitest';
import { jobCreateSchema, jobPreferencesSchema } from '@/utils/validators';

describe('validators', () => {
  it('validates a correct job create input', () => {
    const validJob = {
      title: 'Developer',
      companyName: 'Acme',
      location: 'Remote',
      workMode: 'remote',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      description: 'Job description',
      requiredSkills: ['React'],
      preferredSkills: [],
      qualifications: [],
      applicationUrl: 'https://example.com',
      category: 'Engineering',
      tags: [],
      status: 'published',
      featured: false,
    };
    expect(() => jobCreateSchema.parse(validJob)).not.toThrow();
  });

  it('rejects invalid applicationUrl', () => {
    const invalidJob = {
      title: 'Dev',
      companyName: 'Acme',
      location: 'Remote',
      workMode: 'remote',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      description: 'desc',
      applicationUrl: 'not-a-url',
      category: 'Eng',
      status: 'draft',
    };
    expect(() => jobCreateSchema.parse(invalidJob)).toThrow();
  });

  it('validates job preferences', () => {
    const prefs = {
      categories: ['Engineering'],
      locations: ['Remote'],
      workModes: ['remote'],
      experienceLevels: ['senior'],
      employmentTypes: ['full-time'],
      skills: ['React'],
    };
    expect(() => jobPreferencesSchema.parse(prefs)).not.toThrow();
  });
});