import bankApi from "../api/bankApi";

export const authApiSlice = bankApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (requestBody) => ({
        url: "/auth/login",
        method: "POST",
        body: {...requestBody}
      }),
      invalidatesTags: () => [{type: "User", id: "LIST"}]
    })
  })
})

export const {useLoginMutation} = authApiSlice