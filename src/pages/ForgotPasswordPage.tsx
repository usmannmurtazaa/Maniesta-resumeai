import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authService } from '@/services/firebase/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { PageTransition } from '@/components/common/PageTransition';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await authService.resetPassword(email);
      showToast('success', 'Password reset email sent. Check your inbox.');
      navigate('/login');
    } catch (error) {
      showToast('error', 'Failed to send reset email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <AuthSplitLayout visualType="login">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Reset Password</h1>
            <p className="mt-1 text-sm text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Log in
            </Link>
          </p>
        </motion.form>
      </AuthSplitLayout>
    </PageTransition>
  );
}
