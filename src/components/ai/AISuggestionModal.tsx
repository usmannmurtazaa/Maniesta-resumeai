// src/components/ai/AISuggestionModal.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { aiService } from '@/services/ai/aiService';
import { useResumeStore } from '@/store/resumeStore';
import { useToast } from '@/contexts/ToastContext';
import { SparklesIcon, CheckIcon, CloseIcon, RefreshIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';
import type { AIActionType } from '@/types/ai.types';

interface AISuggestionModalProps {
  originalText: string;
  action: AIActionType;
  onClose: () => void;
  onAccept: (suggestion: string) => void;
}

export function AISuggestionModal({
  originalText,
  action,
  onClose,
  onAccept,
}: AISuggestionModalProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { showToast } = useToast();
  const jobDescription = useResumeStore(
    (state) => state.currentResume?.jobDescription || undefined
  );

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await aiService.generate({
        action,
        text: originalText,
        jobDescription,
      });
      setSuggestions(response.suggestions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI generation failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, originalText, jobDescription]);

  const handleAccept = (suggestion: string) => {
    onAccept(suggestion);
    showToast('success', 'Suggestion applied');
    onClose();
  };

  const handleRegenerate = () => {
    fetchSuggestions();
  };

  return (
    <Modal onClose={onClose}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 text-white shadow-soft">
            <SparklesIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI Suggestions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review the suggestions below and choose the one you like.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" />
            <p className="mt-4 text-sm text-gray-500">Generating suggestions...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={fetchSuggestions}>
              <RefreshIcon size={14} className="mr-1" /> Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="rounded-xl border border-white/40 bg-white/70 p-4 shadow-soft backdrop-blur-sm"
                >
                  <p className="text-sm leading-relaxed text-gray-800">{suggestion}</p>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button size="sm" variant="soft" onClick={() => handleAccept(suggestion)}>
                      <CheckIcon size={14} className="mr-1" /> Accept
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={handleRegenerate} disabled={loading}>
                <RefreshIcon size={14} className="mr-1" /> Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <CloseIcon size={14} className="mr-1" /> Close
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </Modal>
  );
}
