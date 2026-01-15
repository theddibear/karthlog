"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  PlusCircleIcon,
  WalletIcon,
} from "lucide-react";
import { cards } from "@/data/card";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { useGetUserQuery } from "@/store/api/api";

const Wallet = () => {
  const router = useRouter();
  // Calculate total Cowrie from all cards
  const totalCowrie = cards.reduce((sum, card) => sum + card.cowrieAmount, 0);
  const [showScanModal, setShowScanModal] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl md:text-2xl font-bold text-cowrie-bone mb-6">
        Your Wallet
      </h1>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-forged-black to-forged-black/80 border border-antique-brass/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-cowrie-bone/70 mb-1 font-abeezee">
              Total Balance
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-cowrie-bone font-abeezee">
              <span className="text-antique-brass font-titan">
                {userInfo?.cowrieBalance}
              </span>{" "}
              Cowrie
            </h2>
            <p className="text-sm text-cowrie-bone/70 mt-2 font-abeezee">
              Across {userInfo?.cardsOwned?.length} linked cards
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="primary"
              onClick={() => setShowScanModal(true)}
              className="flex items-center"
            >
              <PlusCircleIcon size={18} className="mr-2" />
              Link New Card
            </Button>
          </div>
        </div>
      </div>

      {/* Cards and Transactions Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Linked Cards */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-cowrie-bone mb-4">
            Linked Cards
          </h2>
          <div className="bg-forged-black border border-antique-brass/30 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {userInfo?.cardsOwned?.length > 0 ? (
                userInfo?.cardsOwned &&
                userInfo?.cardsOwned?.map((card: any) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 border-b border-antique-brass/10 hover:bg-antique-brass/5 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-cowrie-bone font-abeezee text-xs md:text-sm">
                          {card.name}
                        </h3>
                        <p className="text-xs text-cowrie-bone/70">
                          {card.type.charAt(0).toUpperCase() +
                            card.type.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-antique-brass text-xs md:text-sm">
                        {card.cowrieAmount} Cowrie
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-cowrie-bone/80">No cards linked yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-cowrie-bone mb-4">
            Transaction History
          </h2>
          <div className="bg-forged-black border border-antique-brass/30 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {userInfo?.karthlogTransactions?.length > 0 ? (
                userInfo?.karthlogTransactions &&
                userInfo?.karthlogTransactions?.map((tx: any) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 border-b border-antique-brass/10 hover:bg-antique-brass/5 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          tx.transactionType === "credit"
                            ? "bg-green-500/10"
                            : "bg-red-500/10"
                        }`}
                      >
                        {tx.transactionType === "credit" ? (
                          <ArrowDownLeftIcon
                            size={16}
                            className="text-green-500"
                          />
                        ) : (
                          <ArrowUpRightIcon
                            size={16}
                            className="text-red-500"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-cowrie-bone font-abeezee text-xs md:text-sm">
                          {tx.description}
                        </h3>
                        <p className="text-cowrie-bone/70 font-abeezee text-xs">
                          {tx.paymentDate}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold text-xs font-abeezee ${
                          tx.transactionType === "receive"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {tx.transactionType === "credit" ? "+" : "-"}
                        {tx.amount} Cowrie
                      </p>
                      {tx.card && (
                        <p className="text-xs font-abeezee text-cowrie-bone/70">
                          {tx?.cardUsed?.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-cowrie-bone/80">
                    No karthlog transactions yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Link New Card Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-cowrie-bone mb-4">
              Link a New Card
            </h3>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-antique-brass/10 rounded-full flex items-center justify-center">
                <WalletIcon size={32} className="text-antique-brass" />
              </div>
              <p className="text-cowrie-bone mb-6">
                Scan the QR code on your physical Karthlog card or enter the
                card code manually.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => router.push(`/scan`)}
                  variant="primary"
                  className="w-full"
                >
                  Open Camera to Scan
                </Button>
                <Button variant="outline" className="w-full">
                  Enter Code Manually
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-antique-brass/30 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => setShowScanModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
