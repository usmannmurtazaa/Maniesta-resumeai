import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ToastProvider } from '@/contexts/ToastContext';

function AppRoutes() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
