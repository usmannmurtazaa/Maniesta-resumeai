import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/40 bg-white/70 p-8 shadow-glass backdrop-blur-xl">
        <Outlet />
      </div>
    </div>
  );
}