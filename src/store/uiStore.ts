import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isMobilePreviewOpen: boolean;
  toggleSidebar: () => void;
  toggleMobilePreview: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isMobilePreviewOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobilePreview: () =>
    set((state) => ({ isMobilePreviewOpen: !state.isMobilePreviewOpen })),
}));