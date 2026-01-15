"use client";

import React, { useEffect, useState } from "react";
import {
  BadgeCheckIcon,
  CoinsIcon,
  GiftIcon,
  KeyIcon,
  LockIcon,
  StarIcon,
  UserIcon,
  XCircle,
} from "lucide-react";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { useGetUserQuery, useSendDataMutation } from "@/store/api/api";
import { logOut } from "@/store/slices/isAuthSlice";
import {
  areValuesEmpty,
  formatDateToReadable,
  validateRegistration,
} from "@/utils/util";
import { toast } from "react-toastify";

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const benefits = [
    {
      platform: "WireCart",
      benefits: [
        "10% discount on all purchases",
        "Early access to new products",
        "Free shipping on orders over $50",
      ],
      icon: <ShoppingCartIcon className="text-antique-brass" />,
    },
    {
      platform: "BlaccTheddiPost",
      benefits: [
        "Access to premium stories and content",
        "Ad-free reading experience",
        "Exclusive author interviews",
      ],
      icon: <BookOpenIcon className="text-antique-brass" />,
    },
    {
      platform: "Wind & Ways",
      benefits: [
        "Special edition collectibles",
        "Trading priority in marketplace",
        "Invitations to collector events",
      ],
      icon: <MapIcon className="text-antique-brass" />,
    },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
  };

  //CHECK IF USER IS AUTHENTICATED BASED ON WHAT IS STORED ON LOCAL STORAGE
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuth.isAuth
  );
  // GET USERS INFO FROM LOCAL STORAGE
  const role = getDataFromLocalStorage("role");
  useEffect(() => {
    isAuthenticated ? "" : router.push(`/auth`);
    if (role) {
      role === "admin" ? router.push(`/admin`) : "";
    }
  }, [isAuthenticated, role]);

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl md:text-2xl font-bold text-cowrie-bone mb-6">
        Your Account
      </h1>
      {/* Profile Section */}
      <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-antique-brass flex justify-center items-center">
              <h2 className="font-poppins font-semibold text-4xl text-white">
                {userInfo && userInfo?.name[0].toUpperCase()}
              </h2>
            </div>
            {userInfo?.karthlogStatus && (
              <div className="absolute -bottom-2 -right-2 bg-antique-brass rounded-full p-1">
                <BadgeCheckIcon size={16} className="text-forged-black" />
              </div>
            )}
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-cowrie-bone">
                  {userInfo && userInfo?.name}
                </h2>
                <p className="text-cowrie-bone/70 text-xs font-abeezee">
                  {userInfo && userInfo?.email}
                </p>
                <p className="text-sm text-cowrie-bone/60 mt-1 font-abeezee">
                  Member since{" "}
                  {userInfo && formatDateToReadable(userInfo?.createdAt)}
                </p>
              </div>
              {userInfo?.karthlogStatus ? (
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="bg-antique-brass/10 px-3 py-1 rounded-full flex items-center">
                    <StarIcon size={16} className="text-antique-brass mr-1" />
                    <span className="text-cowrie-bone font-medium text-sm">
                      Karthlog Status
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 md:mt-0 flex items-center font-abeezee">
                  <div className="bg-antique-brass/10 px-3 py-1 rounded-full flex items-center">
                    <span className="text-cowrie-bone font-medium text-sm">
                      Link a card to unlock Karthlog status
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-3">
                <div className="flex items-center">
                  <CoinsIcon size={16} className="text-antique-brass mr-2" />
                  <span className="text-cowrie-bone/70 font-abeezee text-xs md:text-sm">
                    Total Cowrie
                  </span>
                </div>
                <p className="text-lg font-bold text-cowrie-bone mt-1">
                  {userInfo && userInfo?.cowrieBalance}
                </p>
              </div>
              <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-3">
                <div className="flex items-center">
                  <GiftIcon size={16} className="text-antique-brass mr-2" />
                  <span className="text-cowrie-bone/70 font-abeezee text-xs md:text-sm">
                    Cards Owned
                  </span>
                </div>
                <p className="text-lg font-bold text-cowrie-bone mt-1">
                  {userInfo && userInfo?.cardsOwned?.length}
                </p>
              </div>

              <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-3 col-span-2 md:col-span-1">
                <Button
                  onClick={() => setShowModal(true)}
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <UserIcon size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Karthlog Benefits */}
      <div className="mb-8">
        <div className="flex flex-col md:items-center justify-between md:flex-row mb-4">
          <h2 className="text-base md:text-lg font-bold text-cowrie-bone">
            Your Karthlog Benefits
          </h2>
          <div className="text-cowrie-bone/70 text-sm flex items-center font-abeezee">
            <LockIcon size={14} className="mr-1" />
            <span>Unlocked with Karthlog Status</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((platform, index) => (
            <div
              key={index}
              className="bg-forged-black border border-antique-brass/30 rounded-lg p-5 hover:border-antique-brass transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className="bg-antique-brass/10 p-2 rounded-full mr-3">
                  {platform.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-cowrie-bone">
                  {platform.platform}
                </h3>
              </div>
              <ul className="space-y-2 font-abeezee">
                {platform.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-antique-brass mr-2">•</span>
                    <span className="text-cowrie-bone/80 text-sm">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4">
          Account Settings
        </h2>
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg divide-y divide-antique-brass/10">
          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xs font-medium text-cowrie-bone">Log out</h3>
              <p className="text-xs font-abeezee text-cowrie-bone/70">
                Log out from Karthlog
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="text-xs"
              variant="outline"
            >
              YES
            </Button>
          </div>

          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xs font-medium text-cowrie-bone">
                Connected Platforms
              </h3>
              <p className="text-xs font-abeezee text-cowrie-bone/70">
                Manage your connected services
              </p>
            </div>
            <Button className="text-xs" variant="outline">
              Configure
            </Button>
          </div>

          <div className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xs font-medium text-cowrie-bone">
                Security Settings
              </h3>
              <p className="text-xs font-abeezee text-cowrie-bone/70">
                Update password and security options
              </p>
            </div>
            <Button
              onClick={() => setShowModal(true)}
              className="text-xs"
              variant="outline"
            >
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <XCircle
            onClick={() => setShowModal(false)}
            size={30}
            className="text-antique-brass absolute top-4 right-4 cursor-pointer"
          />
          <div className="w-[80%] md:w-[60%] bg-forged-black border border-antique-brass/30 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Profile Settings */}
            <div className="bg-forged-black p-6">
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
                    className="w-full bg-forged-black border py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
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
            <div className="bg-forged-black rounded-lg p-6">
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
        </div>
      )}
    </div>
  );
};

// Custom icons for the benefits section
const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1"></circle>
    <circle cx="19" cy="21" r="1"></circle>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
);
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
const MapIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

export default Account;
