export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "super_admin";
  avatar?: string;
}
// Mock admin users
export const adminUsers: AdminUser[] = [
  {
    id: "admin-001",
    name: "Admin User",
    email: "admin@karthlog.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: "admin-002",
    name: "Super Admin",
    email: "super@karthlog.com",
    password: "super123", // In a real app, this would be hashed
    role: "super_admin",
  },
];
// Cowrie exchange rate data
export interface ExchangeRate {
  id: string;
  date: string;
  rate: number; // 1 Cowrie = X Naira
  setBy: string;
}
export const exchangeRateHistory: ExchangeRate[] = [
  {
    id: "rate-001",
    date: "2023-10-15",
    rate: 2.5, // 1 Cowrie = 2.5 Naira
    setBy: "admin-001",
  },
  {
    id: "rate-002",
    date: "2023-09-01",
    rate: 2.25,
    setBy: "admin-002",
  },
  {
    id: "rate-003",
    date: "2023-08-15",
    rate: 2.0,
    setBy: "admin-001",
  },
];
// Get current exchange rate
export const getCurrentExchangeRate = (): number => {
  const sorted = [...exchangeRateHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sorted[0]?.rate || 0;
};
