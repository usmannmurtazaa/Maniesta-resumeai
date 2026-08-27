import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { aiService } from '@/services/ai/aiService';
import { useResumeStore } from '@/store/resumeStore';
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
  const jobDescription = useResumeStore((state) => state.currentResume?.jobDescription || undefined);

  useEffect(() => {
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
    fetchSuggestions();
  }, [action, originalText, jobDescription]);

  return (
    <Modal onClose={onClose}>
      <div className="p-4 max-w-2xl w-full">
        <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
        {loading && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && suggestions.length === 0 && (
          <p className="text-gray-500">No suggestions generated.</p>
        )}
        {!loading && suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="rounded-lg border p-3 hover:bg-gray-50">
                <p className="whitespace-pre-wrap">{suggestion}</p>
                <button
                  onClick={() => onAccept(suggestion)}
                  className="mt-2 inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}