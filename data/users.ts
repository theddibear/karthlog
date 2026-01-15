// User card ownership
export interface User {
  id: string;
  name: string;
  email: string;
  suspended: boolean;
  memberSince: string;
  cards: string[]; // Array of card IDs
}
// Mock user data
export const users: User[] = [
  {
    id: "user-001",
    name: "Alex Johnson",
    email: "alex@example.com",
    suspended: false,
    memberSince: "2023-08-15",
    cards: ["card-001", "card-003", "card-004"],
  },
  {
    id: "user-002",
    name: "Morgan Smith",
    email: "morgan@example.com",
    suspended: false,
    memberSince: "2023-09-02",
    cards: ["card-002", "card-005"],
  },
  {
    id: "user-003",
    name: "Jamie Williams",
    email: "jamie@example.com",
    suspended: true,
    memberSince: "2023-07-22",
    cards: ["card-006"],
  },
  {
    id: "user-004",
    name: "Taylor Davis",
    email: "taylor@example.com",
    suspended: false,
    memberSince: "2023-10-05",
    cards: [],
  },
];
// Get card ownership data
export const getCardOwnership = (cardId: string): User | null => {
  const owner = users.find((user) => user.cards.includes(cardId));
  return owner || null;
};
// Toggle user suspension
export const toggleUserSuspension = (userId: string): User[] => {
  const updatedUsers = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        suspended: !user.suspended,
      };
    }
    return user;
  });
  return updatedUsers;
};
