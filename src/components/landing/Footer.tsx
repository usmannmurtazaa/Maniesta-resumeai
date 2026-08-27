import { Logo } from '@/components/common/Logo';

export function Footer() {
  return (
    <footer className="border-t border-white/30 bg-white/50 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo showText={false} />
          <p className="mt-4 md:mt-0 text-sm text-gray-500">© 2026 Maniesta ResumeAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}