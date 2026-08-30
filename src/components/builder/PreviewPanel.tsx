import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { templates } from '@/templates';
import { Badge } from '@/components/ui/Badge';
import { PrinterIcon } from '@/components/ui/icons';

export default function PreviewPanel() {
  const { currentResume } = useResumeStore();
  const prefersReducedMotion = useReducedMotion();

  if (!currentResume) return null;

  const TemplateComponent =
    templates[currentResume.templateId as keyof typeof templates] || templates.modern;

  return (
    <div className="mx-auto w-full max-w-[850px] px-4 pb-16">
      {/* Optional small template indicator */}
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="neutral" size="sm" className="capitalize">
          {currentResume.templateId || 'Modern'} Template
        </Badge>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <PrinterIcon size={14} />
          Print-ready
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentResume.templateId}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.005 }}
          className="print-area origin-top overflow-hidden rounded-2xl bg-white shadow-medium ring-1 ring-black/5"
        >
          <TemplateComponent resume={currentResume} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
