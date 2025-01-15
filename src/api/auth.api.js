import api from './axios.config';

export const authApi = {
  signup: (data) => api.post('Account/Signup', data),
  login: (email) => api.post('Account/SignIn', { email }),
  validateSignupOtp: (email, otp) =>
    api.patch(`Account/ValidateSignupOTP?email=${encodeURIComponent(email)}&opt=${encodeURIComponent(otp)}`),
 validateSigninOtp: (email, otp) =>
  api.patch(`Account/ValidateSignInOTP?email=${encodeURIComponent(email)}&opt=${encodeURIComponent(otp)}`),

  resendOtp: (email) => api.patch('Account/Re_generateOTP', { email }),
};
