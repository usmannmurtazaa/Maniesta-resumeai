import { PageTransition } from '@/components/common/PageTransition';
import { LandingNav } from '@/components/landing/LandingNav';
import { Footer } from '@/components/landing/Footer';
import { BackButton } from '@/components/common/BackButton';

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <LandingNav />
        <main className="relative z-10 mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
          <BackButton label="Back to Home" to="/" />
          <h1 className="text-4xl font-display font-bold text-gray-900">Privacy Policy</h1>
          <div className="mt-6 space-y-6 text-gray-600 leading-relaxed">
            <p>
              Your privacy is important to us. This Privacy Policy explains how Maniesta ResumeAI
              collects, uses, and protects your personal information.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
            <p>
              We collect the information you provide when creating an account, building resumes, and
              saving jobs. This may include your name, email address, resume content, and job
              preferences.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
            <p>
              We use your information to provide and improve our services, personalize your
              experience, and send relevant job alerts based on your preferences.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. Your
              resume data is securely stored and only accessible to you and authorized
              administrators.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Third-Party Services</h2>
            <p>
              We use Firebase for authentication and data storage, and Google Gemini for AI
              features. These services have their own privacy policies.
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at
              usmanmurtaza2004@gmail.com.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
