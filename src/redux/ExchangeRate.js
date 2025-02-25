import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const rate = axios.create({
  baseURL: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
});
export const exchangeRate = async () => {
  try {
    const { data } = await rate.get();
    console.log(data); // Виведе курс валют
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
};
