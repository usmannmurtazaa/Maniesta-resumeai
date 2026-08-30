import { PageTransition } from '@/components/common/PageTransition';
import { LandingNav } from '@/components/landing/LandingNav';
import { Footer } from '@/components/landing/Footer';
import { BackButton } from '@/components/common/BackButton';

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <LandingNav />
        <main className="relative z-10 mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
          <BackButton label="Back to Home" to="/" />
          <h1 className="text-4xl font-display font-bold text-gray-900">Terms of Service</h1>
          <div className="mt-6 space-y-6 text-gray-600 leading-relaxed">
            <p>
              Welcome to Maniesta ResumeAI. By using our service, you agree to the following terms
              and conditions.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Use of Service</h2>
            <p>
              Maniesta ResumeAI provides an AI-powered resume building and ATS optimization
              platform. You are responsible for the content you create and upload.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials.
              You must provide accurate information when creating your account.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Content Ownership</h2>
            <p>
              You retain ownership of the resume content you create. We do not claim ownership of
              your personal information or resume data.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Acceptable Use</h2>
            <p>
              You agree not to use the service for any unlawful purpose or to upload content that
              infringes on the rights of others.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Limitation of Liability</h2>
            <p>
              Maniesta ResumeAI is provided on an &quot;as is&quot; basis. We are not responsible
              for any employment decisions made based on the resumes created using our platform.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the service after
              changes constitutes acceptance of the new terms.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
