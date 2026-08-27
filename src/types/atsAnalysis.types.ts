export interface ATSAnalysis {
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
}