import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../layout/AuthLayout';
import { User, Mail, Loader } from 'lucide-react';

const SignupForm = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ Name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Name) newErrors.Name = 'Full name is required.';
    if (!formData.email) newErrors.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setShowMessage(true);

    try {
      await signup(formData);
      navigate('/verify-otp', {
        state: { email: formData.email, isSignup: true },
      });
    } catch (error) {
      setErrors({ general: error.message });
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
            <Loader className="w-4 h-4 animate-spin" />
            <span>Creating your account and sending verification code...</span>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <img
              src="https://blobcntainerinstacharter.blob.core.windows.net/instacharter-az-0125-container/Instacharter_Images/logo/image4.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {errors.general && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label htmlFor="Name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="Name"
                name="Name"
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className={`block w-full pl-10 px-3 py-2 bg-gray-50 border ${
                  errors.Name ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
            {errors.Name && (
              <p className="text-sm text-red-500 mt-1">{errors.Name}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`block w-full pl-10 px-3 py-2 bg-gray-50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="name@company.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignupForm;