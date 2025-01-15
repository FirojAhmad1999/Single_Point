import { ProtectedRoute } from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';

export const ProtectedRouteWithLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
};
