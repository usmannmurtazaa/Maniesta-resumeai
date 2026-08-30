import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

const RESUME_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const LOGO_MAX_SIZE = 2 * 1024 * 1024; // 2MB

function sanitizeFileName(fileName: string): string {
  // Replace unsafe characters with underscores, preserve extension
  return fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_').replace(/_{2,}/g, '_');
}

function generateSafePath(userId: string, file: File, prefix: string): string {
  const safeName = sanitizeFileName(file.name);
  return `${prefix}/${userId}/${Date.now()}_${safeName}`;
}

function validateFileSize(file: File, maxSize: number): void {
  if (file.size > maxSize) {
    throw new Error(`File size exceeds ${Math.round(maxSize / (1024 * 1024))}MB limit.`);
  }
}

function validateResumeType(file: File): void {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a PDF or DOCX file.');
  }
}

function validateLogoType(file: File): void {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a PNG, JPG, or WebP image.');
  }
}

export const storageService = {
  /**
   * Uploads a resume file (PDF/DOCX) for a user.
   * Returns the download URL.
   */
  async uploadFile(userId: string, file: File): Promise<string> {
    validateResumeType(file);
    validateFileSize(file, RESUME_MAX_SIZE);

    const path = generateSafePath(userId, file, 'uploads');
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  /**
   * Uploads a company logo image.
   * Returns the download URL.
   */
  async uploadJobLogo(file: File): Promise<string> {
    validateLogoType(file);
    validateFileSize(file, LOGO_MAX_SIZE);

    const safeName = sanitizeFileName(file.name);
    const path = `job-logos/${Date.now()}_${safeName}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  /**
   * Deletes a file from storage by its URL or path.
   */
  async deleteFile(urlOrPath: string): Promise<void> {
    const storageRef = ref(storage, urlOrPath);
    await deleteObject(storageRef);
  },
};
