"use client";

import React, { useState, Fragment } from "react";
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  XCircleIcon,
  Trash,
} from "lucide-react";
import { cards } from "@/data/card";
import Button from "@/components/Button";
import CardForm from "@/components/admin/CardForm";
import { useGetAllCardsQuery, useSendDataMutation } from "@/store/api/api";
import { toast } from "react-toastify";
import { areValuesEmpty } from "@/utils/util";

const AdminCards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<
    "all" | "STANDARD" | "PREMIUM" | "LIMITED"
  >("all");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);

  // Fetch allCardsData
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
  } = useGetAllCardsQuery(null);
  const fetchedCards = cardsData?.data;

  // Filter cards based on search and filter
  const filteredCards =
    fetchedCards &&
    fetchedCards?.filter((card: any) => {
      // Search filter
      if (
        searchTerm &&
        !card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !card.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Type filter
      if (filter === "STANDARD" && card.type !== "STANDARD") return false;
      if (filter === "PREMIUM" && card.type !== "PREMIUM") return false;
      if (filter === "LIMITED" && card.type !== "LIMITED") return false;
      return true;
    });

  //MAKE API CALL
  const [updateRate, { isLoading, reset }] = useSendDataMutation();
  const handleCreateCard = async (cardData: any) => {
    const isUserEmpty = areValuesEmpty(cardData);
    if (isUserEmpty) {
      toast.error("Empty Fields!");
      return;
    }
    const request = await updateRate({
      url: "karthlog/cards",
      data: { ...cardData },
      type: "POST",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
      setShowCreateForm(false);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };
  const handleDeleteCard = async (id: string) => {
    const request = await updateRate({
      url: `karthlog/cards/${id}`,
      data: {},
      type: "DELETE",
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
  const handleUpdateCard = async (cardData: any) => {
    const isUserEmpty = areValuesEmpty(cardData);
    if (isUserEmpty) {
      toast.error("Empty Fields!");
      return;
    }
    const request = await updateRate({
      url: `karthlog/cards/${editingCard}`,
      data: { ...cardData },
      type: "PATCH",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
      setEditingCard(null);
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
            Card Management
          </h1>
          <p className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
            Create, edit, and manage Karthlog cards
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
          className="flex items-center"
        >
          <PlusIcon size={18} className="mr-1" />
          Create New Card
        </Button>
      </div>

      {showCreateForm && (
        <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-abeezee font-bold text-cowrie-bone">
              Create New Card
            </h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-cowrie-bone/70 hover:text-cowrie-bone"
            >
              <XCircleIcon size={20} />
            </button>
          </div>
          <CardForm
            onSubmit={handleCreateCard}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

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

      {/* Card List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-antique-brass/30">
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                Card
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                Cowrie
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-antique-brass uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-antique-brass/10 font-abeezee">
            {filteredCards?.length > 0 ? (
              filteredCards.map((card: any) => {
                const isEditing = editingCard === card.id;
                return (
                  <Fragment key={card.id}>
                    <tr className={`hover:bg-antique-brass/5`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                            <img
                              src={card.imageUrl}
                              alt={card.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-cowrie-bone text-sm">
                              {card.name}
                            </div>
                            <div className="text-xs text-cowrie-bone/70 max-w-xs truncate">
                              {card.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            card.type === "limited"
                              ? "bg-antique-brass text-forged-black"
                              : card.type === "premium"
                              ? "bg-antique-brass/70 text-forged-black"
                              : "bg-antique-brass/40 text-forged-black"
                          }`}
                        >
                          {card.type.charAt(0).toUpperCase() +
                            card.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-antique-brass font-medium">
                          {card.cowrieAmount}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="p-1 text-cowrie-bone/70 hover:text-cowrie-bone hover:bg-antique-brass/10 rounded cursor-pointer"
                            title="Edit card"
                            onClick={() => setEditingCard(card.id)}
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCard(card.id)}
                            className={`p-1 text-red-500 hover:text-red-400"} hover:bg-antique-brass/10 rounded cursor-pointer`}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Edit form row */}
                    {isEditing && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-4 bg-antique-brass/5"
                        >
                          <CardForm
                            initialData={card}
                            onSubmit={handleUpdateCard}
                            onCancel={() => setEditingCard(null)}
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-cowrie-bone/70"
                >
                  No cards found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCards;
