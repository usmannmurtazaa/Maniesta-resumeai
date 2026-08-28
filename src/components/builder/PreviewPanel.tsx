import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { templates } from '@/templates';

export default function PreviewPanel() {
  const { currentResume } = useResumeStore();

  if (!currentResume) return null;

  const TemplateComponent =
    templates[currentResume.templateId as keyof typeof templates] || templates.modern;

  return (
    <div className="mx-auto max-w-[850px] px-4 pb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentResume.templateId}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="print-area overflow-hidden rounded-2xl bg-white shadow-medium"
        >
          <TemplateComponent resume={currentResume} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}