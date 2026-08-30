import { create } from 'zustand';

interface UIState {
  isMobilePreviewOpen: boolean;
  toggleMobilePreview: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobilePreviewOpen: false,
  toggleMobilePreview: () => set((s) => ({ isMobilePreviewOpen: !s.isMobilePreviewOpen })),
  isSidebarOpen: false,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
}));
