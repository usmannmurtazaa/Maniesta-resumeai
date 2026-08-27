import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthSplitLayout visualType="login">
      <LoginForm />
    </AuthSplitLayout>
  );
}