import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Create or import', description: 'Start from scratch or upload an existing resume.' },
  { number: '02', title: 'Edit with AI', description: 'Use AI to improve your content and wording.' },
  { number: '03', title: 'Optimize for ATS', description: 'Match against job descriptions and see missing keywords.' },
  { number: '04', title: 'Export and apply', description: 'Download as PDF and start applying.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">How it works</h2>
          <p className="mt-4 text-lg text-gray-600">Four simple steps to a professional resume.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-bold">
                {step.number}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] border-t-2 border-dashed border-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}