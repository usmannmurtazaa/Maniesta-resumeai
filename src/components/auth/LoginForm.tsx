import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { authService } from '@/services/firebase/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  MailIcon,
  LockIcon,
  LogInIcon,
} from '@/components/ui/icons';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await authService.loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <motion.form
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-600">Log in to continue your resume journey.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600"
            role="alert"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.01 }} className="relative">
          <MailIcon size={18} className="absolute left-3 top-9 text-gray-400" />
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
            autoComplete="email"
          />
        </motion.div>

        <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.01 }} className="relative">
          <LockIcon size={18} className="absolute left-3 top-9 text-gray-400" />
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10"
            autoComplete="current-password"
          />
          <motion.button
            type="button"
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={showPassword ? 'off' : 'on'}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-2"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" disabled={submitting} className="w-full" loading={submitting}>
        {!submitting && <LogInIcon size={16} className="mr-2" />}
        {submitting ? 'Logging in...' : 'Log in'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={googleLoading}
        loading={googleLoading}
      >
        {!googleLoading && <GoogleIcon size={18} className="mr-2" />}
        {googleLoading ? 'Connecting...' : 'Google'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          to="/signup"
          className="font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-2"
        >
          Sign up
        </Link>
      </p>
    </motion.form>
  );
}
