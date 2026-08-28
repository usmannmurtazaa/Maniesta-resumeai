import { motion } from 'framer-motion';
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
  return (
    <section id="how-it-works" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
            How it works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Four simple steps to a professional resume.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.15, type: 'spring' }}
              whileHover={{ y: -5 }}
              className="relative glass-card glass-card-hover rounded-3xl p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft">
                {step.icon}
              </div>

              <div className="mt-4 text-xs font-bold text-primary-600">STEP {step.number}</div>
              <h3 className="mt-1 font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>

              {/* Animated connector (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-6 h-px bg-gradient-to-r from-primary-300 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}