import { motion, useReducedMotion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { LandingNav } from '@/components/landing/LandingNav';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureSection } from '@/components/landing/FeatureSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { TemplatesSection } from '@/components/landing/TemplatesSection'; // added
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  const prefersReducedMotion = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Decorative animated background orbs */}
        <motion.div
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl"
          animate={prefersReducedMotion ? {} : { y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl"
          animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, -5, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10">
          <LandingNav />

          <main>
            <motion.div
              variants={sectionVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <HeroSection />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <FeatureSection />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <HowItWorks />
            </motion.div>

            {/* New Templates Section */}
            <motion.div
              variants={sectionVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <TemplatesSection />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <CTASection />
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
}