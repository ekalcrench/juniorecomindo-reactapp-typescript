import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../features/data/homeSlice";
import searchSlice from "../features/search/searchSlice";
import usersSlice from "../features/user/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    search: searchSlice,
    home: homeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch
