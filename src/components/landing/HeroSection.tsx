import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, SparklesIcon, CheckCircleIcon } from '@/components/ui/icons';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-4 py-1.5 text-sm text-primary-700 backdrop-blur">
                <SparklesIcon size={16} />
                AI-powered resume builder
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-gray-900">
                Build resumes that get interviews
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Maniesta ResumeAI helps you create professional, ATS-optimized resumes in minutes. Improve your content with AI, match job descriptions, and export beautiful PDFs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="px-8">
                    Start Building Free
                    <ArrowRightIcon size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="px-8">
                    View Demo
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircleIcon size={16} className="text-green-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon size={16} className="text-green-500" />
                  ATS optimized
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircleIcon size={16} className="text-green-500" />
                  AI powered
                </span>
              </div>
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-accent-400/30 blur-3xl rounded-full" />
            <div className="relative glass-card rounded-3xl p-6 shadow-glass">
              {/* Fake resume preview */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
                  <div className="h-2.5 w-full bg-gray-200 rounded" />
                  <div className="h-2.5 w-5/6 bg-gray-200 rounded" />
                  <div className="h-2.5 w-2/3 bg-gray-200 rounded" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-20 bg-gray-100 rounded-lg" />
                  <div className="h-20 bg-gray-100 rounded-lg" />
                </div>
              </div>

              {/* ATS score floating card */}
              <div className="absolute -right-6 -bottom-6 w-48 glass-card rounded-2xl p-4 shadow-glass">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">ATS Score</span>
                  <span className="text-sm font-bold text-primary-600">92</span>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-2 w-[92%] bg-gradient-to-r from-primary-500 to-accent-400 rounded-full" />
                </div>
              </div>

              {/* AI suggestion floating card */}
              <div className="absolute -left-6 top-1/3 w-56 glass-card rounded-2xl p-4 shadow-glass">
                <div className="flex items-center gap-2">
                  <SparklesIcon size={16} className="text-primary-500" />
                  <span className="text-sm font-medium">AI Suggestion</span>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  "Increased team productivity by 30%"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}