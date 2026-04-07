import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
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
              <Route path="/login" element={<LoginPage />} />
              
              {/* Private Routes (Wrapped in Layout) */}
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tracking" element={<CollectorTracking />} />
                <Route path="/collections" element={<Reports />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/collectors" element={<Collectors />} />
                <Route path="/reports" element={<Reports />} />
              </Route>
              
              {/* Global Redirects */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

// Forced HMR update to register Collectors route correctly
export default App;
