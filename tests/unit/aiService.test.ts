import { describe, it, expect, vi, beforeEach } from 'vitest';
import { aiService } from '@/services/ai/aiService';

vi.mock('@/services/firebase/config', () => ({
  auth: {
    currentUser: {
      getIdToken: vi.fn().mockResolvedValue('fake-token'),
    },
  },
}));

describe('aiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('generate sends POST request', async () => {
    const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ suggestions: ['Better text'] }) };
    (global.fetch as any).mockResolvedValue(mockResponse);
    const result = await aiService.generate({ action: 'improve', text: 'original' });
    expect(result.suggestions).toHaveLength(1);
  });
});