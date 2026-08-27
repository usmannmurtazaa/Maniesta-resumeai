import { useResumeStore } from '@/store/resumeStore';
import { Select } from '@/components/ui/Select';

export default function DesignPanel() {
  const { currentResume, updateDesign } = useResumeStore();
  if (!currentResume) return null;
  const { designSettings } = currentResume;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Design Settings</h2>
      <div>
        <label className="block text-sm font-medium">Font Family</label>
        <Select
          value={designSettings.fontFamily}
          onChange={(e) => updateDesign({ fontFamily: e.target.value as any })}
        >
          <option value="inter">Inter</option>
          <option value="serif">Serif</option>
          <option value="mono">Mono</option>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium">Font Size</label>
        <Select
          value={designSettings.fontSize}
          onChange={(e) => updateDesign({ fontSize: e.target.value as any })}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium">Spacing</label>
        <Select
          value={designSettings.spacing}
          onChange={(e) => updateDesign({ spacing: e.target.value as any })}
        >
          <option value="compact">Compact</option>
          <option value="normal">Normal</option>
          <option value="relaxed">Relaxed</option>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium">Color</label>
        <input
          type="color"
          value={designSettings.color}
          onChange={(e) => updateDesign({ color: e.target.value })}
          className="mt-1"
        />
      </div>
    </div>
  );
}