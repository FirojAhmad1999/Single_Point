import * as jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const tokenHandler = {
  storeToken: (token) => {
    Cookies.set('auth_token', token, {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
      path: '/'
    });
  },

  getToken: () => Cookies.get('auth_token'),

  clearToken: () => Cookies.remove('auth_token'),

  isTokenValid: () => {
    const token = Cookies.get('auth_token');
    if (!token) return false;
    try {
      const decoded = jwtDecode.jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  parseUserFromToken: (token) => {
    try {
      const decoded = jwtDecode.jwtDecode(token);
      return {
        id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }
};