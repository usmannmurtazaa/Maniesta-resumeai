import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authService } from '@/services/firebase/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { PageTransition } from '@/components/common/PageTransition';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) {
      showToast('error', 'Invalid reset link');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await authService.confirmPasswordReset(oobCode, newPassword);
      showToast('success', 'Password updated successfully');
      navigate('/login');
    } catch (err) {
      showToast('error', 'Failed to reset password. The link may have expired.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <AuthSplitLayout visualType="signup">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Set New Password</h1>
            <p className="mt-1 text-sm text-gray-600">Enter your new password below.</p>
          </div>

          <Input
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />
          <Input
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Updating...' : 'Update Password'}
          </Button>
        </form>
      </AuthSplitLayout>
    </PageTransition>
  );
}
