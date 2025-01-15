import SignupPage from '../pages/auth/SignupPage';
import LoginPage from '../pages/auth/LoginPage';
import OTPVerification from '../components/auth/OTPVerification';
import DashboardPage from '../pages/dashboard/DashboardPage';
import OperatorsPage from '../pages/operators/OperatorsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import { OperatorProvider } from '../context/OperatorContext';
import { ProtectedRouteWithLayout } from './ProtectedRouteWithLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { Navigate } from 'react-router-dom';

export const routes = [
  // Public Routes
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/verify-otp',
    element: <OTPVerification />
  },
  
  // Protected Routes with Dashboard Layout
  {
    path: '/dashboard',
    element: (
      <ProtectedRouteWithLayout>
        <DashboardPage />
      </ProtectedRouteWithLayout>
    )
  },
  {
    path: '/operators',
    element: (
      <ProtectedRouteWithLayout>
        <OperatorProvider>
          <OperatorsPage />
        </OperatorProvider>
      </ProtectedRouteWithLayout>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRouteWithLayout>
        <ProfilePage />
      </ProtectedRouteWithLayout>
    )
  },
  
  // Redirect root to dashboard
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Navigate to="/dashboard" replace />
      </ProtectedRoute>
    )
  },
  
  // Catch all route
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];