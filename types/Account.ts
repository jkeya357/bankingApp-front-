import { Transaction } from "./Transactions";

export interface Account{
  id: string,
  userId: string,
  accountType: accountType
  accountNumber: string;
  accountBalance: number;
  transactions: Transaction[];
  accountStatus: string;
  createdAt: string;
}

export interface DeleteAccountDto{
  message: string
}

export interface DeleteAccountRequest{
  userId: string,
  accountType: string,
  accountNumber: string
}

export type accountType = "SAVING" | "CHEQUE" | "FIXED_DEPOSIT" | "BUSINESS"