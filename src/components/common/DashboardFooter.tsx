import { Logo } from './Logo';

export function DashboardFooter() {
  return (
    <footer className="border-t border-white/40 bg-white/50 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo showText={false} />
          <p className="text-sm text-gray-500">© 2026 Maniesta ResumeAI. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-900">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Terms</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}