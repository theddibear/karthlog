import React from "react";
import { CardDisplay } from "./CardDisplay";
import { CardItem } from "@/utils/types";

interface CardGridProps {
  cards: CardItem[];
}

export const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards &&
        cards?.map((card) => <CardDisplay key={card.id} cardItem={card} />)}
    </div>
  );
};
