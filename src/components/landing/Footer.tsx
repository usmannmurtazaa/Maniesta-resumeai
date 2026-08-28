import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { ArrowRightIcon, MailIcon } from '@/components/ui/icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/30 bg-white/50 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-500">
              Build professional, ATS-optimized resumes with AI. Land your dream job faster.
            </p>
            <div className="mt-6 flex space-x-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-full p-2 text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96v5.7h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.03 0 3.59 1.99 3.59 4.58v6.48z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-full p-2 text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63a9.935 9.935 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="rounded-full p-2 text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/dashboard" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Dashboard</Link></li>
              <li><Link to="/builder" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Resume Builder</Link></li>
              <li><Link to="/jobs" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Daily Jobs</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {currentYear} Maniesta ResumeAI. All rights reserved.</p>
          <a href="mailto:support@maniesta.com" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
            <MailIcon size={16} />
            support@maniesta.com
          </a>
        </div>
      </div>
    </footer>
  );
}