"use client";
import { useState, useContext } from "react";
import { AccountContext } from "../Account-Components/AccountProp";
import { TransactionType } from "@/types/Transactions";

interface createModalType {
  setDescription: (value: string) => void;
  description: string;
  setAmount: (value: number) => void;
  amount: number | undefined;
  transactionTypeModal: TransactionType;
  handleSubmit: () => Promise<void>;
  loading: boolean;
  onClose: (open: boolean) => void;
}

const CreateTransactionModalComponent = ({
  setDescription,
  description,
  setAmount,
  amount,
  transactionTypeModal,
  handleSubmit,
  loading,
  onClose,
}: createModalType) => {
  const accountNumber = useContext(AccountContext);

  const titleMap = {
    DEPOSIT: "Deposit Money",
    WITHDRAWAL: "Withdraw Money",
    TRANSFER: "Transfer Money",
    CREDIT: "Credit",
    DEBIT: "Debit",
  };

  const buttonLabelMap = {
    DEPOSIT: "Deposit",
    WITHDRAWAL: "Withdraw",
    TRANSFER: "Transfer",
    CREDIT: "Credit",
    DEBIT: "Debit",
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-5">
        <h2 className="text-xl font-semibold text-gray-800">
          {titleMap[transactionTypeModal]}
        </h2>

        {/* Account Number */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Account Number</label>
          <input
            value={accountNumber.toString()}
            disabled
            className="border rounded-lg px-3 py-2"
            placeholder="Your account number"
          />
        </div>

        {/* Transfer has a second account field */}
        {/* {transactionTypeModal === "TRANSFER" && (
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium">Target Account</label>
            <input
              value={targetAccount}
              onChange={(e) => setTargetAccount(e.target.value)}
              className="border rounded-lg px-3 py-2"
              placeholder="Receiver's account number"
            />
          </div>
        )} */}

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border rounded-lg px-3 py-2"
            placeholder="Enter amount"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-medium">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg px-3 py-2"
            placeholder="Optional description"
          />
        </div>
        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : buttonLabelMap[transactionTypeModal]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionModalComponent;
