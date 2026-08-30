import type { AIRequest, AIResponse } from '@/types/ai.types';

const API_URL = '/.netlify/functions/ai';
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds

async function getAuthToken(): Promise<string> {
  const { auth } = await import('@/services/firebase/config');
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication required. Please log in.');
  return user.getIdToken();
}

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.message || data.error || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

function validateResponse(data: any): data is AIResponse {
  return data && Array.isArray(data.suggestions) && data.suggestions.length > 0;
}

export const aiService = {
  async generate(request: AIRequest): Promise<AIResponse> {
    const token = await getAuthToken();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(await parseErrorResponse(response));
      }

      const data = await response.json();

      if (!validateResponse(data)) {
        throw new Error('AI response format is invalid');
      }

      return data;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('AI request timed out. Please try again.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },
};
