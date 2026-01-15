"use client";

import UserTable from "@/components/admin/UsersTable";
import { useGetAllUsersQuery, useSendDataMutation } from "@/store/api/api";
import React from "react";
import { toast } from "react-toastify";

const AdminUsers = () => {
  // Fetch allUserData
  const {
    data: usersData,
    isLoading: userIsLoading,
    error: userError,
  } = useGetAllUsersQuery(null);
  const users = usersData?.data;

  //MAKE API CALL
  const [suspendUser, { isLoading, reset }] = useSendDataMutation();
  const handleToggleSuspend = async (userId: string) => {
    const request = await suspendUser({
      url: `users/suspend/${userId}`,
      data: {},
      type: "PATCH",
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bold text-cowrie-bone text-lg md:text-xl ">
          User Management
        </h1>
        <p className="text-cowrie-bone/70 font-abeezee text-sm md:text-base">
          Manage user accounts and permissions
        </p>
      </div>
      <div className="bg-forged-black border border-antique-brass/30 rounded-lg p-6">
        {users && users.length > 0 ? (
          <UserTable
            users={users}
            onToggleSuspend={(id) => handleToggleSuspend(id)}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-cowrie-bone/80">No users yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
