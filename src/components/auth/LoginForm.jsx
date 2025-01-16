import React, { useState, useEffect } from 'react';
import { Mail, Loader } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../layout/AuthLayout';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.showMessage) {
      setShowMessage(true);
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage('Sending verification code to your email...');
    setShowMessage(true);

    try {
      await login(email);
      navigate('/verify-otp', { 
        state: { 
          email, 
          keepSignedIn, 
          isSignup: false 
        } 
      });
    } catch (error) {
      setError(error.message);
      setShowMessage(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {showMessage && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-md flex items-center space-x-2">
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-md">
            {error}
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12">
            <img
              src="https://blobcntainerinstacharter.blob.core.windows.net/instacharter-az-0125-container/Instacharter_Images/logo/image4.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Log in to Single Point</h2>
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-500 transition">
              Sign up
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email Address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                disabled={isLoading}
                className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-start">
            <input
              id="keepSignedIn"
              type="checkbox"
              checked={keepSignedIn}
              onChange={() => setKeepSignedIn(!keepSignedIn)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
              disabled={isLoading}
            />
            <label htmlFor="keepSignedIn" className="ml-2 text-sm text-gray-600">
              Keep me signed in
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
