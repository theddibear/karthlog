import { CardData } from "../components/Card";
export const cards: CardData[] = [
  {
    id: "card-001",
    name: "Ancestral Whispers",
    description:
      "This card connects you to the wisdom of the past, carrying stories across generations.",
    cowrieAmount: 500,
    imageUrl:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1530",
    type: "PREMIUM",
    benefits: [
      "Exclusive access to BlaccTheddiPost PREMIUM stories",
      "10% discount on WireCart purchases",
      "Early access to Wind & Ways events",
    ],
  },
  {
    id: "card-002",
    name: "Coastal Memories",
    description:
      "Inspired by the shores where cowrie shells were first collected, this card honors trading traditions.",
    cowrieAmount: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?auto=format&fit=crop&q=80&w=1476",
    type: "STANDARD",
    benefits: [
      "STANDARD access to BlaccTheddiPost content",
      "5% discount on WireCart purchases",
      "Wind & Ways community membership",
    ],
  },
  {
    id: "card-003",
    name: "Heritage Gold",
    description:
      "A LIMITED edition card celebrating cultural heritage and the value of community wealth.",
    cowrieAmount: 1000,
    imageUrl:
      "https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&q=80&w=1470",
    type: "LIMITED",
    benefits: [
      "Lifetime access to all BlaccTheddiPost content",
      "20% discount on all WireCart purchases",
      "VIP access to Wind & Ways events and early releases",
      "Quarterly exclusive digital art drops",
    ],
  },
  {
    id: "card-004",
    name: "Diaspora Dreams",
    description:
      "Connecting the global community through shared stories and economic empowerment.",
    cowrieAmount: 750,
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1528",
    type: "PREMIUM",
    benefits: [
      "PREMIUM access to BlaccTheddiPost archives",
      "15% discount on WireCart purchases",
      "Monthly exclusive content from Wind & Ways",
      "Access to community investment opportunities",
    ],
  },
  {
    id: "card-005",
    name: "Future Harvest",
    description:
      "Representing the sustainable farming practices that back the Cowrie currency system.",
    cowrieAmount: 400,
    imageUrl:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80&w=1374",
    type: "STANDARD",
    benefits: [
      "Farm-to-table produce discounts via WireCart",
      "Seasonal recipe collections from BlaccTheddiPost",
      "Invitations to community harvest events",
    ],
  },
  {
    id: "card-006",
    name: "Artisan's Legacy",
    description:
      "Celebrating the craftspeople and creators who form the backbone of our economic community.",
    cowrieAmount: 850,
    imageUrl:
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1530",
    type: "LIMITED",
    benefits: [
      "Direct access to artisan marketplaces",
      "Exclusive craftsman tutorials and stories",
      "First access to LIMITED edition handcrafted items",
      "Artisan collaboration opportunities",
    ],
  },
];
export const getCardById = (id: string): CardData | undefined => {
  return cards.find((card) => card.id === id);
};

// Mock transaction history
export const transactions = [
  {
    id: "tx-001",
    type: "receive",
    amount: 500,
    description: "Received from card linking",
    date: "2023-10-15",
    card: "Ancestral Whispers",
  },
  {
    id: "tx-002",
    type: "spend",
    amount: 150,
    description: "Purchase at WireCart",
    date: "2023-10-10",
    card: null,
  },
  {
    id: "tx-003",
    type: "receive",
    amount: 350,
    description: "Received from card linking",
    date: "2023-10-05",
    card: "Coastal Memories",
  },
  {
    id: "tx-004",
    type: "receive",
    amount: 1000,
    description: "Received from card linking",
    date: "2023-09-28",
    card: "Heritage Gold",
  },
  {
    id: "tx-005",
    type: "spend",
    amount: 250,
    description: "BlaccTheddiPost subscription",
    date: "2023-09-20",
    card: null,
  },
];

// Mock user data
export const user = {
  name: "Alex Johnson",
  email: "alex@example.com",
  profileImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374",
  memberSince: "August 2023",
  karthlogStatus: true,
  totalCowrie: 1850,
  cardsOwned: 3,
};
