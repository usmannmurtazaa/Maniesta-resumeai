import { create } from 'zustand';
import type {
  AdminUser,
  AdminResume,
  AdminATS,
  AdminAnalytics,
  AdminSearchResult,
} from '@/types/admin.types';

interface AdminState {
  users: AdminUser[];
  selectedUser: AdminUser | null;
  userResumes: AdminResume[];
  atsAnalyses: AdminATS[];
  analytics: AdminAnalytics | null;
  searchResults: AdminSearchResult[];
  loading: {
    users: boolean;
    userDetail: boolean;
    resumes: boolean;
    ats: boolean;
    analytics: boolean;
    search: boolean;
  };
  error: string | null;
  usersPagination: { lastVisible: string | null; hasMore: boolean };
  atsPagination: { lastVisible: string | null; hasMore: boolean };
  setUsers: (users: AdminUser[], lastVisible: string | null, hasMore: boolean) => void;
  setSelectedUser: (user: AdminUser | null) => void;
  setUserResumes: (resumes: AdminResume[]) => void;
  setAtsAnalyses: (analyses: AdminATS[], lastVisible: string | null, hasMore: boolean) => void;
  setAnalytics: (analytics: AdminAnalytics) => void;
  setSearchResults: (results: AdminSearchResult[]) => void;
  setLoading: (key: keyof AdminState['loading'], value: boolean) => void;
  setError: (error: string | null) => void;
  clearAdminData: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  selectedUser: null,
  userResumes: [],
  atsAnalyses: [],
  analytics: null,
  searchResults: [],
  loading: {
    users: false,
    userDetail: false,
    resumes: false,
    ats: false,
    analytics: false,
    search: false,
  },
  error: null,
  usersPagination: { lastVisible: null, hasMore: false },
  atsPagination: { lastVisible: null, hasMore: false },
  setUsers: (users, lastVisible, hasMore) =>
    set((state) => ({
      users: lastVisible ? [...state.users, ...users] : users,
      usersPagination: { lastVisible, hasMore },
      loading: { ...state.loading, users: false },
    })),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setUserResumes: (userResumes) => set({ userResumes }),
  setAtsAnalyses: (atsAnalyses, lastVisible, hasMore) =>
    set((state) => ({
      atsAnalyses: lastVisible ? [...state.atsAnalyses, ...atsAnalyses] : atsAnalyses,
      atsPagination: { lastVisible, hasMore },
      loading: { ...state.loading, ats: false },
    })),
  setAnalytics: (analytics) =>
    set((state) => ({
      analytics,
      loading: { ...state.loading, analytics: false },
    })),
  setSearchResults: (searchResults) => set({ searchResults }),
  setLoading: (key, value) => set((state) => ({ loading: { ...state.loading, [key]: value } })),
  setError: (error) => set({ error }),
  clearAdminData: () =>
    set({
      users: [],
      selectedUser: null,
      userResumes: [],
      atsAnalyses: [],
      analytics: null,
      searchResults: [],
      error: null,
      usersPagination: { lastVisible: null, hasMore: false },
      atsPagination: { lastVisible: null, hasMore: false },
    }),
}));
