import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/firebase/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';

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
      showToast('success', 'Password reset email sent.');
      navigate('/login');
    } catch (err) {
      showToast('error', 'Failed to send reset email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthSplitLayout visualType="login">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h1 className="text-3xl font-display font-bold text-gray-900">Reset Password</h1>
        <p className="text-sm text-gray-600">Enter your email and we'll send you a reset link.</p>
        <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
        <p className="text-center text-sm text-gray-600">
          <Link to="/login" className="font-medium text-primary-600">Back to login</Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}