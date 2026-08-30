import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { PageTransition } from '@/components/common/PageTransition';
import { authService } from '@/services/firebase/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { MailIcon, ArrowLeftIcon } from '@/components/ui/icons';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await authService.resetPassword(email);
      showToast('success', 'Password reset email sent. Check your inbox.');
      navigate('/login');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <AuthSplitLayout visualType="login">
        <motion.form
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600"
                role="alert"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <MailIcon size={18} className="absolute left-3 top-9 text-gray-400" />
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
              autoComplete="email"
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full" loading={submitting}>
            {submitting ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-2"
            >
              <ArrowLeftIcon size={16} />
              Back to login
            </Link>
          </div>
        </motion.form>
      </AuthSplitLayout>
    </PageTransition>
  );
}
