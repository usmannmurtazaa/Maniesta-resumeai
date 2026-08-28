import { motion, AnimatePresence } from 'framer-motion';
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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Button size="sm" variant="outline" onClick={onAdd}>
          <PlusIcon size={16} className="mr-1" />
          Add
        </Button>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
          {emptyLabel}
        </div>
      ) : (
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="space-y-3">
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

              <div className="mt-3 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(entry.id)}
                  aria-label="Remove entry"
                >
                  <TrashIcon size={16} className="mr-1" />
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