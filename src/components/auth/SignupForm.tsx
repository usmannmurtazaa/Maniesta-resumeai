import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/services/firebase/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { EyeIcon, EyeOffIcon, GoogleIcon, UserIcon, MailIcon, LockIcon } from '@/components/ui/icons';

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
      // If you need to set displayName, use Firebase user updateProfile after signup
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-600">Start building your professional resume today.</p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <UserIcon size={18} className="absolute left-3 top-9 text-gray-400" />
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MailIcon size={18} className="absolute left-3 top-9 text-gray-400" />
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
          />
        </div>
        <div className="relative">
          <LockIcon size={18} className="absolute left-3 top-9 text-gray-400" />
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </div>
        {password && (
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Password strength</span>
              <span>{passwordStrength.label}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.percent}%` }}
              />
            </div>
          </div>
        )}
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <Checkbox
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5"
          />
          I agree to the{' '}
          <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
        </label>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
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
      >
        <GoogleIcon size={18} className="mr-2" />
        {googleLoading ? 'Connecting...' : 'Google'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
          Log in
        </Link>
      </p>
    </form>
  );
}

function getPasswordStrength(password: string): { label: string; percent: number; color: string } {
  if (password.length === 0) return { label: '', percent: 0, color: 'bg-gray-200' };
  if (password.length < 6) return { label: 'Weak', percent: 30, color: 'bg-red-500' };
  if (password.length < 10) return { label: 'Moderate', percent: 60, color: 'bg-yellow-500' };
  return { label: 'Strong', percent: 100, color: 'bg-green-500' };
}