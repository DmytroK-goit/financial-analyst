import { createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  login,
  logout,
  refresh,
  registerUser,
  updateUser,
} from "./operations";

const initialState = {
  isLoadingLogin: false,
  isLoadingRegister: false,
  user: {
    _id: "",
    name: "",
    email: "",
    gender: "",
    monthlyIncome: 0,
  },
  token: "",
  userCount: "",
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload.data;
        state.user = user;
        state.token = accessToken;
        state.isLoggedIn = true;
        state.isLoadingLogin = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoadingLogin = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoadingLogin = false;
      })

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.error("Login failed", action.error.message);
        state.isLoggedIn = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        console.error("Registration failed", action.error);
        state.isLoggedIn = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.updateStatus = "success";
        state.isLoggedIn = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
      });
  },
});
export const authSlice = slice.reducer;
