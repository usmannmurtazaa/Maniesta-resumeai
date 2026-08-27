import { JobPreferencesForm } from '@/components/settings/JobPreferencesForm';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <div className="mt-8 space-y-8">
        {/* Existing settings sections can be added here */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Job Preferences</h2>
          <p className="mt-1 text-sm text-gray-500">
            Select your preferences to receive relevant job alerts.
          </p>
          <div className="mt-4">
            <JobPreferencesForm />
          </div>
        </section>
      </div>
    </div>
  );
}