import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedDate: new Date().toISOString().split("T")[0],
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload.data;
    },
  },
});
export const { setSelectedDate } = dateSlice.actions;
export const selectSelectedDate = (state) => state.date.selectedDate;
export default dateSlice.reducer;
