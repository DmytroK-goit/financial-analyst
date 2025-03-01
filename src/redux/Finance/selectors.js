export const selectMonthTransactions = (state) =>
  state.transaction?.itemsMonth || [];
export const selectYearTransactions = (state) =>
  state.transaction?.itemsYear || [];
