import { motion } from 'framer-motion';
import { ResumeIcon, ATSIcon, SparklesIcon, JobsIcon } from '@/components/ui/icons';

const features = [
  {
    icon: <ResumeIcon size={24} className="text-primary-600" />,
    title: 'Professional Resume Builder',
    description: 'Intuitive editor with real-time preview, templates, and drag-and-drop sections.',
    bg: 'bg-primary-100',
  },
  {
    icon: <ATSIcon size={24} className="text-accent-600" />,
    title: 'ATS Optimization',
    description: 'Score your resume against job descriptions and find missing keywords instantly.',
    bg: 'bg-accent-100',
  },
  {
    icon: <SparklesIcon size={24} className="text-yellow-600" />,
    title: 'AI-Powered Writing',
    description: 'Improve your bullet points, summaries, and professional tone with AI suggestions.',
    bg: 'bg-yellow-100',
  },
  {
    icon: <JobsIcon size={24} className="text-blue-600" />,
    title: 'Daily Job Matching',
    description: 'Discover new opportunities and optimize your resume for specific roles.',
    bg: 'bg-blue-100',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">Everything you need to land your dream job</h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful features to build, optimize, and export your resume.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-3xl p-6"
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}