import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionEditor from './SectionEditor';
import DesignPanel from './DesignPanel';
import { ResumeIcon, PaletteIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

type TabKey = 'content' | 'design';

export default function EditorPanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('content');
  const prefersReducedMotion = useReducedMotion();

  const tabs = [
    { key: 'content' as TabKey, label: 'Content', icon: <ResumeIcon size={18} /> },
    { key: 'design' as TabKey, label: 'Design', icon: <PaletteIcon size={18} /> },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      {/* Tab bar */}
      <div className="sticky top-0 z-20 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl shadow-soft">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  'relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
                  isActive
                    ? 'text-primary-700'
                    : 'text-gray-500 hover:bg-gray-100/80 hover:text-gray-700'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="editor-tab-pill"
                    className="absolute inset-0 rounded-xl bg-primary-50 shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'content' ? (
            <motion.div
              key="content"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <SectionEditor />
            </motion.div>
          ) : (
            <motion.div
              key="design"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <DesignPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
