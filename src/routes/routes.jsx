import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";
import OTPVerification from "../components/auth/OTPVerification";
import DashboardPage from "../pages/dashboard/DashboardPage";
import OperatorsPage from "../pages/operators/OperatorsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import { OperatorProvider } from "../context/OperatorContext";
import { ProtectedRouteWithLayout } from "./ProtectedRouteWithLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import OperatorLayout from "../components/layout/OperatorLayout";
import ProfileLayout from "../components/layout/ProfileLayout";
import OperatorsDetailsLayout from "../components/layout/OperatorsDetailsLayout";
import OperatorDetailsPage from "../pages/OperatorsDetails/OperatorsDetailsPage";

export const routes = [
  // Public Routes
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/verify-otp",
    element: <OTPVerification />,
  },

  // Protected Routes with Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <ProtectedRouteWithLayout layout={DashboardLayout}>
        <DashboardPage />
      </ProtectedRouteWithLayout>
    ),
  },

  {
    path: "/operators",
    element: (
      <ProtectedRouteWithLayout layout={OperatorLayout}>
        <OperatorProvider>
          <OperatorsPage />
        </OperatorProvider>
      </ProtectedRouteWithLayout>
    ),
  },


  // {
  //   path: '/operator-details/:comId',
  //   element: (
  //     <ProtectedRouteWithLayout layout={OperatorsDetailsLayout}>
  //       <OperatorProvider>
  //         <OperatorDetailsPage />
  //       </OperatorProvider>
  //     </ProtectedRouteWithLayout>
  //   ),
  // },


  {
    path: "/profile",
    element: (
      <ProtectedRouteWithLayout layout={ProfileLayout}>
        <ProfilePage />
      </ProtectedRouteWithLayout>
    ),
  },


  // Redirect root to dashboard
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Navigate to="/dashboard" replace />
      </ProtectedRoute>
    ),
  },

  // Catch all route
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
