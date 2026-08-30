import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from './config';
import type { Resume } from '@/types/resume.types';
import {
  DEFAULT_SECTION_ORDER,
  defaultDesignSettings,
  emptyResumeContent,
} from '@/utils/resumeDefaults';

/**
 * Converts Firestore Timestamps to JavaScript Date objects.
 */
function convertResumeDates(data: any): Resume {
  return {
    ...data,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt,
  } as Resume;
}

export const resumeService = {
  async createResume(data: Partial<Resume>) {
    const docRef = doc(collection(db, 'resumes'));
    const resume: Resume = {
      id: docRef.id,
      userId: data.userId!,
      title: data.title || 'Untitled Resume',
      templateId: data.templateId || 'modern',
      content: data.content || emptyResumeContent(),
      sectionOrder: data.sectionOrder || DEFAULT_SECTION_ORDER,
      designSettings: data.designSettings || defaultDesignSettings(),
      atsScore: null,
      jobDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(docRef, resume);
    return resume;
  },

  async updateResume(id: string, data: Partial<Resume>) {
    const docRef = doc(db, 'resumes', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
  },

  async getResume(id: string): Promise<Resume | null> {
    const docRef = doc(db, 'resumes', id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return convertResumeDates(snap.data());
  },

  async getUserResumes(userId: string): Promise<Resume[]> {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const resumes = snapshot.docs.map((doc) => convertResumeDates({ id: doc.id, ...doc.data() }));
    // Sort by updatedAt descending
    resumes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return resumes;
  },

  async deleteResume(id: string) {
    const docRef = doc(db, 'resumes', id);
    await deleteDoc(docRef);
  },

  async duplicateResume(resumeId: string): Promise<Resume> {
    const original = await this.getResume(resumeId);
    if (!original) throw new Error('Resume not found');
    const newResume: Resume = {
      ...original,
      id: '',
      title: `${original.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.createResume(newResume);
  },
};
