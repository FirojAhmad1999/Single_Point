import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";

import CompanyDetails from "../../components/profile/CompanyDetails";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <ProfileHeader />
      <div className="relative flex-1">
      <CompanyDetails />
      </div>
    </div>
  );
};

export default ProfilePage;
