export interface Transaction{
  transactionId: string,
  account: string,
  transactionType: TransactionType,
  description: string
  amount: number,
  transactionDate: Date
  // accountStatus: "ACTIVE" | "PENDING"
}

export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "CREDIT" | "DEBIT"
