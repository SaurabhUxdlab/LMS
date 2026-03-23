import React from "react";
import { useSettingsViewModel } from "../viewmodel/SettingsViewModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const {
    profile,
    password,
    updateProfile,
    updatePassword,
    saveProfile,
    changePassword,
  } = useSettingsViewModel();

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your account settings
        </p>
      </div>

      {/* PROFILE SETTINGS */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Profile Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={profile.name}
              onChange={(e) =>
                updateProfile("name", e.target.value)
              }
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={profile.email}
              onChange={(e) =>
                updateProfile("email", e.target.value)
              }
              className="mt-1"
            />
          </div>

        </div>

        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) =>
              updateProfile("bio", e.target.value)
            }
            className="mt-1 w-full h-28 border rounded-md p-2 text-sm"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={saveProfile}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save Profile
          </Button>
        </div>
      </div>

      {/* PASSWORD SETTINGS */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div>
            <label className="text-sm font-medium">
              Current Password
            </label>
            <Input
              type="password"
              value={password.currentPassword}
              onChange={(e) =>
                updatePassword("currentPassword", e.target.value)
              }
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              New Password
            </label>
            <Input
              type="password"
              value={password.newPassword}
              onChange={(e) =>
                updatePassword("newPassword", e.target.value)
              }
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>
            <Input
              type="password"
              value={password.confirmPassword}
              onChange={(e) =>
                updatePassword("confirmPassword", e.target.value)
              }
              className="mt-1"
            />
          </div>

        </div>

        <div className="flex justify-end">
          <Button
            onClick={changePassword}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Update Password
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Settings;