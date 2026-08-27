export interface ATSBreakdown {
  contactInfo: number;
  sectionCompleteness: number;
  actionVerbs: number;
  quantification: number;
  keywords: number;
  readability: number;
  skills: number;
  jobMatch?: number;
}

export interface ATSResult {
  score: number;
  breakdown: ATSBreakdown;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  warnings: string[];
}