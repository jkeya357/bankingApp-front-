import {accountType} from "@/types/Account"

export interface AccountSectionType{
  id: string,
  accountType: accountType,
  accountNumber: string,
  accountBalance: number
}