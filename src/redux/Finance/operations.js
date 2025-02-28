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

export const getTransaction = createAsyncThunk(
  "getTransaction",
  async (month, year, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await finance.post(
        `transaction/summary?year=${year}&month=${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
