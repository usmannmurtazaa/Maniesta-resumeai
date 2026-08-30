export type AIActionType =
  'improve' | 'rewrite' | 'shorten' | 'expand' | 'grammar' | 'professionalize' | 'ats' | 'job';

export interface AIRequest {
  action: AIActionType;
  text: string;
  context?: string;
  jobDescription?: string;
}

export interface AIResponse {
  suggestions: string[];
  explanation?: string;
}

export interface AISuggestion {
  id: string;
  originalText: string;
  suggestions: string[];
  applied?: boolean;
  timestamp: Date;
}
