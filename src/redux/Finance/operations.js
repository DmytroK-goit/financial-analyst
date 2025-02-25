import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { finance } from "../UserAuth/operations";

export const addTransaction = createAsyncThunk(
  "addTransaction",
  async (transaction, thunkApi) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await finance.post("transaction", transaction, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Transaction added");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
