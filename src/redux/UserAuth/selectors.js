export const selectUser = (state) => state.auth.user;
export const selectDailyNorma = (state) => state.auth.user?.dailyNorma;
export const selectToken = (state) => state.auth.token;
export const selectUserName = (state) => state.auth.user?.name || "User";
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUserCount = (state) => state.auth.userCount;
export const selectIsLoading = (state) => state.auth.isLoadingLogin;
