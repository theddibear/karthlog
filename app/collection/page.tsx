"use client";

import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { cards } from "@/data/card";
import Card from "@/components/Card";
import { useGetAllCardsQuery } from "@/store/api/api";
import { ICard } from "@/utils/types";

export type CARD_TYPE = "STANDARD" | "PREMIUM" | "LIMITED";

const Collection = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch allCardsData
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
  } = useGetAllCardsQuery(null);
  const fetchedCards = cardsData?.data;

  const filteredCards =
    fetchedCards?.length > 0 &&
    fetchedCards?.filter((card: any) => {
      // Filter by type
      if (filter !== "all" && card.type !== filter) {
        return false;
      }
      // Filter by search term
      if (
        searchTerm &&
        !card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !card.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-cowrie-bone mb-2">
          Card Collection
        </h1>
        <p className="text-cowrie-bone/80 text-sm md:text-base font-abeezee">
          Browse and explore your Karthlog cards. Each card holds unique value
          and benefits.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center space-x-2 w-full overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-2 font-abeezee">
            <button
              className={`px-3 py-1 rounded-full text-xs md:text-sm hover:cursor-pointer ${
                filter === "all"
                  ? "bg-antique-brass text-forged-black"
                  : "bg-forged-black border border-antique-brass/30 text-cowrie-bone"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs md:text-sm hover:cursor-pointer ${
                filter === "STANDARD"
                  ? "bg-antique-brass text-forged-black"
                  : "bg-forged-black border border-antique-brass/30 text-cowrie-bone"
              }`}
              onClick={() => setFilter("STANDARD")}
            >
              Standard
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs md:text-sm hover:cursor-pointer ${
                filter === "PREMIUM"
                  ? "bg-antique-brass text-forged-black"
                  : "bg-forged-black border border-antique-brass/30 text-cowrie-bone"
              }`}
              onClick={() => setFilter("PREMIUM")}
            >
              Premium
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs md:text-sm hover:cursor-pointer ${
                filter === "LIMITED"
                  ? "bg-antique-brass text-forged-black"
                  : "bg-forged-black border border-antique-brass/30 text-cowrie-bone"
              }`}
              onClick={() => setFilter("LIMITED")}
            >
              Limited
            </button>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search cards..."
            className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 pl-10 pr-4 text-cowrie-bone focus:outline-none focus:border-antique-brass font-abeezee text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-antique-brass"
          />
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map((card: ICard) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-cowrie-bone/80">
            No cards found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};
export default Collection;
