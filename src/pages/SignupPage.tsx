import { PageTransition } from '@/components/common/PageTransition';
import { AuthSplitLayout } from '@/components/auth/AuthSplitLayout';
import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <PageTransition>
      <AuthSplitLayout visualType="signup">
        <SignupForm />
      </AuthSplitLayout>
    </PageTransition>
  );
}
