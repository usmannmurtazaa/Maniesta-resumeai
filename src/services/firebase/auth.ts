import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { auth } from './config';

export const authService = {
  async login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },
  async signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(auth, provider);
  },
  async logout() {
    return signOut(auth);
  },
  async resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  },
  async confirmPasswordReset(oobCode: string, newPassword: string) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  },
};