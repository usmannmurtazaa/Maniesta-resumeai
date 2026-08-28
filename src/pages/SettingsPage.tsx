import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { JobPreferencesForm } from '@/components/settings/JobPreferencesForm';
import { Card } from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-8">
        <BackButton label="Back to Dashboard" to="/dashboard" />
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <div className="mt-8 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Job Preferences</h2>
            <p className="mt-1 text-sm text-gray-500">Select your preferences to receive relevant job alerts.</p>
            <div className="mt-4">
              <JobPreferencesForm />
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}