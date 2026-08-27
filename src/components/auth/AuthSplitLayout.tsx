import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/common/Logo';
import { ResumeIcon, ATSIcon, SparklesIcon } from '@/components/ui/icons';

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  visualType: 'login' | 'signup';
}

export function AuthSplitLayout({ children, visualType }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Left visual panel - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-600 to-accent-500">
        {/* Decorative gradient blobs */}
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col justify-between p-12 text-white">
          <Logo showText={false} className="text-white" />
          <div>
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
              <div className="flex items-center gap-3 text-white/90">
                <ResumeIcon size={20} />
                <span>Professional resume templates</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <ATSIcon size={20} />
                <span>ATS score and keyword matching</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <SparklesIcon size={20} />
                <span>AI-powered content improvement</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-white/70">© 2026 Maniesta ResumeAI</div>
        </div>
        {/* Floating decorative cards */}
        <div className="absolute -right-10 top-1/4 w-56 glass-card rounded-2xl p-4 text-gray-900 shadow-glass backdrop-blur-lg">
          <p className="text-sm font-semibold">ATS Score</p>
          <p className="text-2xl font-bold text-primary-600">92</p>
        </div>
        <div className="absolute -left-6 bottom-1/4 w-48 glass-card rounded-2xl p-4 text-gray-900 shadow-glass backdrop-blur-lg">
          <p className="text-sm font-semibold">AI Suggestion</p>
          <p className="text-xs text-gray-600">"Increased team productivity by 30%"</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-6">
            <Logo />
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}