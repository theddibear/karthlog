import React from "react";
import QRCode from "./QRCode";
import { useRouter } from "next/navigation";

export interface CardData {
  id: string;
  name: string;
  description: string;
  cowrieAmount: number;
  imageUrl: string;
  type: "STANDARD" | "PREMIUM" | "LIMITED";
  benefits: string[];
}

interface CardProps {
  card: CardData;
  showDetails?: boolean;
  className?: string;
}

const Card = ({ card, showDetails = false, className = "" }: CardProps) => {
  const router = useRouter();
  const typeColors = {
    STANDARD: "from-antique-brass/70 to-cowrie-bone/50",
    PREMIUM: "from-antique-brass to-cowrie-bone/80",
    LIMITED: "from-antique-brass to-cowrie-bone",
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-transform hover:scale-[1.03] ${className}`}
    >
      {/* Card Container */}
      <div className={`bg-gradient-to-br ${typeColors[card.type]} p-0.5`}>
        <div className="bg-forged-black rounded-lg overflow-hidden">
          {/* Card Content */}
          <div className="relative aspect-[3/4] overflow-hidden">
            {/* Card Image */}
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover"
            />

            {/* Card Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-forged-black to-transparent opacity-60"></div>

            {/* Card Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-cowrie-bone">
                    {card.name}
                  </h3>
                  {showDetails && (
                    <p className="text-xs md:text-sm text-cowrie-bone/80 mt-1 line-clamp-2 font-abeezee">
                      {card.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center bg-forged-black/90 px-2 py-1 rounded-full">
                  <span className="text-antique-brass font-bold">
                    {card.cowrieAmount}
                  </span>
                  <span className="text-cowrie-bone ml-1 text-sm font-abeezee">
                    Cowrie
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code (visible only on detail view) */}
            {showDetails && (
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 p-1 rounded-md">
                <QRCode value={`karthlog://card/${card.id}`} size={58} />
              </div>
            )}
          </div>

          {/* Card Footer (visible only in detail view) */}
          {showDetails && (
            <div className="p-4 border-t border-antique-brass/30">
              <h4 className="text-sm font-medium text-antique-brass mb-2">
                Card Benefits:
              </h4>
              <ul className="text-xs md:text-sm text-cowrie-bone/80 font-abeezee">
                {card?.benefits?.map((benefit, index) => (
                  <li key={index} className="mb-1 flex items-start">
                    <span className="mr-2 text-antique-brass">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Link overlay (only if not showing details) */}
      {!showDetails && (
        <a
          onClick={() => router.push(`/cardDetail?id=${card.id}`)}
          className="absolute inset-0 cursor-pointer"
          aria-label={`View details for ${card.name}`}
        ></a>
      )}
    </div>
  );
};
export default Card;
