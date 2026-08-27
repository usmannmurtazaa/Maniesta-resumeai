import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-lg">
          M
        </div>
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent-400 ring-2 ring-white" />
      </div>
      {showText && (
        <span className="text-xl font-display font-bold text-gray-900">
          Maniesta <span className="text-primary-600">ResumeAI</span>
        </span>
      )}
    </Link>
  );
}