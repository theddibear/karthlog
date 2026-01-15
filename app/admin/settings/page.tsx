"use client";

import React, { useState } from "react";
import {
  CheckCircleIcon,
  KeyIcon,
  UserIcon,
  AlertCircleIcon,
} from "lucide-react";
import Button from "@/components/Button";
import { adminUsers } from "@/data/admin";
import { useGetUserQuery, useSendDataMutation } from "@/store/api/api";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { toast } from "react-toastify";
import { areValuesEmpty, validateRegistration } from "@/utils/util";

const AdminSettings = () => {
  const id = getDataFromLocalStorage("id");
  // Fetch userData
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUserQuery({ id: id, query: {} });
  const userInfo = userData && userData?.data;

  const [name, setName] = useState(userInfo?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || "");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    editProfile();
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    handleChangePassword();
  };

  //MAKE API CALL
  const [makeCall, { isLoading: isLoading, reset: reset }] =
    useSendDataMutation();
  const [
    passwordChange,
    { isLoading: isLoadingPassword, reset: resetPassword },
  ] = useSendDataMutation();
  const [profileUpdate, { isLoading: isLoadingProfile, reset: resetProfile }] =
    useSendDataMutation();

  const resend = async () => {
    const request = await makeCall({
      url: "auth/resendOTP",
      data: { email: (userInfo && userInfo.email) || "" },
      type: "POST",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };
  const handleChangePassword = async () => {
    const isUserEmpty = areValuesEmpty({ newPassword, confirmPassword, OTP });
    if (isUserEmpty) {
      toast.error("Empty Fields");
      return;
    }
    const validationResult = validateRegistration(
      (userInfo && userInfo.email) || "",
      newPassword,
      confirmPassword
    );
    if (validationResult !== true) {
      toast.error(validationResult);
      return;
    }
    const request = await passwordChange({
      url: "auth/changePassword",
      data: { newPassword, confirmPassword, OTP },
      type: "PATCH",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };
  const editProfile = async () => {
    const isUserEmpty = areValuesEmpty({ name, phoneNumber });
    if (isUserEmpty) {
      toast.error("Empty Fields");
      return;
    }
    const request = await profileUpdate({
      url: "auth/editProfile",
      data: { name, phoneNumber },
      type: "PATCH",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-cowrie-bone">
          Admin Settings
        </h1>
        <p className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
          Manage your admin account and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6">
          <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4 flex items-center">
            <UserIcon size={20} className="mr-2 text-antique-brass" />
            Profile Settings
          </h2>

          <form
            onSubmit={handleProfileUpdate}
            className="space-y-4 font-abeezee"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-cowrie-bone mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-bold text-cowrie-bone mb-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
                required
              />
            </div>

            <div className="pt-2">
              <Button
                disabled={isLoadingProfile}
                type="submit"
                variant="primary"
              >
                {isLoadingProfile ? (
                  <span>Updating Profile...</span>
                ) : (
                  <>Update Profile</>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6">
          <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4 flex items-center">
            <KeyIcon size={20} className="mr-2 text-antique-brass" />
            Change Password
          </h2>

          <form
            onSubmit={handlePasswordUpdate}
            className="space-y-4 font-abeezee"
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm text-cowrie-bone mb-1 font-bold"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-cowrie-bone mb-1 font-bold"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
                required
              />
            </div>
            <div className="w-full flex flex-col gap-2 mt-4 font-abeezee">
              <label
                htmlFor="otp"
                className="block text-sm text-cowrie-bone mb-1 font-bold"
              >
                OTP
              </label>
              <input
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
                type="text"
                placeholder="OTP code"
                name="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
              <Button
                disabled={isLoading}
                onClick={resend}
                variant="primary"
                className="md:w-fit"
              >
                {isLoading ? <span>Sending OTP...</span> : <>Get OTP</>}
              </Button>
            </div>

            <div className="pt-2">
              <Button
                disabled={isLoadingPassword}
                type="submit"
                variant="primary"
              >
                {isLoadingPassword ? (
                  <span>Updating Password...</span>
                ) : (
                  <>Update Password</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Admin Role Information */}
      <div className="mt-8 bg-forged-black border border-antique-brass/30 rounded-lg p-6">
        <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4">
          Admin Role
        </h2>
        <div className="flex items-center p-4 bg-antique-brass/10 rounded-lg font-abeezee">
          <div className="mr-4">
            <div className="w-12 h-12 rounded-full bg-antique-brass/20 flex items-center justify-center font-titan">
              <span className="text-antique-brass font-bold text-lg">
                {userInfo?.role === "super_admin" ? "S" : "A"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-cowrie-bone">
              {userInfo?.role === "super_admin"
                ? "Super Administrator"
                : "Administrator"}
            </div>
            <div className="text-xs text-cowrie-bone/70">
              {userInfo?.role === "super_admin"
                ? "Full access to all Karthlog system features and settings"
                : "Standard access to Karthlog administration features"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
