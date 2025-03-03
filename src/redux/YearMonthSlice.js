import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  year: new Date().getFullYear(),
  month: String(new Date().getMonth() + 1).padStart(2, "0"),
};

const YearMonthSlice = createSlice({
  name: "yearmonth",
  initialState,
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const selectYear = (state) => state.yearmonth.year;
export const selectMonth = (state) => state.yearmonth.month;
export const { setYear, setMonth } = YearMonthSlice.actions;
export default YearMonthSlice.reducer;
