import type { ResumeContent, DesignSettings } from '@/types/resume.types';

export const DEFAULT_SECTION_ORDER = [
  'personalInfo',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'awards',
  'volunteer',
];

export const emptyResumeContent = (): ResumeContent => ({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    title: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  volunteer: [],
  customSections: [],
});

export const defaultDesignSettings = (): DesignSettings => ({
  fontSize: 'medium',
  fontFamily: 'inter',
  color: '#000000',
  spacing: 'normal',
});
