import { motion, useReducedMotion } from 'framer-motion';
import { UploadIcon, SparklesIcon, ATSIcon, DownloadIcon } from '@/components/ui/icons';

const steps = [
  {
    number: '01',
    title: 'Create or import',
    description: 'Start from scratch or upload an existing resume.',
    icon: <UploadIcon size={24} className="text-primary-600" />,
  },
  {
    number: '02',
    title: 'Edit with AI',
    description: 'Use AI to improve your content and wording.',
    icon: <SparklesIcon size={24} className="text-yellow-600" />,
  },
  {
    number: '03',
    title: 'Optimize for ATS',
    description: 'Match against job descriptions and see missing keywords.',
    icon: <ATSIcon size={24} className="text-accent-600" />,
  },
  {
    number: '04',
    title: 'Export and apply',
    description: 'Download as PDF and start applying.',
    icon: <DownloadIcon size={24} className="text-blue-600" />,
  },
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="relative overflow-hidden py-20">
      {/* Decorative blurred orb */}
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-accent-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-display font-bold text-gray-900"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="mt-4 text-lg text-gray-600"
          >
            Four simple steps to a professional resume.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-4 [perspective:1200px]">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                type: 'spring',
                stiffness: 120,
                damping: 15,
              }}
              whileHover={
                prefersReducedMotion ? {} : { y: -6, rotateX: 2, rotateY: -2, scale: 1.02 }
              }
              className="group relative rounded-3xl border border-white/40 bg-white/70 p-6 text-center shadow-soft backdrop-blur-md transition-shadow hover:shadow-glass"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Step number badge */}
              <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-400 text-sm font-bold text-white shadow-glass group-hover:scale-110 transition-transform">
                {step.number}
              </span>

              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                style={{ transform: 'translateZ(10px)' }}
              >
                {step.icon}
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>

              {/* Animated connector */}
              {index < steps.length - 1 && (
                <motion.div
                  className="pointer-events-none absolute top-1/2 -right-6 hidden w-6 h-px bg-gradient-to-r from-primary-300 to-transparent md:block"
                  initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
