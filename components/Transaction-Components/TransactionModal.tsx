"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "@/types/Transactions";

interface transactionInfo {
  openTransactionModal: boolean;
  onClose: (openTransactionModal: boolean) => void;
  transaction: Transaction | null;
}

const TransactionModal = ({
  openTransactionModal,
  onClose,
  transaction,
}: transactionInfo) => {
  if (!transaction) return null;

  return (
    <Dialog open={openTransactionModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        <div
          className="space-y-2 text-gray-700"
          key={transaction.transactionId}
        >
          <p>
            <b>ID:</b> {transaction.transactionId}
          </p>
          <p>
            <b>Type:</b> {transaction.transactionType}
          </p>
          <p>
            <b>Amount:</b> R {transaction.amount.toFixed(2)}
          </p>

          <p>
            <b>Detail:</b> {transaction.description}
          </p>
          <p>
            <b>Date:</b>{" "}
            {new Date(transaction.transactionDate).toLocaleString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
