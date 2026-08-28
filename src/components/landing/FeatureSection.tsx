import { motion } from 'framer-motion';
import { ResumeIcon, ATSIcon, SparklesIcon, JobsIcon, ArrowRightIcon } from '@/components/ui/icons';

const features = [
  {
    icon: <ResumeIcon size={28} className="text-white" />,
    title: 'Professional Resume Builder',
    description: 'Intuitive editor with real-time preview, templates, and drag-and-drop sections.',
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    icon: <ATSIcon size={28} className="text-white" />,
    title: 'ATS Optimization',
    description: 'Score your resume against job descriptions and find missing keywords instantly.',
    gradient: 'from-accent-500 to-teal-600',
  },
  {
    icon: <SparklesIcon size={28} className="text-white" />,
    title: 'AI-Powered Writing',
    description: 'Improve your bullet points, summaries, and professional tone with AI suggestions.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: <JobsIcon size={28} className="text-white" />,
    title: 'Daily Job Matching',
    description: 'Discover new opportunities and optimize your resume for specific roles.',
    gradient: 'from-blue-500 to-indigo-600',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm text-primary-700 mb-4">
            <SparklesIcon size={16} className="mr-1" />
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">
            Everything you need to land your dream job
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful features to build, optimize, and export your resume.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.12, type: 'spring' }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="group relative rounded-3xl bg-white/70 backdrop-blur-md border border-white/50 p-8 shadow-soft transition-shadow hover:shadow-glass"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{feature.description}</p>
              <div className="mt-6 flex items-center text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <ArrowRightIcon size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}