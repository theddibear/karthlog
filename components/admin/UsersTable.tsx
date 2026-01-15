import React, { useState } from "react";
import { AlertTriangleIcon, CheckCircleIcon, SearchIcon } from "lucide-react";
import Button from "../Button";
import { IUser } from "@/utils/types";

interface UserTableProps {
  users: IUser[];
  onToggleSuspend: (userId: string) => void;
}

const UserTable = ({ users, onToggleSuspend }: UserTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "status" | "cards">(
    "name"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: "name" | "email" | "status" | "cards") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 pl-10 pr-4 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm font-abeezee"
        />
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-antique-brass"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-antique-brass/30">
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("name")}
                >
                  User
                  {sortBy === "name" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("email")}
                >
                  Email
                  {sortBy === "email" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("cards")}
                >
                  Cards
                  {sortBy === "cards" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-antique-brass uppercase tracking-wider">
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortBy === "status" && (
                    <span className="ml-1">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-antique-brass uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-antique-brass/10">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-antique-brass/5 font-abeezee text-sm"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-antique-brass/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-antique-brass font-titan">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                      <span className="text-cowrie-bone">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-cowrie-bone/70">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-cowrie-bone">
                      {user?.cardsOwned?.length} card
                      {user?.cardsOwned?.length !== 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {user?.isActive === false ? (
                      <div className="flex items-center text-red-500">
                        <AlertTriangleIcon size={16} className="mr-1" />
                        <span>Suspended</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <CheckCircleIcon size={16} className="mr-1" />
                        <span>Active</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <Button
                      variant={user.isActive ? "danger" : "primary"}
                      onClick={() => onToggleSuspend(String(user?.id))}
                    >
                      {user.isActive ? "Suspend" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-cowrie-bone/70"
                >
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
