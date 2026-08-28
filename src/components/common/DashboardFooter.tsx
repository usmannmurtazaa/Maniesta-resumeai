import { Logo } from './Logo';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/40 bg-white/50 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo showText={false} />
          <p className="text-sm text-gray-500">© {currentYear} Maniesta ResumeAI. All rights reserved.</p>
          <p className="text-sm text-gray-500">
            Built by{' '}
            <a
              href="https://usmanmurtaza.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Usman Murtaza
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}