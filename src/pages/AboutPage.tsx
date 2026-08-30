import { PageTransition } from '@/components/common/PageTransition';
import { LandingNav } from '@/components/landing/LandingNav';
import { Footer } from '@/components/landing/Footer';
import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  MailIcon,
  ExternalLinkIcon,
  UserIcon,
  GlobeIcon,
  ArrowRightIcon,
} from '@/components/ui/icons';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <LandingNav />
        <main className="relative z-10 mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
          <BackButton label="Back to Home" to="/" />
          <h1 className="text-4xl font-display font-bold text-gray-900">About Maniesta ResumeAI</h1>

          {/* Product description */}
          <div className="mt-6 space-y-6 text-gray-600 leading-relaxed">
            <p>
              Maniesta ResumeAI is an AI-powered resume builder and ATS optimization platform built
              to help job seekers create professional resumes faster.
            </p>
            <p>
              Our mission is to make resume creation simple, intelligent, and effective. We combine
              modern design templates with AI writing assistance and ATS keyword analysis to
              maximize your chances of getting interviews.
            </p>
            <p>
              Whether you&apos;re starting from scratch or improving an existing resume, Maniesta
              ResumeAI gives you the tools to build a resume that stands out.
            </p>
          </div>

          {/* Developer info */}
          <div className="mt-12">
            <h2 className="text-2xl font-display font-semibold text-gray-900">Developer</h2>
            <Card className="mt-4 p-6 border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-400 text-white text-2xl font-bold shadow-glass">
                  UM
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">Usman Murtaza</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Full-stack developer and product engineer focused on building modern SaaS
                    applications. Created Maniesta ResumeAI to help job seekers build better resumes
                    with AI and ATS optimization.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="https://usmanmurtaza.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <GlobeIcon size={16} />
                      Portfolio
                      <ExternalLinkIcon size={14} />
                    </a>
                    <a
                      href="mailto:usmanmurtaza2004@gmail.com"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <MailIcon size={16} />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact section */}
          <div className="mt-12">
            <h2 className="text-2xl font-display font-semibold text-gray-900">Contact</h2>
            <Card className="mt-4 p-6 border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
              <p className="text-sm text-gray-600">
                Have questions, feedback, or need support? Reach out to us and we&apos;ll get back
                to you as soon as possible.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href="mailto:usmanmurtaza2004@gmail.com">
                  <Button variant="outline" className="group">
                    <MailIcon size={16} className="mr-2" />
                    usmanmurtaza2004@gmail.com
                    <ArrowRightIcon
                      size={14}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </Button>
                </a>
                <a
                  href="https://usmanmurtaza.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="group">
                    <GlobeIcon size={16} className="mr-2" />
                    Portfolio
                    <ExternalLinkIcon size={14} className="ml-2" />
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
