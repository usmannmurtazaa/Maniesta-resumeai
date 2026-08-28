import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/firebase/auth';

export function UserMenu() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100"
      >
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="h-8 w-8 rounded-full" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
            {user?.email?.[0].toUpperCase()}
          </div>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg z-50"
          >
            <div className="p-2 border-b">
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                navigate('/dashboard/settings');
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}