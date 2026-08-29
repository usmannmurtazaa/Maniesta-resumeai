import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/common/PageTransition';
import { ArrowLeftIcon } from '@/components/ui/icons';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
        <div className="text-center">
          <div className="text-6xl font-bold text-primary-600">404</div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Page not found</h1>
          <p className="mt-2 text-gray-600">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className="mt-6">
            <Link to="/dashboard">
              <Button>
                <ArrowLeftIcon size={18} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}