"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutDashboardIcon,
  UsersIcon,
  CreditCardIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  CoinsIcon,
  ChevronDownIcon,
  Printer,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "@/store/slices/isAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { RootState } from "@/store/store";
import { useGetUserQuery } from "@/store/api/api";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboardIcon size={20} />,
    },
    {
      path: "/admin/cards",
      label: "Card Management",
      icon: <CreditCardIcon size={20} />,
    },
    {
      path: "/admin/mintcard",
      label: "Mint Cards",
      icon: <Printer size={20} />,
    },
    {
      path: "/admin/users",
      label: "User Management",
      icon: <UsersIcon size={20} />,
    },
    {
      path: "/admin/exchange",
      label: "Exchange Rate",
      icon: <CoinsIcon size={20} />,
    },
    {
      path: "/admin/settings",
      label: "Settings",
      icon: <SettingsIcon size={20} />,
    },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/");
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const id = getDataFromLocalStorage("id");
  // Fetch userData
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUserQuery({ id: id, query: {} });
  const userInfo = userData && userData?.data;

  // GET USERS INFO FROM LOCAL STORAGE
  const role = getDataFromLocalStorage("role");
  //CHECK IF USER IS AUTHENTICATED BASED ON WHAT IS STORED ON LOCAL STORAGE
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuth.isAuth
  );
  useEffect(() => {
    isAuthenticated ? "" : router.push(`/auth`);
    if (role && userInfo) {
      userInfo.role !== "admin" && role !== "admin" ? router.push(`/auth`) : "";
      return;
    }
    router.push(`/auth`);
  }, [isAuthenticated, role]);

  return (
    <div className="flex h-screen bg-forged-black">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="fixed inset-0 bg-black/50" onClick={closeSidebar}></div>
        <div className="fixed top-0 left-0 bottom-0 w-64 bg-forged-black border-r border-antique-brass/30">
          <div className="flex items-center justify-between p-4 border-b border-antique-brass/30">
            <div className="text-lg md:text-xl font-bold text-antique-brass font-abeezee">
              Karthlog Admin
            </div>
            <button onClick={closeSidebar}>
              <XIcon size={24} className="text-cowrie-bone" />
            </button>
          </div>
          <nav className="mt-4">
            {navItems.map((item) => (
              <div
                key={item.path}
                className={`flex items-center px-4 py-3 text-cowrie-bone hover:bg-antique-brass/10 font-abeezee cursor-pointer${
                  pathname === item.path
                    ? "bg-antique-brass/10 border-l-4 border-antique-brass"
                    : ""
                }`}
                onClick={() => {
                  closeSidebar();
                  router.push(`${item.path}`);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </div>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-cowrie-bone font-abeezee hover:bg-antique-brass/10 cursor-pointer"
            >
              <LogOutIcon size={20} className="mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="w-64 flex flex-col">
          <div className="flex-1 flex flex-col min-h-0 bg-forged-black border-r border-antique-brass/30">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-antique-brass/30">
              <div className="text-lg md:text-xl font-bold text-antique-brass font-abeezee">
                Karthlog Admin
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => {
                      router.push(`${item.path}`);
                    }}
                    className={`flex items-center px-4 py-3 rounded-md text-cowrie-bone hover:bg-antique-brass/10 font-abeezee cursor-pointer${
                      pathname === item.path
                        ? "bg-antique-brass/10 border-l-4 border-antique-brass"
                        : ""
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top header */}
        <div className="bg-forged-black border-b border-antique-brass/30 px-4 py-4.5 flex items-center justify-between">
          <button
            className="lg:hidden text-cowrie-bone focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon size={24} />
          </button>

          {/* Profile dropdown */}
          <div className="relative ml-auto">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-antique-brass flex justify-center items-center mr-2">
                <h2 className="font-poppins font-semibold text-xs text-white">
                  {userInfo && userInfo?.name[0].toUpperCase()}
                </h2>
              </div>
              <span className="text-cowrie-bone mr-1 font-abeezee text-sm">
                {userInfo && userInfo?.name}
              </span>
              <ChevronDownIcon size={16} className="text-cowrie-bone" />
            </div>

            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-forged-black border border-antique-brass/30 rounded-md shadow-lg py-1 z-10"
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <div
                  className="block px-4 py-2 text-cowrie-bone hover:bg-antique-brass/10 font-abeezee text-sm cursor-pointer"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    router.push(`/admin/settings`);
                  }}
                >
                  Settings
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-cowrie-bone hover:bg-antique-brass/10 font-abeezee text-sm cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-forged-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
