import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/lib/persistReducer";
// import persistStore from "redux-persist/lib/persistStore";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "features/productsSlice";
import userReducer from "../features/userSlice";
import customerReducer from "../features/customerSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  customer: customerReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
