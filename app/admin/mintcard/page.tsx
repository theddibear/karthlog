"use client";

import React, { useState } from "react";
import {
  useGetAllCardsQuery,
  useGetAllMintedCardsQuery,
  useSendDataMutation,
} from "@/store/api/api";
import { toast } from "react-toastify";
import { areValuesEmpty } from "@/utils/util";
import Button from "@/components/Button";
import { CardGrid } from "@/components/admin/CardGrid";

const Mintcards = () => {
  const [mintData, setMintData] = useState({ cardId: "", amountToMint: 0 });
  // Fetch allCardsData
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
  } = useGetAllCardsQuery(null);
  const fetchedCards = cardsData?.data;

  // Fetch allMintedCardsData
  const {
    data: mintedCardsData,
    isLoading: mintedCardsIsLoading,
    error: mintedCardsError,
  } = useGetAllMintedCardsQuery(null);
  const fetchedmintedCards = mintedCardsData?.data;

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  // Calculate pagination values
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = fetchedmintedCards?.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(fetchedmintedCards?.length / cardsPerPage);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleMintCards = (e: React.FormEvent) => {
    e.preventDefault();
    handleMintCardsApi();
  };

  //MAKE API CALL
  const [mintCard, { isLoading, reset }] = useSendDataMutation();
  const handleMintCardsApi = async () => {
    const isUserEmpty = areValuesEmpty(mintData);
    if (isUserEmpty || mintData.amountToMint === 0) {
      toast.error("Empty Fields!");
      return;
    }
    const request = await mintCard({
      url: "karthlog/cards/mint",
      data: { ...mintData },
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

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-6">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-cowrie-bone">
            Mint New Cards
          </h1>
          <p className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
            Mint and Print new Karthlog cards
          </p>
        </div>
      </div>

      {/* Update Rate Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6">
          <h2 className="text-base md:text-lg font-bold text-cowrie-bone mb-4">
            Mint Cards
          </h2>

          <form onSubmit={handleMintCards}>
            <div className="mb-4 font-abeezee">
              <label
                htmlFor="cardId"
                className="block text-sm font-medium text-cowrie-bone mb-1"
              >
                Select Card
              </label>
              <div className="flex">
                <select
                  id="cardId"
                  value={mintData.cardId}
                  onChange={(e) =>
                    setMintData((prev) => ({
                      ...prev,
                      cardId: e.target.value,
                    }))
                  }
                  className="text-sm flex-grow bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass"
                  required
                >
                  <option value="">Select from list of cards</option>
                  {fetchedCards &&
                    fetchedCards.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mb-4 font-abeezee">
              <label
                htmlFor="amountToMint"
                className="block text-sm font-medium text-cowrie-bone mb-1"
              >
                Number of Cards to Mint
              </label>
              <div className="flex">
                <input
                  id="amountToMint"
                  type="number"
                  min="0"
                  value={mintData.amountToMint}
                  onChange={(e) =>
                    setMintData((prev) => ({
                      ...prev,
                      amountToMint: Number(e.target.value),
                    }))
                  }
                  className="text-sm flex-grow bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary">
              {isLoading ? <span>Minting Card...</span> : <>Mint Card</>}
            </Button>
          </form>
        </div>
      </div>

      <div className="min-h-screen w-full bg-forged-black text-cowrie-bone mt-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg md:text-xl font-bold mb-4 text-cowrie-bone">
            Card Collection
          </h1>

          <CardGrid cards={currentCards} />

          {/* Pagination */}
          <div className="flex justify-center mt-8 font-abeezee">
            <div className="flex space-x-2">
              <button
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-antique-brass text-cowrie-bone rounded disabled:opacity-50"
              >
                {"<"}
              </button>
              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-antique-brass text-cowrie-bone"
                        : "bg-cowrie-bone text-forged-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  currentPage < totalPages && paginate(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-antique-brass text-cowrie-bone rounded disabled:opacity-50"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mintcards;
