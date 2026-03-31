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

  const handleModal = () => setOpenModal(true);

  const myAccounts = useSelector(selectAllAccounts);
  const user = useSelector(getCurrentUser);

  const accounts = myAccounts.filter((acc) => acc.userId === user);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-200">Accounts</h2>
        <Button
          onClick={handleModal}
          size="sm"
          className="rounded-lg bg-gray-500"
        >
          + New Account
        </Button>
      </div>

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
              <div className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex justify-between items-center cursor-pointer hover:scale-[1.02] transition-transform">
                <div>
                  <p className="font-semibold text-white">{acc.accountType}</p>
                  <p className="text-sm text-gray-400">{acc.accountNumber}</p>
                </div>
                <p className="text-lg font-bold text-white">
                  R {acc.accountBalance.toLocaleString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">
            Start banking by creating your first account
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
