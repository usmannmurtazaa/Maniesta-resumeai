import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { templates } from '@/templates';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PlusIcon, ArrowRightIcon } from '@/components/ui/icons';

const templateList = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, professional layout with balanced sections.',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional two-column design with clear hierarchy.',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold accent and modern typography for standout roles.',
  },
  { id: 'tech', name: 'Tech', description: 'Technical focus with skill and project emphasis.' },
  { id: 'elegant', name: 'Elegant', description: 'Refined serif style with elegant spacing.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export default function ResumeTemplatesPage() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Decorative blurred orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Dashboard" to="/dashboard" />
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Resume Templates</h1>
            <p className="mt-2 text-gray-600">Choose a template to start building your resume.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {templateList.map((tpl) => {
              const TemplateComponent = templates[tpl.id as keyof typeof templates];
              return (
                <motion.div
                  key={tpl.id}
                  variants={itemVariants}
                  whileHover={
                    prefersReducedMotion ? {} : { y: -8, rotateX: 2, rotateY: -2, scale: 1.02 }
                  }
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative"
                >
                  <Card className="h-full overflow-hidden bg-white/70 backdrop-blur-md border border-white/40 shadow-soft transition-shadow hover:shadow-glass">
                    <div className="relative h-64 overflow-hidden border-b border-gray-100 bg-gray-50/50 p-4">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
                      <div className="relative h-full w-full overflow-hidden">
                        <div className="scale-[0.55] origin-top-left w-[181%]">
                          <TemplateComponent
                            resume={{
                              id: 'preview',
                              userId: '',
                              title: tpl.name,
                              templateId: tpl.id,
                              content: {
                                personalInfo: {
                                  fullName: 'Usman Murtaza',
                                  email: 'Usmanmurtaza2004@gmail.com',
                                  phone: '+1 234 567 890',
                                  location: 'Remote',
                                  title: 'Senior Developer',
                                },
                                summary:
                                  'Experienced developer with a passion for building scalable applications.',
                                experience: [],
                                education: [],
                                skills: [],
                                projects: [],
                                certifications: [],
                                languages: [],
                                awards: [],
                                volunteer: [],
                                customSections: [],
                              },
                              sectionOrder: [],
                              designSettings: {
                                fontSize: 'medium',
                                fontFamily: 'inter',
                                color: '#000000',
                                spacing: 'normal',
                              },
                              atsScore: null,
                              jobDescription: null,
                              createdAt: new Date(),
                              updatedAt: new Date(),
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h2 className="text-lg font-semibold text-gray-900">{tpl.name}</h2>
                      <p className="mt-1 text-sm text-gray-600">{tpl.description}</p>
                      <Button
                        className="mt-4 group/btn"
                        onClick={() => navigate(`/builder?template=${tpl.id}`)}
                      >
                        <PlusIcon
                          size={16}
                          className="mr-1 transition-transform group-hover/btn:rotate-90"
                        />
                        Use This Template
                        <ArrowRightIcon
                          size={16}
                          className="ml-2 transition-transform group-hover/btn:translate-x-1"
                        />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
