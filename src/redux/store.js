import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./UserAuth/slice";
import dateReducer from "./DateSlice";
import { transactionReducer } from "./Finance/slice"; // ✅ Імпортуємо transactionReducer

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isLoggedIn", "isLoadingLogin"],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    date: dateReducer,
    transaction: transactionReducer, // ✅ Додаємо transactionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
