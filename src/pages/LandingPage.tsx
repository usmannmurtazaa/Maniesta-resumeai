import { PageTransition } from '@/components/common/PageTransition';
import { LandingNav } from '@/components/landing/LandingNav';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <LandingNav />
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <CTASection />
        <Footer />
      </div>
    </PageTransition>
  );
}