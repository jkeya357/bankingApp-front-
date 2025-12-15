import {RootState} from "@/store/store"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    prepareHeaders: (headers, {getState}) => {
      const accessToken = (getState() as RootState).auth.accessToken
      if(accessToken){
        headers.set("Authorization", `Bearer ${accessToken}`)
      }
      return headers
    }
  })

  const baseQueryReauth: typeof baseQuery = async(args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
    console.log("Access token expired. Trying to refresh...");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;

  }

const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery: baseQueryReauth,
  tagTypes: ["User", "Account", "Transaction"],
  endpoints: builder => ({})
})

export default bankApi