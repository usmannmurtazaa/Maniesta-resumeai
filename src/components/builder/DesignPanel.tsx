import { motion, useReducedMotion } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  TypeIcon,
  AlignLeftIcon,
  DropletIcon,
  PaletteIcon,
  RefreshIcon,
} from '@/components/ui/icons';
import { cn } from '@/utils/cn';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export default function DesignPanel() {
  const { currentResume, updateDesign } = useResumeStore();
  const prefersReducedMotion = useReducedMotion();

  if (!currentResume) return null;
  const { designSettings } = currentResume;

  const resetDesign = () => {
    updateDesign({
      fontFamily: 'inter',
      fontSize: 'medium',
      spacing: 'normal',
      color: '#000000',
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Design Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Customize the look of your resume.</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetDesign}
          className="group self-start sm:self-auto"
        >
          <RefreshIcon size={16} className="mr-1 transition-transform group-hover:rotate-180" />
          Reset
        </Button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="show"
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
            <div className="flex items-center gap-3 p-5 hover:bg-white/80 transition-colors">
              <div className="rounded-xl bg-primary-100 p-3 text-primary-600 shadow-sm">
                <TypeIcon size={20} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Font Family</label>
                <Select
                  value={designSettings.fontFamily}
                  onChange={(e) => updateDesign({ fontFamily: e.target.value as any })}
                  className="bg-white/60"
                >
                  <option value="inter">Inter</option>
                  <option value="serif">Serif</option>
                  <option value="mono">Mono</option>
                  <option value="lato">Lato</option>
                  <option value="montserrat">Montserrat</option>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
            <div className="flex items-center gap-3 p-5 hover:bg-white/80 transition-colors">
              <div className="rounded-xl bg-accent-100 p-3 text-accent-600 shadow-sm">
                <AlignLeftIcon size={20} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Font Size</label>
                <Select
                  value={designSettings.fontSize}
                  onChange={(e) => updateDesign({ fontSize: e.target.value as any })}
                  className="bg-white/60"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
            <div className="flex items-center gap-3 p-5 hover:bg-white/80 transition-colors">
              <div className="rounded-xl bg-yellow-100 p-3 text-yellow-600 shadow-sm">
                <AlignLeftIcon size={20} />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Spacing</label>
                <Select
                  value={designSettings.spacing}
                  onChange={(e) => updateDesign({ spacing: e.target.value as any })}
                  className="bg-white/60"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
            <div className="flex items-center gap-3 p-5 hover:bg-white/80 transition-colors">
              <div className="rounded-xl bg-pink-100 p-3 text-pink-600 shadow-sm">
                <DropletIcon size={20} />
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">Accent Color</label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={designSettings.color}
                      onChange={(e) => updateDesign({ color: e.target.value })}
                      className="h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="Choose accent color"
                    />
                  </div>
                  <span className="text-sm font-mono text-gray-500">{designSettings.color}</span>
                  <div className="flex gap-2">
                    {['#000000', '#4F46E5', '#0D9488', '#EA580C', '#BE123C'].map((color) => (
                      <button
                        key={color}
                        onClick={() => updateDesign({ color })}
                        className={cn(
                          'h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500',
                          designSettings.color.toLowerCase() === color.toLowerCase()
                            ? 'border-primary-500 scale-110'
                            : 'border-transparent'
                        )}
                        style={{ backgroundColor: color }}
                        aria-label={`Set accent color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
