import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, SparklesIcon, CheckCircleIcon } from '@/components/ui/icons';

export function CTASection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-10 text-center shadow-glass backdrop-blur-xl sm:p-16"
        >
          {/* Animated gradient background */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10"
            animate={prefersReducedMotion ? {} : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating decorative icons */}
          <motion.div
            className="pointer-events-none absolute -top-6 -left-6 text-primary-300/40"
            animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SparklesIcon size={80} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -bottom-8 -right-8 text-accent-300/40"
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CheckCircleIcon size={100} />
          </motion.div>

          <div className="relative">
            <motion.h2
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900"
            >
              Ready to build your resume?
            </motion.h2>
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands of job seekers who improved their resumes with Maniesta ResumeAI.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/signup">
                <Button size="lg" className="px-8 group">
                  Get Started Free
                  <ArrowRightIcon
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8">
                  View Demo
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-sm text-gray-500"
            >
              No credit card required
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
