import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  transition: {
    type: "",
    category: "",
    amount: 5550,
    date: "",
    description: "",
  },
  token: "",
  userCount: "",
  isLoggedIn: false,
  isRefreshing: false,
};
