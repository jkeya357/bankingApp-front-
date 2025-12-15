"use client";
import { useCreteAccountMutation } from "@/store/accounts/accountsApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

import { toast } from "sonner";
import { accountType } from "@/types/Account";
import { useRouter } from "next/navigation";

interface createAccountType {
  open: boolean;
  onClose: (open: boolean) => void;
}

const CreateAccountModal = ({ open, onClose }: createAccountType) => {
  const [create, { isLoading, isSuccess }] = useCreteAccountMutation();
  const [selectedType, setSelectedType] = useState<accountType | "">("");
  const [message, setMessage] = useState<string | null>(null);

  const userId = useSelector(getCurrentUser);
  const router = useRouter();

  const handleCreateAccount = async () => {
    try {
      const result = await create({
        userId,
        accountType: selectedType,
      }).unwrap();
      if (isSuccess) {
        router.refresh();
        toast("Account created successfully 🎉", {
          description: `Save your account number for later use ${result.data.accountNumber}`,
          duration: 5000,
        });
      }
      onClose?.(false);
      setSelectedType("");
    } catch (error) {
      console.error("Failed to create account: ", error);
      toast("There was a problem creating you account ❌", {
        description: "Something went wrong try again later",
        duration: 5000,
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-5">
        {/* HEADER */}
        <h2 className="text-xl font-semibold text-gray-800">
          Create New Account
        </h2>

        {/* DROPDOWN */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Account Type</label>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as accountType)}
            className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          >
            <option value="">Select account type...</option>
            <option value="SAVING">Savings Account</option>
            <option value="CHEQUE">Cheque Account</option>
            <option value="BUSINESS">Business Account</option>
            <option value="FIXED_DEPOSIT">Fixed Deposit Account</option>
          </select>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="p-3 rounded-lg bg-green-100 text-green-800 border border-green-300">
            {message}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateAccount}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
