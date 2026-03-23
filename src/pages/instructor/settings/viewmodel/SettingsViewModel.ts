import { useState } from "react";
import type { InstructorProfile, PasswordData } from "../model/SettingsModel";

export const useSettingsViewModel = () => {
  const [profile, setProfile] = useState<InstructorProfile>({
    name: "Sarah Johnson",
    email: "instructor@gmail.com",
    bio: "I am a passionate instructor teaching tech courses.",
    avatar: "",
  });

  const [password, setPassword] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateProfile = (field: keyof InstructorProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updatePassword = (field: keyof PasswordData, value: string) => {
    setPassword((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = () => {
    console.log("Profile Saved:", profile);
    alert("Profile updated successfully!");
  };

  const changePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password Changed:", password);
    alert("Password updated successfully!");
  };

  return {
    profile,
    password,
    updateProfile,
    updatePassword,
    saveProfile,
    changePassword,
  };
};