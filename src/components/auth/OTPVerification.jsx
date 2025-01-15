import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import AuthLayout from '../layout/AuthLayout';
import { KeyRound, CheckCircle2 } from 'lucide-react';

const OTPVerification = () => {
  const { verifyOtp, resendOtp } = useAuth(); // Use resendOtp from AuthContext
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;
  const isSignup = location.state?.isSignup;

  // Redirect to login if email is missing
  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const isVerified = await verifyOtp(email, otp, !isSignup);
      if (isVerified) {
        if (isSignup) {
          setShowSuccess(true);
          setTimeout(() => navigate('/login'), 3000);
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };
  

  const handleResendOtp = async () => {
    setError('');
    try {
      await resendOtp(email); // Resend OTP using email
      setTimer(60); // Reset timer on successful OTP resend
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    }
  };
  

  if (showSuccess) {
    return (
      <AuthLayout>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="text-center space-y-4">
             {/* Logo Image */}
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <img 
              src="https://blobcntainerinstacharter.blob.core.windows.net/instacharter-az-0125-container/Instacharter_Images/logo/image4.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Account Created Successfully!</h2>
              <p className="text-sm text-gray-600">Redirecting you to login page...</p>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="text-center space-y-4">
          {/* Logo Image */}
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <img 
              src="https://blobcntainerinstacharter.blob.core.windows.net/instacharter-az-0125-container/Instacharter_Images/logo/image4.png" 
              alt="Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
            <p className="text-sm text-gray-600">
              We've sent an OTP to <span className="font-medium">{email}</span>
            </p>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-1">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter verification code"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Verify OTP
          </button>
        </form>
        
        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-sm text-gray-600">
              Resend code in <span className="font-medium text-gray-800">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-sm text-blue-600 font-medium hover:text-blue-500 transition-colors duration-200"
            >
              Resend verification code
            </button>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default OTPVerification;