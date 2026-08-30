import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/icons';
import { templates } from '@/templates';
import type { Resume } from '@/types/resume.types';

const templateList = [
  { id: 'modern', name: 'Modern', description: 'Clean, professional layout with balanced sections.' },
  { id: 'creative', name: 'Creative', description: 'Bold accent and modern typography for standout roles.' },
  { id: 'tech', name: 'Tech', description: 'Technical focus with skill and project emphasis.' },
  { id: 'classic', name: 'Classic', description: 'Traditional two-column design with clear hierarchy.' },
  { id: 'elegant', name: 'Elegant', description: 'Refined serif style with elegant spacing.' },
];

function getDummyResume(templateId: string): Resume {
  return {
    id: 'preview',
    userId: '',
    title: templateId,
    templateId: templateId,
    content: {
      personalInfo: {
        fullName: 'Usman Murtaza',
        email: 'Usmanmurtaza2004@gmail.com',
        phone: '+1 234 567 890',
        location: 'Remote',
        title: 'Senior Developer',
      },
      summary: 'Experienced developer with a passion for building scalable applications.',
      experience: [
        {
          id: 'exp1',
          company: 'Acme Inc.',
          position: 'Senior Developer',
          location: 'Remote',
          startDate: '2021',
          endDate: 'Present',
          current: true,
          description: 'Lead development of key features.',
          achievements: [],
        },
      ],
      education: [
        {
          id: 'edu1',
          institution: 'MIT',
          degree: 'BS Computer Science',
          field: 'Computer Science',
          location: 'Cambridge',
          startDate: '2015',
          endDate: '2019',
          description: '',
        },
      ],
      skills: [{ id: 'skill1', category: 'Frontend', skills: ['React', 'TypeScript'] }],
      projects: [],
      certifications: [],
      languages: [],
      awards: [],
      volunteer: [],
      customSections: [],
    },
    sectionOrder: [],
    designSettings: { fontSize: 'medium', fontFamily: 'inter', color: '#000000', spacing: 'normal' },
    atsScore: null,
    jobDescription: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function TemplatesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="templates" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Light glass background container */}
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-8 sm:p-12 shadow-glass backdrop-blur-xl">
        {/* Decorative gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />

        <div className="relative z-10">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <motion.h2
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-display font-bold text-gray-900"
            >
              Professional Resume Templates
            </motion.h2>
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-gray-600"
            >
              Choose from five beautifully designed templates, each optimized for ATS and print.
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {templateList.map((template, index) => {
              const TemplateComponent = templates[template.id as keyof typeof templates];
              const resume = getDummyResume(template.id);
              return (
                <motion.div
                  key={template.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 120, damping: 15 }}
                  className="group relative rounded-2xl border border-white/40 bg-white/60 p-4 shadow-soft backdrop-blur-sm transition-all hover:shadow-glass hover:-translate-y-1"
                >
                  <div className="h-64 overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <div className="scale-[0.55] origin-top-left w-[181%]">
                      <TemplateComponent resume={resume} />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{template.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link to="/templates">
              <Button size="lg" className="group">
                Browse All Templates
                <ArrowRightIcon size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}