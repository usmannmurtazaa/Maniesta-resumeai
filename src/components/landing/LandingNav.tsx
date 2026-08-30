import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { MenuIcon, CloseIcon, ArrowRightIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#templates', label: 'Templates' },
];

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'border-white/40 bg-white/70 shadow-glass backdrop-blur-xl'
          : 'border-transparent bg-white/30 backdrop-blur-md'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-accent-400 transition-all duration-300 group-hover:w-1/2" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hover:bg-white/60">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="group">
                Get Started
                <ArrowRightIcon
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'menu'}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: -90 }
                }
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: 90 }
                }
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-white/40 bg-white/80 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 + index * 0.05 }}
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="pt-2 flex flex-col gap-2"
              >
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full group">
                    Get Started
                    <ArrowRightIcon
                      size={16}
                      className="ml-1 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
