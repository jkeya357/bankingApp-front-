import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import bankApi from "../api/bankApi";
import { Transaction } from "@/types/Transactions";

const transactionAdapter = createEntityAdapter<Transaction, string>({
  selectId: (account) => account.transactionId
})

const initialState = transactionAdapter.getInitialState()

const TransactionApiSlice = bankApi.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query<EntityState<Transaction, string>, void>({
      query: () => "/transactions",
      transformResponse: (responseData: Transaction[]) => {
        return transactionAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => {
        if(result?.ids){
          return[
            {type: "Transaction" as const, id:"LIST"},
            ...result.ids.map(id => ({type: "Transaction" as const, id}))
          ]
        }else return [{type: "Transaction", id: "LIST"}]
      }
    }),
    withdraw: builder.mutation({
      query: (requestBody) => ({
        url: "/transactions/withdraw",
        body: {...requestBody},
        method: "POST"
      }),
      invalidatesTags: [{type: "Transaction", id: "LIST"}, {type: "Account", id: "LIST"}]
    }),
    deposit: builder.mutation({
      query: (requestBody) => ({
        url: "/transactions/deposit",
        body: {...requestBody},
        method: "POST"
      }),
      invalidatesTags: [{type: "Transaction", id: "LIST"}, {type: "Account", id: "LIST"}]
    })
  })
})

export const {useGetTransactionsQuery, useWithdrawMutation, useDepositMutation} = TransactionApiSlice

const TransactionResult = TransactionApiSlice.endpoints.getTransactions.select() as (state: any) => {
  data: EntityState<Transaction, string> | undefined
}

const transactionData = createSelector(
  TransactionResult,
  transactionData => transactionData?.data
)

export const {
  selectAll: selectAllTransactions
} = transactionAdapter.getSelectors(state => transactionData(state) ?? initialState)