import { createAsyncThunk } from "@reduxjs/toolkit";
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
  async ({ year, month }, thunkApi) => {
    try {
      const token = localStorage.getItem("token");

      const parsedYear = String(year);
      const parsedMonth = String(month).padStart(2, "0");

      const { data } = await finance.get(
        `transaction/summary?year=${parsedYear}&month=${parsedMonth}`,
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
