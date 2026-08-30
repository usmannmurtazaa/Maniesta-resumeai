import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { PlusIcon, TrashIcon } from '@/components/ui/icons';

interface EntryEditorProps<T extends { id: string }> {
  entries: T[];
  title: string;
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
  fields: {
    name: string;
    label: string;
    type?: 'text' | 'textarea' | 'date';
    placeholder?: string;
  }[];
  emptyLabel?: string;
}

export function EntryEditor<T extends { id: string }>({
  entries,
  title,
  onAdd,
  onUpdate,
  onRemove,
  fields,
  emptyLabel = 'No entries yet.',
}: EntryEditorProps<T>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button
          size="sm"
          variant="soft"
          onClick={onAdd}
          className="group"
          aria-label={`Add ${title}`}
        >
          <PlusIcon size={16} className="mr-1 transition-transform group-hover:rotate-90" />
          Add
        </Button>
      </div>

      {entries.length === 0 ? (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center text-sm text-gray-500"
        >
          {emptyLabel}
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              layout
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, y: -10, scale: 0.98 }
              }
              animate={{ opacity: 1, height: 'auto', y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, y: 10, scale: 0.98 }
              }
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="relative overflow-hidden rounded-xl border border-white/40 bg-white/80 p-4 shadow-soft backdrop-blur-sm transition-shadow hover:shadow-medium"
            >
              {/* Optional entry index */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-200 to-accent-200" />

              <div className="space-y-3 pl-2">
                {fields.map((field) => {
                  const value = (entry as any)[field.name] || '';
                  const isTextarea = field.type === 'textarea';
                  const isDate = field.type === 'date';
                  return (
                    <div key={field.name}>
                      {isTextarea ? (
                        <Textarea
                          label={field.label}
                          value={value}
                          onChange={(e) => onUpdate(entry.id, field.name, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                        />
                      ) : (
                        <Input
                          label={field.label}
                          type={isDate ? 'date' : 'text'}
                          value={value}
                          onChange={(e) => onUpdate(entry.id, field.name, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(entry.id)}
                  className="group text-red-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove entry"
                >
                  <TrashIcon
                    size={16}
                    className="mr-1 transition-transform group-hover:scale-110"
                  />
                  Remove
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
