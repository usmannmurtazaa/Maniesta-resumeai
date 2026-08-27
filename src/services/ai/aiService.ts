import { AIRequest, AIResponse } from '@/types/ai.types';

const API_URL = '/.netlify/functions/ai';

export const aiService = {
  async generate(request: AIRequest): Promise<AIResponse> {
    const token = await getAuthToken();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'AI request failed');
    }

    return response.json();
  },
};

async function getAuthToken(): Promise<string> {
  const { auth } = await import('@/services/firebase/config');
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return user.getIdToken();
}