import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  interface stateValues{
    accessToken: string | null,
    user: string | null
  }

  const initialState: stateValues = {accessToken: null, user: null}

const authSlice = createSlice({
  reducerPath: "auth",
  name: "auth",
  initialState,
  reducers: ({
    setCredentials: (state, action) => {
      const {token, userId} = action.payload
      state.accessToken = token
      state.user = userId
    },
    logout: (state) => {
      state.accessToken = null
      state.user = null
    }
  })
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer

export const getAccessToken = (state: RootState) => state.auth.accessToken
export const getCurrentUser = (state: RootState) => state.auth.user