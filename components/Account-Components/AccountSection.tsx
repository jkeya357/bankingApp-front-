"use client";
import Link from "next/link";
import { useState } from "react";
import {
  useGetAccountsQuery,
  selectAllAccounts,
} from "@/store/accounts/accountsApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { accountRoutes } from "@/lib/accountRoutes";
import CreateAccountModal from "../CreateAccountModal";
import { Button } from "../ui/button";

const AccountSection = () => {
  useGetAccountsQuery();
  const [openModal, setOpenModal] = useState(false);

  const handleModel = () => {
    setOpenModal(true);
  };

  const myAccounts = useSelector(selectAllAccounts);
  const user = useSelector(getCurrentUser);

  const accounts = myAccounts.filter((acc) => acc.userId === user);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Accounts</h2>

      <Button onClick={() => handleModel()} className="mb-2 cursor-pointer">
        Create a new Account
      </Button>

      {openModal && (
        <CreateAccountModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      <div className="space-y-4">
        {accounts.length > 0 ? (
          accounts.map((acc: any) => (
            <Link
              href={`${accountRoutes[acc.accountType]}/${acc.accountNumber}`}
              key={acc.id}
            >
              <div
                key={acc.id}
                className="p-5 bg-gray-100 rounded-xl border flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {acc.accountType}
                  </p>
                  <p className="text-sm text-gray-500">{acc.accountNumber}</p>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  R {acc.accountBalance}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>Start banking by creating your first account</p>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
