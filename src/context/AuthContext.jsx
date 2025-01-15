import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { authApi } from '../api/auth.api';

// Export the context so it can be imported by useAuth
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ 
          email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    await authApi.login(email);
    setUser({ email });
  };

  const signup = async (data) => {
    await authApi.signup(data);
    setUser({ email: data.email });
  };

  const verifyOtp = async (email, otp, isSignin = false) => {
    try {
      const apiMethod = isSignin ? authApi.validateSigninOtp : authApi.validateSignupOtp;
      const response = await apiMethod(email, otp);
      return response.data.success;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const resendOtp = async (email) => {
    await authApi.resendOtp(email);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      verifyOtp, 
      resendOtp, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};