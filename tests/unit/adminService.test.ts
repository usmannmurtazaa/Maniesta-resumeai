import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminService } from '@/services/admin/adminService';

// Mock getToken by setting auth.currentUser
vi.mock('@/services/firebase/config', () => ({
  auth: {
    currentUser: {
      getIdToken: vi.fn().mockResolvedValue('fake-token'),
    },
  },
}));

describe('adminService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('getUsers sends request with auth header', async () => {
    const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ users: [], lastVisible: null }) };
    (global.fetch as any).mockResolvedValue(mockResponse);
    await adminService.getUsers();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/admin-get-users'),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer fake-token' }),
      })
    );
  });

  it('getAnalytics returns data', async () => {
    const mockAnalytics = { users: { total: 10 }, resumes: { total: 5 }, ats: { totalAnalyses: 3 }, jobs: { total: 7 } };
    const mockResponse = { ok: true, json: vi.fn().mockResolvedValue(mockAnalytics) };
    (global.fetch as any).mockResolvedValue(mockResponse);
    const result = await adminService.getAnalytics();
    expect(result).toEqual(mockAnalytics);
  });

  it('updateUserStatus sends PUT request', async () => {
    const mockResponse = { ok: true, json: vi.fn().mockResolvedValue({ success: true }) };
    (global.fetch as any).mockResolvedValue(mockResponse);
    await adminService.updateUserStatus('user1', true);
    expect(global.fetch).toHaveBeenCalledWith(
      '/.netlify/functions/admin-update-user',
      expect.objectContaining({ method: 'PUT' })
    );
  });
});