import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';

export function BuilderLayout() {
  const { user, loading } = useAuthStore();
  const { isMobilePreviewOpen, toggleMobilePreview } = useUIStore();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl" />

      {/* Mobile toggle button – improved glass style */}
      <button
        onClick={toggleMobilePreview}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/40 bg-white/70 px-6 py-3 font-medium text-gray-800 shadow-glass backdrop-blur-xl transition-all hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:hidden"
      >
        {isMobilePreviewOpen ? 'Edit' : 'Preview'}
      </button>

      <main className="relative z-10 h-screen">
        <Outlet />
      </main>
    </div>
  );
}