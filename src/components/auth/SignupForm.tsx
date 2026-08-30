import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { authService } from '@/services/firebase/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  UserPlusIcon,
} from '@/components/ui/icons';

export function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Please accept the terms and conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await authService.signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await authService.loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Google signup failed. Please try again.');
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
        <h1 className="text-3xl font-display font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">Start building your professional resume today.</p>
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
          <UserIcon size={18} className="absolute left-3 top-9 text-gray-400" />
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="pl-10"
            autoComplete="name"
          />
        </motion.div>

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
            autoComplete="new-password"
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

        <AnimatePresence>
          {password && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Password strength</span>
                <span className={passwordStrength.textColor}>{passwordStrength.label}</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                <motion.div
                  className={`h-full rounded-full ${passwordStrength.color}`}
                  initial={prefersReducedMotion ? { width: 0 } : { width: 0 }}
                  animate={{ width: `${passwordStrength.percent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Input
          type={showPassword ? 'text' : 'password'}
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            I agree to the{' '}
            <a href="#" className="text-primary-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      <Button type="submit" disabled={submitting} className="w-full" loading={submitting}>
        {!submitting && <UserPlusIcon size={16} className="mr-2" />}
        {submitting ? 'Creating account...' : 'Create Account'}
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
        onClick={handleGoogleSignup}
        disabled={googleLoading}
        loading={googleLoading}
      >
        {!googleLoading && <GoogleIcon size={18} className="mr-2" />}
        {googleLoading ? 'Connecting...' : 'Google'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-primary-600 hover:text-primary-500 transition-colors hover:underline underline-offset-2"
        >
          Log in
        </Link>
      </p>
    </motion.form>
  );
}

function getPasswordStrength(password: string): {
  label: string;
  percent: number;
  color: string;
  textColor: string;
} {
  if (password.length === 0)
    return { label: '', percent: 0, color: 'bg-gray-200', textColor: 'text-gray-400' };
  if (password.length < 6)
    return { label: 'Weak', percent: 30, color: 'bg-red-500', textColor: 'text-red-500' };
  if (password.length < 10)
    return { label: 'Moderate', percent: 60, color: 'bg-yellow-500', textColor: 'text-yellow-600' };
  return { label: 'Strong', percent: 100, color: 'bg-green-500', textColor: 'text-green-600' };
}
