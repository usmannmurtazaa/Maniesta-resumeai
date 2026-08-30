import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 12, scale: 0.99, filter: 'blur(2px)' }
      }
      animate={
        prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      exit={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -12, scale: 0.99, filter: 'blur(2px)' }
      }
      transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
