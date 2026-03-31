import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Transaction } from "@/types/Transactions";
import TransactionModal from "./TransactionModal";
import CreateTransactionModal from "./CreateTransactionModal";
import { TransactionType } from "@/types/Transactions";

import { useState } from "react";
import { Button } from "../ui/button";

interface transactionType {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: transactionType) => {
  const [openTransactionModal, setOpenTransactionalModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [transactionTypeModal, setTransactionTypeModal] =
    useState<TransactionType | null>(null);

  const handleOpen = (tx: Transaction) => {
    setSelectedTx(tx);
    setOpenTransactionalModal(true);
  };

  return (
    <div>
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl font-semibold text-white">
            Transactions
          </CardTitle>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
              onClick={() => {
                setOpenCreateModal(true);
                setTransactionTypeModal("DEPOSIT");
              }}
            >
              Deposit
            </Button>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1"
              onClick={() => {
                setOpenCreateModal(true);
                setTransactionTypeModal("WITHDRAWAL");
              }}
            >
              Withdraw
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              onClick={() => {
                setOpenCreateModal(true);
                setTransactionTypeModal("TRANSFER");
              }}
            >
              Transfer
            </Button>
          </div>
        </CardHeader>

        {openCreateModal && transactionTypeModal && (
          <CreateTransactionModal
            openCreateModal={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            transactionTypeModal={transactionTypeModal}
          />
        )}

        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-sm">No transactions available.</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.transactionId}
                  onClick={() => handleOpen(tx)}
                  className="border-b border-white/10 pb-3 flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-white">
                      {tx.transactionType}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-white">{tx.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(tx.transactionDate).toLocaleString()}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      tx.transactionType === "DEPOSIT"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {tx.transactionType === "DEPOSIT" ? "+" : "-"} R{" "}
                    {Math.abs(tx.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction Modal */}
      <TransactionModal
        openTransactionModal={openTransactionModal}
        onClose={() => setOpenTransactionalModal(false)}
        transaction={selectedTx}
      />
    </div>
  );
};

export default Transactions;
