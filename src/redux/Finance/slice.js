import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, getTransaction } from "./operations";

const initialState = {
  itemsMonth: [],
  itemsYearMonth: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.itemsMonth.push(action.payload);
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.itemsYearMonth = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
