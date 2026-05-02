import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CollectorTracking from './pages/CollectorTracking';
import Reports from './pages/Reports';
import Rewards from './pages/Rewards';
import Collectors from './pages/Collectors';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LandingPage forceLoginOpen={true} />} />
              
              {/* Private Routes (Wrapped in Layout) */}
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tracking" element={<CollectorTracking />} />
                <Route path="/collections" element={<Reports />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/collectors" element={<Collectors />} />
                <Route path="/reports" element={<Reports />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

// Forced HMR update to register Collectors route correctly
export default App;
