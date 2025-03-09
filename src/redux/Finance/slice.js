import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  editTransaction,
  getTransaction,
  getTransactionYear,
} from "./operations";

const initialState = {
  itemsMonth: [],
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
        state.isLoading = false;
      })

      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const updatedTransaction = action.payload;

        if (updatedTransaction.type === "income") {
          const index = state.itemsMonth.income.findIndex(
            (item) => item._id === updatedTransaction._id
          );
          if (index !== -1) {
            state.itemsMonth.income[index] = updatedTransaction;
          }
        } else if (updatedTransaction.type === "expenses") {
          const index = state.itemsMonth.expenses.findIndex(
            (item) => item._id === updatedTransaction._id
          );
          if (index !== -1) {
            state.itemsMonth.expenses[index] = updatedTransaction;
          }
        }
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
