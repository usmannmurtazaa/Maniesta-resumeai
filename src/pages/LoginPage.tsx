import { PageTransition } from '@/components/common/PageTransition';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <PageTransition>
      <AuthSplitLayout visualType="login">
        <LoginForm />
      </AuthSplitLayout>
    </PageTransition>
  );
}
