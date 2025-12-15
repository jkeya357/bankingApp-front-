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
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Transactions
          </CardTitle>
          <Button
            onClick={() => {
              setOpenCreateModal(true);
              setTransactionTypeModal("WITHDRAWAL");
            }}
          >
            Withdraw
          </Button>
          <Button
            onClick={() => {
              setOpenCreateModal(true);
              setTransactionTypeModal("DEPOSIT");
            }}
          >
            Deposit
          </Button>
          <Button
            onClick={() => {
              setOpenCreateModal(true);
              setTransactionTypeModal("TRANSFER");
            }}
          >
            Transfer
          </Button>
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
            <p className="text-gray-600 text-sm">No transactions available.</p>
          ) : (
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div
                  key={tx.transactionId}
                  onClick={() => handleOpen(tx)}
                  className="border-b pb-3 flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {tx.transactionType}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {tx.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.transactionDate).toLocaleString()}
                    </p>
                  </div>

                  <p
                    className={`font-semibold ${
                      tx.transactionType === "DEPOSIT"
                        ? "text-green-700"
                        : "text-red-600"
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
