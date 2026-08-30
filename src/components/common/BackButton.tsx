import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@/components/ui/icons';

interface BackButtonProps {
  label?: string;
  to?: string;
}

export function BackButton({ label = 'Back', to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <motion.button
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-white/60 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label={label}
    >
      <ArrowLeftIcon size={18} className="transition-transform group-hover:-translate-x-0.5" />
      {label}
    </motion.button>
  );
}
