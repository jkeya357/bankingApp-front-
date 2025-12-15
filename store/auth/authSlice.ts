import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

const authSlice = createSlice({
  reducerPath: "auth",
  name: "auth",
  initialState: {accessToken: savedToken ?? null, user: null},
  reducers: ({
    setCredentials: (state, action) => {
      const {token, userId} = action.payload
      state.accessToken = token
      localStorage.setItem("accessToken", token)
      state.user = userId

       if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", userId);
      }
    },
    logout: (state) => {
      state.accessToken = null
      state.user = null

        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
    }
  })
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer

export const getAccessToken = (state: RootState) => state.auth.accessToken
export const getCurrentUser = (state: RootState) => state.auth.user