import React, { useEffect } from "react";
import ProfileLayout from "../../components/layout/ProfileLayout";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileDetails from "../../components/profile/UserProfile";

const ProfilePage = () => {
  return (
    <ProfileLayout>
      <ProfileHeader />
      <ProfileDetails />
    </ProfileLayout>
  );
};

export default ProfilePage;
