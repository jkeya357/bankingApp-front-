import bankApi from "../api/bankApi";
import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { getCurrentUser } from "../auth/authSlice";
import { Account, DeleteAccountDto, DeleteAccountRequest } from "@/types/Account";

const accountAdapter = createEntityAdapter<Account, string>({
  selectId: (account) => account.id
})
const initialState = accountAdapter.getInitialState({})

const accountApiSlice = bankApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<EntityState<Account, string>, void>({
      query: () => "/accounts",
      transformResponse: (accountResponse: Account[]) => {
        return accountAdapter.setAll(initialState, accountResponse)
      },
      providesTags: (result) => {
        if(result?.ids){
          return[
            {type: "Account" as const, id: "LIST"},
            ...result.ids.map((id) => ({type: "Account" as const, id}))
          ]
        }else return[{type: "Account", id: "LIST"}]
      }
    }),
    creteAccount: builder.mutation({
      query: (requestBody) => ({
        url: "accounts",
        method: "POST",
        body: {...requestBody}
      }),
      invalidatesTags: [{type: "Account", id: "LIST"}]
    }),
    deleteAccount: builder.mutation<DeleteAccountDto, DeleteAccountRequest>({
      query: (requestBody) => ({
        url: "/accounts",
        method: "DELETE",
        body: requestBody
      }),
      invalidatesTags: (result, error, arg: {userId: string; accountType: string; accountNumber: string} | undefined) => arg ? [{type: "Account" as const, id: arg.userId}] : [],
      // async onQueryStarted(id, {dispatch, queryFulfilled}){
      //   const result = dispatch(
      //     accountApiSlice.util.updateQueryData("getAccounts", undefined, draft => {
      //       accountAdapter.removeOne(draft, id)
      //     })
      //   )
      //   try {
      //     await queryFulfilled
      //   } catch (error) {
      //     result.undo()
      //     console.log("Error in delete account apiSlice", error)
      //   }
      // }
    })
  })
})

export const {
  useGetAccountsQuery, 
  useCreteAccountMutation, 
  useDeleteAccountMutation
} = accountApiSlice

export const selectIncomeResult = 
  accountApiSlice.endpoints.getAccounts.select() as (state: any) => {
    data: EntityState<Account, string> | undefined
  }

const selectIncomeData = createSelector(
  selectIncomeResult,
  accountResult => accountResult?.data
)

export const {
  selectAll: selectAllAccounts,
  selectById: selectAccountById
} = accountAdapter.getSelectors(state => selectIncomeData(state) ?? initialState)

export const selectAccountForCurrentUser = createSelector(
  [selectAllAccounts, getCurrentUser],
  (accounts, currentUserId) => accounts.filter((acc) => acc.userId === currentUserId)
)


