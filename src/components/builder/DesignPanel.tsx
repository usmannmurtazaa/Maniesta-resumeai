import { useResumeStore } from '@/store/resumeStore';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { TypeIcon, AlignLeftIcon, DropletIcon, PaletteIcon } from '@/components/ui/icons';

export default function DesignPanel() {
  const { currentResume, updateDesign } = useResumeStore();
  if (!currentResume) return null;
  const { designSettings } = currentResume;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Design Settings</h2>
        <p className="mt-1 text-sm text-gray-500">Customize the look of your resume.</p>
      </div>

      <Card className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-100 p-2 text-primary-600">
            <TypeIcon size={20} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Font Family</label>
            <Select
              value={designSettings.fontFamily}
              onChange={(e) => updateDesign({ fontFamily: e.target.value as any })}
              className="mt-1"
            >
              <option value="inter">Inter</option>
              <option value="serif">Serif</option>
              <option value="mono">Mono</option>
              <option value="lato">Lato</option>
              <option value="montserrat">Montserrat</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent-100 p-2 text-accent-600">
            <AlignLeftIcon size={20} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Font Size</label>
            <Select
              value={designSettings.fontSize}
              onChange={(e) => updateDesign({ fontSize: e.target.value as any })}
              className="mt-1"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-100 p-2 text-yellow-600">
            <AlignLeftIcon size={20} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Spacing</label>
            <Select
              value={designSettings.spacing}
              onChange={(e) => updateDesign({ spacing: e.target.value as any })}
              className="mt-1"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-pink-100 p-2 text-pink-600">
            <DropletIcon size={20} />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Accent Color</label>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="color"
                value={designSettings.color}
                onChange={(e) => updateDesign({ color: e.target.value })}
                className="h-10 w-14 cursor-pointer rounded border border-gray-200 bg-white p-1"
                aria-label="Choose accent color"
              />
              <span className="text-sm text-gray-500">{designSettings.color}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}