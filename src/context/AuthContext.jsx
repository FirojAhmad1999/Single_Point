import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth.api';
import { tokenHandler } from '../utils/tokenHandler';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    const token = tokenHandler.getToken();
    if (token && tokenHandler.isTokenValid()) {
      const userData = tokenHandler.parseUserFromToken(token);
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  };

  const signup = async (data) => {
    try {
      const response = await authApi.signup(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const resendOtp = async (email) => {
    try {
      const response = await authApi.resendOtp(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verifyOtp = async (email, otp, isSignin = false) => {
    try {
      const apiMethod = isSignin ? authApi.validateSigninOtp : authApi.validateSignupOtp;
      const response = await apiMethod(email, otp);

      // For signin flow
      if (isSignin) {
        if (response.data.data?.token) {
          const token = response.data.data.token;
          tokenHandler.storeToken(token);
          const userData = tokenHandler.parseUserFromToken(token);
          if (userData) {
            setUser(userData);
          }
        }
      }
      
      // Return true if the response is successful, regardless of token
      return response.data.success || !!response.data.data?.token;
      
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const login = async (email) => {
    try {
      const response = await authApi.login(email);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    tokenHandler.clearToken();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        verifyOtp,
        resendOtp,
        logout,
        loading,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};