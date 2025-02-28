import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, getTransaction } from "./operations";

const initialState = {
  itemsMonth: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "transaction",
  initialState: initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.itemsMonth.push(action.payload);
      })
      .addCase(getTransaction.fulfilled, (state, action) => {});
  },
});

export const transactionReducer = slice.reducer;
