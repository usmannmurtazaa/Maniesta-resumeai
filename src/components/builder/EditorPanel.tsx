import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionEditor from './SectionEditor';
import DesignPanel from './DesignPanel';
import { ResumeIcon, PaletteIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

type TabKey = 'content' | 'design';

export default function EditorPanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('content');

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Tab bar */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="flex space-x-1 p-2">
          <button
            onClick={() => setActiveTab('content')}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'content'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <ResumeIcon size={18} />
            Content
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
              activeTab === 'design'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <PaletteIcon size={18} />
            Design
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'content' ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SectionEditor />
            </motion.div>
          ) : (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DesignPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}