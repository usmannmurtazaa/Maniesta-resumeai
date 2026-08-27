export interface AdminUser {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  lastLoginAt: Date | null;
  disabled: boolean;
  admin: boolean;
  resumeCount?: number;
  atsAnalysisCount?: number;
  savedJobsCount?: number;
}

export interface AdminResume {
  id: string;
  userId: string;
  title: string;
  templateId: string;
  atsScore: number | null;
  jobDescriptionAttached: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerName?: string;
  ownerEmail?: string;
}

export interface AdminATS {
  id: string;
  userId: string;
  resumeId: string;
  jobId?: string | null;
  score: number;
  jobMatchScore?: number | null;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  warnings: string[];
  createdAt: Date;
  userName?: string;
  resumeTitle?: string;
}

export interface AdminAnalytics {
  users: {
    total: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
    activeUsers: number;
  };
  resumes: {
    total: number;
    createdToday: number;
    createdThisWeek: number;
    createdThisMonth: number;
  };
  ats: {
    totalAnalyses: number;
    averageScore: number;
    analysesToday: number;
    analysesThisWeek: number;
    analysesThisMonth: number;
    jobMatches: number;
  };
  jobs: {
    total: number;
    published: number;
    scheduled: number;
    featured: number;
    savedByUsers: number;
  };
}

export interface AdminSearchResult {
  type: 'user' | 'resume' | 'job';
  id: string;
  title: string;
  subtitle?: string;
}