"use client";

import React, { useEffect, useState } from "react";
import { LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { areValuesEmpty, validateRegistration } from "@/utils/util";
import { setIsAuth } from "@/store/slices/isAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSendDataMutation } from "@/store/api/api";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { RootState } from "@/store/store";

const login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCreateAccount, setIsCreateAccount] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createAccountData, setCreateAccountData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleCreateInputChange = (event: any) => {
    const { name, value } = event.target;
    setCreateAccountData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup();
  };

  //MAKE API CALL
  const [login, { isLoading, reset }] = useSendDataMutation();
  const handleLogin = async () => {
    const isUserEmpty = areValuesEmpty({ email, password });
    if (isUserEmpty) {
      toast.error("Empty Fields!");
      return;
    }
    const validationResult = validateRegistration(email, password, undefined);
    if (validationResult !== true) {
      toast.error(validationResult);
      return;
    }
    const request = await login({
      url: "auth/login",
      data: { email, password },
      type: "POST",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
      dispatch(
        setIsAuth({
          isAuth: true,
          accessToken: data.accessToken,
          user: data.user,
        })
      );
      data && data?.user?.role === "admin"
        ? router.push(`/admin`)
        : router.push(`/wallet`);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };
  const handleSignup = async () => {
    const isUserEmpty = areValuesEmpty({ createAccountData });
    if (isUserEmpty) {
      toast.error("Empty Fields");
      return;
    }
    const validationResult = validateRegistration(
      createAccountData.email,
      createAccountData.password,
      createAccountData.confirmPassword
    );
    if (validationResult !== true) {
      toast.error(validationResult);
      return;
    }
    const request = await login({
      url: "auth/signup",
      data: { ...createAccountData, role: "consignor" },
      type: "POST",
    });
    if (request?.data) {
      const { data, message, status } = request?.data;

      toast.success(message);
      setIsCreateAccount(false);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };

  //CHECK IF USER IS AUTHENTICATED BASED ON WHAT IS STORED ON LOCAL STORAGE
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuth.isAuth
  );
  // GET USERS INFO FROM LOCAL STORAGE
  const role = getDataFromLocalStorage("role");
  useEffect(() => {
    if (isAuthenticated) {
      role === "admin" ? router.push(`/admin`) : router.push(`/wallet`);
    }
  }, [isAuthenticated, role]);

  if (isCreateAccount) {
    return (
      <div className="flex items-center justify-center bg-forged-black px-4 mt-[50px] mb-[50px] xl:mt-[100px] xl:mb-[150px]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-lg md:text-xl font-bold text-antique-brass">
              KARTHLOG
            </h1>
            <p className="mt-2 text-cowrie-bone/70 font-abeezee">
              Create Account
            </p>
          </div>
          <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 md:p-8">
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-cowrie-bone mb-1"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  value={createAccountData.firstName}
                  onChange={handleCreateInputChange}
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-cowrie-bone mb-1"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={createAccountData.lastName}
                  onChange={handleCreateInputChange}
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-cowrie-bone mb-1"
                >
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={createAccountData.email}
                  onChange={handleCreateInputChange}
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-cowrie-bone mb-1"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={createAccountData.password}
                  onChange={handleCreateInputChange}
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-cowrie-bone mb-1"
                >
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={createAccountData.confirmPassword}
                  onChange={handleCreateInputChange}
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="flex items-center justify-center w-full"
              >
                {isLoading ? (
                  <span>Creating an account...</span>
                ) : (
                  <>
                    <LockIcon size={18} className="mr-2" />
                    Create Now
                  </>
                )}
              </Button>

              <div
                onClick={() => setIsCreateAccount(false)}
                className="p-1 cursor-pointer font-abeezee w-full text-center"
              >
                <span className="text-antique-brass text-xs">
                  Login Instead
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-forged-black px-4 mt-[50px] mb-[50px] xl:mt-[100px] xl:mb-[150px]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-lg md:text-xl font-bold text-antique-brass">
            KARTHLOG
          </h1>
          <p className="mt-2 text-cowrie-bone/70 font-abeezee">
            Sign in to gain access
          </p>
        </div>
        <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cowrie-bone mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-cowrie-bone mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="flex items-center justify-center w-full"
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LockIcon size={18} className="mr-2" />
                  Sign In
                </>
              )}
            </Button>

            <div
              onClick={() => setIsCreateAccount(true)}
              className="p-1 cursor-pointer font-abeezee w-full text-center"
            >
              <span className="text-antique-brass text-xs">Create Account</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default login;
