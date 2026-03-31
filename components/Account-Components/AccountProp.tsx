"use client";

import {
  selectAllAccounts,
  useGetAccountsQuery,
} from "@/store/accounts/accountsApiSlice";
import { useGetUsersQuery } from "@/store/user/userApiSlice";
import {
  useGetTransactionsQuery,
  selectAllTransactions,
} from "@/store/transaction/transactionApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createContext, useState } from "react";
import Transactions from "@/components/Transaction-Components/Transactions";
import { accountType } from "@/types/Account";
import { Button } from "../ui/button";
import DeleteModal from "../Delete-Component/s/DeleteModal";
import { useParams } from "next/navigation";

interface AccountPageProps {
  accountType: accountType;
  account: any;
}

export const AccountContext = createContext("");

const titleMap: Record<AccountPageProps["accountType"], string> = {
  SAVING: "Savings Account",
  BUSINESS: "Business Account",
  CHEQUE: "Cheque Account",
  FIXED_DEPOSIT: "Fixed Deposit Account",
};

const AccountProp = ({ accountType, account }: AccountPageProps) => {
  if (!account) return null;

  useGetAccountsQuery();
  useGetUsersQuery();
  useGetTransactionsQuery();

  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const accountNumb = params.accountNumber;

  const getAccount = useSelector(selectAllAccounts);
  const currentUser = useSelector(getCurrentUser);
  const newTransactions = useSelector(selectAllTransactions);

  const existingAccount = getAccount.find(
    (acc) => acc.userId === currentUser && acc.accountNumber === accountNumb,
  );

  if (!existingAccount) return null;

  const { accountNumber, accountBalance, createdAt } = existingAccount;

  const transactions = newTransactions.filter(
    (tx) => tx.account === existingAccount.accountId,
  );

  return (
    <AccountContext.Provider value={accountNumber}>
      <div className="p-6 space-y-6 max-w-3xl mx-auto min-h-screen">
        {/* ACCOUNT HEADER */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">
              {titleMap[accountType]}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Account Number:</p>
              <p>{accountNumber.toString()}</p>
            </div>

            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Account Type:</p>
              <p>{accountType}</p>
            </div>

            <div className="flex justify-between text-gray-300">
              <p className="font-medium">Created:</p>
              <p>{new Date(createdAt).toLocaleString()}</p>
            </div>

            <div className="flex justify-between text-white text-xl font-bold mt-4">
              <p>Balance:</p>
              <p>R {accountBalance.toFixed(2)}</p>
            </div>
            {/* DELETE BUTTON */}
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-red-700 hover:bg-red-800 text-white w-full mt-4"
            >
              DELETE Account
            </Button>
          </CardContent>
        </Card>

        {/* TRANSACTIONS SECTION */}
        <Transactions transactions={transactions} />
      </div>

      <DeleteModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        accountType={accountType}
      />
    </AccountContext.Provider>
  );
};

export default AccountProp;
