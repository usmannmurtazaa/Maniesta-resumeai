import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Resume, ResumeContent, DesignSettings } from '@/types/resume.types';

interface ResumeState {
  currentResume: Resume | null;
  isDirty: boolean;
  setResume: (resume: Resume | null) => void;
  updateContent: (updater: (content: ResumeContent) => void) => void;
  updateDesign: (design: Partial<DesignSettings>) => void;
  setDirty: (dirty: boolean) => void;
}

export const useResumeStore = create<ResumeState>()(
  immer((set) => ({
    currentResume: null,
    isDirty: false,
    setResume: (resume) => set({ currentResume: resume, isDirty: false }),
    updateContent: (updater) =>
      set((state) => {
        if (state.currentResume) {
          updater(state.currentResume.content);
          state.isDirty = true;
        }
      }),
    updateDesign: (design) =>
      set((state) => {
        if (state.currentResume) {
          state.currentResume.designSettings = { ...state.currentResume.designSettings, ...design };
          state.isDirty = true;
        }
      }),
    setDirty: (dirty) => set({ isDirty: dirty }),
  }))
);