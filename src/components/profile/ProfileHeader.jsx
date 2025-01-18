import React, { useState } from "react";
import { Book, MoreHorizontal } from "lucide-react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import EditProfileForm from "./EditProfileForm";
//import { updateProfile } from "../../utils/api";

const ProfileHeader = ({ title, email, onProfileUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const updatedProfile = await updateProfile(formData);
      onProfileUpdate?.(updatedProfile);
      setIsEditModalOpen(false);
    } catch (error) {
      // Handle error (show error message to user)
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div className="bg-[#0F1523] p-6 rounded-lg mb-6 border border-[#1E2533]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[#4F46E5] text-sm font-medium mb-2">INSTA CHARTER</p>
            <h1 className="text-xl font-semibold text-gray-100 mb-1">{title}</h1>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" className="flex items-center">
              <Book className="w-4 h-4 mr-2" />
              Help
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </Button>
            <Button variant="ghost" className="px-2">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit profile"
      >
        <EditProfileForm
          initialData={{ title, email }}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default ProfileHeader;