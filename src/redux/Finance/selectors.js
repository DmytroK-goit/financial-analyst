export const selectMonthTransactions = (state) =>
  state.transaction?.itemsYearMonth || [];
