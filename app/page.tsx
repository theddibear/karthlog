"use client";

import React from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import {
  ArrowRightIcon,
  Bookmark,
  CoinsIcon,
  QrCodeIcon,
  WalletIcon,
} from "lucide-react";
import { cards } from "@/data/card";
import { useRouter } from "next/navigation";
import { useGetAllCardsQuery } from "@/store/api/api";

const Landing = () => {
  // Featured cards for the hero section
  const featuredCards = cards.slice(0, 3);
  const router = useRouter();

  // Fetch allCardsData
  const {
    data: cardsData,
    isLoading: cardsIsLoading,
    error: cardsError,
  } = useGetAllCardsQuery(null);
  const fetchedCards = cardsData?.data;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?auto=format&fit=crop&q=80&w=1476')] bg-cover bg-center opacity-20 hidden md:block"></div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cowrie-bone mb-4">
                Art & Currency{" "}
                <span className="text-antique-brass">United</span>
              </h1>
              <p className="text-base md:text-xl text-cowrie-bone/80 font-abeezee mb-8">
                Karthlog cards blend digital currency with collectible art,
                giving you access to exclusive content, discounts, and a
                community of creators and collectors.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => router.push("/collection")}
                  className="flex items-center justify-between"
                  variant="primary"
                >
                  Explore Cards
                  <ArrowRightIcon size={20} className="ml-2" />
                </Button>
                <Button
                  onClick={() => router.push("/wallet")}
                  variant="outline"
                >
                  View Wallet
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-80 h-96">
                {featuredCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="absolute w-64 transition-all duration-300 hover:z-10"
                    style={{
                      top: `${index * 50}px`,
                      right: `${index * 50}px`,
                      transform: `rotate(${index * 5 - 5}deg)`,
                      zIndex: index,
                    }}
                  >
                    <Card card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-forged-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-cowrie-bone mb-12">
            What Makes Karthlog Special
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-4 md:p-6 hover:border-antique-brass transition-colors">
              <div className="bg-antique-brass/10 p-3 rounded-full w-fit mb-4">
                <CoinsIcon size={24} className="text-antique-brass" />
              </div>
              <h3 className="text-xl font-bold text-cowrie-bone mb-2">
                Backed by Real Value
              </h3>
              <p className="text-cowrie-bone/80 font-abeezee text-sm md:text-base">
                Each Karthlog card holds Cowrie — our internal digital currency
                backed by farm produce, giving it real-world value.
              </p>
            </div>
            <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-4 md:p-6 hover:border-antique-brass transition-colors">
              <div className="bg-antique-brass/10 p-3 rounded-full w-fit mb-4">
                <Bookmark size={24} className="text-antique-brass" />
              </div>
              <h3 className="text-xl font-bold text-cowrie-bone mb-2">
                Collectible Art
              </h3>
              <p className="text-cowrie-bone/80 font-abeezee text-sm md:text-base">
                Each card features unique artwork that can be collected, traded,
                or gifted — combining digital assets with physical collectibles.
              </p>
            </div>
            <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-4 md:p-6 hover:border-antique-brass transition-colors">
              <div className="bg-antique-brass/10 p-3 rounded-full w-fit mb-4">
                <QrCodeIcon size={24} className="text-antique-brass" />
              </div>
              <h3 className="text-xl font-bold text-cowrie-bone mb-2">
                Digital + Physical
              </h3>
              <p className="text-cowrie-bone/80 font-abeezee text-sm md:text-base">
                Scan the QR code on your physical card to link it to your
                digital account, unlocking special content and features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-cowrie-bone/5 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-cowrie-bone mb-4">
            How Karthlog Works
          </h2>
          <p className="text-center text-sm md:text-lg font-abeezee text-cowrie-bone/80 max-w-2xl mx-auto mb-12">
            Karthlog seamlessly connects physical cards with digital benefits,
            creating a unique ecosystem for collectors and users.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-left">
              <div className="bg-forged-black border border-antique-brass/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-antique-brass font-bold">1</span>
              </div>
              <h3 className="text-lg font-medium text-cowrie-bone mb-2">
                Acquire a Card
              </h3>
              <p className="text-sm text-cowrie-bone/80 font-abeezee">
                Purchase or receive a Karthlog card with its unique design and
                embedded Cowrie value.
              </p>
            </div>
            <div className="text-left">
              <div className="bg-forged-black border border-antique-brass/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-antique-brass font-bold">2</span>
              </div>
              <h3 className="text-lg font-medium text-cowrie-bone mb-2">
                Link Your Account
              </h3>
              <p className="text-sm text-cowrie-bone/80 font-abeezee">
                Scan the QR code to connect the physical card to your digital
                Karthlog account.
              </p>
            </div>
            <div className="text-left">
              <div className="bg-forged-black border border-antique-brass/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-antique-brass font-bold">3</span>
              </div>
              <h3 className="text-lg font-medium text-cowrie-bone mb-2">
                Unlock Benefits
              </h3>
              <p className="text-sm text-cowrie-bone/80 font-abeezee">
                Gain access to exclusive content, discounts, and community
                features across our platforms.
              </p>
            </div>
            <div className="text-left">
              <div className="bg-forged-black border border-antique-brass/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-antique-brass font-bold">4</span>
              </div>
              <h3 className="text-lg font-medium text-cowrie-bone mb-2">
                Use or Trade
              </h3>
              <p className="text-sm text-cowrie-bone/80 font-abeezee">
                Spend your Cowrie on purchases, or transfer the card to someone
                else — the value moves with it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-forged-black to-forged-black/80 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-cowrie-bone mb-4">
            Ready to Join Karthlog?
          </h2>
          <p className="text-cowrie-bone/80 max-w-2xl mx-auto mb-8 text-sm md:text-lg font-abeezee">
            Start your collection today and experience the unique blend of
            digital currency and collectible art.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => router.push("/collection")}
              variant="primary"
            >
              Browse Collection
            </Button>
            <Button
              onClick={() => router.push("/wallet")}
              className="flex items-center justify-between"
              variant="outline"
            >
              <WalletIcon size={20} className="mr-2" />
              Check Wallet
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
