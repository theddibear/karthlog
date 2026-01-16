"use client";

import React, { useEffect, useState } from "react";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ShieldOffIcon,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { RootState } from "@/store/store";
import { getDataFromLocalStorage } from "@/utils/localStorage";
import { useGetUserQuery, useSendDataMutation } from "@/store/api/api";
import { logOut } from "@/store/slices/isAuthSlice";

const DeleteAccountPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuth.isAuth
  );

  const userId = getDataFromLocalStorage("id");
  const email = getDataFromLocalStorage("email");
  const role = getDataFromLocalStorage("role");

  const { data: userData } = useGetUserQuery(
    { id: userId, query: {} },
    { skip: !userId }
  );
  const userInfo = userData?.data;

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/auth");
//       return;
//     }

//     if (role === "admin") {
//       router.push("/admin");
//     }
//   }, [isAuthenticated, role, router]);

  const [confirmation, setConfirmation] = useState("");
  const [reason, setReason] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  const [deleteAccount, { isLoading: isDeleting }] = useSendDataMutation();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmation !== "DELETE") {
      toast.error('Type "DELETE" to confirm.');
      return;
    }

    if (!acknowledged) {
      toast.error("Please confirm you understand the consequences.");
      return;
    }

    const trimmedReason = reason.trim();
    const payload: Record<string, string> = {};

    if (userId) {
      payload.id = userId;
    }

    if (email) {
      payload.email = email;
    }

    if (trimmedReason) {
      payload.reason = trimmedReason;
    }

    const request = await deleteAccount({
      url: "auth/deleteAccount",
      data: payload,
      type: "DELETE",
    });

    if (request?.data) {
      toast.success(request?.data?.message || "Account deleted successfully.");
      dispatch(logOut());
      router.push("/");
    } else {
      toast.error(
        request?.error?.data?.message ||
          "Unable to delete your account right now. Please try again."
      );
    }
  };

  const canDelete = confirmation === "DELETE" && acknowledged;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push("/account")}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon size={16} />
          Back to account
        </Button>
      </div>

      <div className="bg-forged-black border border-antique-brass/30 rounded-xl p-6 space-y-6">
        <div className="flex items-start gap-3">
          <div className="bg-red-600/10 border border-red-600/30 text-red-400 p-3 rounded-full">
            <AlertTriangleIcon size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-cowrie-bone">
              Delete your account
            </h1>
            <p className="text-cowrie-bone/70 text-sm font-abeezee mt-1">
              This will permanently remove your Karthlog profile, linked cards, and balances. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-forged-black border border-red-600/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <ShieldOffIcon size={18} />
              <span className="font-semibold text-sm">What you lose</span>
            </div>
            <ul className="space-y-2 list-disc list-inside text-cowrie-bone/80 text-sm font-abeezee">
              <li>Access to your wallet and cowrie balance</li>
              <li>All linked cards and collection history</li>
              <li>Any connected platform benefits</li>
            </ul>
          </div>
          <div className="bg-forged-black border border-antique-brass/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-antique-brass mb-3">
              <Trash2Icon size={18} />
              <span className="font-semibold text-sm">Account details</span>
            </div>
            <p className="text-sm text-cowrie-bone/80 font-abeezee">
              {userInfo?.name ? (
                <span className="font-semibold text-cowrie-bone">{userInfo.name}</span>
              ) : (
                "Your account"
              )}
            </p>
            <p className="text-sm text-cowrie-bone/60 font-abeezee">
              {userInfo?.email || email || "Email not available"}
            </p>
          </div>
        </div>

        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-bold text-cowrie-bone mb-1"
            >
              Why are you leaving? (optional)
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
              placeholder="Share feedback to help us improve"
            />
          </div>

          <div>
            <label
              htmlFor="confirmation"
              className="block text-sm font-bold text-cowrie-bone mb-1"
            >
              Type DELETE to confirm
            </label>
            <input
              id="confirmation"
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="w-full bg-forged-black border border-antique-brass/30 rounded-lg py-2 px-3 text-cowrie-bone focus:outline-none focus:border-antique-brass text-sm"
              placeholder="DELETE"
              autoComplete="off"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-cowrie-bone/80 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="w-4 h-4 bg-forged-black border border-antique-brass/30"
            />
            <span className="font-abeezee">
              I understand this action is permanent and cannot be undone.
            </span>
          </label>

          <div className="flex flex-wrap gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => router.push("/account")}>Cancel</Button>
            <Button
              type="submit"
              variant="danger"
              disabled={!canDelete || isDeleting}
              className="flex items-center gap-2"
            >
              {isDeleting ? (
                <span>Deleting...</span>
              ) : (
                <>
                  <Trash2Icon size={16} />
                  Delete account
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
