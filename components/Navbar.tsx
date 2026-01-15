"use client";

import React, { useState } from "react";
import {
  MenuIcon,
  XIcon,
  WalletIcon,
  UserIcon,
  LayersIcon,
  HomeIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (pathName.includes("admin")) {
    return;
  }

  return (
    <nav className="bg-forged-black border-b border-antique-brass/30 font-abeezee px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <span className="text-xl font-bold text-antique-brass">Karthlog</span>
        </a>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a
            onClick={() => router.push("/")}
            className="text-cowrie-bone hover:text-antique-brass hover:cursor-pointer transition-colors"
          >
            Home
          </a>
          <a
            onClick={() => router.push("/collection")}
            className="text-cowrie-bone hover:text-antique-brass hover:cursor-pointer transition-colors"
          >
            Collection
          </a>
          <a
            onClick={() => router.push("/wallet")}
            className="text-cowrie-bone hover:text-antique-brass hover:cursor-pointer transition-colors"
          >
            Wallet
          </a>
          <a
            onClick={() => router.push("/account")}
            className="text-cowrie-bone hover:text-antique-brass hover:cursor-pointer transition-colors"
          >
            Account
          </a>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-cowrie-bone"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-forged-black border-t border-antique-brass/30 py-2 mt-4">
          <div className="flex flex-col space-y-3 px-4 py-2">
            <a
              className="flex items-center py-2 text-cowrie-bone"
              onClick={() => {
                setIsOpen(false);
                router.push("/");
              }}
            >
              <HomeIcon size={18} className="mr-2" />
              Home
            </a>
            <a
              className="flex items-center py-2 text-cowrie-bone"
              onClick={() => {
                setIsOpen(false);
                router.push("/collection");
              }}
            >
              <LayersIcon size={18} className="mr-2" />
              Collection
            </a>
            <a
              className="flex items-center py-2 text-cowrie-bone"
              onClick={() => {
                setIsOpen(false);
                router.push("/wallet");
              }}
            >
              <WalletIcon size={18} className="mr-2" />
              Wallet
            </a>
            <a
              className="flex items-center py-2 text-cowrie-bone"
              onClick={() => {
                setIsOpen(false);
                router.push("/account");
              }}
            >
              <UserIcon size={18} className="mr-2" />
              Account
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
