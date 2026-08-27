export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
export type JobStatus = 'draft' | 'published' | 'scheduled';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  salary?: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  qualifications: string[];
  applicationUrl: string;
  deadline?: Date | null;
  category: string;
  tags: string[];
  status: JobStatus;
  featured: boolean;
  publishedAt?: Date | null;
  scheduledAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface JobPreferences {
  categories: string[];
  locations: string[];
  workModes: WorkMode[];
  experienceLevels: ExperienceLevel[];
  employmentTypes: EmploymentType[];
  skills: string[];
}

export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  workMode?: WorkMode;
  employmentType?: EmploymentType;
  experienceLevel?: ExperienceLevel;
  featured?: boolean;
  sort?: 'newest' | 'oldest' | 'deadline';
}