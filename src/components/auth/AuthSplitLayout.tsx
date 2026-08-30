import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { ResumeIcon, ATSIcon, SparklesIcon } from '@/components/ui/icons';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  visualType: 'login' | 'signup';
}

export function AuthSplitLayout({ children, visualType }: AuthSplitLayoutProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated background orbs */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-yellow-200/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex w-full">
        {/* Left visual panel - hidden on mobile */}
        <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500 [perspective:1200px]">
          {/* Decorative gradient blobs with motion */}
          <motion.div
            className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            animate={prefersReducedMotion ? {} : { y: [0, 15, 0], x: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white/10 blur-3xl"
            animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col justify-between p-12 text-white">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Logo showText={false} className="text-white" />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-4xl font-display font-bold leading-tight">
                {visualType === 'login'
                  ? 'Welcome back to your career journey'
                  : 'Start building your professional future'}
              </h2>
              <p className="mt-4 text-lg text-white/80">
                {visualType === 'login'
                  ? 'Log in to continue optimizing your resume and applying to jobs.'
                  : 'Create an account to build ATS-optimized resumes with AI.'}
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: <ResumeIcon size={20} />, text: 'Professional resume templates' },
                  { icon: <ATSIcon size={20} />, text: 'ATS score and keyword matching' },
                  { icon: <SparklesIcon size={20} />, text: 'AI-powered content improvement' },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm text-white/70"
            >
              © 2026 Maniesta ResumeAI
            </motion.div>
          </div>

          {/* Floating ATS Score card with 3D tilt and floating animation */}
          <motion.div
            className="absolute -right-10 top-1/4 w-56"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.8, y: 20, rotateY: -15 }
            }
            animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="glass-card rounded-2xl p-4 text-gray-900 shadow-glass backdrop-blur-lg"
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, rotateX: 3, rotateY: -3 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-2">
                <ATSIcon size={16} className="text-accent-600" />
                <p className="text-sm font-semibold">ATS Score</p>
              </div>
              <p className="text-2xl font-bold text-primary-600">92</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-primary-500 to-accent-400" />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating AI Suggestion card with 3D tilt and delayed float */}
          <motion.div
            className="absolute -left-6 bottom-1/4 w-48"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.8, y: -20, rotateY: 15 }
            }
            animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="glass-card rounded-2xl p-4 text-gray-900 shadow-glass backdrop-blur-lg"
              animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.04, rotateX: 3, rotateY: 3 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-2">
                <SparklesIcon size={16} className="text-primary-500" />
                <p className="text-sm font-semibold">AI Suggestion</p>
              </div>
              <p className="mt-2 text-xs text-gray-600">
                &quot;Increased team productivity by 30%&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-md"
          >
            <div className="mb-6 lg:hidden">
              <Logo />
            </div>
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
