import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import { useAuth } from './context/AuthContext';
import { useAuth } from '../src/hooks/useAuth';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import OTPVerification from './components/auth/OTPVerification';
import DashboardPage from './pages/DashboardPage';
import OperatorsPage from './pages/OperatorsPage';
import ProfilePage from './pages/ProfilePage';
import DashboardLayout from './components/layout/DashboardLayout';
import { OperatorProvider } from './context/OperatorContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Layout wrapper for protected routes
const ProtectedRouteWithLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OTPVerification />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteWithLayout>
                <DashboardPage />
              </ProtectedRouteWithLayout>
            }
          />

          <Route
            path="/operators"
            element={
              <ProtectedRouteWithLayout>
                <OperatorProvider>
                  <OperatorsPage />
                </OperatorProvider>
              </ProtectedRouteWithLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteWithLayout>
                <ProfilePage />
              </ProtectedRouteWithLayout>
            }
          />

          {/* Redirect root to dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;