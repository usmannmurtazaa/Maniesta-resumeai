import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/icons';

export function CTASection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl glass-card p-10 text-center shadow-glass">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">Ready to build your resume?</h2>
            <p className="mt-4 text-lg text-gray-600">Join thousands of job seekers who improved their resumes with Maniesta ResumeAI.</p>
            <div className="mt-8 flex justify-center">
              <Link to="/signup">
                <Button size="lg" className="px-8">
                  Get Started Free
                  <ArrowRightIcon size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}