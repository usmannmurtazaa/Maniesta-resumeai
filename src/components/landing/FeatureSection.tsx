import { motion, useReducedMotion } from 'framer-motion';
import { ResumeIcon, ATSIcon, SparklesIcon, JobsIcon, ArrowRightIcon } from '@/components/ui/icons';

const features = [
  {
    icon: <ResumeIcon size={28} className="text-white" />,
    title: 'Professional Resume Builder',
    description: 'Intuitive editor with real-time preview, templates, and drag-and-drop sections.',
    gradient: 'from-primary-500 to-primary-600',
    glow: 'group-hover:shadow-primary-200/50',
  },
  {
    icon: <ATSIcon size={28} className="text-white" />,
    title: 'ATS Optimization',
    description: 'Score your resume against job descriptions and find missing keywords instantly.',
    gradient: 'from-accent-500 to-teal-600',
    glow: 'group-hover:shadow-accent-200/50',
  },
  {
    icon: <SparklesIcon size={28} className="text-white" />,
    title: 'AI-Powered Writing',
    description:
      'Improve your bullet points, summaries, and professional tone with AI suggestions.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'group-hover:shadow-amber-200/50',
  },
  {
    icon: <JobsIcon size={28} className="text-white" />,
    title: 'Daily Job Matching',
    description: 'Discover new opportunities and optimize your resume for specific roles.',
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'group-hover:shadow-blue-200/50',
  },
];

export function FeatureSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24"
    >
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm text-primary-700 mb-4"
          >
            <SparklesIcon size={16} className="mr-1" />
            Features
          </motion.div>
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-display font-bold text-gray-900"
          >
            Everything you need to land your dream job
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600"
          >
            Powerful features to build, optimize, and export your resume.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 [perspective:1000px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                type: 'spring',
                stiffness: 120,
                damping: 15,
              }}
              whileHover={
                prefersReducedMotion ? {} : { y: -8, rotateX: 3, rotateY: -3, scale: 1.02 }
              }
              className="group relative rounded-3xl border border-white/50 bg-white/70 p-8 shadow-soft backdrop-blur-md transition-shadow hover:shadow-glass"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover glow */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-glass ${feature.glow}`}
              />

              <div
                className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                style={{ transform: 'translateZ(20px)' }}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{feature.description}</p>

              <div className="mt-6 flex items-center text-sm font-medium text-primary-600 opacity-0 transition-all duration-200 group-hover:opacity-100">
                Learn more
                <ArrowRightIcon
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
