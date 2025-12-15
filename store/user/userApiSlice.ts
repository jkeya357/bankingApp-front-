import bankApiSlice from "../api/bankApi";
import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

import { getUser, createUser, CreateUserRequest, updateUser, updateUserResponse } from "@/types/User";

const usersAdapter = createEntityAdapter<getUser, string>({
  selectId: (user) => user.id
})
const initialState = usersAdapter.getInitialState({})

export const usersApiSlice = bankApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<EntityState<getUser, string>, void>({
      query: () => "/users",
      transformResponse: (responseData: getUser[]) => {
        return usersAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => {
        if(result?.ids){
          return[
            {type: "User" as const, id: "LIST"},
            ...result.ids.map((id: string) => ({type: "User" as const, id}))
          ]
        }else return [{type: "User", id: "LIST"}]
      }
    }),
    createUser: builder.mutation<createUser, CreateUserRequest>({
      query: (requestBody) => ({
        url: "/users",
        method: "POST",
        body: requestBody
      }),
      invalidatesTags: [{type: "User", id: "LIST"}]
    }),
    updateUser: builder.mutation<updateUserResponse, updateUser>({
      query: ({id, requestBody}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: {...requestBody}
      }),
      invalidatesTags: (result, error, arg) => [
        {type: "User", id: arg.id}
      ]
    })
  })
})

export const {
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation
} = usersApiSlice

export const selectUserResult = usersApiSlice.endpoints.getUsers.select()

const selectUserData = createSelector(
  selectUserResult,
  userResult => userResult.data
)

export const {
  selectById: selectUserById,
  selectAll: selectAllUsers
} = usersAdapter.getSelectors((state: RootState) => selectUserData(state) ?? initialState)