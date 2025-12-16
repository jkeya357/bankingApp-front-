"use client";
import {
  useWithdrawMutation,
  useDepositMutation,
} from "@/store/transaction/transactionApiSlice";
import { useState, useContext } from "react";

import CreateTransactionModalComponent from "@/components/Transaction-Components/CreateTransactionModalComponent";
import { toast } from "sonner";
import { TransactionType } from "@/types/Transactions";
import { AccountContext } from "../Account-Components/AccountProp";
import { useRouter } from "next/navigation";

interface createTransactionType {
  openCreateModal: boolean;
  onClose: (openCreateModal: boolean) => void;
  transactionTypeModal: TransactionType;
}

const CreateTransactionModal = ({
  openCreateModal,
  onClose,
  transactionTypeModal,
}: createTransactionType) => {
  const accountNumber = useContext(AccountContext);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>();

  const [withdraw, { isLoading: isWithdrawLoading }] = useWithdrawMutation();
  const [deposit, { isLoading: isDepositLoading }] = useDepositMutation();

  const loading = isWithdrawLoading || isDepositLoading;

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      let result;
      if (transactionTypeModal === "WITHDRAWAL") {
        result = await withdraw({
          accountNumber,
          amount,
        }).unwrap();
      } else if (transactionTypeModal === "DEPOSIT") {
        result = await deposit({
          accountNumber,
          amount,
          description,
        }).unwrap();
      }
      router.refresh();

      toast("Transaction Successful ✅", {
        description: `transaction processed sucessful.`,
        duration: 4000,
      });

      onClose(false);
    } catch (error) {
      toast("Transaction failed", {
        description: "Something went wrong. Try again later.",
        duration: 5000,
      });
    }
  };

  if (!openCreateModal) return null;

  return (
    <>
      <CreateTransactionModalComponent
        setDescription={setDescription}
        description={description}
        setAmount={setAmount}
        amount={amount}
        transactionTypeModal={transactionTypeModal}
        handleSubmit={handleSubmit}
        loading={loading}
        onClose={onClose}
      />
    </>
  );
};

export default CreateTransactionModal;
