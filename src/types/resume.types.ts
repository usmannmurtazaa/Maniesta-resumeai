export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  title?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  achievements?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  description: string;
  technologies?: string[];
  url?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
}

export interface VolunteerItem {
  id: string;
  organization: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  entries: CustomEntry[];
}

export interface CustomEntry {
  id: string;
  title?: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  awards: AwardItem[];
  volunteer: VolunteerItem[];
  customSections: CustomSection[];
}

export interface DesignSettings {
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'inter' | 'serif' | 'mono' | 'lato' | 'montserrat';
  color: string;
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  content: ResumeContent;
  sectionOrder: string[];
  designSettings: DesignSettings;
  atsScore?: number | null;
  jobDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

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
