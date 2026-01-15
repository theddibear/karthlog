"use client";

import React, { useState } from "react";
import {
  CoinsIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
} from "lucide-react";
import Button from "@/components/Button";
import {
  useGetCowrieRateHistoryQuery,
  useGetCowrieRateQuery,
  useGetUserQuery,
  useSendDataMutation,
} from "@/store/api/api";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { toast } from "react-toastify";
import { formatDateToReadable } from "@/utils/util";

const AdminExchange = () => {
  const [newRate, setNewRate] = useState(0);

  const handleUpdateRate = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate();
  };

  // Fetch cowrieRateHistory and cowrieRate
  const {
    data: cowrieRateData,
    isLoading: cowrieRateIsLoading,
    error: cowrieRateError,
  } = useGetCowrieRateQuery({});
  const cowrieRateInfo = cowrieRateData && cowrieRateData?.data;
  const {
    data: cowrieRateHistoryData,
    isLoading: cowrieRateHistoryIsLoading,
    error: cowrieRateHistoryError,
  } = useGetCowrieRateHistoryQuery({});
  const cowrieRateHistoryInfo =
    cowrieRateHistoryData && cowrieRateHistoryData?.data;

  const id = getDataFromLocalStorage("id");
  // Fetch userData
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetUserQuery({ id: id, query: {} });
  const userInfo = userData && userData?.data;

  //MAKE API CALL
  const [updateRate, { isLoading, reset }] = useSendDataMutation();
  const handleUpdate = async () => {
    if (newRate === 0) {
      toast.error("Empty Fields!");
      return;
    }
    const request = await updateRate({
      url: "karthlog/cowrie",
      data: { amountPerCowrie: Number(newRate) },
      type: "PATCH",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
      setNewRate(0);
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
          Cowrie Exchange Rate
        </h1>
        <p className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
          Manage the exchange rate between Cowrie and Naira
        </p>
      </div>

      {/* Current Rate Card */}
      <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-cowrie-bone/70 mb-1 font-abeezee text-sm">
              Current Exchange Rate
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-cowrie-bone">
              1 Cowrie ={" "}
              <span className="text-antique-brass">
                ₦{cowrieRateInfo && cowrieRateInfo?.amountPerCowrie}
              </span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 p-3 bg-antique-brass/10 rounded-lg font-abeezee text-xs md:text-sm">
            <div className="flex items-center">
              <CoinsIcon size={20} className="text-antique-brass mr-2" />
              <span className="text-cowrie-bone">
                Set by admin on{" "}
                {cowrieRateHistoryInfo &&
                  formatDateToReadable(cowrieRateHistoryInfo[0]?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Update Rate Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6">
          <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4">
            Update Exchange Rate
          </h2>

          <form onSubmit={handleUpdateRate}>
            <div className="mb-4 font-abeezee">
              <label
                htmlFor="rate"
                className="block text-sm font-medium text-cowrie-bone mb-1"
              >
                New Rate (Naira per Cowrie)
              </label>
              <div className="flex">
                <div className="bg-forged-black border border-r-0 border-antique-brass/30 rounded-l-lg px-3 py-2 flex items-center">
                  <span className="text-cowrie-bone">₦</span>
                </div>
                <input
                  id="rate"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="text-sm flex-grow bg-forged-black border border-antique-brass/30 rounded-r-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <p className="text-xs text-cowrie-bone/70 font-abeezee">
                This will update the exchange rate for all transactions and
                calculations. Current admin:{" "}
                <span className="text-cowrie-bone">
                  {userInfo && userInfo?.name}
                </span>
              </p>
            </div>
            <Button type="submit" variant="primary">
              {isLoading ? (
                <span>Updating rate...</span>
              ) : (
                <>Update Exchange Rate</>
              )}
            </Button>
          </form>
        </div>

        {/* Rate History */}
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6">
          <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4">
            Exchange Rate History
          </h2>
          <div className="space-y-4 font-abeezee">
            {cowrieRateHistoryInfo &&
              cowrieRateHistoryInfo.map((rate: any, index: any) => {
                const isIncrease =
                  index < cowrieRateHistoryInfo.length - 1 &&
                  rate.rate > cowrieRateHistoryInfo[index + 1].rate;
                return (
                  <div
                    key={rate.id}
                    className="flex items-center justify-between p-3 border border-antique-brass/20 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          isIncrease ? "bg-green-500/10" : "bg-red-500/10"
                        }`}
                      >
                        {isIncrease ? (
                          <TrendingUpIcon
                            size={16}
                            className="text-green-500"
                          />
                        ) : (
                          <TrendingDownIcon
                            size={16}
                            className="text-red-500"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-cowrie-bone text-sm">
                          ₦{rate.rate}
                        </div>
                        <div className="flex items-center text-xs text-cowrie-bone/70">
                          <CalendarIcon size={12} className="mr-1" />
                          {formatDateToReadable(rate.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-cowrie-bone/70">
                      Set by{" "}
                      {`${rate.emailOfSetter ? rate.emailOfSetter : "admin"}`}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminExchange;
