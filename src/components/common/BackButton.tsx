import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/Button';

interface BackButtonProps {
  label?: string;
  to?: string; // optional explicit path; if omitted, uses history.back()
}

export function BackButton({ label = 'Back', to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} className="mb-4">
      <ArrowLeftIcon size={18} className="mr-2" />
      {label}
    </Button>
  );
}