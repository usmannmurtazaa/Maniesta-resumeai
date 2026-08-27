import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export const storageService = {
  async uploadFile(userId: string, file: File) {
    const path = `uploads/${userId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async uploadJobLogo(file: File) {
    const path = `job-logos/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },
};