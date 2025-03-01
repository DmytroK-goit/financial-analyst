import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  getTransaction,
  getTransactionYear,
} from "./operations";

const initialState = {
  itemsMonth: [],
  itemsYearMonth: [],
  itemsYear: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.itemsMonth.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsMonth = action.payload;
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getTransactionYear.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionYear.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsYear = action.payload;
      })
      .addCase(getTransactionYear.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
