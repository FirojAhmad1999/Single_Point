import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileDetails from "../../components/profile/UserProfile";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <ProfileHeader />
      <ProfileDetails />
    </div>
  );
};

export default ProfilePage;
