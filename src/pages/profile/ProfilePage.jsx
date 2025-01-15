import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData({
          name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
          email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email'],
          role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Profile Information</h1>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl">{userData.name.charAt(0)}</span>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1 text-lg text-gray-900">{userData.name}</p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">{userData.email}</p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-sm font-medium text-gray-500">Role</h3>
                <p className="mt-1 text-lg text-gray-900">{userData.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;