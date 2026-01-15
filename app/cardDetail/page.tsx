"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, CoinsIcon, GiftIcon, ShareIcon } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useGetCardQuery } from "@/store/api/api";
import { toast } from "react-toastify";

export default function CardDetail() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Fetch allCardsData
  const {
    data: cardData,
    isLoading: cardIsLoading,
    error: cardError,
  } = useGetCardQuery({ id });
  const fetchedCard = cardData?.data;

  if (!fetchedCard) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-cowrie-bone mb-4 font-abeezee">
          Card Not Found
        </h2>
        <p className="text-cowrie-bone/70 mb-8 font-abeezee">
          The card you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => router.push("/collection")}
          className="flex justify-between items-center mx-auto"
          variant="outline"
        >
          <ArrowLeftIcon size={16} className="mr-2" />
          Back to Collection
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <a
        onClick={() => router.push("/collection")}
        className="inline-flex items-center text-cowrie-bone/70 hover:text-antique-brass mb-6 transition-colors cursor-pointer font-abeezee"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Collection
      </a>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Card Visualization */}
        <div className="max-w-md mx-auto md:mx-0">
          <Card card={fetchedCard} showDetails={true} className="w-full" />
        </div>

        {/* Card Details */}
        <div>
          <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-lg md:text-xl font-bold text-cowrie-bone">
                  {fetchedCard?.name}
                </h1>
                <div className="flex items-center mt-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      fetchedCard?.type === "limited"
                        ? "bg-antique-brass text-forged-black"
                        : fetchedCard?.type === "premium"
                        ? "bg-antique-brass/70 text-forged-black"
                        : "bg-antique-brass/40 text-forged-black"
                    }`}
                  >
                    {fetchedCard?.type?.charAt(0).toUpperCase() +
                      fetchedCard?.type?.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center bg-forged-black border border-antique-brass/30 px-3 py-1.5 rounded-full">
                <CoinsIcon size={16} className="text-antique-brass mr-1" />
                <span className="font-bold text-cowrie-bone">
                  {fetchedCard?.cowrieAmount}
                </span>
                <span className="text-cowrie-bone/70 ml-1 text-sm font-abeezee">
                  Cowrie
                </span>
              </div>
            </div>

            <p className="text-sm text-cowrie-bone/80 mb-6 font-abeezee">
              {fetchedCard?.description}
            </p>

            <div className="border-t border-antique-brass/30 pt-4 mt-4">
              <h3 className="text-sm font-medium text-antique-brass mb-2">
                Card Benefits:
              </h3>
              <ul className="text-sm text-cowrie-bone/80 space-y-2 font-abeezee">
                {fetchedCard?.benefits?.map((benefit: string, index: any) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-antique-brass">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="primary"
              className="flex items-center justify-center"
              onClick={() => setIsTransferModalOpen(true)}
            >
              <GiftIcon size={18} className="mr-2" />
              Transfer Card
            </Button>
            <Button
              onClick={() => {
                toast.info("Feature coming soon");
              }}
              variant="outline"
              className="flex items-center justify-center"
            >
              <ShareIcon size={18} className="mr-2" />
              Share Card
            </Button>
          </div>

          {/* Card History */}
          {/* <div className="mt-8">
            <h3 className="text-lg md:text-xl font-bold text-cowrie-bone mb-4">
              Card History
            </h3>
            <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-4 font-abeezee">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-antique-brass mr-3"></div>
                  <div className="flex-grow">
                    <p className="text-cowrie-bone">
                      Card added to your account
                    </p>
                    <p className="text-xs text-cowrie-bone/70">
                      October 15, 2023
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-antique-brass/50 mr-3"></div>
                  <div className="flex-grow">
                    <p className="text-cowrie-bone">Card created and minted</p>
                    <p className="text-xs text-cowrie-bone/70">
                      October 10, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-cowrie-bone mb-4">
              Transfer Card
            </h3>
            <div className="mb-6">
              <p className="text-cowrie-bone/80 mb-4 font-abeezee text-sm">
                Transferring this card will move both the digital asset and the{" "}
                {fetchedCard?.cowrieAmount} Cowrie to the recipient's account.
              </p>
              <div className="bg-antique-brass/10 p-4 rounded-lg text-xs md:text-sm text-cowrie-bone/90 mb-4 font-abeezee">
                <p>
                  <span className="font-bold">Note:</span> The recipient must
                  have a Karthlog account to receive this card. They'll need to
                  scan the physical card to complete the transfer.
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-cowrie-bone mb-1 font-abeezee">
                  Recipient Email or Username
                </label>
                <input
                  type="text"
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm font-abeezee"
                  placeholder="Enter recipient's email or username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cowrie-bone mb-1 font-abeezee">
                  Message (Optional)
                </label>
                <textarea
                  className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm font-abeezee"
                  rows={3}
                  placeholder="Add a personal message..."
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsTransferModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast.info("Feature coming soon");
                }}
                variant="primary"
              >
                Confirm Transfer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
