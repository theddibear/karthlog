"use client";

import React from "react";
import { getCurrentExchangeRate } from "../../data/admin";
import {
  CreditCardIcon,
  UsersIcon,
  CoinsIcon,
  TrendingUpIcon,
} from "lucide-react";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
import {
  useGetAllCardsQuery,
  useGetAllUsersQuery,
  useGetCowrieRateQuery,
} from "@/store/api/api";

const AdminDashboard = () => {
  const router = useRouter();

  // Fetch allUserData
  const {
    data: usersData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetAllUsersQuery(null);
  const users = usersData?.data;

  // Fetch allCardsData
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
  } = useGetAllCardsQuery(null);
  const fetchedCards = cardsData?.data;

  const {
    data: cowrieRateData,
    isLoading: cowrieRateIsLoading,
    error: cowrieRateError,
  } = useGetCowrieRateQuery({});
  const cowrieRateInfo = cowrieRateData && cowrieRateData?.data;

  // Calculate statistics
  const totalCards = fetchedCards && fetchedCards?.length;
  const totalUsers = users && users.length;
  const activeUsers =
    users && users.filter((user: any) => user.isActive).length;
  const totalCowrie =
    fetchedCards &&
    fetchedCards.reduce((sum: any, card: any) => sum + card.cowrieAmount, 0);

  // Distribution of card types
  const cardTypes =
    fetchedCards &&
    fetchedCards.reduce((acc: any, card: any) => {
      acc[card.type] = (acc[card.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg md:text-xl font-bold text-cowrie-bone">
          Admin Dashboard
        </h1>
        <p className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
          Overview of Karthlog system status and key metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-cowrie-bone/70 font-abeezee">Total Cards</div>
            <div className="bg-antique-brass/10 p-2 rounded-full">
              <CreditCardIcon size={20} className="text-antique-brass" />
            </div>
          </div>
          <div className="text-lg md:text-xl font-bold text-cowrie-bone">
            {totalCards}
          </div>
          <div className="mt-2 flex items-center text-sm">
            <div className="text-green-500 flex items-center font-abeezee">
              <TrendingUpIcon size={14} className="mr-1" />
              <span>+{cardTypes?.LIMITED || 0} Limited</span>
            </div>
          </div>
        </div>
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-cowrie-bone/70 font-abeezee">Total Users</div>
            <div className="bg-antique-brass/10 p-2 rounded-full">
              <UsersIcon size={20} className="text-antique-brass" />
            </div>
          </div>
          <div className="text-lg md:text-xl font-bold text-cowrie-bone">
            {totalUsers}
          </div>
          <div className="mt-2 flex items-center text-sm">
            <div className="text-cowrie-bone/70 font-abeezee">
              <span>{activeUsers} active</span>
              {totalUsers - activeUsers > 0 && (
                <span className="text-red-500 ml-2">
                  {totalUsers - activeUsers} suspended
                </span>
              )}
            </div>
          </div>
        </div>
        {/* <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-cowrie-bone/70 font-abeezee">Total Cowrie</div>
            <div className="bg-antique-brass/10 p-2 rounded-full">
              <CoinsIcon size={20} className="text-antique-brass" />
            </div>
          </div>
          <div className="text-lg md:text-xl font-bold text-cowrie-bone">
            {totalCowrie}
          </div>
          <div className="mt-2 flex items-center text-sm text-cowrie-bone/70 font-abeezee">
            <span>
              ≈{" "}
              {(totalCowrie * cowrieRateInfo?.amountPerCowrie).toLocaleString()}{" "}
              Naira
            </span>
          </div>
        </div> */}
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-cowrie-bone/70 font-abeezee">
              Exchange Rate
            </div>
            <div className="bg-antique-brass/10 p-2 rounded-full">
              <CoinsIcon size={20} className="text-antique-brass" />
            </div>
          </div>
          <div className="text-lg md:text-xl font-bold text-cowrie-bone">
            1:₦{cowrieRateInfo?.amountPerCowrie}
          </div>
          <div className="mt-2 flex items-center text-sm font-abeezee cursor-pointer">
            <div
              onClick={() => router.push(`/admin/exchange`)}
              className="text-antique-brass hover:underline"
            >
              Update rate
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-5">
        <h2 className="text-base md:text-lg font-medium text-cowrie-bone mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div onClick={() => router.push(`/admin/cards`)}>
            <Button
              variant="outline"
              className="flex items-center justify-between"
            >
              <CreditCardIcon size={18} className="mr-2" />
              Manage Cards
            </Button>
          </div>
          <div onClick={() => router.push(`/admin/users`)}>
            <Button
              variant="outline"
              className="flex items-center justify-between"
            >
              <UsersIcon size={18} className="mr-2" />
              Manage Users
            </Button>
          </div>
          <div onClick={() => router.push(`/admin/exchange`)}>
            <Button
              variant="outline"
              className="flex items-center justify-between"
            >
              <CoinsIcon size={18} className="mr-2" />
              Update Exchange Rate
            </Button>
          </div>
        </div>
      </div>

      {/* Card Type Distribution */}
      <div className="mt-6 bg-forged-black border border-antique-brass/30 rounded-lg p-5">
        <h2 className="text-base md:text-lg font-medium text-cowrie-bone mb-4">
          Card Type Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-forged-black border border-antique-brass/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-cowrie-bone md:text-xl">
              {cardTypes?.STANDARD || 0}
            </div>
            <div className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
              Standard Cards
            </div>
          </div>
          <div className="bg-forged-black border border-antique-brass/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-cowrie-bone md:text-xl">
              {cardTypes?.PREMIUM || 0}
            </div>
            <div className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
              Premium Cards
            </div>
          </div>
          <div className="bg-forged-black border border-antique-brass/20 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-cowrie-bone md:text-xl">
              {cardTypes?.LIMITED || 0}
            </div>
            <div className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
              Limited Cards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
