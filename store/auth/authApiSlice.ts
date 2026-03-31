import bankApi from "../api/bankApi";

export const authApiSlice = bankApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (requestBody) => ({
        url: "/auth/signin",
        method: "POST",
        body: {...requestBody}
      }),
      invalidatesTags: () => [{type: "User", id: "LIST"}]
    }),
    signUp: builder.mutation({
      query: (requestBody) => ({
        url: "/auth/signup",
        method: "POST",
        body: {...requestBody}
      }),
      invalidatesTags: () => [{type: "User", id: "LIST"}]
    }),
    refresh: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    })
  })
})

export const {useSignUpMutation, useLoginMutation, useRefreshMutation} = authApiSlice